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

嗯，函数式编程这么火，是一定要学的，但是怎么学呢？本文通过一个例子来介绍函数式编程的用法，先声明本文没有复杂的概念，也没有各种定义，只有一个由浅入深的例子

## 背景
假设有一个如下的数据结构，type是1-n，flag表示当前元素的状态，页面大概是一个列表，可以通过类型和选择状态来过滤列表内容

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
- 获取否定类型的列表
- 获取指定状态的列表
- 获取指定状态，指定类型的列表

呃呃呃，有点懵是不是，思考下这个程序该怎么写？如果写一个函数满足上面所有的需求呢？

## 获取全部的列表
下面先来写第一个需求，需要用到数组的filter和函数的默认值，就是这么简单

```js
function getList(filter = function () { return true }) {
    return list.filter(filter);
}
```

调用`getList`就能获取全部的列表，但上面的参数默认值其实可以提取出一个公共函数

```js
// 高阶函数
function bool(flag) {
    return function() {
        return !!flag;
    }
}

bool(true) // function { return true; }
bool(false) // function { return false; }
```

快来用bool来重写上面的代码吧，更简洁了是不是

```js
function getList(filter = bool(true)) {
    return list.filter(filter);
}
```

抽象出来的bool是一个高阶函数，bool让返回布尔值的函数变得可以复用，高阶函数让函数可以被复用

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

上面代码中多次调用`data.type`，我们把获取对象属性的功能抽象出来

```js
function pick(obj, prop) {
    return obj[prop];
}

pick(data, 'type') // data.type
```

下面用pick函数改写上面的代码

```js
getList(function (data) { return pick(data, 'type') === 1 })
getList(function (data) { return pick(data, 'type') === 2 })
getList(function (data) { return pick(data, 'type') === 3 })
```

好像更复杂了。。。要是能把type参数提前绑定呢？绑定函数参数好像是函数柯里化，下面的currying函数

```js
function currying(func, ...args) {
    return func.bind(null, ...args);
}

function add(x, y) { return x + y }

const add10 = currying(add, 10);

add10(1) // 11
add10(5) // 15
```

但currying的绑定顺序是从左到右的，上面我们希望的先绑定第二个参数，如果能反转一下参数顺序就好了

```js
function reverseArgs(...args) {
    return args.reverse();
}

reverseArgs(1, 2, 3) // [3, 2, 1]
```

怎么才能把reverseArgs和我们的函数结合起来呢？下面介绍一个神奇的高阶函数

```js
// 返回一个函数A，A在被执行时会依次执行传入的函数参数
// compose(fn1, fn2, fn3)(1) 相当于fn3(...fn2(...fn1(1)))
function compose(...fns) {
    return function (...args) {
        return fns.reduce((prev, fn) => fn(...[].concat(prev)), args)
    }
}
```

有了currying和反转参数的代码再来改造下我们上面的代码，豁然开朗有木有

```js
const reversePick = compose(reverseArgs, pick); // 参数顺序被反转 reversePick('type', data)
const pickType = currying(reversePick, 'type'); // 先绑定第一个参数 pickType(data)

getList(function (data) { return pickType(data) === 1 })
getList(function (data) { return pickType(data) === 2 })
getList(function (data) { return pickType(data) === 3 })
```

但上面的代码并不能执行，由于数组filter函数，传给每个filter的参数并不是一个，而是三个，这就影响到了我们的reverseArgs，操作，随意需要先进性裁切操作，还需要引入一个函数

```js
function sliceArgs(num, ...args) {
    return args.slice(0, num);
}

const sliceArgs2 = currying(sliceArgs, 2);

const reversePick = compose(sliceArgs2, reverseArgs, pick);
```

上面的代码中的另一个问题是存在多次判断的代码，下面提取出来

```js
function isEqual(x, y) {
    return x === y;
}

const isType1 = currying(isEqual, 1)
const isType2 = currying(isEqual, 2)
const isType3 = currying(isEqual, 3)

getList(function (data) { return isType1(pickType(data)) })
getList(function (data) { return isType2(pickType(data)) })
getList(function (data) { return isType3(pickType(data)) })
```

显然代码好像更复杂了，别急继续往下看，上面代码重复写了三个函数，利用前面的`compose`可以把这个函数也消除，是不是很神奇

```js
// compose(pickType, isType1(data) = function () { isType1(pickType(data)) }
getList(compose(pickType, isType1))
getList(compose(pickType, isType2))
getList(compose(pickType, isType3))
```

上面解决了一个类型的判断，如果相判断1或2该怎么做呢？还需要一个或操作的高阶函数

```js
function or(...fns) {
    return function (...agrs) {
        return fns.some(fn => fn(...args))
    }
}

getList(compose(pickType, or(isType1, isType2))
```

## 获取否定类型的列表
下面来看看如何获取否定类型的列表，比如获取所有type非1的，看起来需要一个取非的函数

```
function not(fn) {
    return function (...args) {
        return !fn(...args)
    }
}

getList(compose(pickType, not(isType1))
```

## 获取指定状态的列表
下面来看看如何获取指定类型的列表，其实参考上面的过程就很容易得出

```js
const isFlagTrue =  currying(isEqual, true)
const isFlagFalse =  currying(isEqual, false)

const pickFlag = currying(compose(sliceArgs2, reverseArgs, pick), 'flag'); // currying reverseArgs 见上面

getList(compose(pickFlag, isFlagTrue)) // 获取flag为true的列表
getList(compose(pickFlag, isFlagFalse)) // 获取flag为false的列表
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
    and(
        compose(pickType, isType1),
        compose(pickFlag, isFlagTrue)
    )
)

// 获取类型不为1，flag为true的列表
getList(
    and(
        compose(pickType, not(isType1)),
        compose(pickFlag, isFlagTrue)
    )
)

// 获取类型为1或2，并且flag为true的列表
getList(
    and(
        compose(pickType, or(isType1, isType2)),
        compose(pickFlag, isFlagTrue)
    )
)
```

## 总结
整个过程我们抽象了很多通用函数，这些函数都是可以复用的

```js
function bool(flag) {
    return function() {
        return !!flag;
    }
}

function pick(obj, prop) {
    return obj[prop];
}

function currying(func, ...args) {
    return func.bind(null, ...args);
}

function reverseArgs(...args) {
    return args.reverse();
}

function sliceArgs(num, ...args) {
    return args.slice(0, num);
}

function compose(...fns) {
    return function (...args) {
        return fns.reduce((prev, fn) => fn(...[].concat(prev)), args)
    }
}

function isEqual(x, y) {
    return x === y;
}

function or(...fns) {
    return function (...args) {
        return fns.some(fn => fn(...args))
    }
}

function not(fn) {
    return function (...args) {
        return !fn(...args)
    }
}

function and(...fns) {
    return function (...args) {
        return fns.every(fn => fn(...args))
    }
}
```

完整的业务代码如下，有了这些函数，代码变得非常简单，易读，并且非常灵活，可以随意组合

```js
const sliceArgs2 = currying(sliceArgs, 2);

const pickType = currying(compose(sliceArgs2, reverseArgs, pick), 'type');
const isType1 = currying(isEqual, 1)
const isType2 = currying(isEqual, 2)
const isType3 = currying(isEqual, 3)

const pickFlag = currying(compose(sliceArgs2, reverseArgs, pick), 'flag');
const isFlagTrue =  currying(isEqual, true)
const isFlagFalse =  currying(isEqual, false)

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

function getList(filter = bool(true)) {
    return list.filter(filter);
}

// 获取类型为1，flag为true的列表
getList(
    and(
        compose(pickType, isType1),
        compose(pickFlag, isFlagTrue)
    )
)

// 获取类型不为1，flag为true的列表
getList(
    and(
        compose(pickType, not(isType1)),
        compose(pickFlag, isFlagTrue)
    )
)

// 获取类型为1或2，并且flag为true的列表
getList(
    and(
        compose(pickType, or(isType1, isType2)),
        compose(pickFlag, isFlagTrue)
    )
)
```

下面给出对应的非函数式写法的代码，对比一下，大量的过程式代码，区别还是很大的，如果是你，你会使用那种方式呢？

```js
function getList(filter = bool(true)) {
    return list.filter(filter);
}

// 获取类型为1，flag为true的列表
getList(function (data) {
    return data.type === 1 && data.flag === true;    
})

// 获取类型不为1，flag为true的列表
getList(function (data) {
    return data.type !== 1 && data.flag === true;    
})

// 获取类型为1或2，并且flag为true的列表
getList(function (data) {
    return (data.type === 1 || data.type === 2) && data.flag === true;    
})
```

最后给大家推荐一本javascript函数式编程的书籍《[JavaScript函数式编程](https://amazon.cn/gp/product/B01264FOY4/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=yanhaijing-23&creative=3200&linkCode=as2&creativeASIN=B01264FOY4&linkId=b05428b19333f7f958a427562757de10)》，如果对函数式感兴趣的话就赶紧入手吧
