---
layout: post
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 在学习javascript的过程中，许多新手发现很难弄明白javascript复杂的的原型继承工作机制。在这篇文章中我谈谈在通过父函数的原型继承模型中如何实现实例属性。
---
{% include JB/setup %}

在学习javascript的过程中，许多新手发现很难弄明白javascript复杂的的原型继承工作机制。在这篇文章中我谈谈在通过父函数的原型继承模型中如何实现实例属性。

## 一个简单的Widget 对象 ##

在下面的代码中，我们有个一父类 Widget，父类有个属性 messages和父类为Widget的SubWidget类。在这种情况下我们想让SubWidget的每个实例在初始化的时候一个空的消息数组:

	var Widget = function( name ){
	   this.messages = [];
	};
	
	Widget.prototype.type='Widget';
	
	var SubWidget = function( name ){
	  this.name = name;
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	};
	
	SubWidget.prototype = new Widget();
在我们设置SubWidget 的原型为Widget的一个实例之前，对象的关系图如下：

![]({{ BLOG_IMG }}1.png)

代码最后一行将SubWidget的父类设置为Widget类的一个实例，"new"关键字背后，创建了继承树并且绑定了对象的原型链，现在我们的对象关系图看起来像下面这样：

![]({{ BLOG_IMG }}2.png)

你看出问题所在了吗？让我们创建子类的实例凸显问题：

	var sub1 = new SubWidget( 'foo' );
	var sub2 = new SubWidget( 'bar' );
	
	sub1.messages.push( 'foo' ); 
	sub2.messages.push( 'bar' );
现在我们的对象关系图看起来像这样：

![]({{ BLOG_IMG }}3.png)

在谈论真正的问题之前，我想想退一步，先谈谈widget构造函数中的属性(type)，如果在实例初始化过程中没有初始化属性(type)那实际上这个属性存在widget构造函数中(实际上存在wedget的实例中，也就是subwidget实例的原型中)。然而，一旦在(子类实例)初始化过程中属性被赋予新值，如 sub1.type = 'Fuzzy Bunny'，它将变成实例的属性，如图所示：

![]({{ BLOG_IMG }}4.png)

## 思考问题 ##

我们的bug开始变得很清晰，让我们输出sub1和sub2的messages数组：

	var Widget = function(){
	   this.messages = [];
	};
	
	Widget.prototype.type='Widget';
	
	var SubWidget = function( name ){
	  this.name = name;
	};
	
	SubWidget.prototype = new Widget();
	
	var sub1 = new SubWidget( 'foo' );
	var sub2 = new SubWidget( 'bar' );
	
	sub1.messages.push( 'foo' ); 
	sub2.messages.push( 'bar' );
	
	console.log( sub1.messages ); //[ 'foo', 'bar' ]
	console.log( sub2.messages ); //[ 'foo', 'bar' ]
如果你运行这段代码，在你的控制台将出现2个重复 ["foo", "bar"]。每个对象共享相同的messages数组。

## 解决问题 ##

最容易想到的办法，我们可以给SubWidget构造函数添加新属性，如下所示：

	var SubWidget = function( name ){
	  this.name = name;
	  this.messages = [];
	};
然而，如果我们想创建其他继承自Widget的对象呢？新对象也要添加消息数组。很快维护和扩展我们的代码将变成一场噩梦。另外，如果我们想给Widget构造函数添加其他属性，我们如何将这些属性编程子类的实例属性？这种方法是不可重用的和不够灵活。

为了妥善解决这个问题，需要给我们的SubWidget构造函数添加一行代码，调用Widget构造函数并且传入SubWidget构造函数的作用域。为此我们要用apply()方法，可以灵活的无副作用的将SubWidget构造函数的arguments传入Widget构造函数中。

	var Widget = function(){
	   this.messages = [];
	};
	
	Widget.prototype.type='Widget';
	
	var SubWidget = function( name ){
	
	  this.name = name;
	
	  Widget.apply( this, Array.prototype.slice.call(arguments) );
	};
	
	SubWidget.prototype = new Widget();
apply()方法可以让我们可以将messages数字的作用域更改为SubWidget的实例。现在我们创建的每一个实例对象都有一个实例messages 数组。
	
	var Widget = function( ){
	   this.messages = [];
	};
	
	Widget.prototype.type='Widget';
	
	var SubWidget = function( name ){
	
	  this.name = name;
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	};
	
	SubWidget.prototype = new Widget();
	
	var sub1 = new SubWidget( 'foo' );
	var sub2 = new SubWidget( 'bar' );
	
	sub1.messages.push( 'foo' );
	
	sub2.messages.push( 'bar' );
	
	console.log(sub1.messages); // ['foo']
	console.log(sub2.messages); // ['bar']
运行上面的代码，你将看见 ["foo"] 和 ["bar"] ，因为我们的对象实例现在有自己的messages数组属性。

现在我们的对象关系图如下：

![]({{ BLOG_IMG }}5.png)

## 译者补充 ##

上面的继承方式是借用构造函数模式，《javascript patterns》中有详细介绍，作者写的很详细了，但有2个小问题在此补充：

1

	var SubWidget = function( name ){
	
	  this.name = name;
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	};
作者的代码中父类会覆盖子类的属性，这有悖于重构的概念，稍加改变即可，在子类构造函数中先调用父类构造函数，这相当于java中的super：

	var SubWidget = function( name ){
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	  this.name = name;
	};
2

	var SubWidget = function( name ){
	
	  this.name = name;
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	};

SubWidget.prototype = new Widget();
父类的属性被初始化了2次，一次是借用构造函数，一次是new Widget(),造成浪费，稍加改变即可：

	var SubWidget = function( name ){
	
	  this.name = name;
	  Widget.apply( this, Array.prototype.slice.call( arguments ) );
	};
	
	SubWidget.prototype = Widget.prototype;

注：本文为翻译文章，原文为"[JavaScript Inheritance – How To Shoot Yourself In the Foot With Prototypes!](http://flippinawesome.org/2013/06/03/javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes/#comment-2875 "javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes")"
 