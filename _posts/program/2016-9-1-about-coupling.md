---
layout: post
title: 图解7种耦合关系
category : program
tagline: "原创"
tags : [program]
keywords: [program, 耦合, 内聚]
description: 本文将用图文详细讲解七种耦合的不同之处
---
{% include JB/setup %}

之前组内同学问我耦合的关系，我没给对方讲清楚，今天借这个机会来深入讲讲模块之间的耦合关系这个事情。

本文将用图文详细讲解七种耦合的不同之处。


## 高内聚与低耦合
高内聚与低耦合是每个软件开发者追求的目标，那么内聚和耦合分别是什么意思呢？

![]({{BLOG_IMG}}416.png)

> 内聚是从功能角度来度量模块内的联系，一个好的内聚模块应当恰好做一件事。它描述的是模块内的功能联系。

> 耦合是软件结构中各模块之间相互连接的一种度量，耦合强弱取决于模块间接口的复杂程度、进入或访问一个模块的点以及通过接口的数据。

## 耦合
不同模块之间的关系就是耦合，根据耦合程度可以分为7种，耦合度依次变低。

- 内容耦合
- 公共耦合
- 外部耦合
- 控制耦合
- 标记耦合
- 数据耦合
- 非直接耦合

下面我们来说说每种耦合是什么，开始之前先来说下要实现的功能。m1和m2是两个独立的模块，其中m2种会显示m1的输入，m1会显示m2的输入。

![]({{BLOG_IMG}}417.png)

很显然，m1和m2两个模块之间会有一些联系（耦合），你也可以想想如何实现这个功能，下面用7种不同的方式来实现这个功能。

**注：**项目的代码我放到了[github](https://github.com/yanhaijing/coupling)，项目的demo，可以在[这里查看](http://yanhaijing.com/coupling/)。

### 内容耦合
内容耦合是最紧的耦合程度，一个模块直接访问另一模块的内容，则称这两个模块为内容耦合。

![]({{BLOG_IMG}}418.png)

为了实现功能，我们将m1的输入放到m2.m1input上，将m2的输入放到m1.m2input上。
    
    // m1.js
    root.m2.m1input = this.value;
    m2.update();

    // m2.js
    root.m1.m2input = this.value;
    m1.update();

**PS:**不知道谁会这么写代码，除了我为了做演示之外。。。

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo1)和[demo](http://yanhaijing.com/coupling/demo1/demo.html)。

### 公共耦合
一组模块都访问同一个全局数据结构，则称之为公共耦合。

![]({{BLOG_IMG}}419.png)

在这种case中，m1和m2将自己的输入放到全局的data上。
    
    // m1.js
    root.data.m1input = this.value;
    m2.update();
    
    // m2.js
    root.data.m2input = this.value;
    m1.update();

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo2)和[demo](http://yanhaijing.com/coupling/demo2/demo.html)。

### 外部耦合
一组模块都访问同一全局简单变量，而且不通过参数表传递该全局变量的信息，则称之为外部耦合。外部耦合和公共耦合很像，区别就是一个是简单变量，一个是复杂数据结构。

![]({{BLOG_IMG}}420.png)

在这种case中，m1和m2都将自己的输入放到全局上。
    
    // m1.js
    root.m1input = this.value;
    m2.update();
    
    // m2.js
    root.m2input = this.value;
    m1.update();

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo3)和[demo](http://yanhaijing.com/coupling/demo3/demo.html)。

### 控制耦合
模块之间传递的不是数据信息，而是控制信息例如标志、开关量等，一个模块控制了另一个模块的功能。

从控制耦合开始，模块的数据就放在自己内部了，不同模块之间通过接口互相调用。

![]({{BLOG_IMG}}421.png)

在这个case中，得增加一个需求，就是当m1的输入为空时，隐藏m2的显示信息。
    
    // m1.js
    root.m1input = this.value;
    m2.update();

    m2.toggle(!!this.value); // 传递flag

上面的代码中m1直接控制了m2的显示和隐藏。

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo4)和[demo](http://yanhaijing.com/coupling/demo4/demo.html)。

### 标记耦合
调用模块和被调用模块之间传递数据结构而不是简单数据，同时也称作特征耦合。

![]({{BLOG_IMG}}422.png)

在这个case中，m1传给m2的是一个对象。
    
    // m1.js
    me.m1input = this.value;
    m2.update(me); // 传递引用
    
    // m2.js
    me.m2input = this.value;
    m1.update(me);

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo5)和[demo](http://yanhaijing.com/coupling/demo5/demo.html)。

### 数据耦合
调用模块和被调用模块之间只传递简单的数据项参数。相当于高级语言中的值传递。

![]({{BLOG_IMG}}423.png)

在这个case中，m1传给m2的是一个简单数据结构。
    
    // m1.js
    me.m1input = this.value;
    m2.update(me.m1input); // 传递值
    
    // m2.js
    me.m2input = this.value;
    m1.update(me.m2input);

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo6)和[demo](http://yanhaijing.com/coupling/demo6/demo.html)。

### 非直接耦合
两个模块之间没有直接关系，它们之间的联系完全是通过主模块的控制和调用来实现的。耦合度最弱，模块独立性最强。

子模块无需知道对方的存在，子模块之间的联系，全部变成子模块和主模块之间的联系。

![]({{BLOG_IMG}}424.png)

在这个case种，增加一个index.js作为主模块。

    // index.js
    var m1 = root.m1;
    var m2 = root.m2;

    m1.init(function (str) {
        m2.update(str);
    });

    m2.init(function (str) {
        m1.update(str);
    });

    // m1.js
    me.m1input = this.value;
    inputcb(me.m1input); // inputcb是回调函数

    // m2.js
    me.m2input = this.value;
    inputcb(me.m2input);

查看[完整代码](https://github.com/yanhaijing/coupling/tree/gh-pages/demo7)和[demo](http://yanhaijing.com/coupling/demo7/demo.html)。

## 内聚
其实关于内聚也分为很多种，如下所示，如果你感兴趣可以自己研究研究，我们下次再来分享内聚的问题。

- 偶然内聚
- 逻辑内聚
- 时间内聚
- 通信内聚
- 顺序内聚
- 功能内聚

## 总结
希望你看完上面的文章，搞懂了耦合的种类，也希望你以后能使用非直接耦合这种方式来写代码，祝好。
