---
layout: post
title: 列举webpack的几大特色
category : webpack
tagline: "译"
tags : [webpack]
keywords: [webpack]
description: webpack]是一款优秀的静态资源打包工具，本文将会介绍其一些特色
---
{% include JB/setup %}

[webpack][webpack]是一款优秀的静态资源打包工具，本文将会介绍其一些特色。

## 插件
[webpack][webpack]有丰富的插件接口。内部插件使用这些接口完成了大部分特色。这些接口使webpack非常灵活。

## 性能
[webpack][webpack]使用异步I/O，并且有多级缓存机制。这让webpack速度非常快，和让人难以置信的增量编译速度。

## 加载器
[webpack]通过加载器机制支持文件的预处理。webpack支持打包任何静态资源，而不仅仅是javascript。你也可以很容易的编写自己的插件。

## 支持
[webpack][webpack]支持[ADM](http://webpack.github.io/docs/amd.html)和[CommonJs](http://webpack.github.io/docs/commonjs.html)模块风格。webpack对代码执行聪明的静态语法分析，甚至有一个评估引擎用来评估简单表达式。这使webpack对大部分现存的库的能很好的支持。

## 代码分割（模块）
webpack支持代码[分割](http://webpack.github.io/docs/code-splitting.html)成块（模块），块可按需加载，减少初始加载时间。

## 优化
webpack会进行很多[优化](http://webpack.github.io/docs/optimization.html)工作，来减少文件的大小，对[访问缓存](http://webpack.github.io/docs/long-term-caching.html)也有很好的支持——哈希值。

## 开发工具
webpack支持SourceUrls和SourceMaps，可用于简单的调试。也可监控文件，通过中间件和服务器实现自动重载。

## 多平台
webpack是为web而生的，但也支持[webworks](https://github.com/webpack/worker-loader)和node.js。

## 更多资料
- [Webpack 入门指迷](http://segmentfault.com/a/1190000002551952)
- [Webpack 怎么用](http://segmentfault.com/a/1190000002552008)

[webpack]: http://webpack.github.io/