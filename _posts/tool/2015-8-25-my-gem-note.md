---
layout: post
title: 我的gem笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [gem, ruby]
description: 本文将记录一些常用gem命令，以备不时之需（每次都查还烦人）。
---
{% include JB/setup %}

由于写博客要用到jekyll，而jekyll是基于ruby的，而gem是ruby的包管理器，所以我需要用到gem这个工具。

![]({{BLOG_IMG}}237.png)

本文将记录一些常用gem命令，以备不时之需（每次都查还烦人）。

## 更换淘宝镜像
由于国内网络原因（你懂的），导致 rubygems.org 存放在 Amazon S3 上面的资源文件间歇性连接失败。这里要更换默认镜像为[ruby-china的镜像](https://gems.ruby-china.com/)。

	gem sources --remove https://rubygems.org/
	gem sources -a https://gems.ruby-china.com/
	gem sources -l
	*** CURRENT SOURCES ***

	https://gems.ruby-china.com/
	# 请确保只有 https://gems.ruby-china.com/

## 常用命令
	gem -v # 查看RubyGems软件的版本
	
	gem help #显示RubyGem使用帮助
	gem help example #列出RubyGem命令一些使用范例
	
	gem install [gemname] # 安装指定gem包，程序先从本机查找gem包并安装，如果本地没有，则从远程gem安装。
	gem install -l [gemname] # 仅从本机安装gem包
	gem install -r [gemname] # 仅从远程安装gem包
	gem install [gemname] --version=[ver] # 安装指定版本的gem包

	gem uninstall [gemname] # 删除指定的gem包，注意此命令将删除所有已安装的版本
	gem uninstall [gemname] --version=[ver] # 删除某指定版本gem

	gem update --system # 更新升级RubyGems软件自身
	gem update [gemname] #更新所有|指定已安装的gem包

	gem list # 查看本机已安装的所有gem包 #显示RubyGem使用帮助

## 深入阅读
- [Guides](http://guides.rubygems.org/command-reference/)





