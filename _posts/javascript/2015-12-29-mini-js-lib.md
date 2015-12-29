---
layout: post
title: 不可错过的javascript迷你库
category : js
tagline: "原创"
tags : [js]
keywords: [js]
description: 本文将介绍笔者收集的一些非常赞的开源库，这些库的共性是非常小，而且功能单一。
---
{% include JB/setup %}
最近看着下自己的[github star](https://github.com/yanhaijing)，把我吓坏了，手贱党，收藏癖的我都收藏了300+个仓库了，是时候整理一下了。

Unix主张kiss，小而美被实践是最好用的，本文将介绍笔者收集的一些非常赞的开源库。

这些库的共性是非常小，而且功能单一。

## [cookie.js][cookie.js]
如果你操作过cookie的接口，那么你一定会感觉这东西的规范真的是太复杂了，根本记不住啊，其实你是对的，因为cookie的接口设计的是有问题的，也就是说设计的太底层了，根本不友好，那么来试试这个js库吧。

## [store.js][store.js]
再来说说浏览器的localStore吧，这东西太赞了，可惜尼玛每个浏览器都实现的各不相同，我也是醉了，如果你也有同样的烦恼，不如来试试这个迷你库，它有更简单的api，最重要的是他解决了跨浏览器问题，甚至解决了低版本浏览器(ie6)不支持localStore的问题。

## [data.js][data.js]
> data.js 是带有消息通知的数据中心，我称其为会说话的数据。旨在让编程变得简单，世界变得美好

如果你使用模块化编程，或者在node环境下的话，你一定纠结过不同模块间到底如何共享数据的问题（虽然这是反模式），全局变量。。。那么试试这个迷你库吧，简单可以来，会让你消除上面的烦恼问题，同时他还支持消息，当数据更新时，会发出消息。

## [template.js][template.js]
> template.js 一款javascript模板引擎，简单，好用。

## [lodJS][lodJS]
> JavaScript模块加载器，基于AMD。迄今为止，对AMD理解最好的实现

## [favico.js][favico.js]
在favico上添加数字书不是很nice，点击下面的官网查看效果，这肯定要逼死强迫症了。

[官网](http://lab.ejci.net/favico.js/)。

## [Modernizr][Modernizr]
这个就不过多解释了，各种html css js检测器，功能检测哦。

## [Move.js][Move.js]
如果你操作过css3的属性，一定会觉得非常痛苦的，那不如来试试合格，css3动画瞬间变得简单了。

## [Keypress][Keypress]
一定记不住键盘上每个键的键位码吧，来试试这个，直观的展示，再也不需要记忆了。

## [device.js][device.js]
你想检测用户的设备，试试这个吧，比jq.browser全面多了。

## [is.js][is.js]
迷你检查库，这个几乎涵盖了全部的各种检测。

## [es5-shim][es5-shim]
还没使用es5，只能鄙视你了，担心兼容性，用这个吧，主要是为了es6打基础啊。

## [es6-promise][es6-promise]
promise太好用了，兼容性问题靠这个全解决了。

## [parallax][parallax]
先来看个视差效果的[demo](http://zhidao.baidu.com/s/10year/index.html)，是不是很赞，如果你也想实现这个效果，那么来试试这个吧。

## [notie.js][notie.js]
还在使用弹窗通知用户，太low了，快来试试这款非阻塞式，小清新的通知插件吧，对移动端有好，界面好到爆炸啊。

## [share.js][share.js]
> 一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等社交网站。

如果你收购了分享组件的烦恼，那么来试试这个对移动端有好的分享组件吧，界面优美，看起来很赞。

[demo](http://overtrue.me/share.js/)

## [mathjs][mathjs]
js自带的数学运算不能满足你的需求了，那试试这个，扩展了很多数学运算。

这里是[官网](http://mathjs.org/)。

![](https://raw.github.com/josdejong/mathjs/master/img/mathjs.png)

## 总结
本文介绍的只是作者收集的一小部分而已，作者将会保持时时更新的，如果你有什么推荐的欢迎反馈给我。

最后向大家推荐依稀[microjs](http://microjs.com/)，这里收集了太多小而美的库，自己来淘宝吧。

[cookie.js]: (https://github.com/js-coder/cookie.js)
[store.js]: (https://github.com/marcuswestin/store.js)
[data.js]: (https://github.com/yanhaijing/data.js)
[template.js]: (https://github.com/yanhaijing/template.js)
[lodJS]: (https://github.com/yanhaijing/lodjs)
[favico.js]: (http://lab.ejci.net/favico.js/)
[Modernizr]: (http://modernizr.com/)
[Move.js]: (http://visionmedia.github.io/move.js/)
[Keypress]: (http://dmauro.github.io/Keypress/)
[device.js]: (http://matthewhudson.me/projects/device.js/)
[is.js]: (http://arasatasaygin.github.io/is.js/)
[es5-shim]: (https://github.com/es-shims/es5-shim)
[parallax]: (https://github.com/wagerfield/parallax)
[notie.js]: (https://github.com/jaredreich/notie.js)
[share.js]: (https://github.com/overtrue/share.js)
[mathjs]: (https://github.com/josdejong/mathjs)
[es6-promise]: (https://github.com/jakearchibald/es6-promise)

