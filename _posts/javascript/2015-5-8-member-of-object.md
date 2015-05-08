---
layout: post
title: 细说JavaScript中对象的属性和方法
category : javaScript
tagline: "原创"
tags : [javaScript]
keywords: [object, js]
description: 本文分为两部分，分别介绍Object和Object.prototype上的一些常用方法。
---
{% include JB/setup %}

最近在回家的路上读了尼古拉斯的新书《[JavaScript面向对象精要](http://www.amazon.cn/gp/product/B00VDSW6X2/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B00VDSW6X2&linkCode=as2&tag=yanhaijing-23)》，发现自己对对象的属性和方法不是很熟悉，特别是es5新增的部分，特写此文总结一下，同时也与大家共勉。

本文分为两部分，分别介绍Object和Object.prototype上的一些常用方法。主要参考了[MDN][1]，每个方法都给出了[MDN][1]的链接。

## 前言
查看一个对象属性的最好方法，不是去百度，也不是去google，而是用下面的方法（抄袭自 《[DOM启蒙](http://www.amazon.cn/gp/product/B00JWXDB52/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B00JWXDB52&linkCode=as2&tag=yanhaijing-23)》）：
	
	Object.getOwnPropertyNames(Object).sort().forEach(function (val) {console.log(val, '\n')});

上面的代码会有如下的输出：

![]({{BLOG_IMG}}169.png)

如果不支持`getOwnPropertyNames`的浏览器就用`for in`吧，请自行解决。

## Object
从上面的输出中挑选出一些常用方法和属性，会得到下面的列表：

- create⑤
- defineProperty⑤
- defineProperties⑤ 
- getPrototypeOf⑤
- getOwnPropertyDescriptor⑤
- keys⑤
- getOwnPropertyNames⑤
- preventExtensions⑤
- isExtensible⑤
- seal⑤
- isSealed⑤ 
- freeze⑤
- isFrozen⑤

带⑤的为es5新增的方法。下面将会一一介绍上面的方法。

### create
> Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。

	Object.create(proto [, propertiesObject ])

- proto 为新创建对象的原型对象，设置为null可创建没有原型的空对象。
- propertiesObject 包涵若干个属性的描述符和defineProperties的第二个参数一样。

	Object.create(Object.prototype, {
		a: {
			value: 1,
			writable: true,
			configurable: true
		}
	});

创建一个继承自Object.prototype的对象，有一个属性a，其可写，可配置，不可枚举，值为1。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。

### defineProperty
>Object.defineProperty() 方法直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

	Object.defineProperty(obj, prop, descriptor)

descriptor 可包含4个属性，如下：
- configurable 当且仅当这个属性描述符值为 true 时，该属性可能会改变，也可能会被从相应的对象删除。默认为 false。
- enumerable true 当且仅当该属性出现在相应的对象枚举属性中。默认为 false。
- value 属性的值
- writable 定义属性值是否可写。
- get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。方法将返回用作属性的值。默认为 undefined。
- set 同get一起使用，功能互补。

其中value和writable一组，get和set一组，不可同时出现。

	// 显式
	Object.defineProperty(obj, "key", {
		enumerable: false,
		configurable: false,
		writable: false,
		value: "static"
	});

上面给obj对象定义了一个属性key，其不可枚举，不可配置，只读，值为static。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。

### defineProperties
> Object.defineProperties() 方法在一个对象上添加或修改一个或者多个自有属性，并返回该对象。

	Object.defineProperties(obj, props)

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)。

### getPrototypeOf
> Object.getPrototypeOf() 方法返回指定对象的原型（也就是该对象内部属性[[Prototype]]的值）。

	Object.getPrototypeOf(object)

可以用来获取对象的原型。

	Object.getPrototypeOf({}) === Object.prototype
	// > true

在es5之前，要达到上面同样的方法，只能使用 constructor。

	({}).constructor.prototype === Object.prototype
	// > true

但对于自定义的构造函数，如果复写了prototype，可能导致获取的constructor不正确，如何解决这个问题，可以看[这篇文章](http://yanhaijing.com/js/2014/11/09/object-inherit-of-js/)。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)。

### getOwnPropertyDescriptor
> Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
	
	Object.getOwnPropertyDescriptor(obj, prop)

可用来获取或查看对象属性的特性。

	var obj = {a: 1};
	Object.getOwnPropertyDescriptor(obj, 'a');
	// > Object {value: 1, writable: true, enumerable: true, configurable: true}

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)。

### keys
> Object.keys() 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。

	Object.keys(obj)

典型的用法如下：

	var obj = {a: 1, b: 2};
	console.log(Object.keys(obj));
	// > ["a", "b"]

keys可以用来代替原来的for in循环，借助[es5新增的数组方法](http://yanhaijing.com/javascript/2014/01/17/fun-with-javascript-native-array-functions/)，可提升代码可读性。

	Object.keys(obj).forEach(function (val) {console.log(val)});

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)。

### getOwnPropertyNames
> Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。

	Object.getOwnPropertyNames(obj)

其和Object.keys的区别就是能够获取自身的全部属性，包括不可枚举属性。

### preventExtensions
> Object.preventExtensions() 方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

	Object.preventExtensions(obj)

需要注意的是不可扩展的对象的属性通常仍然可以被删除。

尝试给一个不可扩展对象添加新属性的操作将会失败，在非严格模式下是静默的，在[严格模式][2]下会抛出[TypeError][3]异常。

Object.preventExtensions 只能阻止一个对象不能再添加新的自身属性，仍然可以为该对象的原型添加属性。

在 ECMAScript 5 中可扩展的对象可以变得不可扩展，但反过来不行。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)。

### isExtensible
> Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)。

### seal
> Object.seal() 方法可以让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可能可以修改已有属性的值的对象。

	Object.seal(obj)

密封一个对象会让这个对象变的变为不可扩展的，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。

尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出[TypeError][3]异常（[严格模式][2]）。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)。

### isSealed
> Object.isSealed() 方法判断一个对象是否是密封的（sealed）。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)。

### freeze
> Object.freeze() 方法可以冻结一个对象。冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。

	Object.freeze(obj)

冻结对象是不可扩展的，密封的，同时期值属性的writable会被设置为false，set也将失效，总之会变为不可更改。任何尝试修改该对象的操作都会失败，可能是静默失败，也可能会抛出异常（[严格模式][2]）。

### isFrozen
> Object.isFrozen() 方法判断一个对象是否被冻结（frozen）。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)。

## Object.prototype
Object.prototype上的方法，都是实例方法，必须在对象实例上调用。

- hasOwnProperty
- isPrototypeOf⑤
- propertyIsEnumerable⑤

### hasOwnProperty
> hasOwnProperty() 方法用来判断某个对象是否含有指定的自身属性。

	obj.hasOwnProperty(prop)

在没有Object.keys之前，借助hasOwnProperty，可以让for in 达到类似的效果，代码如下：

	for(var key in obj) {
		if (obj.hasOwnProperty(key)) {
			//过滤掉原型上的方法
		}	
	}

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)。

### isPrototypeOf
> isPrototypeOf() 方法测试一个对象是否存在于另一个对象的原型链上。

	prototype.isPrototypeOf(object)

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)。

### propertyIsEnumerable
> propertyIsEnumerable() 方法返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性。

	obj.propertyIsEnumerable(prop)

从原型链上继承的属性,所以该方法会返回false。

如果对象没有指定的属性，该方法返回 false。

[更多详情](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)。

##总结
除了上面介绍的方法，还有一些实验方法，和不常用的方法，可以在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)找到。

[1]: https://developer.mozilla.org "MDN"
[2]: https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Functions_and_function_scope/Strict_mode "严格模式"
[3]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError "TypeError"

