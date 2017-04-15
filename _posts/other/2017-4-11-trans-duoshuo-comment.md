---
layout: post
title: 多说评论系统迁移记
category : other
tagline: "原创"
tags : [other]
keywords: [多说]
description: 本文记录将多说迁移到commentit的步骤和遇到的各种问题
---
{% include JB/setup %}

多说评论厂倒闭了，倒闭了，倒闭了！！！

作为一个使用了3年的重度用户，面对这个消息，满是感伤，说好的不离不弃呢，我只能默默的送上祝福

## 抉择
摆在我面前有两条路，要么迁移，干掉评论，我选择了前者

解决了纠结，又有一个大大岔路口摆在面前，众多评论系统中选择哪个呢？？？

- 一大波国产评论系统
- disqus
- [commentit](https://commentit.io/)
- [gitment](https://github.com/imsun/gitment)

先来说结果，最后我选择了commentit，原因是我乐意，首先类多说这种评论系统（有言，disqus）被我排除在外了，毕竟伤口还疼呢

gitment通过github api把文章评论托管在github issues，通过github issues做精细化定制，非常有意思，并且也是国人开发的，优点是只依赖github api，祈祷github 不下线这个功能就行了

## Comm (ent|it)
我选择的是commentit，一个法国小孩开发的，依赖法国小孩的服务系统，将评论发pull request到自己的仓库，然在在自己仓库存储评论

法国小孩在[警告](https://commentit.io/tos)里说自己不对系统稳定性和时间做任何保证，o(╯□╰)o

接入过程非常简单，官方的[Getting started](https://commentit.io/getting-started)介绍的非常清楚了

开始老是报错，提交不上去，错误信息如下，后来在[github](https://github.com/guilro/commentit/issues/9)和作者交流才发现是我的仓库名字是`yanhaijing.github.com`的问题，重命名为`yanhaijing.github.io`就好了

    Error: could not commit the comment to github (repository or file not found) 

commentit提供了两种评论存储方案，存储在博文的meta数据，或者存储在单独外部文件，我选择了后者，原因是方便迁移历史评论数据，而且我也觉得在.md里存储一大推评论有点恶心，具体接入可以直接参看我的[github](https://github.com/yanhaijing/yanhaijing.github.io/blob/master/_includes/JB/comments-providers/commentit)

整体体验还是不错的，登录账号可以使用推特，脸谱和github

## 历史数据问题
好吧我最想说的是这部分，我大概有几百个评论，实在舍不得丢弃，最后写了一个脚本将多说导出的数据，转换成了commentit的数据

先来看下多说导出的数据

    "threads": [
        {
            "thread_id": 1366309223767474177,
            "created_at": "2014-01-17T16:59:41+08:00",
            "url": "http://yanhaijing.com/css/2014/01/css/"
        }
    ],
    "posts": [
        {
            "thread_id": 1366309223767474198,
            "message": "这题太发散了~~",
            "created_at": "2014-01-22T11:54:42+08:00",
            "author_name": "修远兮",
            "author_url": "http://weibo.com/bai80",
        }
    ]

再来看一下[commentit](https://github.com/yanhaijing/yanhaijing.github.io/blob/master/_data/comments.yml)要求的格式：

    encapsulation-of-javascript:
      - author:
          type: full
          displayName: 修远兮
          url: http://weibo.com/bai80
          picture: /img/default-avatar.png
        content: 这题太发散了~~
        date: 2014-01-22T11:54:42+08:00

思路是，把评论按照文章进行聚合，代码如下

    let threadsMap = {};
    ret.threads.forEach(function (thread) {
        // 过滤指定url
        if (/yanhaijing\.com\/\w*\/\d\d\d\d\/\d\d\/\d\d/.test(thread.url)) {
            threadsMap[thread.thread_id] = thread;
            console.log(thread.thread_id, thread.url)
        }
    });

    let commentMap = {};

    ret.posts.forEach(function (post) {
        if (!threadsMap[post.thread_id]) {
            return;
        }

        let threadUrl = threadsMap[post.thread_id].url;

        let arr = threadUrl.split('?')[0].split('/');

        let threadName = arr.pop() || arr.pop();

        if (!/^[a-zA-Z0-9_\-]+$/.test(threadName)) {
            return;
        }


        if (!commentMap[threadName]) {
            commentMap[threadName] = [];
        }

        commentMap[threadName].push(post);

    })
    

    let text = '';
    Object.keys(commentMap).forEach(function (key) {
        text += `${key}:\n`;

        commentMap[key].forEach(function (comment) {
            let msg = comment.message;
            if (msg.indexOf('\n') !== -1) {
                msg = ' |-\n' + msg;
                msg = msg.replace(/\n/g, '\n      ');
            }
            msg = msg.replace(/[\[\]:@"\b]/g, ' ');

            let name = comment.author_name.replace(/@/g, '');

            let picture = '/img/default-avatar.png';
            if (name === '颜海镜') {
                picture = '/img/facelessman.png'
            }
            text += `  - author:\n`;
            text += `      type: full\n`;
            text += `      displayName: ${name}\n`;
            text += `      url: ${comment.author_url}\n`;
            text += `      picture: ${picture}\n`;
            text += `    content: ${msg}\n`;
            text += `    date: ${comment.created_at}\n`;
        });
    });

    console.log(text);

遇到的一个问题就是头像，头像数据我只能弄了一个默认头像，所以历史评论全变成了一样的头像，好在用户名和url还有，[demo](http://yanhaijing.com/tool/2016/06/30/my-sublime3/)

## 总结
总结了一些经验和遇到的一些问题，希望能够帮到迁移的人，现在我只祈祷法国小哥别弃坑，o(╯□╰)o

如果你是hexo我不建议迁移commenit，因为commentit不支持提交到指定分支，而hexo一般都是有两个分支source和master，我建议看下上面提到的gitment
