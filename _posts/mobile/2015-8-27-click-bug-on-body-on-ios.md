---
layout: post
title: IOS上给body绑定click事件的bug
category : mobile
tagline: "原创"
tags : [mobile]
keywords: [ios, bug, body, click, mobile]
description: 最近做师傅的按钮拆分项目，掉了一个ios的大坑，记录下面，避免后人掉坑。
---
{% include JB/setup %}

最近做师傅的按钮拆分项目，掉了一个ios的大坑，记录下面，避免后人掉坑。

## 描述
这个bug只在IOS上有，包括ihone，ipad，由于ios浏览器都用的safari内核，所以ios浏览器全部中枪。

- window，document，body 绑定click事件是，点击body不会触发

[demo](http://yanhaijing.com/webtest/mobile/bug/ios-body-click.html)

你可能会说谁会往body绑定事件啊，答案就是我这种喜欢把事件都绑定到body的人，然后利用事件冒泡机制，这样做有诸多好处，如果你不知道请自行百度。

## 解决
解决办法也很简单，大概有几个思路：

- 改用touch事件（如果是弹出层的话，会有点透问题）
- 如何避免bug触发：不要委托到body结点上，委托到任意指定父元素都可以，或者使用原生具有该事件的元素，如使用click事件触发就用a标签包一层。
- 已触发如何修补：safari对事件的解析非常特殊，如果一个事件曾经被响应过，则会一直冒泡（捕获）到根结点，所以对于已大规模触发的情况，只需要在body元素的所有子元素绑定一个空事件就好了，如：
		("body > *").on("click", function(){};);

## 总结
但愿你不会和我一样掉坑里，摔得好惨好惨。

## 参考资料
- [iOS safari BUG 总结](http://am-team.github.io/amg/dev-exp-doc.html#ios-safari-bug-总结)

