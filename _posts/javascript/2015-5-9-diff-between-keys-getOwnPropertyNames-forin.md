---
layout: post
title: 详解forin，Object.keys和Object.getOwnPropertyNames的区别
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [javascript]
description: 本文将用一个例子说明forin，Object.keys和Object.getOwnPropertyNames三者之间的区别。
---
{% include JB/setup %}

以前笔者一直搞不太清楚三者之间的区别，最近再看这块的内容，顺便理清一下思路。

本文将用一个例子说明三者之间的区别，如果你还不知道这些方法，那么不放看一下[这篇文章][2]。

## 前言
这三个方法，都可以用来遍历对象，这非常有用，其中后两个都是[es5][1]中新增的方法。

本文会用到一些es5的对象知识，如果你不了解，可以看一下开头提到的文章，首先我们需要一个父对象。

	var parent = Object.create(Object.prototype, {
        a: {
            value: 1,
            writable: true,
            enumerable: true,
            configurable: true            
        }
    });

parent继承自Object.prototype，有一个可枚举的属性a。下面我们在创建一个继承自parent的对象child。

	var child = Object.create(parent, {
        b: {
            value: 2,
            writable: true,
            enumerable: true,
            configurable: true
        },
        c: {
            value: 3,
            writable: true,
            enumerable: false,
            configurable: true
        }
    });

child有两个属性b和c，其中b为可枚举属性，c为不可枚举属性。

下面我们将用四种方法遍历child对象，来比较四种方法的不同。如下的代码代表程序的输出。

	console.log('yanhaijing is God');
	// > yanhaijing is God

**注**：⑤代表[es5][1]中新增的方法，你可能需要一款现代浏览器来访问。

## for in
for in是[es3][1]中就存在，最早用来遍历对象（集合）的方法。

	for (var key in child) {
        console.log(key);
    }
	// > b
	// > a

从输出可以看出，for in会输出自身以及原型链上可枚举的属性。

**注意**：不同的浏览器对for in属性输出的顺序可能不同。

如果仅想输出自身的属性可以借助 [hasOwnProperty][2]。可以过滤掉原型链上的属性。

	for (var key in child) {
        if (child.hasOwnProperty(key)) {
            console.log(key);
        }
    }
	// > b

上面的代码，仅输出了child自己的可枚举属性b，而没有输出原型parent中的属性。

## Object.keys⑤
[Object.keys][2]是[es5][1]中新增的方法，用来获取对象自身可枚举的属性键。

	console.log(Object.keys(child));
	// > ["b"]

可以看出Object.keys的效果和for in+hasOwnProperty的效果是一样的。

## Object.getOwnPropertyNames⑤
[Object.getOwnPropertyNames][2]也是[es5][1]中新增的方法，用来获取对象自身的全部属性名。
	
	console.log(Object.getOwnPropertyNames(child));
	// > ["b", "c"]

从输出可以看出其和Object.keys的区别。

## 总结
相信看完后，搞不清楚的同学应该明白了，在es3中，我们不能定义属性的枚举性，所以也不需要那么多方法，有了keys和getOwnPropertyNames后基本就用不到for in了。

如果你想在老旧浏览器中也是用这些方法，那试试[es5shim](https://github.com/es-shims/es5-shim)吧。

## 相关资料
- [细说JavaScript中对象的属性和方法][2]


[1]: http://yanhaijing.com/es5/ "es5"
[2]: http://yanhaijing.com/javascript/2015/05/08/member-of-object/ "细说JavaScript中对象的属性和方法"


