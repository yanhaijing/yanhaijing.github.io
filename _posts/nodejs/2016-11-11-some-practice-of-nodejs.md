---
layout: post
title: Nodejs的一点实战
category : nodejs
tagline: "原创"
tags : [nodejs, javascript]
keywords: [nodejs, javascript]
description: 
---
{% include JB/setup %}

最近经验要迁移到https，需要排查页面中需要用到的全部资源，我用nodejs+phantomjs做了一个自动收集页面资源的程序，本文分享下自己的一点经验，注意文章结尾有干货

如果全文只能说一句话，那我想说的是，“一定要打破自身局限性，要走出舒适区，身为前端不能被前端局限住视野”，前端虽美，可不要贪杯哦

![]({{BLOG_IMG}}506.png)

## 调研
我最先想到的方案就是手动收集依赖，但这种方式明显不可取，但在一番曲折之后我发现了[HAR][HAR]这种神奇的东西，一句话概括，HAR是一种数据格式，对人家还有专门的组织定义规范了，起作用是定义网络请求的数据规范，以便在不同工具中共享数据

![]({{BLOG_IMG}}508.png)

感兴趣的同学可以自己导出数据看下格式，上面从chrome面板导出数据，让后放到[HAR Viewer](http://www.softwareishard.com/har/viewer/
)工具就可以还原了，似不似很神奇，O(∩_∩)O哈哈~

![]({{BLOG_IMG}}509.png)

*小技巧：*如果想收集一个页面依赖了哪些域名，可以这样操作

![]({{BLOG_IMG}}507.png)

目标是自动化，我打算用node来写逻辑，一番调研后发现phantomjs是一个无头浏览器，可以被node调用，真个程序的架构就清晰了，涉及node，phantomjs和HAR

![]({{BLOG_IMG}}510.png)

为了可扩展性，可伸缩性，我将真个系统设计成如下部分，配置系统，获取HAR系统，解析系统，可视化系统，理想很丰满，现实很骨感，我其实没用过phantomjs，也没写过node，o(╯□╰)o

![]({{BLOG_IMG}}511.png)

## phantomjs
phantomjs是一个没有界面的，可通过JavaScript api编程的Webkit，快速并且原生支持多种web标准：DOM处理，CSS选择器，JSON，Canvas和SVG，这是官网对phantomjs的介绍

phantomjs的整体架构如下，我们可以调用phantomjs暴漏的api，从而实现自己想要的功能

![]({{BLOG_IMG}}512.png)

phantomjs的主要功能有4大块，而网络监控正是我需要的

- headless website testing 无界面网站测试
- screen capture 页面截图
- page automation 页面自动化测试
- network monitoring 网络监控

网络上关于phantom的教程要么停留在v1，从v2开始phantom有了独立的可执行程序，在windows下就是exe，需要单独安装，可以在[这里下载](http://phantomjs.org/download.html)对应的安装程序，安装好后还需添加到path路径，在node中也会调用这个可执行程序

在命令行输入`phantomjs -v`，验证是否安装成功

![]({{BLOG_IMG}}513.png)

新建一个test.js

    var page = require('webpage').create();
    page.open('http://example.com', function(status) {
      console.log("Status: " + status);
      if(status === "success") {
        page.render('example.png');
      }
      phantom.exit();
    });

然后用phantom运行这个js，就可以得到对应页面的截图，是不是很简单，注意这个test.js是用phantom运行的

    phantomjs ./test.js

## nodejs

## 总结
如果然我推荐一篇学习nodejs的文章的话，那我推荐《[七天学会nodejs](http://nqdeng.github.io/7-days-nodejs/
)》，如果让我推荐一本书的话，我推荐《nodejs实战》


[HAR]: http://www.softwareishard.com/blog/har-12-spec/
