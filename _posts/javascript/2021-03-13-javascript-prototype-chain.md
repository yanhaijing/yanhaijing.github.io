---
layout: post
title: 如何回答面试中的JavaScript原型链问题
category : javascript
tagline: "原创"
tags : [javascript, 面试知识]
keywords: [javascript]
description: 本文简单直观的教会大家如何在面试中破解JavaScript原型链问题
---
{% include JB/setup %}

> 本文已收录到《[面试知识系列](https://yanhaijing.com/tags/#%E9%9D%A2%E8%AF%95%E7%9F%A5%E8%AF%86-ref)》

**划重点，这是一道面试必考题，我就问过很多面试者这个问题，✧(≖ ◡ ≖✿)嘿嘿**

又到了金三银四的季节，相信最近有很多同学会出来看看机会，JS中的原型是面试中的必考题，很多面试官都喜欢考察原型相关的知识，没错，我就是其中之一

**猿辅导，急聘！！！1年以上经验的前端，后端，客户端，<a target="_blank" href="https://yanhaijing.com//job/">点击查看</a>**

原型作为JS中的核心知识点，可以考察的知识点和细节非常多，当然面试不是为了难住大家，而是希望了解大家的知识边界在哪里，原型知识可以反应大家对JS的了解程度，对技术的兴趣，是否喜欢钻研等

原型的考察，绕不过原型链，面试中如果能把原型链画清楚，一定会加分不少，但我发现大部分面试者在面试中很难画好原型链，于是我不禁陷入深深的思考

站在面试官的角度，我希望面试者能清晰、快速、无误的画出原型链，本文是我思考良久后，总结的快速绘制原型链的方法

## 题目一
面试中，我经常会考察如何实现原型继承，再下一步才是考察原型链，一般我会写出下面的代码，然后让大家绘制原型链

```js
class A {}
class B extends A {}

const b = new B();
```

面对这个题，我们先来绘制b和B的原型链，这里面涉及到三个对象分别是`b`,`B`和`B.prototype`，相信大部分同学能够画清楚这几个的关系，由于是面试中只有笔和纸，又要清晰快速，所以我们可以像下面这样画，箭头代表关系，箭头上面的字代表属性名字

![]({{BLOG_IMG}}546.png)

上面包括`__proto__`，`constructor`和`prototype`三个部分，能画出来上面的只能算是不及格，接下来我们在把A的部分加进去

![]({{BLOG_IMG}}547.png)

接下来我们把Function加进去，这一步是大家比较容易忽略的，Function比较特殊的地方就是`Function.__proto__`指向自己的`Function.prototype`，图中红色的线

![]({{BLOG_IMG}}548.png)

最后再把Object加进去，我们的原型链就大工告成了，可以大家可以慢慢消化一下(*^▽^*)

![]({{BLOG_IMG}}549.png)

## 题目二
基本上面试中能在5分钟内画出来上面的原型链，那么应该能够让面试官满意了，但我一般会再考一些原型链相关的题目，比如下面这个，这道题乍一看容易被绕进去，其实是考察大家对instanceof机制的理解，再结合上面的原型链，就很假单了

```js
// 下面两行语句的结果是，为什么
Function instanceof Object
Object instanceof Function
```

再比如下面的写法和上面写法的有什么区别？该如何弥补？

```js
function A() {}
function B() {}

B.prototype = Object.create(A.prototype);

const b = new B();
```

再比如，如何不通过类和函数实现继承？等等，希望大家能够举一反三，灵活应对

## 总结
本文围绕面试，给大家讲解了原型链的问题，除了原型链，相关的继承知识也是考察的重点，下面是相关文章

- [JavaScript原型之路](https://yanhaijing.com/javascript/2014/07/18/javascript-prototype/)
- [详解JavaScript中的原型和继承 ](https://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)
- [Javascript继承-原型的陷阱](https://yanhaijing.com/javascript/2013/08/23/javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes/)
- [JavaScript对象继承一瞥](https://yanhaijing.com/javascript/2014/11/09/object-inherit-of-js/)
- [一段代码详解JavaScript面向对象](https://yanhaijing.com/javascript/2014/05/15/a-code-explain-javascript-oop/)


