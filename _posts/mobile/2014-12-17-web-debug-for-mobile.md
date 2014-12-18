---
layout: post
title: 如何调试移动端网页
category : mobile
tagline: "原创"
tags : [mobile]
keywords: [web,mobile,debug]
description: 本文将会介绍如何在真机上调试移动端的页面。
---
{% include JB/setup %}

本文将会介绍如何在真机上调试移动端的页面，和之前的《[如何在电脑上测试手机网站](http://yanhaijing.com/web/2014/02/21/how-to-test-mobile-websit-on-pc/)》的不同之处在于真机环境。

本会介绍的方法如下：

- UC浏览器开发版
- winner
- chrome 远程调试
- firefox 远程调试
- opera 远程调试

##UC浏览器开发版

感谢UC造出这么好用的浏览器，同时注重开发者，远好于国内其他厂商，UC浏览器有一个开发版非常赞。

- [UC浏览器开发版网址](http://www.uc.cn/business/developer/)
- [下载地址](http://wap.uc.cn/index.php?action=PackageDown&do=ByPfid&product=UCBrowser&pfid=145&lang=zh-cn&bid=33533&direct=true&from=dev-slp-dir-pc)

UC开发版的网站上介绍的很清楚，也有很详细的文档，这里就不再赘述，简单记录下WIFI的调试方法，保证pc和手机在同一个网段，在PC上打开Chrome或Safari，在地址栏输入：**手机IP + :9998**，在手机端会弹出确认按钮，点击确认后，就可在pc上看到效果了，如此简单。

##Firefox浏览器

火狐的调试方法具体可以看[这里](https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android)。

需要如下几个准备工作：

- PC Firefox 15+
- Android Firefox 15+
- 一根数据线
- adb驱动

上面三个就不多解释了，adb驱动我们安装个手机管家什么的，都可以自动安装上，打开命令行中断，输入adb命令，如果看到长长的输出，那么恭喜你，你已经安装了adb驱动了。

输入如下命令可以查看链接的设备。

	adb devices

![]({{BLOG_IMG}}152.png)

接下来我们需要用adb在本地开一个接口来做代理接受数据：

	adb forward tcp:6000 tcp:6000

接下来就是打开手机和电脑的远程调试开惯了，默认都是关闭的。

手机端Firefox点击菜单栏的”设置”->”开发者工具”，勾选”远程调试”。

![]({{BLOG_IMG}}153.png)

PC端Firefox打开about:config，设置devtools.debugger.remote-enabled为True。或者打开开发者工具，找到设置面板，打开里面的远程调试。

![]({{BLOG_IMG}}154.png)

接下来找到桌面端Firefox-菜单-工具-Web开发者-远程链接。保证端口号和上面开启的端口号一致就好了。

![]({{BLOG_IMG}}155.png)

如果你没有其他特别的远程调试要求，只需要使用默认值。按“确定”。手机端会弹出一个确定按钮，点击确定就可以在电脑上调试手机上的网页了。

##weinre

网上关于winner的介绍大多是基于java，很繁琐，其实基于node+npm会简单很多，感谢node，感谢npm。

- [weinre在npm](https://www.npmjs.com/package/weinre)
- [weinre官网](http://people.apache.org/~pmuellr/weinre/)
- [weinre文档](http://people.apache.org/~pmuellr/weinre/docs/latest/)

打开命令行输入如下命令安装npm
	
	npm -g install weinre #win
	sudo npm -g install weinre # linux

安装成功了后，在命令行是输入

	weinre --httpPort 8081 --boundHost -all-

会开到如下的提示，上面的httpPort是指定接口，省略的话会默认8080，boundHost指定为all，才能在远程设备访问（手机）上访问。

![]({{BLOG_IMG}}147.png)

在浏览器打开 http://localhost:8080，会看到weinre的介绍信息如下：

![]({{BLOG_IMG}}148.png)

点击上图中的1会进入相应的调试页面，现在还是空的，后面会有图，点击2会进入weinre的文档。

在需要调试的页面添加如下js，这个js是打开的weinre页面中的js代码，就可在在pc端调试手机端页面。

	<script src="http://localhost:8081/target/target-script-min.js#anonymous"></script>

假设电脑ip是192.168.0.100，服务器的端口8080，需要将上面代码中的localhost替换为电脑ip，然后在手机上访问电脑的上的页面，就可以通过weinre调试了。

![]({{BLOG_IMG}}149.gif)

##总结

后面的一些方法还没有实验过，只是听说说以就不写出来了，先挖个坑吧，以后慢慢填。