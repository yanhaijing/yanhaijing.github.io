---
layout: post
title: 一个Mac小白的自我修养
category : mac
tagline: "原创"
tags : [mac]
keywords: [mac, note]
description: 一个前端的mac笔记
--- 
{% include JB/setup %}

作为一个前端，坚守了9年的windows平台，也是惭愧，但主要还是因为穷，最近终于换上了mac，但却是各种不习惯，各种折腾，本文记录下自己遇到的问题和解决办法，希望能够帮助mac新同学们

## Mac编年史
一直理不清mac的历史，下面简单总结下，最开始的苹果电脑叫做Apple，比如Apple I，Apple II，其操作系统叫做System，大概从1984-1997

- System1.0 - 5.0
- System6.0 彩色
- System7.0
- System7.5
- System7.6

后来苹果推出新的Mac电脑，Mac OS系统诞生了
- Mac OS 8
- Mac OS 8.5
- Mac OS 9

苹果将Mac OS10改名为OS X，并给每个版本命名一个大型猫科动物

| 系统            | 代号              | 时间         |
| ------------- | --------------- | ---------- |
| Mac OS X 10.0 | 猎豹 Cheetah      | 2001.3.24  |
| Mac OS X 10.1 | 美洲狮 Puma        | 2001.9.25  |
| Mac OS X 10.2 | 美洲虎 Jaguar      | 2002.8.24  |
| Mac OS X 10.3 | 黑豹 Panther      | 2003.10.24 |
| Mac OS X 10.4 | 虎 Tiger         | 2005.4.29  |
| Mac OS X 10.5 | 花豹 Leopard      | 2007.10.26 |
| Mac OS X 10.6 | 雪豹 Snow Leopard | 2008.6.9   |
| Mac OS X 10.7 | 狮子 Lion         | 2011.6.7   |

苹果为了整合iphone和mac将Mac OS X改为名OS X，猫科动物也快用完了，10.8以后就改用地名了。。。

| 系统         | 代号               | 时间        |
| ---------- | ---------------- | --------- |
| OS X 10.8  | 山狮 Mountain Lion | 2012.2.16 |
| OS X 10.9  | 巨浪 Mavericks     | 2013.6.10 |
| OS X 10.10 | 优胜美地 Yosemite    | 2014.6.3  |
| OS X 10.11 | El Capitan       | 2015      |

看起来整合iphone和mac的计划失败了，苹果将mac的系统改名为macOS

| 系统          | 代号          | 时间        |
| ----------- | ----------- | --------- |
| macOS 10.12 | Sierra      | 2016.6.14 |
| macOS 10.13 | High Sierra | 2017.6.5  |

## Mac基础

初次接触mac会很不习惯，开始菜单呢？桌面上怎么没有软件？怎么安装软件？别慌，试着忘掉windows中的概念，先来了解下mac中的功能

### Dock

Dock是码头的意思，Dock位于屏幕的底部，打开的app会在上面显示，类似windows底部的任务栏，可以把常用app设置为在Dock中常驻，这样非常方便

### Launchpad

windows中会在桌面上放置软件的快捷方式，非常方便，mac类似的功能就是Launchpad，打开Launchpad会看到所有的安装的软件，顶部的搜索框可以用来搜索app，非常方便

### Spotlight

Spotlight是聚光灯的意思，可以快速找到电脑上的软件和文件，这是一个神器，大概相当于windows上的开始菜单搜索和文件全局搜索，通过commond+空格键打开，如果记得app的名字，通过这个打开app会比Launchpad快很多，Spotlight开可以用来搜索文件，只要记得文件名字就行

### Finder

mac下没有windows下的文件管理器，类似的功能是Finder，但是功能比windows弱很多，Finder的本意是访问并达到，而不是文件管理

打开Finder，哎呦我去C盘，D盘，E盘哪去了？嗯mac下就一个磁盘，那以前D盘放软件，E盘放学习资料，F盘放娱乐资料的习惯怎么破？你可以通过目录来解决，系统默认帮你建好了一些目录，比如：

- 图片
- 文稿
- 下载
- 。。。

那重装系统是安装到C盘，不会覆盖其他盘文件怎么破？这个我还没研究明白o(╯□╰)o据说mac不用重装系统。。。

Finder中选中文件回车是修改文件名，如果想预览文件，可以按空格键，如果想打开文件可以commond+o，这点和windows很不一样

Finder默认的设置非常难用，需要进行一些自定义设置才能好用点，如下：

- 新标签页打开文件，默认是新窗口
- 左侧显示内容太少，根本不够用
- 搜索时搜索当前目录，默认是全局搜索
- 显示状态栏，显示路径栏，显示预览，默认全都不显示

## 软件系统



## 命令行

## 常用软件

下面整理下自己常用的软件

- draw.io 跨平台的viso，主要用来画一些流程图，线框图，结构图
- typora 所见即所得的md工具，一用就会爱上
- cheatsheet 一键查看当前工具的快捷键神器，再也不怕忘记快捷键了
- Charles mac下的fiddler，用来抓取http请求
- Foxit Reader 一款pdf阅读器，跨平台，免费的
- iZip Unarchiver 用来在mac下接呀rar压缩包
- LICEcap 用来录制屏幕gif图
- Read CHM 用来阅读chm文件
- SwitchHosts! 用来管理host
- VirtualBox 虚拟机软件，跨平台，用来安装windows和linux

## 总结

最后推荐大家阅读池建强老师的《[MacTalk·人生元编程](https://amazon.cn/gp/product/B00ID5UV30/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=yanhaijing-23&creative=3200&linkCode=as2&creativeASIN=B00ID5UV30&linkId=2058fdf9c81d13e245a8e85ab48b022c)》，书中介绍了很多mac知识和mac技巧，并且包含了很多受益匪浅的人生哲理，非常值得阅读