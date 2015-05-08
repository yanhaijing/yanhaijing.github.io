---
layout: post
title: 认识javascript中的作用域和上下文
category : javascript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: javascript中的作用域(scope)和上下文(context)是这门语言的独到之处，这部分归功于他们带来的灵活性。每个函数有不同的变量上下文和作用域。这些概念是javascript中一些强大的设计模式的后盾。然而这也给开发人员带来很大困惑。下面全面揭示了javascript中的上下文和作用域的不同，以及各种设计模式如何使用他们。
---
{% include JB/setup %}

javascript中的作用域(scope)和上下文(context)是这门语言的独到之处，这部分归功于他们带来的灵活性。每个函数有不同的变量上下文和作用域。这些概念是javascript中一些强大的设计模式的后盾。然而这也给开发人员带来很大困惑。下面全面揭示了javascript中的上下文和作用域的不同，以及各种设计模式如何使用他们。

## 上下文 vs 作用域 ##

首先需要澄清的问题是上下文和作用域是不同的概念。多年来我注意到许多开发者经常将这两个术语混淆，错误的将一个描述为另一个。平心而论，这些术语变得非常混乱不堪。

每个函数调用都有与之相关的作用域和上下文。从根本上说，范围是基于函数(function-based)而上下文是基于对象(object-based)。换句话说，作用域是和每次函数调用时变量的访问有关，并且每次调用都是独立的。上下文总是关键字 this 的值，是调用当前可执行代码的对象的引用。

## 变量作用域 ##

变量能够被定义在局部或者全局作用域，这导致运行时变量的访问来自不同的作用域。全局变量需被声明在函数体外，在整个运行过程中都存在，能在任何作用域中访问和修改。局部变量仅在函数体内定义，并且每次函数调用都有不同的作用域。这主题是仅在调用中的赋值，求值和对值的操作，不能访问作用域之外的值。

目前javascript不支持块级作用域，块级作用域指在if语句，switch语句，循环语句等语句块中定义变量，这意味着变量不能在语句块之外被访问。当前任何在语句块中定义的变量都能在语句块之外访问。然而，这种情况很快会得到改变，let 关键字已经正式添加到ES6规范。用它来代替var关键字可以将局部变量声明为块级作用域。

## "this" 上下文 ##

上下文通常是取决于一个函数如何被调用。当函数作为对象的方法被调用时，this 被设置为调用方法的对象：

	var object = {
	    foo: function(){
	        alert(this === object); 
	    }
	};
	
	object.foo(); // true

同样的原理适用于当调用一个函数时通过new的操作符创建一个对象的实例。当以这种方式调用时，this 的值将被设置为新创建的实例：

	function foo(){
	    alert(this);
	}
	
	foo() // window
	new foo() // foo

当调用一个未绑定函数，this 将被默认设置为 全局上下文(global context) 或window对象(如果在浏览器中)。然而如果函数在严格模式下被执行("use strict")，this的值将被默认设置为undefined。

## 执行上下文和作用域链 ##

javascript是一个单线程语言，这意味着在浏览器中同时只能做一件事情。当javascript解释器初始执行代码，它首先默认竟如全局上下文。每次调用一个函数将会创建一个新的执行上下文。

这里经常发生混淆，这术语”执行上下文(execution context)“在这里的所要表达的意思是作用域，不是前面讨论的上下文。这是槽糕的命名，然而这术语ECMAScript规范所定义的,无奈的遵守吧。

每次新创建一个执行上下文，会被添加到作用域链的顶部，又是也成为执行或调用栈。浏览器总是运行在位于作用域链顶部当前执行上下文。一旦完成，它(当前执行上下文)将从栈顶被移除并且将控制权归还给之前的执行上下文。例如：

	function first(){
	    second();
	    function second(){
	        third();
	        function third(){
	            fourth();
	            function fourth(){
	                // do something
	            }
	        }
	    }   
	}
	first();

运行前面的代码将会导致嵌套的函数被从上倒下执行直到 fourth 函数，此时作用域链从上到下为： fourth, third, second, first, global。fourth 函数能够访问全局变量和任何在first,second和third函数中定义的变量，就如同访问自己的变量一样。一旦fourth函数执行完成，fourth晕高兴上下文将被从作用域链顶端移除并且执行将返回到thrid函数。这一过程持续进行直到所有代码已完成执行。

不同执行上下文之间的变量命名冲突通过攀爬作用域链解决，从局部直到全局。这意味着具有相同名称的局部变量在作用域链中有更高的优先级。

简单的说，每次你试图访问函数执行上下文中的变量时，查找进程总是从自己的变量对象开始。如果在自己的变量对象中没发现要查找的变量，继续搜索作用域链。它将攀爬作用域链检查每一个执行上下文的变量对象去寻找和变量名称匹配的值。

## 闭包 ##

当一个嵌套的函数在定义(作用域)的外面被访问，以至它可以在外部函数返回后被执行，此时一个闭包形成。它(闭包)维护(在内部函数中)对外部函数中局部变量，arguments和函数声明的访问。封装允许我们从外部作用域中隐藏和保护执行上下文，而暴露公共接口，通过接口进一步操作。一个简单的例子看起来如下：

	function foo(){
	    var local = 'private variable';
	    return function bar(){
	        return local;
	    }
	}
	
	var getLocalVariable = foo();
	getLocalVariable() // private variable

其中最流行的闭包类型是广为人知的模块模式。它允许你模拟公共的，私有的和特权成员：

	var Module = (function(){
	    var privateProperty = 'foo';
	
	    function privateMethod(args){
	        //do something
	    }
	
	    return {
	
	        publicProperty: "",
	
	        publicMethod: function(args){
	            //do something
	        },
	
	        privilegedMethod: function(args){
	            privateMethod(args);
	        }
	    }
	})();

 模块实际上有些类似于单例，在末尾添加一对括号，当解释器解释完后立即执行(立即执行函数)。闭包执行上下位的外部唯一可用的成员是返回对象中公用的方法和属性(例如*Module.publicMethod*)。然而，所有的私有属性和方法在整个程序的生命周期中都将存在，由于(闭包)使执行上下文收到保护，和变量的交互要通过公用的方法。

另一种类型的闭包叫做立即调用函数表达式(immediately-invoked function expression IIFE)，无非是一个在window上下文中的自调用匿名函数(self-invoked anonymous function)。

	function(window){
	
	    var a = 'foo', b = 'bar';
	
	    function private(){
	        // do something
	    }
	
	    window.Module = {
	
	        public: function(){
	            // do something 
	        }
	    };
	
	})(this);

对保护全局命名空间，这种表达式非常有用，所有在函数体内声明的变量都是局部变量，并通过闭包在整个运行环境保持存在。这种封装源代码的方式对程序和框架都是非常流行的，通常暴露单一全局接口与外界交互。

## Call 和 Apply ##

这两个简单的方法，内建在所有的函数中，允许在自定义上下文中执行函数。call 函数需要参数列表而 apply 函数允许你传递参数为数组：

	function user(first, last, age){
	    // do something 
	}
	user.call(window, 'John', 'Doe', 30);
	user.apply(window, ['John', 'Doe', 30]);

执行的结果是相同的，user 函数在window上下文上被调用，并提供了相同的三个参数。

ECMAScript 5 (ES5)引入了*Function.prototype.bind*方法来控制上下文，它返回一个新函数，这函数(的上下文)被永久绑定到bind方法的第一个参数，无论函数被如何调用。它通过闭包修正函数的上下文，下面是为不支持的浏览器提供的方案： 

 

	if(!('bind' in Function.prototype)){
	    Function.prototype.bind = function(){
	        var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
	        return function(){
	            return fn.apply(context, args);
	        }
	    }
	}

它常用在上下文丢失：面向对象和事件处理。这点有必要的因为 节点的addEventListener 方法总保持函数执行的上下文为事件处理被绑定的节点，这点很重要。然而如果你使用高级面向对象技术并且需要维护回调函数的上下文是方法的实例，你必须手动调整上下文。这就是bind 带来的方便：

	function MyClass(){
	    this.element = document.createElement('div');
	    this.element.addEventListener('click', this.onClick.bind(this), false);
	}
	
	MyClass.prototype.onClick = function(e){
	    // do something
	};

当回顾bind函数的源代码，你可能注意到下面这一行相对简单的代码，调用Array的一个方法：

	Array.prototype.slice.call(arguments, 1);

有趣的是,这里需要注意的是*arguments*对象实际上并不是一个数组，然而它经常被描述为类数组(array-like)对象，很向 nodelist(*document.getElementsByTagName()*方法返回的结果)。他们包含lenght属性，值能够被索引，但他们仍然不是数组，由于他们不支持原生的数组方法，比如slice和push。然而，由于他们有和数组类似的行为，数组的方法能被调用和劫持。如果你想这样，在类数组的上下文中执行数组方法，可参照上面的例子。

这种调用其他对象方法的技术也被应用到面向对象中，当在javascript中模仿经典继承(类继承)：

	MyClass.prototype.init = function(){
	    // call the superclass init method in the context of the "MyClass" instance
	    MySuperClass.prototype.init.apply(this, arguments);
	}

通过在子类(MyClass)的实例中调用超类(MySuperClass)的方法，我们能重现这种强大的设计模式。

## 结论 ##

在你开始学习高级设计模式之前理解这些概念是非常重要的，由于作用域和上下文在现代javascript中扮演重要的和根本的角色。无论我们谈论闭包，面向对象，和继承或各种原生实现，上下文和作用域都扮演重要角色。如果你的目标是掌握javascript语言并深入了解它的组成，作用域和上下文应该是你的起点。

## 译者补充 ##

作者实现的bind函数是不完全的，调用bind返回的函数时不能传递参数，下面的代码修复了这个问题：

	if(!(‘bind’ in Function.prototype)){
	    Function.prototype.bind = function(){
	        var fn = this, context = arguments[0], args =            Array.prototype.slice.call(arguments, 1);
	        return function(){
	            return fn.apply(context, args.concat(arguments));//fixed
	        }
	    }
	}

注：本文为翻译文章，原文为 [Understanding Scope and Context in JavaScript](http://flippinawesome.org/2013/08/26/understanding-scope-and-context-in-javascript/)。