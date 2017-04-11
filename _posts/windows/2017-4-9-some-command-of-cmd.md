---
layout: post
title: windows常用网络命令
category : windows
tagline: "原创"
tags : [windows]
keywords: [cmd, windows]
description: 我常用的windows网络命令总结
--- 
{% include JB/setup %}

作为没用过mac的温到死(windows)狗，每次都要百度也是够了，本文总结下自己常用的网络命令

- ping
- ipconfig
- netstat
- route
- tracert
- arp

## ping
测试本机与指定机器是否联通

    $ ping jingyan.baidu.com 
    $ ping -t jingyan.baidu.com # ping 1000万次
    $ ping -n 10 jingyan.baidu.com # ping 指定次数

## ipconfig
网卡相关操作

    $ ipconfig # 查看网卡信息，如ip地址

    $ ipconfig /displaydns # 查看dns缓存内容
    $ ipconfig /flushdns # 清除dns缓存

## netstat
了解整体网络情况及连接情况

    $ netstat # 实时查看
    $ netstat -n # 数组形式显示，ip地址代替域名
    $ netstat -r # 显示路由表

## route
查看和配置路由

    $ route print # 显示路由表

## tracert
跟踪路由信息

    $ tracert jingyan.baidu.com
    $ tracert -h 10 jingyan.baidu.com # 指定最大跳跃次数

## arp
查看本地计算机或另一台计算机的ARP高速缓存中的内容

    $ arp -a # 查看arp缓冲内容

## 总结
本文总结了自己常用的网络命令，以后再也不用到处去找百度了O(∩_∩)O~~
