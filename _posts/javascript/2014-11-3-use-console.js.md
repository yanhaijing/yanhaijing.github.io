---
layout: post
title: 给你的网站添加 console.js 
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [console, js]
description: console.js 与console就想html5shim于html5，仅此而已，如此简单。
---
{% include JB/setup %}

本文仅先给使用console调试的FE同学，如果你还不知道console是什么，或者还停留在`alert`阶段，那就不要浪费时间了，say bye bye！

你是否试程序的过程中用过`console.log(***)`，发现在现代浏览器里运行好好的，到了ie里却出现莫名其妙的错误，你完全不知道为什么。

或者你知道在ie下console不能使用，每次上线前都要注释掉console的代码，一不小心漏掉了一个。

如果有过上面类似的情况，和我有着同样的烦恼，那恭喜你，console.js就是为你准备的。（如果你用着非常牛逼的自动化工具，能自动过滤掉console的话，往下看下也是会有收获的）

你还在写类似下面这样的代码吗？

	if (console && console.log) {
		console.log(***);
	}

或者
	
	console.log = console.log || function () {}

那么是时候做出改变了，console.js会帮你解决这些问题。


##console.js是什么

console.js是一个微型js库，用来修复在不支持或部分支持console的浏览器下，调用`console.***`出错的问题。

这其实有点类似reset.css或者html5shim的做法，console.js参考了[MSDN](http://msdn.microsoft.com/en-us/library/ie/gg589530.aspx) [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console) [Firebug](http://getfirebug.com/wiki/index.php/Console_API)三个文档对console的介绍。是其中提到api的超集。

console.js的全部代码如下，这么简单的代码，还是老规矩不解释：

	;(function(g) {
	    'use strict';
	    var _console = g.console || {};
	    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'exception', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
	
	    var console = {version: '0.1.0'};
	    var key;
	    for(var i = 0, len = methods.length; i < len; i++) {
	        key = methods[i];
	        console[key] = function (key) {
	            return function () {
	                if (typeof _console[key] === 'undefined') {
	                    return 0;
	                }
	
	                Function.prototype.apply.call(_console[key], _console, arguments);
	            };           
	        }(key);
	    }
	    
	    g.console = console;
	}(window));

**小贴士：**你知道最前面的分号是干嘛用的吗？

其实是为了防止自动化工具拼接js时，前面的js的结尾处忘记了加分号，然后拼接出来的代码就挂了。属于防御式编程。

例如a.js和b.js代码如下：

a.js

	(function () {
		//...
	}())

b.js

	(function () {
		//...
	}());

上面的代码被合后就会变为

	(function () {
		//...
	}())
	(function () {
		//...
	}());

这段代码执行时就会报错了，穿插一个小知识点，太小了，无法自成文章。

更多信息请参考console.js的[文档](https://github.com/yanhaijing/console.js#readme)。

##仅此而已了吗？

我一直在思考还可以做哪些改进，或者功能，仅此而已了吗？当然不是，我能想到的还可以做下面的一些改进。

增加一个对原始console的访问接口，类似jq的noConflict，或者在现在的console上加一个对原来console的引用。

增加对域名的过滤功能，比如我们可能只希望log信息在调试的时候输出，而在线上时不做输出。

目前对不支持的接口仅简单赋值为空函数，可考虑对不支持的接口做模拟，对不支持console功能的浏览器，提供自定义模拟console。

当然这些功能是否应该加入console.js，是个问题，应该思考下，console.js的初衷是什么。。。

##不足

对于ie8 9浏览器，在首次打开控制台时，会新建console对象，现在console.js，尽在页面载入时做修复，无法解决这个问题。

但对于打开控制台的人，绝大多数应该不属于用户吧。($ _ $)

##总结

console.js 与console就想html5shim于html5，仅此而已，如此简单。

求个star(⊙ｏ⊙)，github地址：[https://github.com/yanhaijing/console.js](https://github.com/yanhaijing/console.js)



