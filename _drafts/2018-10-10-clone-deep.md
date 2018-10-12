---
layout: post
title: 深拷贝的终极探索
category : javascript
tagline: "原创"
tags : [javascript, 面试题]
keywords: [javascript]
description: 
---
{% include JB/setup %}

**划重点，这是一道面试必考题，我靠这道题刷掉了多少面试者✧(≖ ◡ ≖✿)嘿嘿**

首先这是一道非常棒的面试题，可以考察面试者的很多方面，比如基本功，代码能力，逻辑能力，而且进可攻，退可守，针对不同级别的人可以考察不同难度，比如漂亮妹子就出1☆题，要是个帅哥那就得上5☆了，(\*^\__^\*) 嘻嘻……

无论面试者多么优秀，漂亮的回答出问题，我总能够潇洒的再抛出一个问题，看着面试者露出惊异的眼神，默默一转身，深藏功与名

本文我将给大家破解深拷贝的谜题，由浅入深，环环相扣，总共涉及4种深拷贝方式，每种方式都有自己的特点和个性

## 深拷贝 VS 浅拷贝
再开始之前需要先给同学科普下什么是深拷贝，和深拷贝有关系的另个一术语是浅拷贝又是什么意思呢？如果对这部分部分内容了解的同学可以跳过

其实深拷贝和浅拷贝都是针对的引用类型，JS中的变量类型分为值类型（基本类型）和引用类型；对值类型进行复制操作会对值进行一份拷贝，而对引用类型赋值，则会进行地址的拷贝，最终两个变量指向同一份数据

```js
// 基本类型
var a = 1;
var b = a;
a = 2;
console.log(a, b); // 2, 1 ，a b指向不同的数据

// 引用类型指向同一份数据
var a = {c: 1};
var b = a;
a.c = 2;
console.log(a.c, b.c); // 2, 2 全是2，a b指向同一份数据
```

对于引用类型，会导致a b指向同一份数据，此时如果对其中一个进行修改，就会影响到另外一个，有时候这可能不是我们想要的结果，如果对这种现象不清楚的话，还可能造成不必要的bug

那么如何切断a和b之间的关系呢，可以拷贝一份a的数据，根据拷贝的层级不同可以分为浅拷贝和深拷贝，浅拷贝就是只进行一层拷贝，深拷贝就是无限层级拷贝

```js
var a1 = {b: {c: {}};

var a2 = shallowClone(a1); // 浅拷贝
a2.b.c === a1.b.c // true

var a3 = clone(a3); // 深拷贝
a3.b.c === a1.b.c // false
```

浅拷贝的实现非常简单，而且还有多种方法，其实就是遍历对象属性的问题，这里只给出一种，如果看不懂下面的方法，或对其他方法感兴趣，可以看我的[这篇文章](https://yanhaijing.com/javascript/2015/05/09/diff-between-keys-getOwnPropertyNames-forin/)

```js
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }

    return target;
}
```

## 最简单的深拷贝
深拷贝的问题其实可以分解成两个问题，浅拷贝+递归，什么意思呢？假设我们有如下数据

```js
var a1 = {b: {c: {d: 1}};
```

只需稍加改动上面浅拷贝的代码即可，注意区别

```js
function clone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === 'object') {
                target[i] = clone(source[i]); // 注意这里
            } else {
                target[i] = source[i];
            }
        }
    }

    return target;
}
```

大部分人都能写出上面的代码，但当我问上面的代码有什么问题吗？就很少有人答得上来了，聪明的你能找到问题吗？

其实上面的代码问题太多了，先来举几个例子吧

- 没有对参数做检验
- 判断是否对象的逻辑不够严谨
- 没有考虑数组的兼容

(⊙o⊙)，下面我们来看看各个问题的解决办法，首先我们需要抽象一个判断对象的方法，其实比较常用的判断对象的方法如下，其实下面的方法也有问题，但如果能够回答上来那就非常不错了，如果完美的解决办法感兴趣，不妨看看[这里吧](https://github.com/jsmini/type/blob/master/src/index.js)

```js
function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}
```

函数需要校验参数，如果不是对象的话直接返回

```js
function clone(source) {
    if (!isObject(source)) return source;

    // xxx
}
```

关于第三个问题，嗯，就留给大家自己思考吧，本文为了减轻大家的负担，就不考虑数组的情况了，其实ES6之后还要考虑set, map, weakset, weakmap，/(ㄒoㄒ)/~~

其实吧这三个都是小问题，其实递归方法最大的问题在于爆栈，当数据的层次很深是就会栈溢出

下面的代码可以生成指定深度和每层广度的代码，这段代码我们后面还会再次用到

```js
function createData(deep, breadth) {
    var data = {};
    var temp = data;

    for (var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (var j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }

    return data;
}

createData(1, 3); // 1层深度，每层有3个数据 {data: {0: 0, 1: 1, 2: 2}}
createData(3, 0); // 3层深度，每层有0个数据 {data: {data: {data: {}}}}
```

当clone层级很深的话就会栈溢出，但数据的广度不会造成溢出

```js
clone(createData(1000)); // ok
clone(createData(10000)); // Maximum call stack size exceeded

clone(createData(10, 100000)); // ok 广度不会溢出
```

其实大部分情况下不会出现这么深层级的数据，但这种方式还有一个致命的问题，就是循环引用，举个例子

```js
var a = {};
a.a = a;

clone(a) // Maximum call stack size exceeded 直接死循环了有没有，/(ㄒoㄒ)/~~
```

关于循环引用的问题解决思路有两种，一直是循环检测，一种是暴力破解，关于循环检测大家可以自己思考下；关于暴力破解我们会在下面的内容中详细讲解

## 一行代码的深拷贝
有些同学可能见过用系统自带的JSON来做深拷贝的例子，下面来看下代码实现

```js
function cloneJSON(source) {
    return JSON.parse(JSON.stringify(source));
}
```

其实我第一次简单这个方法的时候，由衷的表示佩服，其实利用工具，达到目的，是非常聪明的做法

下面来测试下cloneJSON有没有溢出的问题，看起来cloneJSON内部也是使用递归的方式

```js
cloneJSON(createData(10000)); // Maximum call stack size exceeded
```

既然是用了递归，那循环引用呢？并没有因为死循环而导致栈溢出啊，原来是JSON.stringify内部做了循环引用的检测，正是我们上面提到破解循环引用的第一种方法：循环检测

```js
var a = {};
a.a = a;

cloneJSON(a) // Uncaught TypeError: Converting circular structure to JSON
```

## 破解递归爆栈

## 破解循环引用

## 性能对比

## 总结

尺有所短寸有所长，无关乎好坏优劣，其实每种方法都有自己的优缺点，和适用场景，人尽其才，物尽其用，方是一剂良方

下面对各种方法进行对比，希望给大家提供一些帮助

|      | clone | cloneJSON | cloneLoop | cloneForce |
| ---- | ----- | --------- | --------- | ---------- |
| 难度   | ☆☆    | ☆         | ☆☆☆       | ☆☆☆☆       |
| 兼容性  | ie6   | ie8       | ie6       | ie6        |
| 循环引用 | 一层    | 不支持       | 一层        | 一层         |
| 栈溢出  | 会     | 会         | 不会        | 不会         |
| 保持引用 | 否     | 否         | 否         | 是          |
| 适合场景 |       |           | 层级很多      | 保持引用关系     |

