---
layout: post
title: 我的svn笔记
category : tool
tagline: "原创"
tags : [svn, tool]
keywords: [svn, tool]
description: 本文主要记录些svn的常用命令，以备自己日后使用。
---
{% include JB/setup %}

最开始接触的版本控制系统就是svn，但因为一直找不到好的托管系统，google code实在太慢（目前已死），后来偶尔接触了github，便踏入了git的大门，从而一发不可收拾。

由于没怎么用过，并且身为git粉，又对svn嗤之以鼻，所以一直停留在只会用小乌龟，ci和co的水平，最近我痛定思痛决定好好研究下svn，及其命令行工具。

本文主要记录些svn的常用命令，以备自己日后使用。

![]({{BLOG_IMG}}234.png)

## 初始化
如何开始使用svn呢，可以checkout一个已有项目。

检出已有项目：
	
	svn checkout|co URL # 检出项目到当前目录
	svn checkout|co URL PATH # 检出项目到已有目录
	svn checkout|co –r 3 # 检出制定版本

## 常用命令
	
	svn status|st # 查看当前目录状态
	svn status|st PATH # 查看指定目录状态

	svn update|up # 更新
	svn update|up -r 3 # 更新到指定版本
	svn update PATH # 更新指定的路径

	svn add PATH # 添加指定路径 纳入版本控制

	svn commit|ci -m "commit" # 提交
	
	svn diff # 查看当前目录的变化
	svn diff PATH # 查看指定目录的变化
	svn diff -r 3 # 查看当前目录和指定版本的变化
	svn diff -r 3:4 # 查看当前目录版本 3和版本4的变化

	svn revert PATH # 取消指定目录的修改
	
	svn blame TARGET # 显示某个已受控文件的每一行的最后修改版本和作者
	
	svn info # 查看当前目录的svn信息
	
	svn log # 查看当前目录的历史信息
	svn log -v # 显示详细历史信息
	svn log PATH # 查看指定目录历史信息

## 树冲突
主干上删除了一个文件，而你又对这个文件做了修改；主干上对文件做了修改，而你删除了这个文件的时候，都会发生树冲突

树冲突并不可怕，当发生树冲突时有两种解决办法：

其一，保留你的修改，远程的修改不算数

	svn resolved –accept working path

其二，保留远程的修改，用下面的命令删除文件后在提交就ok了

	svn delete path 

## 参考资料
- [那些常用的svn和git命令](http://w3cboy.com/post/2015/09/those-common-svn-and-git-commands/#0-tsina-1-96627-397232819ff9a47a7b7e80a40613cfe1)




