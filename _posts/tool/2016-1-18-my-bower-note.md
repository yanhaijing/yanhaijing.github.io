---
layout: post
title: 我的Bower笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [bower,js]
description: Bower是一款针对浏览器端的库管理工具，本文将记录bower的一些常用内容
---
{% include JB/setup %}

Bower是一款针对浏览器端的库管理工具，本文将记录bower的一些常用内容。

![]({{BLOG_IMG}}230.jpg)

## 安装
Bower基于node.js，所以安装之前，必须先确保已安装node.js

	npm install bower -g

安装好后运行下面的命令可以看到版本号

	bower -v

查看帮助文档

	bower help

## 常用操作
接下来记录一些常用操作命令

	bower init # 初始化
	bower install # 安装bower依赖
	bower install backbone[#1.11.3] # 安装一个具体的库[指定版本]
	bower uninstall jquery # 卸载
	bower update jquery # 更新	
	bower list # 列出全部的库

	bower search jquery # 搜索
	bower info jquery # 查看一个库的具体信息

	bower register jquery git://github.com/jquery/jquery # 注册一个包

## 总结
目前bower基本已经过时了，记录一下供自己使用吧。

## 参考资料
- [Bower：客户端库管理工具](http://javascript.ruanyifeng.com/tool/bower.html)
- [bower解决js的依赖管理](http://blog.fens.me/nodejs-bower-intro/)




