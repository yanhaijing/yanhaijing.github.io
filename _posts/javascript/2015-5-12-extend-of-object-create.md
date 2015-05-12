---
layout: post
title: 碉堡了！ECMAScript 5的Object.create方法
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [Object.create, ECMAScript5, javascript]
description: 一直对ES5处于了解的阶段，没有深入实践过，最近研究发现`Object.create`方法有些缺陷，呵呵。
---
{% include JB/setup %}

一直对[ES5][1]处于了解的阶段，没有深入实践过，最近研究发现`Object.create`方法有些缺陷，呵呵。

什么！！！你还不知道这个方法，难道你还停留在上个世纪，骚年是时候学习[ES5][1]了，因为[ES6][1]马上出来的。如果你记不清楚这个方法的语法了，那么我建议你阅读一下[这篇文章](http://yanhaijing.com/javascript/2015/05/08/member-of-object/)。

## 前言
好了言归正传，先来看看Object.create的语法：

	Object.create(proto [, propertiesObject ])

期第二个参数的涉及我很不满意，其必须为属性描述符，众所周知属性描述符这东西，写起来有些蹩脚，而且，咱又不写公共库，有些特性也用不到，我希望其能接受普通对象，并且接受多个对象，有点类似mixin的意思，所以我扩展了一下create，姑且就放到Object.creates上吧，如果你不赞成这种方法，可以随意放置。

## 语法
Object.creates的语法如下：

	Object.creates(proto, [object...])

第一个参数和Object.create的第一个参数一样，后面有一个或多个，对象，其可以将后面对象的属性extend到前面去，是不是有点jq的extend的意思，差不多就是这个意思。

## 实现
借助Object.getOwnPropertyDescriptor和Object.defineProperty我们可以获取对象属性的属性描述符，然后赋给目标对象，从而实现只传入对象的目的，具体代码如下：

	Object.creates = function (proto) {
        var obj = Object.create(proto);
        //如果只有一个参数
        if (arguments.length < 2) return obj;
		
        [].slice.call(arguments, 1).forEach(function (val1, key1) {
            Object.getOwnPropertyNames(val1).forEach(function (val2) {
                Object.defineProperty(obj, val2, Object.getOwnPropertyDescriptor(val1, val2));
            });
        });
        return obj;
    }

代码使用了[es5][1]中很多数组相关的方法，如果你还不了解，可以看下[这篇文章](http://yanhaijing.com/javascript/2014/01/17/fun-with-javascript-native-array-functions/)。

## 实例
下面是一个例子，可以看出比Object.create简单多了。

	Object.creates(Object.prototype, {a: 1, b: 2}, {c: 3}, {a: 4});
	// > Object {a: 4, b: 2, c: 3}

从例子中可以看到，后面的对象的属性，覆盖了前面对象的属性，这符合第一直觉。

## 总结
其实我开始比较抵制es5的create方法，因为我觉的它很繁琐，要定义那么多其实不那么常用的东西，所以我写了这个方法。我觉得它很好用，如果你有什么想法，那在评论里和我一起讨论吧。

## 参考资料
- [细说JavaScript中对象的属性和方法](http://yanhaijing.com/javascript/2015/05/08/member-of-object/)
- [JavaScript对象继承一瞥](http://yanhaijing.com/javascript/2014/11/09/object-inherit-of-js)
- [JavaScript原型之路](http://yanhaijing.com/javascript/2014/07/18/javascript-prototype)

[1]: http://yanhaijing.com/es5/ "es5"
