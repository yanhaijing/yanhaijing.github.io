---
layout: post
title: JavaScript中的this关键字
category : javascript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 
---
{% include JB/setup %}

“this”关键字是JavaScript中广泛应用的一种特性，但它经常也是这门语言中最容易混淆和误解的特性。“this”的实际意义是什么？它是如何求值的？

本文试图以清晰的方式澄清和解释这问题的答案。

有过其他编程经验的人对“this”关键字并不陌生，大部分时候当通过构造函数实例化一个类的实例时，它指新创建的对象。例如，如果我有一个类`Boat()`，其拥有一个`moveBoat()`方法，当在`moveBoat`方法中引用“this”的时候，我们实际上访问的基于Boat类新创建的对象。

在JavaScript中，当通过“new”关键字调用构造函数时，我们也有this概念，然而，这并不是唯一的规则，并且“this”经常在不同的执行上下文中引用到不同的对象。如果你不熟悉JavaScript中的执行上下文，我建议你阅读我的[另一篇文章](http://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript)。说的够多了，让我们看一些JavaScript的例子：

	// 全局作用域
	
	foo = 'abc';
	alert(foo); // abc
	
	this.foo = 'def';
	alert(foo); // def

每当你在全局作用域中使用“this”关键字时（没在函数内部），它通常指向全局对象（global object）。现在让我们看看函数内部“this”的值：

	var boat = {
	    size: 'normal',
	    boatInfo: function() {
	        alert(this === boat);
	        alert(this.size);
	    }
	};
	
	boat.boatInfo(); // true, 'normal'
	
	var bigBoat = {
	    size: 'big'
	};
	
	bigBoat.boatInfo = boat.boatInfo;
	bigBoat.boatInfo(); // false, 'big'

那么上面的“this”如何确定？我们看到上面的boat对象有一个`size`属性和一个`boatInfo`方法。在`boatInfo()`内部，会弹出this的值是否是`boat`对象，也会弹出this的size属性。所以我们执行`boat.boatInfo()`，我们看见this的值是`boat`对象和`boat`的`size`属性值是`normal`。

然后我们创建另一个对象`bigBoat`，也有一个size属性是big。然而，bigBoat对象没有boatInfo方法，所以我们从boat对象拷贝方法 `bigBoat.boatInfo = boat.boatInfo`。现在，当我们调用bigBoat.boatInfo()并进入函数时，我们看到this不等于boat，并且现在size属性值是big。为什么会这样？boatInfo()内部的this值是如何改变的？

你必须意识到的第一件事是函数内部this的值不是静态的，每次你调用一个函数它总是重新求值，但这一过程发生在函数代码实际执行之前。函数内部的this值实际由函数被调用的父作用域提供，更重要的是，依赖实际函数的语法。

当函数被调用时，我们看紧邻括号“()”的左边。如果在括号的左侧存在一个引用，传递给调用函数的“this”值是引用属于的对象，否则this的值将是全局对象。让我们看一个例子：

	function bar() {
	    alert(this);
	}
	bar(); // global - 因为bar方法被调用时属于 global 对象
	
	var foo = {
	    baz: function() {
	        alert(this);
	    }
	}
	foo.baz(); // foo - 因为baz()方法被调用时术语foo对象

如果this就这么简单，那上面的代码就足够了。我们可以进一步使事情变得复杂，通过不同的调用语法，改变相同函数内部“this”的值。

	var foo = {
	    baz: function() {
	        alert(this);
	    }
	}
	foo.baz(); // foo - 因为baz被调用时属于foo对象
	
	var anotherBaz = foo.baz;
	anotherBaz(); // global - 因为anotherBaz()被调用时术语global对象

我们看到baz()内部的“this”值每次都不同，这是因为调用的语法不同。现在，让我们看看深度嵌套对象内部“this”的值：

	var anum = 0;
	
	var foo = {
	    anum: 10,
	    baz: {
	        anum: 20,
	        bar: function() {
	            console.log(this.anum);
	        }
	    }
	}
	foo.baz.bar(); // 20 - 因为()的左边是bar，而它被调用时属于baz对象
	
	var hello = foo.baz.bar;
	hello(); // 0 - 因为()的左边是hello，而它被调用时属于global对象

另一个经常被问的问题是事件处理程序内部的“this”关键字如何求值？答案是事件处理程序内部的“this”总是引用触发事件的元素。让我们看一个例子：

	<div id="test">I am an element with id #test</div>

	function doAlert() { 
	    alert(this.innerHTML); 
	} 
	
	doAlert(); // undefined 
	
	var myElem = document.getElementById('test'); 
	myElem.onclick = doAlert; 
	
	alert(myElem.onclick === doAlert); // true 
	myElem.onclick(); // I am an element

我们看到当doAlert()第一次调用时，弹出的值是undefined，由于doAlert()属于global对象。然后我们写`myElem.onclick = doAlert`。这意味这当onclick被出发时，它作为myElem的一个方法，“this”的值将是myElem元素。

我想说的最后一点是，“this”的值也可以通过call和apply手动设置，这超过我们所讨论的范围。还感兴趣的是，当调用构造函数时，“this”引用新创建的实例对象。原因是因为构造函数前面的“new”关键字，它创建一个新对象，构造函数内部的“this”总引用新创建的对象。

##总结

希望今天的文章已经澄清了“this”关键字的误解，并且你总能知道“this”的正确值。现在我们知道“this”的值不是静态的，值得确定依赖于函数被如何调用。

##注

原文 http://davidshariff.com/blog/javascript-this-keyword/
