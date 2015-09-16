---
layout: post
title: 快来使用ES2015的Promise吧
category : javascript
tagline: "原创"
tags : [es6, javascript]
keywords: [Promise, es6, javascript]
description: 
---
{% include JB/setup %}

接触[Promise][Promise]很久了，但一直也没用过，感觉很陌生，但是ES2015来了，是时候使用了，本文将介绍Promise的方方面面，同时也是自己学习的过程。

## 阅读须知
本文将会尽可能使用ES2015的语法，这可能需要你使用一款现代浏览器，如果你还不了解可以阅读下[这篇文章](http://yanhaijing.com/javascript/2015/09/11/learn-es2015)。

## 兼容性
Promise的浏览器兼容性如下，你需要选一款兼容的浏览器才可以，你也可以[点击这里查看](http://caniuse.com/#search=Promises)。

![]({{BLOG_IMG}}184.png)

## 什么是Promise
Promise其实是Node社区中诞生的产物，如果你写过Node你肯定会知道为了异步，写了那么多的回调，而Promise就是比回调更有好的方式。

所谓Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的API，可供进一步处理。

![]({{BLOG_IMG}}183.png)

如果你有兴趣可以阅读一下[Promise的规范][Promise]，但我不太感兴趣，我将从实践的角度来学习它。

## new Promise
Promise是一个构造函数（类），可以使用new运算符新建一个实例，然后就可以使用了，构造函数接受一个函数作为参数。

	var p = new Promise((resolve, reject) => {
        window.setTimeout(() => {resolve(123);}, 1000);
    });

    p.then((data) => {
        console.log('p success', data);
    });

上面的代码输出如下：

	=> p success 123

新建Promise对象时传入的函数，接受两个参数，resolve和reject，分别用来改变Promise的状态，创建好，调用resolve和reject时，可以传入参数，这个参数会自动传递个后面的回调函数中。

创建好promise后，可以通过then方法定制状态变化后的回调函数。

好了这就是使用Promise的全部代码了，剩下的部分就全靠你的发挥了，下面将会介绍常用的API。

## Promise.prototype 属性
打开浏览器的控制台，输入如下代码：

	Object.getOwnPropertyNames(Promise.prototype).sort().forEach(function (val) {console.log(val, '\n')});

在我的浏览器中上面的代码会有如下输出，可能不同浏览器会不一样。

![]({{BLOG_IMG}}185.png)

这里我们将重点关注如下接口：

- catch
- then

### Promise.prototype.catch
catch() 方法只处理Promise被拒绝的情况，并返回一个Promise。该方法的行为和调用Promise.prototype.then(undefined, onRejected)相同。

	p.catch((reason) => {
	   // 拒绝
	});

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)。

### Promise.prototype.then
then()方法返回一个Promise。它有两个参数，分别为Promise在 success 和 failure 情况下的回调函数。

	p.then((value) => {
	   // 满足
	  }, (reason) => {
	  // 拒绝
	});

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)。

## Promise 属性
我们也先来看看浏览器支持哪些接口，在控制台输入如下代码：

	Object.getOwnPropertyNames(Promise).sort().forEach(function (val) {console.log(val, '\n')});

会看到如下的输出：

![]({{BLOG_IMG}}186.png)

我们将重点关注一下属性：

- all
- race
- reject
- resolve

### Promise.all
Promise.all(iterable) 方法返回一个promise，该promise会在iterable参数内的所有promise都被解决后被解决。
	
	Promise.all(iterable);

iterable是一个可迭代对象，比如Array。

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)。

### Promise.race
Promise.race(iterable)方法返回一个promise，这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。

	Promise.race(iterable);

iterable是一个可迭代对象，比如Array。

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)。

### Promise.reject
Promise.reject(reason)方法返回一个用reason拒绝的Promise。

	Promise.reject(reason);

reason Promise被拒绝的原因。

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)。

### Promise.resolve
Promise.resolve(value)方法返回一个以给定值resolve掉的Promise对象。但如果这个值是thenable的（就是说带有then方法），返回的promise会“追随”这个thenable的对象，接收它的最终状态（指resolved/rejected/pendding/settled）；否则这个被返回的promise对象会以这个值被fulfilled。

	Promise.resolve(value);
	Promise.resolve(promise);
	Promise.resolve(thenable);

value 用来resolve待返回的promise对象的参数。既可以是一个Promise对象也可以是一个thenable。

更多信息，[请点击这里查看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)。

## 实战
我们构造一段下面的代码，基本上用到了上面的全部知识：
	
	// 1000ms 后success
	var p1 = new Promise((resolve, reject) => {
        window.setTimeout(() => {resolve(123);}, 1000);
    });

    p1.then((data) => {
        console.log('p1 success', data);
    });
	
	// 2000ms 后success
    var p2 = new Promise((resolve, reject) => {
        window.setTimeout(() => {resolve(456);}, 2000);
    }); 

    p2.then((data) => {
        console.log('p2 success', data);
    });

    var pa = Promise.all([p1, p2]);
    var pr = Promise.race([p1, p2]);

    pa.then((data) => {
        console.log('pa success', data);
    });

    pr.then((data) => {
        console.log('pr success', data);
    });

上面的代码输出如下：
	
	// 1000ms
	p1 success 123
	pr success 123
	
	// 2000ms
	p2 success 456
	pa success [123, 456]

## Polyfill
如果要兼容旧的浏览器，又要使用新特性，那么只能使用Polyfill了，类似的库很多，我推荐使用[es6-promise](https://github.com/jakearchibald/es6-promise)

es6-promise是一个兼容 ES6 Promises 的Polyfill类库。 它基于 [RSVP.js](https://github.com/tildeio/rsvp.js) 这个兼容 Promises/A+ 的类库， 它只是 RSVP.js 的一个子集，只实现了Promises 规定的 API。

关于使用方法和注意事项这个库的文档都写得很详细了，在此不再详细介绍了。

## 总结
是时候使用Promise了，上面已经介绍了ES2015 Promise的全部内容了，如果你还想阅读更多资料，可查看下面的参考资料，如果你有任何疑问或建议，欢迎在下面的评论区和我讨论。

## 参考资料
- [Promises/A+规范][Promise]
- [JavaScript Promise迷你书（中文版）](http://liubin.github.io/promises-book/)
- [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise]: https://promisesaplus.com/

