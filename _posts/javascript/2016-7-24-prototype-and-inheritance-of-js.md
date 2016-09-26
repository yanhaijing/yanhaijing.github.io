---
layout: post
title: 详解JavaScript中的原型和继承
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [原型, prototype, inheritance, javascript]
description: 本文将会介绍面向对象，继承，原型等相关知识
---
{% include JB/setup %}
最近组内的童鞋和我说的自己一直搞不太清楚js原型这一块的东西，我想了想觉得这东西也不是一两句话就能解释清楚的，所以我决定来解释解释js中的原型机制，希望也能帮到你。

本文将会介绍面向对象，继承，原型等相关知识，涉及的知识点如下：

- 面向对象与继承
- CEOC
- OLOO
- 臃肿的对象
- 原型与原型链
- 修改原型的方式

## 面向对象与继承
最近学习了下python，还写了篇博文《[重拾编程乐趣——我的Python笔记](http://yanhaijing.com/program/2016/06/28/my-python/)》，加深了我对面向对象的一些理解。

我们会对我们写的程序进行抽象，而不同的语言都提供了不同的抽象工具，比如各种语言里面的数组，集合(键值数组，哈希表，字典等)等提供了对数据的抽象；而VB里面的子程序，类C语言里面的函数，提供了抽象代码段的能力。

有时我们希望将数据和对数据的操作封装到一起，这被称作对象，是一种更高唯独的抽象工具，而这种抽象工具——对象可以对现实世界进行建模。

现实世界中的事物都有一些联系，比如我们可以抽象出来猫，然后又公猫，母猫，显然公猫应该拥有猫的特性，这也就是继承，细分的事物应该有高纬度事物的特点。

想要实现对象和继承这套思维，目前有两种实现方法，分别是CEOC和OLOO。

## CEOC
CEOC(class extend other class)是一套基于类和实例的实现方式，这种方式实用的比较广泛，大部分流星的面向对象语言都在使用，比如java，python等。

类作为对象的抽象描述，对象是类的实例，也称作类的泛化，泛化和抽象对应。最恰当的类比就是盖房子了，类就相当于房子的图纸，图纸是对房子属性和功能的描述，根据图纸可以盖很多个类似的房子；另一种类比就是磨具和零件，磨具相当于类，零件相当于对象，通过磨具我们可以造出来很多零件。

其实与其说是面向对象还不如说是面向类编程，在这种机制中解决上面提到的继承逻辑时，是在类上实现的，子类可以继承父类。

在类的机制中更像是对工厂里通过磨具造零件机制的模拟，而非动物世界这种繁衍继承机制的模拟，下面介绍的OLOO则是对世界更好的模拟。

## OLOO
OLOO(object link other object)是一套基于对象和原型的实现方式，这种方式唯一实现广泛语言就是js了，熟悉类机制的同学，初次接触这个，可能会觉得不是很好理解，而很多前端同学理解的也不是很明白，之前写过一篇原型的文章，推荐大家阅读《[JavaScript原型之路](http://yanhaijing.com/javascript/2014/07/18/javascript-prototype/)》。

其实面向类的机制有些多此一举了，因为最后使用的是对象，而不是类，那么我们直接让对象可以集成对象不就行了，在这种机制中可以通过某种操作让对象和对象之间可以建立继承的关系，当继承的对象(子对象)中没有某些属性时可以去被继承的对象(父对象)中去查找。

在OLOO中，父对象也可以成为子对象的原型，这有些类似我们的人类的繁衍，每一个人都是一个对象，都是父母所生，而不是用模版建造出来的，每一个人都有一个父亲，孩子和父亲之间有一种特殊的关系，成为父子。

## 臃肿的对象
来说说JS中的对象机制，JS中的对象显得有些臃肿，JS中的对象承接了两个功能，一是面向对象机制中的对象，另一个是数据抽象中的集合——其他语言中称为键值数组，哈希表或字典。

其实在其它语言中的对象都不耦合集合的功能，比如python中有字典，php中有键值数组，好在es2015中引入新的map类型，来把这个功能解耦出去，但我相信很多人都习惯这么使用了o(╯□╰)o

而本文所说的对象不包括后面的这一部分功能，特指js中面向对象机制中的对象。

## 原型与原型链
js语言是基于原型的语言，在js中几乎一切都是对象，每个对象都有原型，而原型也是一个对象，也有自己的原型，从而形成原型链。

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

js中提到原型可能有不同的意思，我们得先区分清楚，需要清除到底是哪个原型：

1. js是基于原型的语言中的prototype
2. 每个对象都有自己的原型中的prototype
3. 每个函数都有一个原型属性中的prototype

第一点中的prototype是一个概念，一种机制，而不是具体的什么东西。

第二点中的prototype是说每个对象都有自己的原型对象（父对象），下面我们用[[Prototype]]来指代这个原型对象。

第三点和第二点很容易混淆，每个函数都有一个原型属性，我们用prototype来指代。

es5带来了查看对象原型的方法——Object.getPrototypeOf，该方法返回指定对象的原型（也就是该对象内部属性[[Prototype]]的值）。

    console.log(Object.getPrototypeOf({}))
    >>> Object.prototype

es6带来了另一种查看对象原型的方法——Object.prototype.\_\_proto\_\_，一个对象的__proto__ 属性和自己的内部属性[[Prototype]]指向一个相同的值 (通常称这个值为原型),原型的值可以是一个对象值也可以是null(比如说Object.prototype.__proto__的值就是null)。

    ({}).__proto__
    >>> Object.prototype

下面举个例子来说说原型与原型链，以及访问对象属性的时候会发生的行为：

    // a ---> b 代表b是a的原型
    
## 修改原型的方式
在js中创建和修改原型的方法有很多，下面一一列举出来。

在下面的例子中我们将对象a的[[Prototype]]指向b。
    
    // a ---> b

### 使用普通语法创建对象
这是最容易被大家忽略的方法，在js中你是绕不过原型的，不经意间就创建了原型

    var o = {a: 1};
    // o ---> Object.prototype ---> null

    var a = [];
    // a ---> Array.prototype ---> Object.prototype ---> null

    function f(){}
    // f ---> Function.prototype ---> Object.prototype ---> null

这种方法无法让a的[[Prototype]]指向b。

### 使用构造器创建对象
构造函数就是一个普通的函数，只不过这次不是直接调用函数，而是在函数前加上new关键字。

每个函数都有一个prototype属性，通过new关键字新建的对象的原型会指向构造函数的prototype属性，所以我们可以修改构造函数的prototype属性从而达到操作对象原型的目的。

为了让b继承a，需要有一个构造函数A

    var b = {};
    function A() {};

    A.prototype = b;

    var a = new A();
    
    Object.getPrototypeOf(a) === b;
    // true
    // a ---> A.prototype === b

### 使用 Object.create 创建对象
ES5带来了Object.create接口，可以让我们直接设置一个对象原型

    var b = {};
    var a = Object.create(b);

    Object.getPrototypeOf(a) === b;
    // true
    // a ---> b


### Object.setPrototypeOf
ES6带来了另一个接口，可以绕过创建对象的过程，直接操作原型

    var a = {};
    var b = {};

    Object.setPrototypeOf(a, b);
    Object.getPrototypeOf(a) === b;
    // true
    // a ---> b

### __proto__
ES6还带来了一个属性，通过这个属性也可以直接操作原型

    var a = {};
    var b = {};

    a.__proto__ = b;
    Object.getPrototypeOf(a) === b;
    // true
    // a ---> b

**注意**这个属性在ES6规范的附录中，也就意味着不是所有的环境都会有这个属性。

### 使用 class 关键字
ES6引入了以class语法糖，通过extends关键字我们也可以实现继承，但是无法直接操作对象的原型，而是要借助“类”，其实就是构造函数和函数的prototype属性。

    class B {}

    class A extends B {}

    var a = new A();
    
    Object.getPrototypeOf(a) === A.prototype;
    // true
    // a ---> A.prototype === B的实例

## 总结
不知道看完文章你理解原型了吗？如果还有疑惑建议你阅读下面的文章。

## 参考文章
- [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript. The core](http://ued.ctrip.com/blog/javascript-the-core.html)
