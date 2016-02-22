---
layout: post
title: 我的Browsersync笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [browsersync, tool]
description: BrowserSync——省时的浏览器同步测试工具
---
{% include JB/setup %}

[BrowserSync][1]——省时的浏览器同步测试工具。

> [Browsersync][1]能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。更重要的是**[Browsersync][1]可以同时在PC、平板、手机等设备下进项调试**。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、android等设备，同时打开了您需要调试的页面，当您使用[browsersync][1]后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。无论您是前端还是后端工程师，使用它将提高您30%的工作效率。

大约半年前有位大牛想我推荐这个工具，但一直没有实践，今天准备好好研究研究，并记录在此。

## 安装
安装Node后，通过npm安装BrowserSync：

	$ npm install -g browser-sync

安装完后在命令行输入下面的命令，查看是否安装成功：

	$ browser-sync --version

若安装成功能看到一个三位版本号，如下图所示：

![]({{BLOG_IMG}}/187.png)

安装好后输入下面的命令可以查看帮助文档：

	$ browser-sync --help

## glob
开始之前先让我们来简单了解下glob语法，glob就是精简版的正则表达式，主要用来匹配文件，语法规则如下：

- `*` 匹配多个除了 `/` 以外的字符
- `?` 匹配单个除了 `/` 以外的字符
- `**` 匹配多个字符包括 `/`
- `{}` 可以让多个规则用 `,` 逗号分隔，起到`或者`的作用
- `!` 出现在规则的开头，表示`取反`。即匹配不命中后面规则的文件

更多内容请[查看这里](https://github.com/isaacs/node-glob)。

## 本地开发
接下来我们看看如何在本地开发时使用，比如我本地有一个目录，我想监视这个目录的css修改，那么先切换到这个目录，然后执行下面的命令即可：

	browser-sync start --server --files "**.css"

请注意这个命令里的start --server，这其实是BrowserSync自己启动了一个小型服务器，然后我们通过下面的url访问我们的网站(http://localhost:3000)。

注意：3000端口可能被占用，如果被占用可以用下面的命令指定一个端口：

	browser-sync start --server --port 8081 --files "**.css"

典型的效果图如下所示：

![]({{BLOG_IMG}}/188.gif)

也可以像下面这样匹配所有文件的改动：

	browser-sync start --server --files "**"

此时，BrowserSync仍然会正确地判断文件变化是否是css，若是其他文件发生变化则刷新页面。

## 代理模式
很多时候我们往往会在本地大家一个服务器用来开发，这时我们需要使用代理模式：

	browser-sync start --proxy "localhost:8080" --files "**"

## gulp
[Gulp](http://gulpjs.com/)是现在流行的自动化工具，但BrowserSync并没有Gulp插件版，因为并不需要。BrowserSync有自己独立的API，将它注册为gulp的一个task即可。下面是一段gulpfile.js的示例：

	var gulp = require('gulp');
	var browserSync = require('browser-sync');
	
	gulp.task('browser-sync', function() {
	    browserSync({
	        files: "**",
	        server: {
	            baseDir: "./"
	        }
	    });
	});

	gulp.task('default', ["browser-sync"]);

这时候运行gulp将等同于前文的browser-sync start --server --files "**"。更多的用法示例请查看[gulp-browser-sync](https://github.com/BrowserSync/gulp-browser-sync)。

## UI界面及其他
BrowserSync提供的一个简易控制面板。BrowserSync最常用的几个配置选项，都可以在这个面板里调整。如果没有指定打开`http://localhost:3001/`会看到下面的界面。

![]({{BLOG_IMG}}/189.png)

这里提供了不少功能，值得一提的是内置了weinre，这些可以抛弃weinre了，这个比那个用起来简单多了，o(∩_∩)o 哈哈。

## 总结
好了就先写这么多吧，如果你有更多需求请查看[官方文档](https://www.browsersync.io/docs/)，或者下面列出的参考资料。

## 参考资料
- [Browsersync中文网](http://www.browsersync.cn/)
- [BrowserSync，迅捷从免F5开始](http://segmentfault.com/a/1190000002607627)

[1]: http://www.browsersync.io/




