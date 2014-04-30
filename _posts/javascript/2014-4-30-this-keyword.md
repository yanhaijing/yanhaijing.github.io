---
layout: post
title: JavaScript中的this关键字
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 本文主要介绍了JavaScript中的作用域和提升机制的相关知识
---
{% include JB/setup %}

你知道下面的JavaScript代码执行时会输出什么吗？

	var foo = 1;
	function bar() {
	    if (!foo) {
	        var foo = 10;
	    }
	    alert(foo);
	}
	bar();
答案是“10”，吃惊吗？那么下面的可能会真的让你大吃一惊：

	var a = 1;
	function b() {
	    a = 10;
	    return;
	    function a() {}
	}
	b();
	alert(a);
这里浏览器会弹出“1”。怎么回事？这似乎看起来是奇怪，未知，让人混淆的，但这实际上是这门语言一个强大和富有表现力的特性。我不知道这一特性行为是否有标准名字，但我喜欢这个术语“提升（hoisting）”。本文试图揭示这一特性的机制，但首先让我们链接JavaScript的作用域。

##JavaScript中的作用域（scope）

JavaScript初学者最容易混淆的地方是作用域。实际上，不只是初学者。我遇到过许多经验丰富的JavaScript程序员，却不完全明白作用域。JavaScript的作用域如此容易混淆的原因是它看起来很像C家族的语言（类C语言）。考虑下面的C程序：

	#include <stdio.h>
	int main() {
	    int x = 1;
	    printf("%d, ", x); // 1
	    if (1) {
	        int x = 2;
	        printf("%d, ", x); // 2
	    }
	    printf("%d\n", x); // 1
	}
程序的输出是1，2，1.这是因为C和C家族的语言有**块级作用域**（block-level scope）。当控制流进入一个块，比如if语句，新的变量会在块作用域里声明，不会对外面作用域产生印象。这不适用于JavaScript。在Firebug里运行下面的代码：

	var x = 1;
	console.log(x); // 1
	if (true) {
	    var x = 2;
	    console.log(x); // 2
	}
	console.log(x); // 2
在这个例子中，Firebug将输出1，2，2。这是因为JavaScript有**函数级作用域**（function-level scope）。这一点和C家族完全不同。语句块，如if语言，不创建新的作用域。仅仅函数创建新作用域。

很多程序员，像C，C++，C#或Java，都不知道这点，也不希望这样。幸运的是，因为JavaScript函数的灵活性，有一个解决方案。你若你必须要在函数内部创建一个临时作用域，像下面这样做：

	function foo() {
	    var x = 1;
	    if (x) {
	        (function () {
	            var x = 2;
	            // 此处省略一万个字
	        }());
	    }
	    // x 仍然是 1.
	}
这方法实际上相当灵活，可以在你需要临时作用域的时候随意使用，不局限于块级语句内部。然而，我强烈建议你花时间去了解和欣赏JavaScript的作用域。它非常强大，是这门语言中我最喜欢的特性之一。如果你了解作用域，将更容易理解提升。

##声明，名字和提升（Hoisting）

在JavaScript中，作用域中的名字（属性名）有四种基本来源：

1. **语言定义：**默认所有作用域都有属性名this和arguments。
2. **形参：**函数可能有形式参数，其作用域是整个函数体内部。
3. **函数声明：**类似于function foo() {}这种形式。
4. **变量声明：**var foo;这种形式的代码。
函数声明和变量声明总是被JavaScript解释器无形中移动到（提升）包含他们的作用域顶部。函数参数和语言定义的名称明显总是存在。这意味着像下面的代码：

	function foo() {
	    bar();
	    var x = 1;
	}
实际上被解释为像下面这样：

	function foo() {
	    var x;
	    bar();
	    x = 1;
	}
无论包含声明的代码行是否会被执行，上面的过程都会发生。下面的两个函数是等价的：

	function foo() {
	    if (false) {
	        var x = 1;
	    }
	    return;
	    var y = 1;
	}
	function foo() {
	    var x, y;
	    if (false) {
	        x = 1;
	    }
	    return;
	    y = 1;
	}
注意变量声明中赋值的过程不会被提升。仅仅变量名字被提升了。这不适用于函数声明，整个函数体也会提升。但不要忘记有两种声明函数的方法。考虑下面的JavaScript代码：

	function test() {
	    foo(); // 类型错误 “foo 不是一个函数”
	    bar(); // “这能运行”
	    var foo = function () { // 将函数表达式赋值给本地变量“foo”
	        alert("this won't run!");
	    }
	    function bar() { //  'bar'函数声明，分配“bar”名字
	        alert("this will run!");
	    }
	}
	test();
在这种情况下，仅仅函数声明的函数体被提升到顶部。名字“foo”被提升，但后面的函数体，在执行的时候才被指派。

这是全部的基本提升，看起来并不复杂和让人混淆。当然，这是JavaScript，在某些特殊性况下会更复杂一点。

###名字解析顺序

需要记住的最重要的特殊情况是名字的解析顺序。记住作用域中的名字有四种来源。上面我列出他们的顺序是他们被解析的顺序。一般来说，如果一个名字已经被定义过，那么它不会在被其他有相同名字的属性重写。这意味着函数声明优先于变量声明。这并不意味着为名字赋值的过程将不工作，仅仅声明的过程会被忽略。有几个例外情况：

- 函数的内置变量arguments比较奇怪。它看起来是在普通的函数参数之后才声明，其实是在函数声明之前。如果参数里面有名称为arguments的参数，它会比内置的那个优先级高，即使它是undefined。所以不要使用arguments作为为函数参数的名称。
- 尝试使用this作为标示符的地方都会造成一个语法错误。这是一个很好的特性。
- 如果多个参数具有相同的名字，那么最后一个参数会优先于先前的，即使它是undefined。
###命名函数表达式

你可以在函数表达式给中给函数命名，用这样的语法不能完成一个函数声明，下面有一些代码来说明我的意思：

	foo(); // TypeError "foo is not a function"
	bar(); // valid
	baz(); // TypeError "baz is not a function"
	spam(); // ReferenceError "spam is not defined"
	
	var foo = function () {}; // 匿名函数表达式（“foo”会被提升）
	function bar() {}; // 函数声明（“bar”和函数体会被提升）
	var baz = function spam() {}; // 命名函数表达式（仅“baz”会被提升）
	
	foo(); // valid
	bar(); // valid
	baz(); // valid
	spam(); // ReferenceError "spam is not defined"
##编码时如何使用这些知识

现在你应该理解了作用域和提升（hoisting），那么我们在编写JavaScript的时候应该怎么做呢？最重要的事情就是始终用var表达式来声明你的变量。我**强烈建议**你使用单var模式（single var）。如果你强迫自己做到这一点，你将永远不会遇到任何与变量提升相关的混乱的问题。但是这样做也让我们很难跟踪那些在当前作用域中实际上已经声明的变量。我建议你使用[JSLint](http://www.jslint.com/)和声明一次原则来进行实际操作，如果你这样做了，你的代码应该会看起来像这样：

	/*jslint onevar: true [...] */
	function foo(a, b, c) {
	    var x = 1,
	        bar,
	        baz = "something";
	}
##标准给出的解释

我翻了翻[ECMAScript标准](http://yanhaijing.com/es5/)，想直接了解这些东西是如何工作的，发现效果不错。这里我不得不说关于变量声明和作用域（第12.2.2节）的内容：

>如果在一个函数中声明变量，这些变量就被定义在了在该函数的函数作用域中，见第10.1.3所述。不然它们就是被定义在全局的作用域内（即，它们被创建为全局对象的成员，见第10.1.3所述），当进入执行环境的时候，变量就被创建。一个语句块不能定义一个新的作用域。只有一个程序或者函数声明能够产生一个新的作用域。创建变量时，被初始化为undefined。如果变量声明语句里面带有赋值操作，则赋值操作只有被执行到声明语句的时候才会发生，而不是创建的时候。

我希望这篇文章阐明了对JavaScript程序员来说最常见的迷惑问题，我试图讲的尽可能详尽，以避免造成更多的迷惑，如果我说错了或者有大的遗漏，请通知我。

##注

原文 http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
