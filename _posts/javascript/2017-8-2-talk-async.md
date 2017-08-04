---
layout: post
title: 异步编程那些事
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [javascript, async]
description: 本文通过一个实例，详细讲解了异步编程的历史和6种异步编程方法
---
{% include JB/setup %}

世界在进步，宣扬了这么多年的前端金科玉律被推翻，这是要变天啊，前端飞速发展，而我们只有保持不断学习，才能不那么迷茫

本文通过一个实例，讲解了异步编程的发展历史和6种异步编程方法，实践出真知

## 前言
就在不久前（15年以前），说起异步还只有callback，后来Promise来的时候我是拒绝的，generator来的时候我是决绝的，当async来的时候我想我是不是落后了，嗯我该学习了

作为一个切图人员，遇到的异步场景实在太少，思来想去也就只有动画了，本文将用不同方式实现下面的动画，红色方块每次向右移动100像素，完整的demo在[这里](https://github.com/yanhaijing/async-demo)

![]({{BLOG_IMG}}503.gif)

## 关于异步
异步是一个关于现在和将来的问题，现在执行的代码和将来执行的代码，举个例子来说一下异步是如何复杂和反人类

    var a = 1;
    var b = 1;

    function foo() {
        a = b + 3;
        console.log(a)
    }

    function bar() {
        b = a * 2;
    }

    ajax("url1", foo);
    ajax("url2", bar);

上面的代码如果是同步的，那么打印a的地方就是确定的；但要是异步的，a的值就有两种可能（哪个请求先回来），这还是只是最简单的case，你可以思考下，自己写程序时有咩有考虑过这种问题

## 异步编程方法
js中的异步编程共有下面这些方法，好吧以前我就知道前两个，其中事件监听和观察者有些类似，下面我们将分别介绍

- 回调函数
- 事件监听
- 观察者
- Promise
- Generator
- async/await

## 回调函数
callback是我们最熟悉的方式，上面提到的动画的例子，用callback实现代码如下

    moveTo(100, 0, function () {
        moveTo(200, 0, function () {
            moveTo(300, 0, function () {
                moveTo(400, 0, function () {
                    // 无限不循环
                })
            })
        })
    })

快看，这就是传说中的回调地狱吗？是，也不是。。。

其实我在工作中并没遇到过这么多异步，可能我写的业务比较简单吧，O(∩_∩)O哈哈~

有同学可能会问moveTo函数是如何实现的？答案如下

    function moveTo(x = 0, y = 0, cb = function () {}) {
        move('.box').x(x).y(y).end(cb);
    }

下面来列举回调的N大罪状

- 违反直觉
- 错误追踪
- 模拟同步
- 回调地狱
- 并发执行
- 信任问题（多次调用）

违反直觉，并不是说缩进，缩进其实可以通过拆分函数来解决，而是对人友好的顺序执行，现在要跳来跳去

错误追踪，异步让`try catch`直接跪了，为了能够捕获到异步的错误，有两种方案，分离回调和first error

jquery的ajax就是典型的分离回调

    function success(data) {
        console.log(data);
    }
    function error(err) {
        console.error(err);
    }
    $.ajax({}, success, error);

Node采用的是first error，所有系统异步接口第一个参数都是error对象

    function callback(err, data) {
        if (err) {
            // 出错
            return;
        }
        // 成功
        console.log(data);
    }
    async("url", callback);

模拟同步，node的io相关的api都是异步的，我只是想要python那种同步的个脚本，险些精神分裂，o(╯□╰)o

一段很容易理解的同步代码
    
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = sync(arr[i]);
    }

然而如果是异步的话要这么写，/(ㄒoㄒ)/~~

    (function next(i, len, callback) {
        if (i < len) {
            async(arr[i], function (value) {
                arr[i] = value;
                next(i + 1, len, callback);
            });
        } else {
            callback();
        }
    }(0, arr.length, function () {
        // All array items have processed.
    }));

关于回调地狱，并发执行和信任问题，我建议你阅读文章结尾处推荐的资料，因为我实在才疏学浅，o(╯□╰)o

## 观察者
观察者模式需要一个pub和sub函数，或者其他类似工具，一定有同学说，这不还是回调吗？请看清楚，回调是因为观察者模式，而不是异步。其实回调的问题，观察者模式并没有解决

    sub('1', function () {
        moveTo(100, 0, function () {
            pub('2')
        })
    })

    sub('2', function () {
        moveTo(200, 0, function () {
            pub('3')
        })
    })

    sub('3', function () {
        moveTo(300, 0, function () {
            pub('4')
        })
    })
    
    // 无限不循环

pub和sub函数的是怎么实现的呢？最简单的实现如下

    let eventMap = {};
    function pub(msg, ...rest) {
        eventMap[msg] && eventMap[msg].forEach((cb) => {
            cb(...rest);
        });
    }

    function sub(msg, cb) {
        eventMap[msg] = eventMap[msg] || [];
        eventMap[msg].push(cb);
    }

## Promise
如果你还不了解Promise，那么建议先阅读[这篇文章](http://yanhaijing.com/javascript/2015/09/16/es6-promise/)，下面是Promise实现上面的例子

    moveTo(100, 0).then(function () {
        return moveTo(200, 0)
    }).then(function () {
        return moveTo(300, 0)
    }).then(function () {
        return moveTo(400, 0)
    }).then(function () {
        // 无限不循环
    })

再来看一下，moveTo函数有何不同，看出来没？

    function moveTo(x = 0, y = 0) {
        return new Promise(function (resolve, reject) {
            move('.box').x(x).y(y).end(resolve);
        })
    }

其实Promise开始我是拒绝的，这不还是回调吗！！！请再次注意，这里的回调不是为了异步，而是Promise协议

Promise其实是一种控制反转，举个例子，就是原来我们要给异步函数传入一个回调函数，现在变成了异步函数返回一个Promise对象，堪称神来之笔，而Promise就是实现这种反转的工具，Promise是一个双方约定的契约（规范）

其实Promise还有很多优点，要知道Promise是后面新技术的基础，堪称一切异步方案的粘合剂，没有Promise，可能就不会有generator，那么为什么说是可能呢？请看Generator一节

Promise解决了回调的一些问题，但并没有全部解决，比如Promise有很好的错误追踪，避免了回调地狱，对并发执行很友好，因为Promise只决议一次，就很好的解决了信任问题

但Promise对违反直觉并不友好，回调变成了长长的Promise链

看一下模拟同步的代码，貌似成功解决了

var chain = Promise.resolve();
for (let i = 0; i < arr.length; ++i) {
    chain = chain.then(() => async(arr[i]).then((x) => arr[i] = x))
}

## Generator
Generator是一个革命性特性，es2015(es6)中引入，让原本必须一次执行完毕函数，现在可以在中间暂停，并在下次继续执行，这就让js可以模拟协程的概念

其实关于Generator我开始也是拒绝的，这东西本来不是为异步而生，是为了产生持续生成的数据，和迭代器是天生一对，
而把他用在异步上优点类似那float做布局（float本来只是为了实现文字环绕的效果)，有点绕，不是很好理解

动画的例子用generator实现如下，就好像是同步的一样

    function* gen() {
        yield moveTo(100, 0)
        yield moveTo(200, 0)
        yield moveTo(300, 0)
        yield moveTo(400, 0)

        // 无限不循环
    }

    run(gen)

moveTo函数如下

    function moveTo(x = 0, y = 0) {
        return new Promise(function (resolve, reject) {
            move('.box').x(x).y(y).end(resolve);
        })
    }

看吧，多么简洁，简直完美，但我发誓当你看到run函数后你就疯了

    function run(fn) {
        let gen = fn()

        function next(data) {
            var res = gen.next(data)
            if (res.done) return res.value;

            res.value.then(function (data) {
                next(data)
            })
        }

        next()
    }

生成器要实现异步，必须得有启动函数，也就是run，好在社区有封装好的run函数，比如co这个库

生成器能很好的解决Promise不能解决的问题，如违反直觉，繁琐的代码，但也有其自身的问题，比如不太好理解，蹩脚，需要启动器

Promise那一节，我说如果没有Promise就可能没有generator，而不是必须呢？因为generator实现异步除了基于Promise，还可以基于thunk函数，感兴趣的你自行查阅吧，祝好

## async/await
那么有没有一种完美方案呢？还真有啊，es2017(es8)给我们带来了异步函数，这家伙简直就是自带启动器的生成器函数，好吧他就是给予generator的

动画的例子用异步函数来实现

    async function run() {
        await moveTo(100, 0)
        await moveTo(200, 0)
        await moveTo(300, 0)
        await moveTo(400, 0)
        
        // 无限不循环
    }
    
    run()

moveTo函数如下

    async function moveTo(x = 0, y = 0) {
        await new Promise(function (resolve, reject) {
            move('.box').x(x).y(y).end(resolve);
        })
    }

完美同步般的代码，自带启动器，世界终于重归美好，终极异步方案，还学什么generator啊

## 总结
上面只是介绍了js中异步编程的全部方法，如果你想深入了解异步编程，那么我推荐一本书《[你不知道的JavaScript](https://www.amazon.cn/gp/product/B01LMYXGAI/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B01LMYXGAI&linkCode=as2&tag=yanhaijing-23)》中卷，这本书能解答你全部的疑惑
