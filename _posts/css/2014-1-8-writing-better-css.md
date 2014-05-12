---
layout: post
title: 编写更好的CSS
category : css
tagline: "译"
tags : [css]
keywords: [css]
description: 编写好的CSS代码能提升页面的渲染速度。本质上，一条规则都没有引擎解析的最快。MDN上将CSS选择符归拆分成四个主要类别，如下所示，性能依次降低。
---
{% include JB/setup %}

编写好的CSS代码能提升页面的渲染速度。本质上，一条规则都没有引擎解析的最快。MDN上将CSS选择符归拆分成四个主要类别，如下所示，性能依次降低。

- ID 规则
- Class 规则
- 标签规则
- 通用规则

对效率普遍认识是从Steve Souders在2009年出版的《高性能网站建设进阶指南》开始的，虽然Souders的书中罗列的非常详细，你可以在[这里](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)查看完整列表引用。你也可以在谷歌的[高效的CSS选择器的最佳实践](https://developers.google.com/speed/docs/best-practices/rendering#UseEfficientCSSSelectors)中查看更多的细节。

本文我想分享一些我在编写高性能CSS中用到的简单的例子和指导方针。受MDN的编写高效的CSS指南的启发，并遵循类似的格式。

## 避免过度约束 ##

作为一般规则，不添加不必要的约束。

	// 糟糕
	ul#someid {..}
	.menu#otherid{..}
	
	// 好的
	#someid {..}
	#otherid {..}

## 后代选择符最烂 ##

不仅性能低下而且代码很脆弱，html代码和css代码严重耦合，html代码结构发生变化时，CSS也得修改，这是多么糟糕，特别是在大公司里，写html和css的往往不是同一个人。

	// 烂透了
	html div tr td {..}

## 避免链式（交集）选择符 ##

这和过度约束的情况类似，更明智的做法是简单的创建一个新的CSS类选择符。

	// 糟糕
	.menu.left.icon {..}
	
	// 好的
	.menu-left-icon {..}

## 坚持KISS原则 ##

想象我们有如下的DOM：

	<ul id="navigator">
	    <li><a href="#" class="twitter">Twitter</a></li>
	    <li><a href="#" class="facebook">Facebook</a></li>
	    <li><a href="#" class="dribble">Dribbble</a></li>
	</ul>

下面是对应的规则……

	// 糟糕
	#navigator li a {..}
	
	// 好的
	#navigator {..}

## 使用复合语法 ##

尽可能使用复合语法。

	// 糟糕
	.someclass {
	 padding-top: 20px;
	 padding-bottom: 20px;
	 padding-left: 10px;
	 padding-right: 10px;
	 background: #000;
	 background-image: url(../imgs/carrot.png);
	 background-position: bottom;
	 background-repeat: repeat-x;
	}
	
	// 好的
	.someclass {
	 padding: 20px 10px 20px 10px;
	 background: #000 url(../imgs/carrot.png) repeat-x bottom;
	}

## 避免不必要的命名空间 ##

	// 糟糕
	.someclass table tr.otherclass td.somerule {..}
	
	//好的
	.someclass .otherclass td.somerule {..}

## 避免不必要的重复 ##

尽可能组合重复的规则。

	// 糟糕
	.someclass {
	 color: red;
	 background: blue;
	 font-size: 15px;
	}
	
	.otherclass {
	 color: red;
	 background: blue;
	 font-size: 15px;
	}
	
	// 好的
	.someclass, .otherclass {
	 color: red;
	 background: blue;
	 font-size: 15px;
	}

## 尽可能精简规则 ##

在上面规则的基础上，你可以进一步合并不同类里的重复的规则。

	// 糟糕
	.someclass {
	 color: red;
	 background: blue;
	 height: 150px;
	 width: 150px;
	 font-size: 16px;
	}
	
	.otherclass {
	 color: red;
	 background: blue;
	 height: 150px;
	 width: 150px;
	 font-size: 8px;
	}
	
	// 好的
	.someclass, .otherclass {
	 color: red;
	 background: blue;
	 height: 150px;
	 width: 150px;
	}
	
	.someclass {
	 font-size: 16px;
	}
	
	.otherclass {
	 font-size: 8px;
	}

## 避免不明确的命名约定 ##

最好使用表示语义的名字。一个好的CSS类名应描述它是什么而不是它像什么。

## 避免 !importants ##

其实你应该也可以使用其他优质的选择器。

## 遵循一个标准的声明顺序 ##

虽然有一些排列CSS属性顺序[常见的方式](http://css-tricks.com/new-poll-how-order-css-properties/)，下面是我遵循的一种流行方式。

	.someclass {
	 /* Positioning */
	 /* Display & Box Model */
	 /* Background and typography styles */
	 /* Transitions */
	 /* Other */
	}

## 组织好的代码格式 ##

代码的易读性和易维护性成正比。下面是我遵循的格式化方法。

	// 糟糕
	.someclass-a, .someclass-b, .someclass-c, .someclass-d {
	 ...
	}
	
	// 好的
	.someclass-a, 
	.someclass-b, 
	.someclass-c, 
	.someclass-d {
	 ...
	}
	
	// 好的做法
	.someclass {
	    background-image:
	        linear-gradient(#000, #ccc),
	        linear-gradient(#ccc, #ddd);
	    box-shadow:
	        2px 2px 2px #000,
	        1px 4px 1px 1px #ddd inset;
	}

显然，这些只是极少数的规则，是我在我自己的CSS中，本着更高效和更易维护性而尝试遵循的规则。如果你想阅读更多的知识，我建议阅读MDN上的[编写高效的CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)和谷歌指南上的[优化浏览器渲染](https://developers.google.com/speed/docs/best-practices/rendering#UseEfficientCSSSelectors)。

## 译者注 ##

本文为译文，原文为“[Writing Better CSS](http://flippinawesome.org/2013/08/12/writing-better-css/)”