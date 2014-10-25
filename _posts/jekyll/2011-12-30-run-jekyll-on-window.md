---
layout: post
title: 在Windows系统配置Jekyll
category : jekyll
tagline: "原创"
tags : [jekyll]
keywords: [jekyll]
description: Jekyll 是一个简单的网站静态页面生成工具。由于是用Ruby语音编写的，所以在Windows系统上配置起来还是稍微有点繁琐的。具体过程如下：
---
{% include JB/setup %}

[Jekyll](http://jekyllrb.com/) 是一个简单的网站静态页面生成工具。由于是用Ruby语音编写的，所以在Windows系统上配置起来还是稍微有点繁琐的。具体过程如下：

1. 安装Ruby：在Windows系统上当然使用rubyinstaller了， [猛击我下载](http://rubyinstaller.org/downloads/) （笔者使用的版本是：Ruby 1.9.3-p545）
2. 安装Ruby DevKit： [猛击我下载](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)
3. 安装Jekyll
4. 安装Python： [猛击我下载](http://portablepython.com/wiki/PortablePython3.2.1.1)
5. 安装Pygments

以下是详细步骤：

1.从rubyinstaller下载安装包并安装到某个磁盘中，比如：E:\Ruby192，在安装界面把所有的选项都勾选上； 

![]({{BLOG_IMG}}140.png)

2.把下载的DevKit解压到某个目录，比如 E:\devkit , 在该目录中运行如下命令：

	> ruby dk.rb init

来生成一个config.xml配置文件，该配置文件中包含了前面的Ruby安装目录 （E:\Ruby192） 
然后运行如下命令

	> ruby dk.rb install

3.然后运行如下命令安装Jekyll：

	> gem install jekyll

现在可以开始使用jekyll了。如果您还需要使用代码高亮工具，则需要继续安装Pygments ，过程如下：

4.安装下载的Portable Python（笔者使用的是PortablePython_3.2.1.1.exe），安装目录为E:\Portable_Python_3.2.1.1 

然后把E:\Portable_Python_3.2.1.1\App\Scripts和E:\Portable_Python_3.2.1.1\App目录分别添加到系统Path环境变量中

5.把下载的distribute-0.6.49.tar.gz解压的某个目录(比如：E:\distribute-0.6.28), [猛击我下载](http://pypi.python.org/pypi/distribute#downloads)

在该目录中运行如下命令：

	> python distribute_setup.py

6.然后通过如下命令来安装pygments：

	> easy_install Pygments

最后需要修改2处Bug： 

1. Pygmentize中的Bug：修改如下文件
E:\Ruby192\lib\ruby\gems\1.9.1\gems\albino-1.3.3\lib\albino.rb 
修改的内容参考 [这里](https://gist.github.com/1185645) 

2. 由于中文XP系统使用的GBK编码，GBK编码导致jekyll处理的bug，修改E:\Ruby192\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\convertible.rb这个文件，修改方式 [参考这里](https://github.com/imathis/octopress/issues/232#issuecomment-2480736)

然后就可以使用Jekyll了，在生成静态页面的时候 可能还会出现 GBK字符不能编码的问题，但是不影响生成网页了。

##更新

笔者最近安装了最新版的jekyll，已经不存在需要修复两处bug的问题了，安装到第六步就ok了，上面提到的gbk编码问题，可用如下方法解决，在cmd窗口输入如下命令，临时改变编码。

	> chcp 65001

##参考资料

- [Running Jekyll on Windows](http://www.madhur.co.in/blog/2011/09/01/runningjekyllwindows.html)
- [Jekyll 本地调试之若干问题](http://chxt6896.github.io/blog/2012/02/13/blog-jekyll-native.html)
- [搭建一个免费的，无限流量的Blog](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)
- [Markdown 语法说明 (简体中文版)](http://wowubuntu.com/markdown/)
- [jekyll中文站](http://jekyllcn.com/)
- [markdown在线编辑器](http://markable.in/editor/)
- [markdownpad 2](http://markdownpad.com/)
 