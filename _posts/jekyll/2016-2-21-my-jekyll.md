---
layout: post
title: 我的jekyll笔记
category : jekyll
tagline: "原创"
tags : [jekyll]
keywords: [jekyll]
description: 本文介绍jekyll的安装，使用的方法，记录下来供自己和大家使用
---
{% include JB/setup %}

我的博客用的就是用[jekyll][1]搭建的，有几年历史了，同时《[JavaScript简易教程](http://yanhaijing.com/basejs/)》也是基于jekyll搭建的，可以说我使用jekyll很长时间了，也算是比较熟悉了，最近我打算基于jekyll搭建一个新的东西，但却发现自己平时只是使用而且，竟然记不清搭建的流程，这篇博客就是由此产生。

本文介绍jekyll的安装，使用的方法，记录下来供自己和大家使用。

## 简介
[Jekyll][1]是一个静态站点生成器，它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能，所以实际上可以用来编写整个网站。

![]({{BLOG_IMG}}217.png)

## 安装
jekyll是基于ruby开发的，所以依赖ruby环境，并且需要通过gem进行安装，具体过程我在下面两篇文章中有详细介绍，这里不在展开写了。

- [在Windows系统配置Jekyll](http://yanhaijing.com/jekyll/2011/12/30/run-jekyll-on-window/)
- [我的gem笔记](http://yanhaijing.com/tool/2015/08/25/my-gem-note/)

ruby环境安装好后，可以通过下面的命令安装jekyll

	gem install jekyll # 或下面的命令

也可以指定安装版本

	gem install jekyll --version=2.5.3

安装过程可能很慢，墙的问题在上面的文章中有解决办法，安装好后在命令行输入下面的命令可以查看是否安装成功

	jekyll --version

一般你会看到类似下面的输出，则代表你安装成功了，否则可能需要重装

	jekyll x.x.x # x.x.x 代表你安装的版本

## 流程
第一步创建项目

	jekyll new myjekyll

切换到myjekyll目录，运行下面的命令即可

	jekyll server

然后打开浏览器的`127.0.0.1:4000`，即可查看网站效果。

## 常用命令
记录一下常用的命令。
	
	jekyll help # 查看帮助
	jekyll help subcommand # 查看子命令的帮助信息

	jekyll new site-name # 创建一个新的
	
	jekyll build # 构建

	jekyll server # 开启本地服务器查看效果
	jekyll server -P 4001 # 指定端口
	jekyll server -w # 文件发生变化时，自动重新编译

## 技术储备
如果你不了解[markdown][2]和[liquid][3]，你可能需要先了解下，我这里简单介绍一下。

[markdown][2]是写文章的神器，可以用简单的文本格式代替html标记。

比如我们想写一个列表，只需像下面这样即可

	- 列表项
	- 列表项

最终会编译成下面的html

	<li>列表项</li>	
	<li>列表项</li>

如果你想写博客那么可能需要掌握这个，可以专注写文章，而不是写那么冗余的html标记，markdown几乎支持常用的html标签，具体的语法可以查看相关链接里给出的网址。

[liquid][3]是一个模版语言，是jekyll支持的一种，有点类似smarty，只不过是静态的模版语言，只能在编译的过程中进行替换。

	<h2>{{ page.title }}</h2>

上面的代码最终会编译成下面的代码，假设`page.title = 标题`

	<h2>标题</h2>

liquid除了支持变量替换外还支持逻辑语法，具体可以查看相关链接中的链接。

## 相关链接
- [jekyll官网][1]
- [jekyll中文站](http://jekyllcn.com/)
- [Markdown语法][2]
- [Liquid模板语言][3]

[1]: http://jekyllrb.com/
[2]: http://wowubuntu.com/markdown/
[3]: https://github.com/shopify/liquid/wiki/liquid-for-designers
