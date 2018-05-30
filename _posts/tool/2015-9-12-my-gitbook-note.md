---
layout: post
title: 我的GitBook笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [GitBook, tool]
description: 最近准备写一本书，所以研究研究GitBook，本文对学习做个记录，主要目就是以后日常使用，就不用去翻看别的资料了。
---
{% include JB/setup %}

最近准备写一本书，所以研究研究[GitBook][GitBook]，本文对学习做个记录，主要目就是以后日常使用，就不用去翻看别的资料了。

## 什么是GitBook
> GitBook 是一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书。

![]({{BLOG_IMG}}233.png) 

- [GitBook项目官网](http://www.gitbook.io)
- [GitBook Github地址](https://github.com/GitbookIO/gitbook)

GitBook需要使用markdown格式编写，如果你不了解可以看看[这里](https://help.gitbook.com/format/markdown.html)。

## 安装
需要先安装[Node](http://nodejs.org/)，安装步骤网上教程非常多，在此不详细介绍，安装好node后就可以使用npm安装GitBook了。

### gitbook-cli
需要先安装gitbook-cli，这个工具是用来管理gitbook工具的，这有点类似容器的意思，通过gitbook-cli可以在本地安装多个gitbook工具的不同版本。

使用如下命令安装GitBook。

	 $ npm install gitbook-cli -g

安装完之后，你可以检验下是否安装成功。

	$ gitbook -V

### 安装gitbook
安装完gitbook-cli后，要使用gitbook还需要安装gitbook工具，可以通过如下命令安装。

	$ gitbook versions:install

安装好后可以通过如下命令查看是否安装成功。

	$ gitbook versions

都安装好后接下来我们就可以做点有意思的事情了。

## 常用命令
再开始做有意思的事情之前，先来熟悉下常用命令。

### gitbook-cli常用命令

	gitbook -h # 查看帮助信息

	gitbook versions # 查看本地安装的gitbook版本
	
	gitbook versions:install # 安装最新版gitbook
	gitbook versions:install 2.3.3 # 安装指定版本

	gitbook versions:uninstall # 卸载当前选中版本
	gitbook versions:uninstall 2.3.3 # 卸载指定版本

	gitbook versions:link # 指定当前文件夹使用当前选中版本
	gitbook versions:link 2.3.3 # 指定当前文件夹使用指定版本
	gitbook versions:link path # 指定path使用指定版本

	gitbook -v 2.3.3 # 指定当前使用哪个版本的gitbook
	gitbook --gitbook 2.3.3 # 同上

### gitbook常用命令
	
	$ gitbook init # 初始化一个仓库

	$ gitbook install # 安装插件

	$ gitbook serve [book] # 本地预览
	$ gitbook serve --port 8001 # 指定端口

	$ gitbook build repository PATH # 输出一个静态网站

	$ gitbook pdf book pdf # 生成pdf文件

	$ gitbook help # 查看帮助

**顺便吐槽一下gitbook命令设计是有问题，两个不同的命令耦合在了一起。**

## 图书项目结构
README.md和SUMMARY.md是Gitbook项目必备的两个文件，也就是一本最简单的GitBook也必须含有这两个文件，它们在一本Gitbook中具有不同的用处。

### README.md
这个文件相当于一本Gitbook的简介。

### SUMMARY.md
这个文件是一本书的目录结构，使用Markdown语法，一个简单的例子如下所示。

	# Summary

	* [Part I](part1/README.md)
	    * [Writing is nice](part1/writing.md)
	    * [GitBook is nice](part1/gitbook.md)
	* [Part II](part2/README.md)
	    * [We love feedback](part2/feedback_please.md)
	    * [Better tools for authors](part2/better_tools.md)

更多信息请看[这里](https://help.gitbook.com/format/chapters.html)。

### book.json
自从GitBook 2.0.0开始支持自定义简介文件，在book.json中定义，这样README.md就可以用作项目的简介。

	{
	    "structure": {
	        "readme": "myIntro.md"
	    }
	}

更多信息请看[这里](https://help.gitbook.com/format/introduction.html)。

book.json还有自定义更多的信息，比如网页的title，description等，全部可配置信息请查看[这里](https://help.gitbook.com/format/configuration.html)。

## 发布
使用gitbook可以很方便的发布到很多平台下面举几个常用的例子。

### 发布到GitHub
源代码保存到master分支，build出来的上传到gh-pages分支，就这么简单的搞定了。如果你还不会使用git和github，那么不妨读读我的另一篇文章《[我的git笔记](http://yanhaijing.com/git/2014/11/01/my-git-note)》。

### 发布PDF
这里已windows平台为例子，需要先安装[calibre@2.38.0](http://calibre-ebook.com/)（其实只是需要ebook-convert这个工具），安装好后将其安装目录配置到PATH。

然后就可以使用下面的命令生成pdf了。

	$ gitbook pdf . ../temp.pdf # 将当前目录，生成到父目录下的temp.pdf

### 发布到GitBook
还没想好，想好了再写。

## 总结
关于[GitBook][GitBook]的更多资料可查看官网的[帮助文档](https://help.gitbook.com)，哪里的介绍比较全面，也会保持时时更新。

我把这些配置整理了个[仓库](https://github.com/yanhaijing/gitbook-boilerplate)，可以开箱即用，最重要的是添加了对docx格式的支持，我的[青丝集](http://yanhaijing.com/spring/)就是用的这个模版，墙裂推荐！

> [gitbook-boilerplate](https://github.com/yanhaijing/gitbook-boilerplate) —— 一个基于gitbook快速写电子书的模版，支持html、pdf、**docx**、epub、mobi

## 参考资料
- [Gitbook 使用入门](http://gitbook-zh.wanqingwong.com/)

[GitBook]: https://www.gitbook.com




