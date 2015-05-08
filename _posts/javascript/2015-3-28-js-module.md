---
layout: post
title: JavaScript模块的前世今生
category : javaScript
tagline: "原创"
tags : [javaScript]
keywords: [module, js]
description: 本文将会陈述下JavaScript模块的前世今生。
---
{% include JB/setup %}

如今JavaScript模块化编程的概念已经普及开来，一提起模块化，大家想到的可能是AMD，CMD，requirejs或seajs。其实还有很多其他的概念。本文将会陈述下JavaScript模块的前世今生。

众所周知，JavaScript由于[历史的原因](http://yanhaijing.com/javascript/2013/06/22/javascript-designing-a-language-in-10-days/)并没有模块的概念，自从ajax带来了web2.0概念后，js代码已经和以前大不相同了，2009年HTML5兴起后，前端代码的行数已经呈现井喷式发展，随着代码量的增加，模块的缺失的缺点日益凸显，Javascript社区做了很多探索。

##模块的定义
模块并非js语言独创，显然是借鉴其他语言的，下面是百度百科对模块的定义：

> 模块,又称构件,是能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）

从中提炼出几个关键字就是，独立，集合，完成一定功能。

上面的提炼，再从其他语言的实现中借鉴下，总结起来，我们期待的模块有如下特性：

- 独立性——能够独立完成一个功能，不受外部环境的影像
- 完整性——完成一个特定功能
- 集合性——一组语句的集合
- 依赖性——可以依赖已经存在的模块
- 被依赖——可以被其他模块依赖

其实我们想要的就是一个独立的模块，并能引用依赖，及被依赖。

C语言的库和头文件（include），java的包（import）。这在其他语言中都是原生支持的特性，在js中却是没有的。

##原始写法
如果仅从定义入手，那么一个函数即可成为一个模块（独立，集合，完成一个功能），那我们就先从最原始的探索开始，也许不经意间，我们早已在使用模块了。
	
	//最简单的函数，可以称作一个模块
	function add(x, y) {
		return x + y;
	}

稍微了解点javascript基础的人都知道js中能创建作用域的就是函数（ES6之前），总结下社区的探索，对模块的模拟大概如下：

	(function (mod, $, _) {
		mod.add = ***;
		mod.sub = ***;
	}((window.mod = window.mod || {}), jQuery, Underscore));

上面的mod模块不会重复定义，可自由定义依赖。

99%的人思想会止步于此，但这种实现其实并不完美，仍然需要手动维护依赖的顺序。典型的场景就是上面的jquery必须先于我们的代码引入，不然会报引用错误，这显然不是我们想要的。

我在写[Painter](http://yanhaijing.com/Painter/)的时候，曾经手动维护几十个script之间的先后顺序，这种感觉很虐心，最后想加个新script很容易报错。下面介绍的

##YUI
前段时间雅虎宣布[YUI](http://yuilibrary.com/)不再更新了，很是伤感，最早接触模块的概念，当属YUI了，当然不是YUI2了。

YUI3经过全新设计，使用了沙箱模式 + 命名空间的方式，并有了模块的概念。

例如在YUI3中想使用一个模块，需要如下这样：
	
	//使用node模块，node模块会作为参数传入
	YUI().use('node', function (Y) {
		///***
	}

YUI的模块化已经做的很好了，但对于仅想使用模块的人，要引入YUI确实有点太重了。

##CMD(Common Module Definition)
说道[CMD](https://github.com/cmdjs/specification)就不能不提[commonjs](http://wiki.commonjs.org/wiki/CommonJS)，提到commonjs就不能不提[node](http://nodejs.org/)。

CMD规范参照commonjs中的方式，定义模块的方式如下:

	define(function(require, exports, module) {

	  // The module code goes here
	});

一个文件就是一个模块，文件名就是模块的名字，使用模块的方法也和commonjs中一致，只需require就好了，模块名字可省略后缀。
	
	//使用event.js模块
	var ec = require('event');

CMD的典型实现就是[seajs](http://seajs.org)，应用的很广泛。

##AMD(Asynchronous Module Definition)
[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)是异步模块定义，特别适合在浏览器端使用，其规范和CMD是很像的，AMD规范中定义模块的方式如下：

	define(id?, dependencies?, factory);

同CMD一样，一个文件即一个模块，模块的使用方法如下：

	define(["beta"], function (beta) {
    	bata.***//调用模块
    });

AMD主张依赖注入，这点和CMD不同（以来查找）。

AMD也支持已CMD的方式来使用依赖。

AMD的典型实现有[requireJS](http://requirejs.org/)，[modJS](https://github.com/fex-team/mod)和**[lodJS](https://github.com/yanhaijing/lodjs)**。

##KMD
KMD是[kissy](http://docs.kissyui.com/1.4/docs/html/tutorials/kissy/loader/index.html)中提出来的，是kissy自己的一套模块化方案，具体我也不是很清楚，感兴趣的同学可自行搜索相关资料。

有一次同事[@eric曦尧](http://weibo.com/u/1835760415)无意说起，KMD的意思是 kill amd and cmd，当时觉得好高打上的名字(/ □ \\)。

##ES6
[ES6](http://yanhaijing.com/es5/)带来了语言层面的模块化支持，规范方面见[这里](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-module-namespace-exotic-objects)，文档方面见[这里](http://es6.ruanyifeng.com/#docs/class)。

我们现在期待的就是ES6规范快点尘埃落定（据说今年夏天），现在还处于草案状态，还有浏览器厂商们的大力支持，还有就是在国内尽快普及开来。

##UMD
[UMD](https://github.com/umdjs/umd)的全称是Universal Module Definition。和它名字的意思一样，这种规范基本上可以在任何一个模块环境中工作。

一段典型的UMD代码如下所示：
	
	(function (root, factory) {
	    var Data = factory(root);
	    if ( typeof define === 'function' && define.amd) {
	        // AMD
	        define('data', function() {
	            return Data;
	        });
	    } else if ( typeof exports === 'object') {
	        // Node.js
	        module.exports = Data;
	    } else {
	        // Browser globals
	        var _Data = root.Data;
	        
	        Data.noConflict = function () {
	            if (root.Data === Data) {
	                root.Data = _Data;
	            }
	            
	            return Data;
	        };
	        root.Data = Data;
	    }
	}(this, function (root) {
		var Data = ...
		//自己的代码
		return Data;
	}));

这是出自[data.js](https://github.com/yanhaijing/data.js)中的一部分代码，其原理就是做个判断，不同的环境进行不同的处理。

我已将UMD应用到自己的项目中，瞬间感觉高大上了不少:-)。

##总结

比较成气候的模块化方案，当属AMD和CMD，网上关于二者比较的文章甚多，很难评价谁好谁坏，当下开来AMD的使用范围似乎更广些，而CMD的本土化方面做的更好。

这些模块化的探索，使前端工程化成为了可能，可以说没有模块，工程化更无从弹起，本文总结了大家在模块化方面的一些探索，下一篇文章将重点介绍下[lodJS](https://github.com/yanhaijing/lodjs)(一款基于AMD的模块加载器)的实践和原理。

##参考资料
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [JavaScript模块化开发一瞥](http://www.ituring.com.cn/article/1091)
- [AMD 和 CMD 的区别有哪些？](http://www.zhihu.com/question/20351507/answer/14859415)
- [SeaJS与RequireJS最大的区别](http://www.douban.com/note/283566440/)
- [YUI Modules 与 AMD/CMD，哪一种方式更好？](http://www.zhihu.com/question/21347409)
- [ES6的模块、构建工具及应用的发布](http://zhuanlan.zhihu.com/FrontendMagazine/19569085)



