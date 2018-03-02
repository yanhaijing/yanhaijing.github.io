---
layout: post
title: 函数式编程的一点实战
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [函数式, functional, javascript]
description: 
---
{% include JB/setup %}

函数式编程太火了，我也想学！！！

函数式编程太难了，该怎么入门？？？

嗯，函数式变成这么火，时一定要学的，但是怎么学呢？本文通过一个例子来介绍函数式编程的用法，先声明本文没有复杂的概念，也没有各种定义，只有一个由浅入深的例子

## 背景
假设有一个如下的数据结构，type是1-n，flag表示当前元素的状态，页面大概是一个列表，可以通过列表和选择状态来过滤列表内容

```js
const list = [
    {
        type: 1,
        flag: true
    },
    {
        type: 2,
        flag: false
    },
    {
        type: 3,
        flag: true
    }
]
```

可能的需求有下面这些：

- 获取全部的列表
- 获取一个或多个类型的列表
- 获取指定状态的列表
- 获取指定状态，指定类型的列表

呃呃呃，有点懵是不是，思考下这个程序该怎么写？如果写一个函数满足上面所有的需求呢？

## 获取全部的列表
下面先来写第一个需求，只需借助es6的函数式默认值和es5的数组filter函数就搞定了

```js
function getList(filter = function () { return true }) {
    return list.filter(filter);
}
```

调用`getList`就能获取全部的列表，filter参数就是传说中的高阶函数，但上面的代码还不够函数式，参数的默认值还可以被抽象出一个高阶函数出来，如下

```js
// 高阶函数
function bool(flag) {
    return function() {
        return !!flag;
    }
}

function getList(filter = bool(true)) {
    return list.filter(filter);
}
```

抽象出来的bool高阶函数，是可以复用的，高阶函数让函数可以被复用

## 获取一个或多个类型的列表
如果想获取指定类型的列表，最简单的写法如下

```js
function getList(filter = bool(true)) {
    return list.filter(filter);
}

getList(function (data) { return data.type === 1 })
getList(function (data) { return data.type === 2 })
getList(function (data) { return data.type === 3 })
```

上面代码中多次调用`data.type`，其实可以抽象出来一个函数

```js
function pick(obj, prop) {
    return obj.prop;
}

getList(function (data) { return pick(data, 'type') === 1 })
getList(function (data) { return pick(data, 'type') === 2 })
getList(function (data) { return pick(data, 'type') === 3 })
```

换种写法感觉还不如不换了。。。要是能把type参数提前绑定就好了，绑定函数参数好像是函数柯里化，下面的currying函数可以给我函数绑定参数，稍后执行

```js
function currying(func, ...args) {
    return func.bind(null, ...args);
}
```

但currying的绑定顺序是从左到右的，上面我们希望的先绑定第二个参数，如果能反转一下参数顺序就好了

```js
function reverseArgs(func) {
    return function (...args) {
        return func(...args.reverse())
    }
}
```

有了currying和reverseArgs再来改造下我们上面的代码，豁然开朗有木有

```js
// pick(data, 'type')
function pick(obj, prop) {
    return obj.prop;
}

const reversePick = reverseArgs(pick); // 参数顺序被反转 reversePick('type', data)
const pickType = currying(reversePick, 'type'); // 先绑定第一个参数 pickType(data)

getList(function (data) { return pickType(data) === 1 })
getList(function (data) { return pickType(data) === 2 })
getList(function (data) { return pickType(data) === 3 })
```

上面的代码中多次判断逻辑可以抽象成一个高阶函数

```js
function isType(type) {
    return function (t) {
        return t === type
    }
}

getList(function (data) { return isType(1)(pickType(data)) })
getList(function (data) { return isType(2)(pickType(data)) })
getList(function (data) { return isType(3)(pickType(data)) })
```

显然代码好像更复杂了，别急继续往下看，上面代码重复写了三个函数，这个函数也可以抽象为一个高阶函数

```js
function assertFilter(assert) {
    return function (data) {
        return assert(data)
    }
}
```

但这个filter生成器，要想和前面的pickType和isType组合使用还需要引入一个高阶函数compose

```js
// 返回一个函数A，A在被执行时会依次执行传入的函数参数
// compose(fn1, fn2, fn3)(1) 相当于fn3(fn2(fn1(1)))
function compose(...fns) {
    return function (...args) {
        return fns.reduce((prev, fn) => [fn(...prev)], args)
    }
}

// compose(pickType, isType(1))(data) = isType(1)(pickType(data))
getList(assertFilter(compose(pickType, isType(1))))
getList(assertFilter(compose(pickType, isType(2))))
getList(assertFilter(compose(pickType, isType(3))))
```

上面解决了一个类型的判断，如果相判断1或2该怎么做呢？还需要一个或操作的高阶函数

```js
function or(...fns) {
    return function (...agrs) {
        return fns.some(fn => fn(...args))
    }
}

getList(assertFilter(compose(pickType, or(isType(1), isType(2)))))
```

## 获取指定状态的列表
下面来看看如何获取指定类型的列表，其实参考上面的过程就很容易得出

```js
function isFlag(flag) {
    return function (f) {
        return f === flag;
    }
}

const pickFlag = currying(reversePick, 'flag'); // currying reversePick 见上面

getList(assertFilter(compose(pickFlag, isFlag(true)))) // 获取flag为true的列表
getList(assertFilter(compose(pickFlag, isFlag(false)))) // 获取flag为false的列表
```

## 获取指定状态，指定类型的列表
有了获取指定状态和指定类型的代码，那么如何指定两个呢？我们需要一个并操作的高阶函数

```js
function and(...fns) {
    return function (...agrs) {
        return fns.every(fn => fn(...args))
    }
}

// 获取类型为1，flag为true的列表
getList(
    assertFilter(
        and(
            compose(pickType, isType(1)),
            compose(pickFlag, isFlag(true))
        )
    )
)

// 获取类型为1或2，并且flag为true的列表
getList(
    assertFilter(
        and(
            compose(pickType, or(isType(1), isType(2))),
            compose(pickFlag, isFlag(true))
        )
    )
)
```

## 总结
