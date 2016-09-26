---
layout: post
title: 经验无线步骤页改版总结
category : program
tagline: "原创"
tags : [program]
keywords: [program]
description: 最近对经验无线步骤页进行了改版，今天在组内做了改版总结的分享，本文是这次分享的文字版
---
{% include JB/setup %}

最近对经验无线步骤页进行了改版，今天在组内做了改版总结的分享，本文是这次分享的文字版，大纲如下：

- 简介
- 架构
- 新技术

我之前写过一个经验详情页的改版分享——《[如何重构一个大型历史项目——百度经验改版总结](http://yanhaijing.com/program/2016/04/14/how-to-reconstruct-a-large-historical-project/)》，很多和上次一样的东西这次就没做分享，有兴趣的同学可以看下（移动端或开模拟器）。

## 简介
经验步骤页是经验流量最多的页面，也是最重要的页面之一，[点击这里](http://jingyan.baidu.com/album/fea4511a71963bf7bb912580.html?stepindex=2&stepGroup=E1)查看效果，页面的截图如下：

![]({{BLOG_IMG}}425.png)

页面大体可分为: 最上面的bar、经验头部（听语音）、主题内容等，其中主题内容部分可左右和上下滑动，左右滑动会切换到上一步，下一步，同时会更新经验头部，停止语音播放等。

本次改版总共有两个FE参加，我主要负责页面基础架构，主要逻辑的开发，另一个同学主要负责，最后一页的交互和点击查看大图的功能。这次做的点击查看大图是非常亮点的一个特色，大家有兴趣可以试一下，关于查看大图介绍我等另一位FE写完，再贴到这里。

## 架构

### 一个模块
这次改版需要小流量，新旧版页面需要在线上同时存在一段时间，以前的做法我们都是重新拉一个前端的模块，这次我们是在同一个模块完成的这个工作，新版的内容全部放到了v2路径下。

![]({{BLOG_IMG}}426.png)

一个非常小的点是fis打包的配置，为了能够自动把v2和v1的打包文件区分开我们用到了正则的`?!`技巧，关于正则我也打算写一篇博文《[详解JavaScript正则表达式](http://yanhaijing.com/javascript/2016/09/10/regexp-in-js)》。

    pack: {
        '/static/pkg/step2.css': [
            '/widget/v2/css/base.less',
            /\/widget\/v2\/(?!css\/).*\.less/
        ],
        '/static/pkg/step.css': [
            /\/widget\/(?!v2\/).*\.less/,
            '/widget/**.css'
        ]
    }

### 耦合
关于其中耦合的关系，我在之前一篇博文里面做过介绍了，[点这里](http://yanhaijing.com/program/2016/09/01/about-coupling/)查看。

在我们项目中，还有一种独特的方式，我称其为消息中心，通过消息中心将模块之间的耦合变成了模块与消息中心的耦合。

![]({{BLOG_IMG}}427.png)

这种模式的缺点就是可能会消息爆炸，并且消息的订阅是散落在各个模块的，将来只能对消息扩展，而不能删除消息中的信息。

下面举个栗子来说说消息中心和非直接耦合的区别，假设模块A B C D E F 如下图所示，线条代表模块之间的关系。

![]({{BLOG_IMG}}428.png)

消息中心模式的结构图如下所示，A与B之间的关系解耦成了A与消息中心的关系，但A还是要知道B的消息名称，我称其为消息名耦合，也就是说A对B还是有感知的。

![]({{BLOG_IMG}}429.png)

主模块模式的结构图如下所示，A与B之间的关系解耦合成A与主模块之间的关系，A完全不知道B的存在，消息中心模式中的消息名耦合被放到了主模块中。

![]({{BLOG_IMG}}430.png)

### 新旧版架构对比
旧版的架构图如下所示，其使用了消息和主模块两种模式，不够纯粹，并且其slider模块太过冗余，揉进了很多其他模块的逻辑。

![]({{BLOG_IMG}}431.png)

在新版的架构中，我们只是用了主模块模式，子模块之前完全没有直接关系。

![]({{BLOG_IMG}}432.png)

我们使用es6的class，实现了继承，继承关系如下所示。

![]({{BLOG_IMG}}433.png)

### F.context
我们项目中有一个全局的数据中心，叫做F.context，全局数据中心对应上面耦合中的数据耦合，术语耦合比较紧的一种模块，我原来对其有偏见，重新认识一下F.context，明确一下F.context应该放一下全局性的数据，并且一次赋值，尽量不要对其值进行修改。

特别注意用F.context来代替传参，我们项目中有很多这种反模式。

![]({{BLOG_IMG}}434.png)

## 新技术
这次改版中我们尝试了引入了三个新技术，包括ES6，postcss，flex，下面分别来介绍介绍这几个技术。

### ES6
在之前我们都是在活动页面尝试使用ES6，在积累了经验后我们决定在这个页面尝试使用。

如果你对ES6不了解，可以查看我之前写的一系列文章：

- [快来使用ECMAScript 2015吧](http://yanhaijing.com/javascript/2015/09/04/try-es2015/)
- [ECMAScript 2015 简易教程](http://yanhaijing.com/javascript/2015/09/11/learn-es2015/)
- [快来使用ES2015的Promise吧](http://yanhaijing.com/javascript/2015/09/16/es6-promise/)
- [ES2015实战——面向未来编程](http://yanhaijing.com/javascript/2016/04/27/es2015-practice/)

关于ES6其实有[一系列功能](http://espadrine.github.io/New-In-A-Spec/es2015/)，但这次我们主要用到了三个：module, class, let。

我们的ES6最后都会使用bable编译成ES5来执行，所以我们代码的兼容性就是ES5的兼容，而ES5在wap端[兼容性](http://kangax.github.io/compat-table/es5/)非常好。

![]({{BLOG_IMG}}435.png)

后续我准备写一篇如何用ES5来代替ES6的博文《[如何做到ES6 free](/program/2016/09/10/es6-free/)》。

下面上一段步骤页滑动模块的js

    import $ from 'common:widget/lib/gmu/zepto/zepto.js';
    import {UIBase} from 'common:widget/js/ui/base/base.es';
    var ec = require('common:widget/js/util/event/event.es').event;

    class Slider extends UIBase {
        constructor(index) {
            super();
            this.bindEvent();
        }
        bindEvent() {}
        move(x) {}
        update() {}
        moveTo(index, anim) {}
    }

    export {Slider};

### postcss
[postcss](http://postcss.org/)是最近出来的新东西，学名是css后处理器，也就是处理标准化的css，和sass等预处理器的区别需要区分开，sass生成css，postcss处理标准css。

![]({{BLOG_IMG}}436.png)

目前已经有很多大公司在用，包括google，Facebook等。

打开postcss的官网，可以看到介绍了4个特色——添加前缀，css变量，命名空间，语法验证。

post是一套css的语法解析工具，可以通过插件来实现不同的功能，其插件可以分为下面这些分类。

![]({{BLOG_IMG}}437.png)

我们主要使用的是添加前缀功能，在fis中实现这个功能主要有两个插件，`fis-preprocessor-autoprefixer`，`fis-postprocessor-autoprefixer`，其中推荐使用前一个，这是fis官方维护的插件，在fis中有两个节点可以插入后处理器的功能；fis的编程流程如下，分为单文件编译和打包两个过程。

![]({{BLOG_IMG}}438.png)

[autoprefixer](https://github.com/postcss/autoprefixer)有很多配置项

- Browsers 浏览器列表 默认 > 1%, last 2 versions, Firefox ESR
- Cascade 是否级联 默认 true
- Add 是否添加前缀 默认true
- Remove 是否移除无用的前缀 默认true
- Supports 是否适配 @support 默认true
- Flexbox 是否支持flex 默认true
- Grid 是否支持grid 默认true
- Stats 自定义地区浏览器

其中最主要的的配置项是第一个，其详细配置项在[这里](https://github.com/ai/browserslist)，这里有一个[在线版](http://browserl.ist/)，比较直观。

我们的配置数据如下：`'Android >= 4', 'iOS >= 6', 'and_uc > 9'`，兼容的浏览器顾名思义。

postcss支持的css3属性列表在[这里](https://github.com/postcss/autoprefixer/wiki/support-list)，我们整理出一个常用的子集如下所示：

![]({{BLOG_IMG}}439.png)

**注意：**需要注意的就是postcss并不能解决浏览器不兼容css的问题，而是可以帮我们磨平前缀，所以使用新的css3属性前，还是要先看[caniuse](http://caniuse.com/)。在下面的例子中，如果要兼容安卓4.3以下，就不能使用`calc`。

![]({{BLOG_IMG}}440.png)

### flex
在这个项目中我们大规模使用了flex，其中也踩了不少坑，关于flex我打算在另一篇博文里详细介绍——《[移动端flex布局实战经验](http://yanhaijing.com/css/2016/08/21/flex-practice-on-mobile/)》。

## 总结
最后感谢大家浏览本文，如果你有任何疑问可以在下面留言和我交流。
