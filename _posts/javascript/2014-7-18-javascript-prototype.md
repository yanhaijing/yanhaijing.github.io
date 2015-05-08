---
layout: post
title: JavaScript原型之路
category : javascript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 最近我在学习Frontend Masters 上的高级JavaScript系列教程，Kyle 带来了他的“OLOO”（对象链接其他对象）概念。这让我想起了Keith Peters 几年前发表的一篇博文，关于学习没有“new”的世界，其中解释了使用原型继承代替构造函数。两者都是纯粹的原型编码
---
{% include JB/setup %}

## 简介

最近我在学习Frontend Masters 上的[高级JavaScript系列教程](https://frontendmasters.com/courses/advanced-javascript/)，Kyle 带来了他的“OLOO”（对象链接其他对象）概念。这让我想起了Keith Peters 几年前发表的一篇博文，关于[学习没有“new”的世界](http://www.adobe.com/devnet/html5/articles/javascript-object-creation.html)，其中解释了使用原型继承代替构造函数。两者都是纯粹的原型编码。

## 标准方法（The Standard Way）

一直以来，我们学习的在 JavaScript 里创建对象的方法都是创建一个构造函数，然后为函数的原型对象添加方法。

	function Animal(name) {
	  this.name = name;
	}
	Animal.prototype.getName = function() {
	  return this.name;
	};

对于子类的解决方案是，创建一个新的构造函数，并且设置其原型为其父类的原型。调用父类的构造函数，并将this设置为其上下文对象。

	function Dog(name) {
	  Animal.call(this, name);
	}
	Dog.prototype = Object.create(Animal.prototype);
	Dog.prototype.speak = function() {
	  return "woof";
	};
	
	var dog = new Dog("Scamp");
	console.log(dog.getName() + ' says ' + dog.speak());

## 原型方法（The Prototypal Way）

如果你接触过任何原型语言，你会觉得上面的例子看起来很奇怪。我尝试过 [IO 语言](http://iolanguage.org/)&mdash;&mdash;一门基于原型的语言。在原型语言中，可以通过克隆对象并添加属性和方法的方式创建一个原型。然后你能克隆刚才创建的原型，从而创建一个可以使用的实例，或者克隆它来创建另一个原型。上面的例子在 IO 里，看起来像下面这样：

	Animal := Object clone
	Animal getName := method(name)
	
	Dog := Animal clone
	Dog speak := method("woof")
	
	dog := Dog clone
	dog name := "Scamp"
	writeln(dog getName(), " says ", dog speak())

## 好消息（The Good News）

在JavaScript中，也可以使用这种编码方式！Object.create 函数和 IO 里的 clone 类似。下面是在JavaScript中，纯原型的实现。除了语法不同之外，和 IO 版本一样。

	Animal = Object.create(Object);
	Animal.getName = function() {
	  return this.name;
	};
	
	Dog = Object.create(Animal);
	Dog.speak = function() {
	  return "woof";
	};
	
	var dog = Object.create(Dog);
	dog.name = "Scamp";
	console.log(dog.getName() + ' says ' + dog.speak());

## 坏消息（The Bad News）

<span class="Apple-converted-space"><span class="Apple-converted-space">当使用构造函数时，JavaScript 引擎会进行优化。在 [JSPerf ](http://jsperf.com/proto-vs-ctor/3)上测试两个不同的操作，显示基于原型的实现比使用构造函数的方式最多慢90多倍。</span></span>

![Perf Graph](http://jurberg.github.io/images/proto-vs-ctor.png)

<span class="Apple-converted-space">另外，如果你使用类似 [Angular ](https://angularjs.org/)的框架，当创建控制器和服务时，必须使用构造函数。</span>

## 引入类（Enter Classes）

ES6带来了新的 class 语法。但其只是标准构造函数方法的语法糖。新的语法看起来更像 Java 或 c#，但其幕后仍然是创建原型对象。这会让来自基于类语言的人感到迷惑，因为当创建原型时，他们希望类和他们的语言有相同的属性。

	class Animal {
	  constructor(name) {
	    this.name = name;
	  }
	  getName() {
	    return this.name;
	  }
	}
	
	class Dog extends Animal {
	  constructor(name) {
	    super(name);
	  }
	  speak() {
	    return "woof";
	  }
	}
	
	var dog = new Dog("Scamp");
	console.log(dog.getName() + ' says ' + dog.speak());

## 结论（Conclusion）

如果让我选择，我会用纯原型的风格。这更具有表现力，动态和有趣。由于虚拟机会对构造函数方法进行优化，所有框架都会选择构造函数方法，在产品代码中，我会继续使用构造函数。一旦 ES6 变得流行，我希望使用新的类语法代替古老的构造函数方法。

## 注

英文：http://jurberg.github.io/blog/2014/07/12/javascript-prototype/