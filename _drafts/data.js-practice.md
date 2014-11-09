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

##问题





