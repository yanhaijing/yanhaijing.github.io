---
layout: post
title: 揭秘JavaScript中谜一样的this
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 在这篇文章里我想阐明JavaScript中的this，希望对你理解this的工作机制有一些帮助。作为JavaScript程序员学习this对于你的发展有很大帮助，可以说利大于弊。
---
{% include JB/setup %}

在这篇文章里我想阐明JavaScript中的this，希望对你理解this的工作机制有一些帮助。作为JavaScript程序员学习this对于你的发展有很大帮助，可以说利大于弊。这篇文章的灵感来自于我最近的工作——我即将完成的书的最后章节——JavaScript 应用程序设计（[JavaScript Application Design](http://bevacqua.io/buildfirst)）（注意:现在你可以购买[早期版本](http://bevacqua.io/bf/book)），我写的是关于scope工作原理的方面。

似是而非，这可能是你对this的感觉：

![]({{ BLOG_IMG }}48.gif)

很疯狂，不是吗?在这篇短文，我旨在揭开它的神秘面纱。

## this的工作原理 ##

如果一个函数被作为一个对象的方法调用，那么this将被指派为这个对象。

	var parent = {
	    method: function () {
	        console.log(this);
	    }
	};
	
	parent.method();
	// <- parent

注意这种行为非常“脆弱”，如果你获取一个方法的引用并且调用它，那么this的值不会是parent了，而是window全局对象。这让大多数开发者迷惑。

	var parentless = parent.method;
	
	parentless();
	// <- Window

底线是你应该查看调用链去理解被调用函数是一个对象的属性还是它自己。如果它被作为属性调用，那么this的值将变成该属性的对象，否则this的值将被指派为全局对象或window。如果在严格模式下，this的值将是`undefined`。

在被当作构造函数的情况下，当使用new关键字时，this将被指派为被创建的实例对象。

	function ThisClownCar () {
	  console.log(this);
	}
	
	new ThisClownCar();
	// <- ThisClownCar {}

注意在这种情况下没有办法识别出一个函数是否应该被用作构造函数，从而省略new关键字this的结果将是全局对象，就像我们上面看到的没有用parent调用的例子。

	ThisClownCar();
	// <- Window

## 篡改this ##

`.call`，`.apply`和`.bind`方法被用来操作调用函数的方式，帮我们定义this的值和传递给函数的参数值。

`Function.prototype.call` 可以有任意数量的参数，第一个参数被分配给this，剩下的被传递给调用函数。

	Array.prototype.slice.call([1, 2, 3], 1, 2)
	// <- [2]

`Function.prototype.apply` 的行为和`.call`类似，但它传递给函数的参数是一个数组而不是任意参数。

	String.prototype.split.apply('13.12.02', ['.'])
	// <- ['13', '12', '02']

`Function.prototype.bind` 创建一个特殊的函数，该函数将永远使用传递给`.bind`的参数作为this的值，以及能够分配部分参数，创建原函数的珂里化（curride）版本。

	var arr = [1, 2];
	var add = Array.prototype.push.bind(arr, 3);
	
	// effectively the same as arr.push(3)
	add();
	
	// effectively the same as arr.push(3, 4)
	add(4);
	
	console.log(arr);
	// <- [1, 2, 3, 3, 4]

## 作用域链中的this ##

在下面的例子，this将无法在作用域链中保持不变。这是规则的缺陷，并且常常会给业余开发者带来困惑。

	function scoping () {
	  console.log(this);
	
	  return function () {
	    console.log(this);
	  };
	}
	
	scoping()();
	// <- Window
	// <- Window

一个常见的方法是创建一个局部变量保持对this的引用，并且在子作用域中不能有同命变量。子作用域中的同名变量将覆盖父作用域中对this的引用。

	function retaining () {
	  var self = this;
	
	  return function () {
	    console.log(self);
	  };
	}
	
	retaining()();
	// <- Window

除非你真的想同时使用父作用域的this,以及当前this值，由于某些莫名其妙的原因,我更喜欢是使用的方法`.bind`函数。这可以用来将父作用域的this指定给子作用域。

	function bound () {
	  return function () {
	    console.log(this);
	  }.bind(this);
	}
	
	bound()();
	// <- Window

## 其他问题？ ##

你是否有任何关于this的问题？关于this怎样？请让我知道如果你认为我错过了任何其他边界情况或优雅的解决方案。

如果你喜欢这篇文章,一定要看看我即将到来的书JavaScript应用程序设计:构建第一种方法（ [JavaScript Application Design: A Build First Approach](http://bevacqua.io/buildfirst)）,您可以访问购买[早期版本](http://bevacqua.io/bf/book)的链接。

## 译者注 ##

本文为翻译文章，原文“[Demystifying this in JavaScript](http://flippinawesome.org/2013/12/09/demystifying-this-in-javascript/)”