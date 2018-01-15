---
layout: post
title: JavaScript对象继承一瞥
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [js, 对象继承]
description: 本文就来总结下，如何使用构造函数来实现继承。
---
{% include JB/setup %}

js创建之初，正值java大行其道，面向对象编程春风正盛，js借鉴了java的对象机制，但仅是看起来像，也就是js的构造函数，如下：

```javascript
function People(age) {
    this.age = age;
    this.getAge = function (){return this.age};
}

var p1 = new People(20);//People的实例1
var p2 = new People(40);//People的实例2
```

上面的代码很像java了，通过new constructor()的方式，可以创建多个实例。

但上面代码问题是getAge方法会在每个People的实例中存在，如果实例多的话，会浪费很多空间，js采用了牺牲时间，获取空间的方法，js引入了原型理念，将方法放入原型中：

```javascript
function People(age) {
    this.age = age
}

People.prototype.getAge = function () {return this.age};
```

本文就来总结下，如何使用构造函数来实现继承。

## 场景

我们假设我们有一个父构造函数People和子构造函数Student，People有一个属性age和一个方法getAge，Student有一个属性num和getNum。

```javascript
function People(age) {
    this.age = age;
}
People.prototype.getAge = function (){return this.age;};

function Student(num) {
    this.num = num;
}
Student.prototype.getNum = function () {return this.num;};
```

我们要实现是Student继承People，这在js里可要费一番力气了。

## 默认模式

我们可以利用js的原型机制，将子构造函数的原型属性设置为父构造函数的实例，这是js中比较常用的方式：

```javascript
function Student(num) {
    this.num = num;
}

Student.prototype = new People();

Student.prototype.getNum = function () {return this.num;};

var stu1 = new Student('123');
```

这样做其实基本实现了我们的需求，但如果深入思考上面的方式，其实有几个缺点：

1. 子类无法继承父类的实例属性
2. 会将父类的实例属性，扩展到子类的原型上
3. 修改了子类的原型属性，会导致在stu1上获取constructor属性为People，而不是Student

哦！！！

## 借用构造函数

先来看看如何解决第一个问题，我们可以巧用js的call方法，如果你还不知道这个方法，请移步[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)。

```javascript
function Student(age, num) {
    People.call(this, age);
    this.num = num;
}
```

我们在子构造函数内部，借用父构造函数，这样就巧妙地在子类中继承了父类的实例化属性。这其实类似java的super关键字。

## 共享原型

再来看看如何解决第二个问题，解决这个问题，其实我们可以将子构造函数的原型更改为父构造函数的原型，而不是父构造函数的实例。

```javascript
Student.prototype = People.prototype;
```

这样就不会将父构造函数的实例属性扩展到子构造函数的原型上了。

但这样做会导致另一个问题，就是无法再在Student的原型上扩展方法了，因为会扩展同时会扩展到People的原型上。

## 临时构造函数

为了解决上面引发的问题，和第三个问题。我们可以在子构造函数和父构造函数之间，加一层临时构造函数。

```javascript
function F() {}

F.prototype = People.prototype;

Student.prototype = new F();
```

这样就可以Student的原型上扩展子构造函数的方法，同时不影响父构造函数的原形了。

在修复一下constructor属性就ok啦

```javascript
Student.prorotype.constructor = Student;
```

## 圣杯

我们将上面的几种方法综合起来，代码看起来就像下面这样子：

```javascript
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

var s = new Student(20, 100);
s.getNum(); // 100
s.getAge(); // 20
```

如果你的环境支持ES5，对于ie等可以引入es5shim，那么可以使用Object.create来实现同样的功能

```js
function inherit(C, P) {
    // 等同于临时构造函数
    C.prototype = Object.create(P.prototype);

    C.prototype.constructor = C; // 修复constructor
    C.uper = P;//存储超类
}
```

## 圣杯的遗失

上面的圣杯模式接近完美了，但却漏了一点，就是类的静态属性集成的问题，举个例子

```javascript
People.say = function (word) {console.log(word)};
inherit(Student, People); // 继承父构造函数
Student.say() // Student应该可以继承People的静态方法，但目前还没能实现
```

下面给出解决办法

```javascript
//继承函数
function inherit(C, P) {
    // 等同于临时构造函数
    C.prototype = Object.create(P.prototype);

    C.prototype.constructor = C;//修复constructor
    C.uper = P;//存储超类

    // 静态属性继承，慎用，有坑
    if (Object.setPrototypeOf) {
        // setPrototypeOf es6
        Object.setPrototypeOf(C, P);
    } else if (C.__proto__) {
        // __proto__ es6引入，但是部分浏览器早已支持
        C.__proto__ = P;
    } else {
        // 兼容ie10-等陈旧浏览器
        // 将P上的静态属性和方法拷贝一份到C上，不会覆盖C上的方法
        for (var k in P) {
            if (P.hasOwnProperty(k) && !(k in C)) {
                C[k] = P[k];
            }
        }
    }
}
```

上面静态属性继承的问题，在于在陈旧浏览器中，属性和方法的继承是静态拷贝的，继承完后续父类的改动不会自动同步到子类，这是一个坑

```javascript
People.say = function (word) {console.log(word)};
inherit(Student, People);//继承父构造函数
People.say = function (word) {console.log(word + 123)};
Student.say('abc') // abc 而不是 abc123
```

## 后ES6时代的圣杯

ES6带来了原生class，从此继承这件事终于有了简单的写法

```javascript
class People {
    constructor(age) {
        this.age = age;
    }
    getAge() {
        return this.age;
    }
}

class Student extends People {
    constructor(age, num) {
        super(age);
        this.num = num;
    }
    getNum() {
        return this.num;
    }
}

var s = new Student(20, 100);
s.getNum(); // 100
s.getAge(); // 20
```

但是上面的写法需要支持ES6语法的浏览器才可以执行，在旧版本浏览器中，可以使用Babel来编译代码，同样需要注意的Babel编译结果对静态类的实现中没上上面方法中最后的else分支，也就是在旧浏览器中静态属性不会继承

如果你使用Babel，并且需要兼容成旧浏览器，最好的做法是避免静态属性继承，或者硬编码，直接引用父类是更好的做法

## 总结

本文大部分内容其实出自，《[javascript模式](http://www.amazon.cn/gp/product/B008QTG1HS/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B008QTG1HS&linkCode=as2&tag=yanhaijing-23)》第五章 代码的复用模式。记录下来省的自己每次都要去翻书了，当然主要还是写给MM看的。

本文仅仅讲述了继承相关的内容，关于JavaScript面向对象相关的内容，建议阅读下面的文章：

- [一段代码详解JavaScript面向对象](http://yanhaijing.com/javascript/2014/05/15/a-code-explain-javascript-oop/)
- [JavaScript原型之路](http://yanhaijing.com/javascript/2014/07/18/javascript-prototype/)
- [详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)
- [Javascript继承-原型的陷阱](http://yanhaijing.com/javascript/2013/08/23/javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes/)
