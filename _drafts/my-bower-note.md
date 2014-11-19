---
layout: post
title: data.js 设计思想
category : js
tagline: "原创"
tags : [js]
keywords: [js,data.js,data]
description: 
---
{% include JB/setup %}

最近搞了个[data.js](https://github.com/yanhaijing/data.js)，放到了github上，两周的时间做到了77个star和16个fork，看起来大家的积极性还是比较高的，如果你有幸看到这篇文章，也欢迎你个我加个star吧，不加也没关系，我相信看完本文会对有有所收获。

hi哥们，先声明一下，data.js是为模块化编程而设计的，如果你还不知道什么是模块化编程，那么say bye bye。看看我的其他文章吧，这篇《[javascript简易教程](yanhaijing.com/basejs/)》也许对你有帮助哦。

本文将会阐述一些data.js理念相关的东西，作为其文档方面的补充，如果你仅仅想学习如何使用data.js，那么直接看这里的[文档](yanhaijing.com/basejs/)和[API](https://github.com/yanhaijing/data.js/blob/master/doc/api.md)吧，或许会更好些，本文仅记录我个人在设计data.js过程中的一些思考，这在电影里可能相当于前传系列。

##data.js是什么

data.js 是带有消息通知的数据中心，我称其为会说话的数据。旨在让编程变得简单，世界变得美好。

上面的定义过于抽象，不过很好的总结了，data.js的两个特性，数据中心 + 消息通知，数据中心是其基本功能，消息通知是其精髓，二者缺一不可，如果没有数据中心，那么消息通知将毫无意义，如果没有详细通知，数据中心将沦为平庸。这里不做过多解释，继续往下看吧。

##场景

我们将设下面这个例子：

图片 145.png

我在制作上面专题的过程中，将转盘+提示区+按钮 编写为三个模块，但问题来了，三个模块共同依赖于剩余抽奖次数这个数据，规则如下：

1. 点击抽奖时，剩余抽奖次数会减一
2. 抽奖次数为零时，按钮会变为财富值换取抽奖次数，点击抽奖次数加一

我们希望模块是高内聚，低耦合的，抽奖模块不应该知道，更不该负责通知提示区和按钮区域的更新，其他模块也是同理的，我对这个问题的解决方法是，我有一个主模块，主模块负责接受和发送消息，相应模块各司其职，互补干涉。

其实上面的例子中，三个模块之间是有数据耦合的，如果处理的不当，就会变为控制耦合，那就有点棘手了。

你可能会问我，为什么上面要有三个模块，而不是一个块呢，我只能呵呵了，举个例子，不要那么当真么，你想怎么写，随你了。

解决上面的问题，除了上面提到的主模块的方法之外，就是我提到的data.js了，抽象出一个数据模块，将消息的通知功能放到数据模块，这对于UI层是常有的需求：

1. 页面中，两个地方显示同一个数据（设计的有点不合理哈）
2. 页面中，两个地方的显示依赖同一个数据
3. 。。。

##主模块做法

主模块

	var count = 3;//数据用来存储抽奖次数
	var a = new A();
	var b = new B();
	var c = new C();
	
	//更新数据
	event.add('count/update', function (c) {
		//更新次数
		count = c;
		
		//更新模块
		a.updateCount(c);
		b.updateCount(c);
		c.updateCount(c);		
	})

A模块（b  c模块类似），A模块自身不知道count的值
	var countA;
	event.fire('count/update', {c: countA});//通知主模块count变更
	
	updateCount = function (c) {
		//处理自身count更新逻辑
		countA = c;
	}

主模块的方法，其实能很好的解决问题，但也并不是没有更好的解决方案了。

##data.js的做法

我们来看看data.js如何解决上面的问题。

模块A（模块B C类似）

	var Data = require('data');
	
	var count = Data.get('count');//获取抽奖次数

	Data.set('count', ***);//更新抽奖次数
	
	//订阅count更新消息 ，data.js保证，在count被更新时，派发消息
	Data.sub('set', 'count', function () {
		//自身count更新逻辑
	});

对比起来data.js的做法明显更优雅，而且省去了，主模块，毕竟不是所有人都能想到主模块做法的。

为什么data.js的做法更好呢，因为模块间本来就是数据耦合，data.js的思想就是数据中心。但继承了了消息中心，事情就变得简单多了。




