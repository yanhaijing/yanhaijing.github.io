---
layout: post
title: 探索JavaScript中Null和Undefined的深渊
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 当讨论JavaScript中的原始数据类型时，大多数人都知道的基本知识，从String，Number到Boolean。这些原始类型相当简单，行为符合常识。但是，本文将更多聚焦独特的原始数据类型Null和Undefined，是什么让他们如此相似，却又似是而非。
---
{% include JB/setup %}

当讨论JavaScript中的原始数据类型时，大多数人都知道的基本知识，从String，Number到Boolean。这些原始类型相当简单，行为符合常识。但是，本文将更多聚焦独特的原始数据类型Null和Undefined，是什么让他们如此相似，却又似是而非。

## 理解Null和Undefined ##

在JavaScript中，`null`是字面量同时也是语言中的关键字，用来表示无法识别的对象值。换句话说，这用来表示“无值（no value）”。虽然相似，`undefined`实际上代表了不存在的值（non-existence of a value）。都是完全不可变的，没有属性和方法，也不能给其属性赋值。事实上,试图访问或定义一个属性将会引发一个类型错误（`TypeError`）。正如他们的名字暗示的那样，他们是完全无效的值。

没有值代表的布尔值是false，这意味着他们在条件上下文中会被被计算为false，如`if`语句。使用相等操作符( `==` )比较这两个值和其他false值,他们并不等于除了自己:

	null == 0; // false
	undefined == ""; // false
	null == false; // false
	undefined == false; // false
	null == undefined; // true

尽管如此，和其他相似之处，但`null`和`undefined`并不是等价的。每个作为其独特的类型的唯一成员,`undefined`是Undefined类型和`null`是Null类型。使用全等操作符（`===`）比较这两个值，这要求类型和值都相等，下面证明这一点：

	undefined === null; // false

这是一个重要的区别，服务于不同的目的和理由。区分这两个值，你可以认为`undefined`代表一个意想不到的没有值而`null`作为预期没有值的代表。

## 产生Undefined ##

有许多的方法产生一个`undefined`值的代码。它通常遇到当试图访问一个不存在的值时。在这种情况下，在JavaScript这种动态的弱类型语言中，只会默认返回一个`undefined`值，而不是上升为一个错误。
任何声明变量时没有提供一个初始值，都会有一个为`undefined`的默认值:
 

	var foo; // 默认值为 undefined

当试图访问一个不存在的对象属性或数组项时，返回一个`undefined`值:

	var array = [1, 2, 3];
	var foo = array.foo; // foo 属性不存在, 返回 undefined
	var item = array[5]; // 数组中没有索引为5的项，返回 undefined

如果省略了函数的返回语句,返回`undefined`:

	var value = (function(){})(); // 返回 undefined

函数调用时未提供的值结果将为`undefined`参数值：

	(function(undefined){
	    // 参数是 undefined
	})();

`void`操作符也可以返回一个`undefined`值。像Underscore的库使用它作为一个防御式的类型检查，因为它是不可变的，可以在任何上下文依赖返回`undefined`:

	function isUndefined(obj){
	    return obj === void 0;
	}

最后，`undefined`是一个预定义的全局变量(不像`null`关键字)初始化为`undefined`值:

	'undefined' in window; // true

ECMAScript 5中，这个变量是只读的，以前并非如此。

## Null的用例 ##

null的用例是使他与众不同的主要方面，因为不像`undefined`，`null`被认为是更有用。这正是为什么`typeof`操作符作用于`null`值时返回“object”。最初的理由是，现在仍然是，通常用作一个空引用一个空对象的预期,就像一个占位符。`typeof`的这种行为已经被确认为一个错误，虽然提出了修正，出于后兼容的目的，这一点已经保持不变。
这就是为什么JavaScript环境从来没有设置一个值为`null`；它必须以编程方式完成。正如文档MDN所说：

> 在api中，`null`是经常检索对象的地方可以预期，但没有相关的对象。

这适用于DOM，它是独立于语言的，不属于ECMAScript规范的范围。因为它是一个外部API，试图获取一个不存在的元素返回一个`null`值，而不是`undefined`。
一般来说,如果你需要给一个变量或属性指定一个不变值，将它传递给一个函数，或者从一个函数返回`null`，`null`几乎总是最好的选择。简而言之，JavaScript使用`undefined`并且程序员应该使用`null`。
`null`的另一个可行的用例，也被认为是良好的实践是一个显式指定变量为无效(`object= null`)当一个引用不再是必需的。通过分配`null`值，有效地清除引用，并假设对象没有引用其他代码，指定垃圾收集，确保回收内存。

## 深入挖掘 ##

使`null`和`undefined`像黑洞的不只是他们的行为，而是在他们在JavaScript环境的内部的处理方式。他们似乎通常并不具有同样的关联特征与其他原生或内置对象。
在ES5中，`Object.prototype.toString`方法，已经成为实际的类型检查标准，这在`null`和`undefined`中被证明是一致的：

	Object.prototype.toString.call(null); // [object Null]
	Object.prototype.toString.call(undefined); // [object Undefined]

然而，`Object.prototype.toString`方法实际上并不是检索`null`的内部`[[Class]]`属性或`undefined`的公开构造函数。根据文档，以下步骤发生在被调用过程中：

1. 如果值是`undefined`，返回“`[object Undefined]`”。
2. 如果这个值为`null`，则返回“`[object Null]`”。
3. 让O作为调用`ToObject`同时传递`this`值作为参数的结果值。
4. 让class是O的内部属性`[[Class]]`的值。
5. 返回的结果连接三个字符串“`[object `”，class，和“`]`”的结果的字符串值。

该方法执行一个简单的字符串返回值，如果它检测到`null`或`undefined`和其他对象统一的功能。在整个规范中这是很常见的，因为当遇到`null`和`undefined`值时大多数方法包含一个简单的捕捉并返回。事实上，没有迹象表明他们包含与任何原生对象相关联的内部属性。就好像他们不是对象。我很想知道如果一个JavaScript的原生环境内部实际存在的显式方案会怎样？也许有人更熟悉一个可以参与的实现。

## 结论 ##

无论这些原生对象多么不寻常，理解`null`和`undefined`之间的差异，和他们在JavaScript的语言基础中截然不同的角色。它可能不能使你的应用程序有所突破，但是一般来说，它仅被证明在开发和调试中长期有益。

## 译者注 ##

本文问翻译文章，原文为“[Exploring the Abyss of Null and Undefined in JavaScript](http://flippinawesome.org/2013/12/09/exploring-the-abyss-of-null-and-undefined-in-javascript/)”

本文较难以理解，可参照原文便于理解。