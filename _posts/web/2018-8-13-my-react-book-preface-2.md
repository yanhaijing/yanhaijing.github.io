---
layout: post
title: 《React 状态管理与同构实战》迷渡（justjavac）推荐序
category : web
tagline: "原创"
tags : [web]
keywords: [web]
description: 我的新书《React 状态管理与同构实战》迷渡（justjavac）推荐序
---
{% include JB/setup %}

从去年起，我和知名技术专家[侯策][lucas]开始了合著之旅，今年我们共同打磨的书籍《React 状态管理与同构实战》终于正式出版了！

<img src="{{BLOG_IMG}}526.png" width="150">

在书籍定稿之际，我把底稿寄给了[justjavac][justjavac]，感谢[justjavac][justjavac]在百忙之中抽时间阅读了底稿，并为我写了推荐序，一下是推荐序的内容

## 迷渡（justjavac）推荐序
1995年，Brendan Eich花了10天时间开发出一门脚本语言，取名为Mocha，并将其集成到了Netscape浏览器中，不久后这门语言被改名为LiveScript，意思是可以让网页充满动力。同年年底，网景公司和SUN公司达成协议并获得了Java商标的使用权，于是正式将这门语言更名为JavaScript。

历史选择了JavaScript，使其成为了目前浏览器唯一内置支持的语言。时至今日，JavaScript已经不仅仅局限于为网页开发实现特效了，而是真正发展成了一门全功能的编程语言。

我从2005年开始接触网页开发，经历了Web开发的“上古时代”。在Web 1.0时期，我们开发出来的网页是给人“看”的，此时流行jQuery这种用来处理浏览器兼容性的库，以及像Dojo、YUI、Extjs这种用来做UI的库。

随着计算机和浏览器性能的提升，JavaScript的功能开始不再局限于实现简单的网页开发，特别是Ajax的使用更是显著地提升了用户体验，这个时期被称为Web 2.0。站在开发者和使用者的角度，Web 2.0时期开发出来的网页是给人“用”的。此时的JavaScript程序无论从代码数量上还是代码复杂程度上，都是前所未有的。于是开发者们开始借鉴后端流行的MVC框架的思想，随后又根据前端自身的特点改进了传统MVC模式，并发展出了MVP、MVVM等新架构，其中比较有代表性的有Knockout.js、Backbone.js、Ember.js等。

后来，React发布了，自那时起我成为了一名坚定的React使用者。React不仅仅是一个全新的框架，更是一种新的思想。React重新定义了前端View层的开发模式：v = f(s)

其中s代表引用的状态（state），v代表View，而f则是一个把状态映射为View的纯函数。这个简单的公式代表了前端开发的一种模式：View就是对于状态（state）的展示，对于同一个f而言，相同的状态永远对应相同的视图。

React就是这里的f，React生态的不同库则代表着不同的f，比如react-naitve、react-art、react-canvas、react-svg等。

当我们写<TextBox color="red">时，它既可以被react-dom渲染为一个div标签，也可以在服务器端被渲染为一个字符串，还可以被react-native渲染为原生的控件，甚至可以被渲染为Word中的一行文本、Excel中的一个表格等。而这一切的魔法就源自React的思想。

但是React只是一个专注于View层的框架，它只负责把状态映射为视图，并不关注状态的来源和转换，因此在实际开发中，我们还需要关注“React全家桶”中的Redux。另外，同构应用可以让开发者只编写一套代码便可以既运行在服务端，又运行在客户端，充分结合两者的优势，并有效避免两者的不足。这也是React的一大优势。

虽然市面上关于React的书已经数不胜数，但是大多都是围绕着React框架本身的使用方法来讲解的，对于深入讲解React状态管理与同构应用的书却寥寥无几，而侯策和颜海镜的这本书正好可以弥补这一方面的不足。

几年前，由于GitHub上的机缘巧合，我认识了本书的作者之一颜海镜。颜海镜不仅是开源的狂热爱好者，也是国内最早学习并实践React的开发者之一。从我认识他起，他就一直在关注各种前端新技术，并开源了很多前端开发工具和库，这一点真的非常难能可贵！
如果你想实战React同构应用，或者想要深入全面地了解有关React状态管理的知识，相信这本《React状态管理与同构实战》一定会给你给多启发。强烈建议各位读者细细品读。

[迷渡（justjavac）][justjavac]

Flarum中文社区创始人

2018年6月于天津


## 总结
《React 状态管理与同构实战》这本书由我和前端知名技术专家[侯策][lucas]合力打磨，凝结了我们在学习、实践 React 框架过程中的积累和心得。除了 React 框架使用介绍以外，着重剖析了状态管理以及服务端渲染同构应用方面的内容。同时吸取了社区大量优秀思想，进行归纳比对。

本书受到百度公司副总裁沈抖、百度高级前端工程师[董睿][dongrui]，以及知名JavaScript语言专家[阮一峰][ruanyf]、Node.js布道者[狼叔][langshu]、Flarum中文社区创始人 [justjavac][justjavac]、新浪移动前端技术专家[小爝][xiaojue]、知乎知名博主[顾轶灵][guyiling]等前端圈众多专家大咖的联合力荐。

有兴趣的读者可以点击下面的链接购买，再次感谢各位的支持与鼓励！恳请各位批评指正！

京东：<a href="https://item.jd.com/12403508.html" target="_blank">https://item.jd.com/12403508.html</a> 

当当：<a href="http://product.dangdang.com/25308679.html" target="_blank">http://product.dangdang.com/25308679.html</a>


[lucas]: https://www.zhihu.com/people/lucas-hc
[dongrui]: https://www.zhihu.com/people/dong-rui-24/activities
[langshu]: https://www.zhihu.com/people/i5ting/activities
[ruanyf]: http://www.ruanyifeng.com/home.html
[justjavac]: http://justjavac.com/
[guyiling]: https://www.zhihu.com/people/justineo/activities
[xiaojue]: https://www.zhihu.com/people/xiao-jue-83/activities
