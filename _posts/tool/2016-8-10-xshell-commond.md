---
layout: post
title: xshell命令集的使用方法
category : tool
tagline: "原创"
tags : [tool]
keywords: [xshell, tool]
description: 今天来说说如何使用xshell的命令集来加快登录线上机器的速度
---
{% include JB/setup %}

最近在学习后端的知识，我一直在用xshell终端，今天来说说如何使用xshell的命令集来加快登录线上机器的速度。

首先打开菜单-工具-快速命令集，会看到如下图所示的窗口

![]({{BLOG_IMG}}400.png)

然后点新建，创建一个新的命令集，比如我已经创建好了一个my，这个可以用来分组命令

新建完后，选中命令集，点击编辑，会弹出如下图所示的窗口

![]({{BLOG_IMG}}401.png)

然后可以点击添加添加，会得到下图所示的窗口

![]({{BLOG_IMG}}402.png)


在最上面的输入框输入命令的名字，我们重点关注发送文本，和执行下面的脚本这两个。

先来说说文本，这个很简单就是发送文本到终端里，可以保存一些复杂文本进来，还可以是密码什么的；可以选择粘贴文本后是否添加回车。

重点说说如何通过执行脚本来方便我们登录线上机器，在本地保存下面的文本内容，保存为.vbs，将其中的机器和密码替换为你对应的机器和密码即可，然后选择添加脚本，然后一路确定就ok了。

    Sub Main
        ' *** Send ***
        xsh.Screen.Send("ssh user@机器")
        xsh.Screen.Send(VbCr)
        ' *** WaitForString ***
        xsh.Screen.WaitForString("password:")
        ' *** Send ***
        xsh.Screen.Send("密码")
        xsh.Screen.Send(VbCr)
    End Sub

这时候我们需要显示快速命令条，默认是不显示的，菜单-查看-快速命令 勾上，这时会在最下面显示命令条，在最右边选择显示你自己的命令集

![]({{BLOG_IMG}}403.png)

就会在命令条看到快速命令了

![]({{BLOG_IMG}}404.png)

然后点击这个按钮就可以快速登录线上机器了，O(∩_∩)O哈哈~

还可以设置一个复制ssh渠道的快捷键，比如我设置的是alt+t，只需两步，就可快速登录线上机器。
