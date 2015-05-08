---
layout: post
title: JavaScript对象继承一瞥
category : javaScript
tagline: "原创"
tags : [javaScript]
keywords: [js, 对象继承]
description: 本文就来总结下，如何使用构造函数来实现继承。
---
{% include JB/setup %}

js创建之初，正值java大行其道，面向对象编程春风正盛，js借鉴了java的对象机制，但仅是看起来像，也就是js的构造函数，如下：

	function People(age) {
		this.age = age;
		this.getAge = function (){return this.age};
	}

	var p1 = new People(20);//People的实例1
	var p2 = new People(40);//People的实例2

上面的代码很像java了，通过new constructor()的方式，可以创建多个实例。

但上面代码问题是getAge方法会在每个People的实例中存在，如果实例多的话，会浪费很多空间，js采用了牺牲时间，获取空间的方法，js引入了原型理念，将方法放入原型中：

	function People(age) {
		this.age = age
	}

	People.prototype.getAge = function () {return this.age};

本文就来总结下，如何使用构造函数来实现继承。

##场景

我们假设我们有一个父构造函数People和子构造函数Student，People有一个属性age和一个方法getAge，Student有一个属性num和getNum。

	function People(age) {
		this.age = age;
	}
	People.prototype.getAge = function (){return this.age;};

	function Student(num) {
		this.num = num;
	}
	Student.prototype.getNum = function () {return this.num;};

我们要实现是Student继承People，这在js里可要费一番力气了。

##默认模式

我们可以利用js的原型机制，将子构造函数的原型属性设置为父构造函数的实例，这是js中比较常用的方式：

	function Student(num) {
		this.num = num;
	}

	Student.prototype = new People();

	Student.prototype.getNum = function () {return this.num;};

	var stu1 = new Student('123');
	
这样做其实基本实现了我们的需求，但如果深入思考上面的方式，其实有几个缺点：

1. 子类无法继承父类的实例属性
2. 会将父类的实例属性，扩展到子类的原型上
3. 修改了子类的原型属性，会导致在stu1上获取constructor属性为People，而不是Student

哦！！！

##借用构造函数

先来看看如何解决第一个问题，我们可以巧用js的call方法，如果你还不知道这个方法，请移步[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)。

	function Student(age, num) {
		People.call(this, age);
		this.num = num;
	}

我们在子构造函数内部，借用父构造函数，这样就巧妙地在子类中继承了父类的实例化属性。这其实类似java的super关键字。

##共享原型

再来看看如何解决第二个问题，解决这个问题，其实我们可以将子构造函数的原型更改为父构造函数的原型，而不是父构造函数的实例。

	Student.prototype = People.prototype;

这样就不会将父构造函数的实例属性扩展到子构造函数的原型上了。

但这样做会导致另一个问题，就是无法再在Student的原型上扩展方法了，因为会扩展同时会扩展到People的原型上。

##临时构造函数

为了解决上面引发的问题，和第三个问题。我们可以在子构造函数和父构造函数之间，加一层临时构造函数。

	function F() {
	}
	
	F.prototype = People.prototype;
	
	Student.prototype = new F();

这样就可以Student的原型上扩展子构造函数的方法，同时不影响父构造函数的原形了。

在修复一下constructor属性就ok啦

	Student.prorotype.constructor = Student;

##圣杯

我们将上面的几种方法综合起来，代码看起来就像下面这样子：
	
	//继承函数
	function inherit(C, P) {
		var F = function (){};
		F.prototype = P.prototype;
		C.prototype = new F();//临时构造函数

		C.prototype.constructor = C;//修复constructor
		C.uper = P;//存储超类
	}

	function People(age) {
		this.age = age;
	}
	People.prototype.getAge = function (){return this.age;};

	function Student(age, num) {
		Student.uber.call(this, age);
		this.num = num;
	}

	inherit(Student, People);//继承父构造函数
	Student.prototype.getNum = function () {return this.num;};

##总结

本文大部分内容其实出自，《[javascript模式](http://www.amazon.cn/gp/product/B008QTG1HS/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B008QTG1HS&linkCode=as2&tag=yanhaijing-23)》第五章 代码的复用模式。记录下来省的自己每次都要去翻书了，当然主要还是写给MM看的。









