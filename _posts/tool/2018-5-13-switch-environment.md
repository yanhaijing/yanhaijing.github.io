---
layout: post
title: 多环境管理终极方案
category : tool
tagline: "原创"
tags : [tool]
keywords: [chrome, tool]
description: 
---
{% include JB/setup %}

我最近很苦恼，因为我们团队负责很多很多个系统，我们每个系统又分为不同的环境，举个例子吧，假设我们有10个系统，每个系统有开发，测试，线上三个环境，那就是30个域名，这些域名还没什么规律可循，我差不多是个废人了/(ㄒoㄒ)/~~

先来交代下背景，如果你没有这样的问题，那么可以只看看背景，或者以后遇到了再来看具体的方案

有时候我的系统会有一个链接跳转到别人负责的系统，但我并不知道他的系统不同环境是什么，如果我想知道我还得问他。。。

每次给QA提测，明明只改了一个页面，我却要写好几个url发给他。。。

脑补一下我从开发环境切换到测试环境的画面，首先我先找到测试环境的域名，粘贴到浏览器，再去赋值后面的路径，再次粘贴过来，按下回车，大概我要操作十几个按键，我去。。。

总结一下问题就是，多个系统多套环境造成的问题：

- 每个人的记忆成本
- 项目交接成本
- 如何高效切换环境
- 不熟悉人的成本，比如其他项目成员，测试人员，产品等

## 解决方案
那么怎么解决这个问题呢，我最开始的做法应该和大部分人差不多，我把每个系统，每个环境都放到了浏览器收藏夹，可以脑补一下我的收藏夹多么多么壮观

收藏夹解决了一些问题，比如记忆成本，但也只解决了这一个问题，切换环境还是稍微有点复杂

我还想到了另一个绝妙的办法，整理文档，一个常常的文档收集了全部的系统，全部的环境，文档弥补了收藏夹的一些缺点，比如交接成本

文档+收藏夹可以一起使用，文档收录全部的，收藏夹只收藏自己负责的系统，看起来完美了，一般人可能会这么认为，但是切换的效率并没有解决，那么到底有没有办法解决呢！

一个程序员给出了他的终极解决方案，一个浏览器插件，一个会自动识别当前环境是什么环境，并把当前环境对应的其他环境都展示出来的插件，终极解决方案完美的解决了所有的问题

- 支持全部系统
- 数据一处维护
- 屏蔽各种细节
- 自动拼接

## 插件开发
关于插件开发有很多非常不错的资料，当然实时性最好的资料是谷歌官方的资料，但对于英文不好的同学，给大家推荐一个本图灵的书《[Chrome扩展及应用开发](http://www.ituring.com.cn/book/1421
)》，一个学生写的，完全免费，大赞

关于插件的知识这里不再展开，这里开发的是一个插件类，并且是对全部页面展现的

![]({{BLOG_IMG/522.png}})

## 系统设计
麻雀虽小五脏俱全，这么一个小小的插件，主要包含三部分，服务端、客户端和反馈系统，整体架构图如下：

![]({{BLOG_IMG/523.png}})

数据的设计非常简单，如下所示，version和changeLog用来做升级提示，data中是数据

```json
{
    "version": "1.0.0",
    "changeLog": [
        "完成域名切换与展示功能"
    ],
    "data": [
        {
            "dev": "https://dev.yanhaijing.com",
            "test": "https://test.yanhaijing.com",
            "beta": "https://beta.yanhaijing.com",
            "st": "https://st.yanhaijing.com",
            "online": "https://yanhaijing.com"
        }
    ]
}
```

程序执行的流程图如下，首先是获取数据，需要处理各种异常：

![]({{BLOG_IMG/524.png}})

由于没有放到Chrome的应用商店，所以升级的提示需要自己做，思路也很简单，在程序里面写死当前的版本号，如果当前版本号和接口返回罪行版本号不一致，就提示升级

```js
function renderUpdate(version, changeLog) {
    var curVersion = '1.2.0';

    if (version === curVersion) return;

    // xxxxxx
}
```
## 问题与思考
下面来看看做的过程中遇到了一些问题和一些思考

先来说说权限的问题，这个对没有经验的人是一个坑吧，比如想获取当前页面url需要配置下面的权限

```json
{
    "permissions": [
        "https://yanhaijing.com/",
        "https://*.yanhaijing.com/",
        "tabs",
        "activeTab"
    ]
}
```

想使用eval需要配置下面的权限，注意`unsafe-eval`

```json
{
    "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
}
```

另一个问题就是如果某一环境有多个域名的问题，比如dev环境有多个域名怎么办？大体上有两条思路，一个就是复用现在的数据，将key的定义放宽，这样成本最小

```json
{
    "dev1": "https://dev.yanhaijing.com",
    "dev2": "https://dev.yanhaijing.com",
    "dev3": "https://dev.yanhaijing.com",
    "dev4": "https://dev.yanhaijing.com"
}
```

另一个思路就是数据再加一层，数据上的设计如下

```json
{
    "dev": {
        "dev1": "https://dev.yanhaijing.com",
        "dev2": "https://dev.yanhaijing.com",
        "dev3": "https://dev.yanhaijing.com"
    },
    "test": "https://test.yanhaijing.com",
    "beta": "https://beta.yanhaijing.com",
    "st": "https://st.yanhaijing.com",
    "online": "https://yanhaijing.com"
}
```

这样搞的话，需要程序上做出很大改动，并且旧版本都不能够兼容，所以需要两个版本的数据，可以再添加一个data2

```
"data": [
    {
        "dev1": "https://dev.yanhaijing.com",
        "dev2": "https://dev.yanhaijing.com",
        "dev3": "https://dev.yanhaijing.com"
    }
]
"data2": [
    {
        "dev": {
            "dev1": "https://dev.yanhaijing.com",
            "dev2": "https://dev.yanhaijing.com",
            "dev3": "https://dev.yanhaijing.com"
        }
    }
]
```

关于如何选择就根据实际情况来吧，如果时间紧迫就选简单的方案

## 总结
说了这么，都是思路和方法，下面提供一个实际的[仓库](https://github.com/yanhaijing/switch-env)，只是个demo哦
