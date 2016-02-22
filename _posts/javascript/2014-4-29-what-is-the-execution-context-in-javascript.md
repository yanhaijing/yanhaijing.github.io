---
layout: post
title: 了解JavaScript的执行上下文
category : javascript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 在这篇文章里，我将深入研究JavaScript中最基本的部分——执行上下文（execution context）。读完本文后，你应该清楚了解解释器做了什么，为什么函数和变量能在声明前使用以及他们的值是如何决定的。
---
{% include JB/setup %}

在这篇文章里，我将深入研究JavaScript中最基本的部分——执行上下文（execution context）。读完本文后，你应该清楚了解解释器做了什么，为什么函数和变量能在声明前使用以及他们的值是如何决定的。

## 什么是执行上下文？

当JavaScript代码运行，执行环境非常重要，有下面几种不同的情况：

- 全局代码——你的代码首次执行的默认环境。
- 函数代码——每当进入一个函数内部。
- Eval代码——eval内部的文本被执行时。

在网上你能读到许多关于作用域（scope）的资源，本文的目的是让事情变得更简单，让我们将术语执行上下文想象为当前被执行代码的环境/作用域。说的够多了，现在让我们看一个包含全局和函数上下文的代码例子。

![]({{ BLOG_IMG }}136.jpg)

很简单的例子，我们有一个被紫色边框圈起来的全局上下文和三个分别被绿色，蓝色和橘色框起来的不同函数上下文。只有全局上下文（的变量）能被其他任何上下文访问。

你可以有任意多个函数上下文，每次调用函数创建一个新的上下文，会创建一个私有作用域，函数内部声明的任何变量都不能在当前函数作用域外部直接访问。在上面的例子中，函数能访问当前上下文外面的变量声明，但在外部上下文不能访问内部的变量/函数声明。为什么会发生这种情况？代码到底是如何被解释的？

## 执行上下文堆栈

浏览器里的JavaScript解释器被实现为单线程。这意味着同一时间只能发生一件事情，其他的行文或事件将会被放在叫做执行栈里面排队。下面的图是单线程栈的抽象视图：

![]({{ BLOG_IMG }}137.jpg)

我们已经知道，当浏览器首次载入你的脚本，它将默认进入全局执行上下文。如果，你在你的全局代码中调用一个函数，你程序的时序将进入被调用的函数，并穿件一个新的执行上下文，并将新创建的上下文压入执行栈的顶部。

如果你调用当前函数内部的其他函数，相同的事情会在此上演。代码的执行流程进入内部函数，创建一个新的执行上下文并把它压入执行栈的顶部。浏览器将总会执行栈顶的执行上下文，一旦当前上下文函数执行结束，它将被从栈顶弹出，并将上下文控制权交给当前的栈。下面的例子显示递归函数的执行栈调用过程：

	(function foo(i) {
	    if (i === 3) {
	        return;
	    }
	    else {
	        foo(++i);
	    }
	}(0));

![]({{ BLOG_IMG }}138.gif)

这代码调用自己三次，每次给i的值加一。每次foo函数被调用，将创建一个新的执行上下文。一旦上下文执行完毕，它将被从栈顶弹出，并将控制权返回给下面的上下文，直到只剩全局上下文能为止。

**有5个需要记住的关键点，关于执行栈（调用栈）：**

- 单线程。
- 同步执行。
- 一个全局上下文。
- 无限制函数上下文。
- 每次函数被调用创建新的执行上下文，包括调用自己。

## 执行上下文的细节

我们现在已经知道没次调用函数，都会创建新的执行上下文。然而，在JavaScript解释器内部，每次调用执行上下文，分为两个阶段：

1. 创建阶段【当函数被调用，但未执行任何其内部代码之前】：
  - 创建作用域链（[Scope Chain](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)）
  - 创建变量，函数和参数。
  - 求”this“的值。
2. 激活/代码执行阶段：
  - 指派变量的值和函数的引用，解释/执行代码。

可以将每个执行上下文抽象为一个对象并有三个属性：

	executionContextObj = {
	    scopeChain: { /* 变量对象（variableObject）+ 所有父执行上下文的变量对象*/ }, 
	    variableObject: { /*函数 arguments/参数，内部变量和函数声明 */ }, 
	    this: {} 
	}

### 激活/变量对象【AO/VO】

当函数被调用是executionContextObj被创建，但在实际函数执行之前。这是我们上面提到的第一阶段，创建阶段。在此阶段，解释器扫描传递给函数的参数或arguments，本地函数声明和本地变量声明，并创建executionContextObj对象。扫描的结果将完成变量对象的创建。

**下面是解释器如果执行代码的伪逻辑：**

1. 查找调用函数的代码。
2. 执行函数代码之前，先创建执行上下文。
3. 进入创建阶段：
    - 初始化作用域链：
    - 创建变量对象：
        + 创建arguments对象，检查上下文，初始化参数名称和值并创建引用的复制。
        + 扫描上下文的函数声明：
            - 为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用。
            - 如果函数的名字已经存在，引用指针将被重写。
        + 扫面上下文的变量声明：
            - 为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为[undefined](http://davidshariff.com/blog/javascripts-undefined-explored/)
            - 如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。
    - 求出上下文内部“this”的值。
4. 激活/代码执行阶段：
    - 在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。
   
让我们看一个例子：

	function foo(i) {
	    var a = 'hello';
	    var b = function privateB() {
	
	    };
	    function c() {
	
	    }
	}
	
	foo(22);
 

当调用foo(22)时，创建状态像下面这样：

	fooExecutionContext = {
	    scopeChain: { ... },
	    variableObject: {
	        arguments: {
	            0: 22,
	            length: 1
	        },
	        i: 22,
	        c: pointer to function c()
	        a: undefined,
	        b: undefined
	    },
	    this: { ... }
	}

真如你看到的，创建状态负责处理定义属性的名字，不为他们指派具体的值，以及形参/实参的处理。一旦创建阶段完成，执行流进入函数并且激活/代码执行阶段，看下函数执行完成后的样子：

	fooExecutionContext = {
	    scopeChain: { ... },
	    variableObject: {
	        arguments: {
	            0: 22,
	            length: 1
	        },
	        i: 22,
	        c: pointer to function c()
	        a: 'hello',
	        b: pointer to function privateB()
	    },
	    this: { ... }
	}

### 提升（Hoisting）

你能在网上找到很多定义JavaScript hoisting术语的资源，解释变量和函数声明被提升到函数作用域的顶部。然而，没有人解释为什么会发生这种情况的细节，学习了上面关于解释器如何创建爱你活动对象的新知识，很容易明白为什么。看下面的例子：

	(function() {
	
	    console.log(typeof foo); // 函数指针
	    console.log(typeof bar); // undefined
	
	    var foo = 'hello',
	        bar = function() {
	            return 'world';
	        };
	
	    function foo() {
	        return 'hello';
	    }
	
	}());
​
我们能回答下面的问题：

- **为什么我们能在foo声明之前访问它？**
    - 如果我们跟随创建阶段，我们知道变量在激活/代码执行阶段已经被创建。所以在函数开始执行之前，foo已经在活动对象里面被定义了。
- **Foo被声明了两次，为什么foo显示为函数而不是undefined或字符串？**
    - 尽管foo被声明了两次，我们知道从创建阶段函数已经在活动对象里面被创建，这一过程发生在变量创建之前，并且如果属性名已经在活动对象上存在，我们仅仅更新引用。
    - 因此，对foo()函数的引用首先被创建在活动对象里，并且当我们解释到var foo时，我们看见foo属性名已经存在，所以代码什么都不做并继续执行。
- **为什么bar的值是undefined？**
    - bar实际上是一个变量，但变量的值是函数，并且我们知道变量在创建阶段被创建但他们被初始化为undefined。

## 总结

希望现在你了解JavaScript解释器如何执行你的代码。了解执行上下文和堆栈，将有助于你了解背后的原因——为什么你的代码被解释为和你最初希望不同的值。

你想知道解释器内部的运作的开销太大，或者你的JavaScript知识的必要性？知道执行上下文相帮你写出更好的JavaScript？

你想知道解释器的内部工作原理，需要太多篇幅，和必要的JavaScript知识。知道执行上下文能帮你写出更好的JavaScript代码。

**注意：**有些人一直在问闭包，回调，延时等问题，我将在[下一篇文章](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)里提到，更多关注域执行上下文有关的[作用域链](http://davidshariff.com/blog/javascript-scope-chain-and-closures/)相关方面。

## 深入阅读

- [ECMA-262 5th Edition](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
- [ECMA-262-3 in detail. Chapter 2. Variable object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)
- [Identifier Resolution, Execution Contexts and scope chains](http://jibbering.com/faq/notes/closures/#clIRExSc)

## 注

原文：http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/
