---
layout: post
title: 模块化的一些感悟
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [javascript]
description: 其中对模块的介绍感觉很经典，加上一点自己的见解，总结分享一下
---
{% include JB/setup %}

最近看到尼古拉斯大神的一篇分享——[Scalable Javascript Application Architecture](https://www.slideshare.net/nzakas/scalable-javascript-application-architecture)，里面基于YUI讲了构建web应用的一些思想，现在看有些已经过时了，但思想永不过时，强烈建议读一读

其中对模块的介绍感觉很经典，加上一点自己的见解，总结分享一下

## 模块新说
前端模块由HTML CSS JS三部分组成，模块应该具备包含自身的全部功能，不依赖外部环境

低耦合可以让模块互不影响，随意插拔

模块很像拼图的碎片，拼图碎片不需要知道完整的图片长什么样，仅仅保证自己能够被拼接即可

程序的成功创建，其实就是让每个模块按部就班

模块像小孩子一样，需要严格的一组规则约束，来保证避免问题

## 模块心法
我在之前写过一篇[图解7种耦合关系 ](http://yanhaijing.com/program/2016/09/01/about-coupling/)，里面讲解了不同的耦合程度；对于模块我们希望做到高内聚，低耦合

下面是高内聚的心法

- 仅处理自己
  - 仅调用自己的方法
  - 不能访问外部dom节点
  - 不能访问全局变量

- 仅发出消息

- 不要制造垃圾
  - 不能创建全局变量

- 不要和陌生人说话
  - 不要直接和其他模块通信

## 总结
好的模块应该做到对外界无感知，仅接收数据，暴漏API和回调
