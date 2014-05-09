---
layout: post
title: css定位和大小代码段集锦
category : css
tagline: "转"
tags : [css]
keywords: [css]
description: css 有时候会很棘手，尤其是在定位和设置大小的时候。本文包含了我整理的一系列有用的片段，它们使我的生活变得更容易，希望也能帮到你们。
---
{% include JB/setup %}

css 有时候会很棘手，尤其是在定位和设置大小的时候。本文包含了我整理的一系列有用的片段，它们使我的生活变得更容易，希望也能帮到你们。

注：每个段落的下方有一个表，说明浏览器的支持情况。

## 定位 ##

### 水平和垂直方向 ###

动态调整大小的元素。

	.parent { position: relative; }
	
	.child {
	    position: absolute;
	
	    left: 50%;
	    top: 50%
	
	    -webkit-transform: translate(-50%, -50%);
	    -moz-transform: translate(-50%, -50%);
	    -ms-transform: translate(-50%, -50%);
	    -o-transform: translate(-50%, -50%);
	    transform: translate(-50%, -50%);
	}

![]({{BLOG_IMG}}17.png)

固定大小的元素。

	.parent { position: relative; }
	
	.child {
	    position: absolute;
	
	    left: 50%;
	    top: 50%
	
	    height: 250px;
	    width: 500px;
	
	    /* Translate element based on it's size */
	    margin-left: -125px;
	    marign-top: -250px;
	}

![]({{BLOG_IMG}}18.png)

随着百分比变化的

	.parent { position: relative; }
	
	.child {
	    position: absolute;
	
	    height: 50%;
	    width: 50%;
	
	    left: 25%; /* (100% - width) / 2 */
	    top: 25%;  /* (100% - height) / 2 */
	}

![]({{BLOG_IMG}}19.png)

### 水平 ###

块级元素的宽度值。

	.block {
	    margin-left: auto;
	    margin-right: auto;
	}

![]({{BLOG_IMG}}20.png)

内联和内联块元素

	.parent { text-align: center; }
	.child { display: inline-block; }

![]({{BLOG_IMG}}21.png)

### 垂直 ###

静态父元素中的内联和内联块元素

	.parent { line-height: 500px; }
	
	.child {
	    display: inline-block;
	    vertical-align: middle;
	}

![]({{BLOG_IMG}}22.png)

伪表格

	.parent { display: table; }
	
	.child {
	    display: table-cell;
	    vertical-align: middle;
	}

![]({{BLOG_IMG}}23.png)

## 尺寸 ##

下面创建一个全尺寸的块元素，但是因为有边框，内边距与外边距而没有成功。盒模型的属性使它没有成为预期的大小。

	html { min-height: 100%; }
	body { height: 100%; }
	
	.block {
	    height: 100%;
	    width: 100%;
	
	    -webkit-border-sizing: border-box;
	    -moz-border-sizing: border-box;
	    border-sizing: border-box;
	}

![]({{BLOG_IMG}}24.png)

接下来的代码创建一个全尺寸的块元素为全屏幕，不依赖于边框和内边距。你可以为某个模块设定值来创建空间，比如标头。

	html { min-height: 100%; }
	body { height: 100%; }
	
	.center {
	    position: absolute; /* or fixed */
	
	    bottom: 0;
	    left: 0;
	    right: 0;
	    top: 0; /* top: 50px; would reserve 50px for an header */
	}

![]({{BLOG_IMG}}25.png)

接下来我们创建一个绝对元素总是等于或大于视窗，基于文档的高度

	html {
	    position: relative;
	    min-height: 100%;
	}
	
	body { height: 100%; }
	
	.block {
	    min-height: 100%;
	    position: absolute;
	}

![]({{BLOG_IMG}}26.png)

## 结论 ##

在这里讨论的所有方法几乎都可以通过嵌套来组合它们。你还知道其他很棒的技巧或有用的代码么？来这里分享吧！

注：本文为转载文章，感谢@[鏾步的魚](http://weibo.com/wsluyu2011 "散步的鱼的微博")的翻译，[原文在这里](http://www.cnblogs.com/wsluyu/p/3461525.html)