---
layout: post
title: 我的npm笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [npm, 笔记]
description: 本文记录一些npm的使用技巧，主要包括自己常用的命令，做个备忘。
---
{% include JB/setup %}

本文记录一些npm的使用技巧，主要包括自己常用的命令，做个备忘。

## NPM 是什么？
NPM是NodeJS的包管理工具，现在已经进一步发展，致力于为很多其他平台提供包管理工具，其核心思想就是让包的安装更简洁，并自动处理依赖的问题。

它的主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等。

- [npm官网](https://npmjs.org/)
- [npm官方文档](https://npmjs.org/doc/README.html)

如果上面的服务挂了（原因你懂得），可以访问下面的链接备用：

- [淘宝 NPM 镜像](http://npm.taobao.org/)
- [百度(内部)NPM](http://npm.baidu.com/)

## 配置代理
npm的服务有时会挂掉，就算不挂掉，速度也是龟速的，这需要我们设置下代理：

npm默认从npm上下载安装包资源：

	https://registry.npmjs.org/

安装时临时指定代理：

	npm install data_js --registry=https://registry.npm.taobao.org

全局配置：

	npm config set registry https://registry.npm.taobao.org

	npm config list ## 查看刚才的配置是否生效

**注意：** 如果你要发布npm包，你需要在改为npm的官方网址。

如果你使用的是linux也可以使用别名的方式：

	alias cnpm="npm --registry=https://registry.npm.taobao.org \
		--cache=$HOME/.npm/.cache/cnpm \
		--disturl=https://npm.taobao.org/dist \
		--userconfig=$HOME/.cnpmrc"

或者直接安装[cnpm](http://cnpmjs.org/)。

	npm install -g cnpm
	cnpm install *** # 安装后用cnpm代替npm

## 常用命令
上面配置好代理后，我们就可以任性的玩，下面记录一下常用的命令。

	npm <-h> # 列出帮助信息
	npm -l #列出全部可用命令
	npm -v #列出npm版本号

	npm config set <key> <value> # 设置配置
	npm config delete <key> # 删除配置
	npm config list #查看全部配置

	npm <cmd> -h # 查找可用的命令
	npm help <term> # 查看帮助信息

	npm login #登录
	npm whoami #查看当前用户

	npm publish #发布项目
	npm unpublish <name>[@<version>]#取消发布项目

	npm search pkg # 查看指定包是否存在
	npm install [-g] <pkg>[@<version>] # 安装指定包
	npm uninstall [-g] <pkg>[@<version>] # 卸载指定包
	npm ls# 查看当前目录下安装了那些包
	npm ls <pkg># 查看特定package的信息

	npm root # 查看当前包的安装路径
	npm root -g #查看全局npm安装的路径

## 总结
目前差不多就能用到这么多，以后如果用到更多东西再慢慢更新。
