---
layout: post
title: 详解函数参数和arguments的区别
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [javascript]
description: 本文将用代码来说明函数参数和arguments的区别
---
{% include JB/setup %}

最近我在看《你不知道的JavaScript》中卷，在这里我也强烈建议你也读一读这本书，其中提到了一个函数参数和arguments的区别，在此做一个记录。

本文将用代码来说明两者的区别。

## 准备工作
如果你不知道arguments是什么，我建议你看看[mdn的介绍](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)。

ES5引入了[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)，在严格模式中改变了arguments和函数参数之间的关系，本文将分为两种情况分别说明。

## 一般模式
直接上代码，先来看调用时缺省参数的情况
    
    function a1(x) {
        x = 2;
        console.log(x, arguments[0]);
    }
    a1(); // 2 undefined

    function a2(x) {
        arguments[0] = 2;
        console.log(x, arguments[0]);
    }
    a2(); // undefined 2

再来看调用时传入参数的情况

    function a3(x) {
        x = 2;
        console.log(x, arguments[0]);
    }
    a3(1); // 2 2

    function a4(x) {
        arguments[0] = 2;
        console.log(x, arguments[0]);
    }
    a4(1); // 2 2

可以看到如果缺省参数，arguments和参数是隔离开的；如果传入参数，arguments和参数是双向绑定的。

## 严格模式
再来看看严格模式，直接上代码

    function b1(x) {
        'use strict';
        x = 2;
        console.log(x, arguments[0]);
    }
    b1(); // 2 undefined

    function b2(x) {
        'use strict';
        arguments[0] = 2;
        console.log(x, arguments[0]);
    }
    b2(); // undefined 2

    function b3(x) {
        'use strict';
        x = 2;
        console.log(x, arguments[0]);
    }
    b3(1); // 2 1

    function b4(x) {
        'use strict';
        arguments[0] = 2;
        console.log(x, arguments[0]);
    }
    b4(1); // 1 2

在严格模式下，无论参数是否缺省，arguments和参数都是隔离开的。

## 总结
在严格和非严格模式下行为会有不同，大家小心别踩坑，祝好。
