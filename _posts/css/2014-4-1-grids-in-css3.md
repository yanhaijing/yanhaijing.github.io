---
layout: post
title: CSS3中的网格
category : css
tagline: "译"
tags : [css]
keywords: [css, grids]
description: 在这篇文章中，我们将来看一些CSS3新属性，从而用HTML和CSS处理网格的时候更容易。但首先让我们讨论一点HTML和CSS网格的历史，了解清楚为什么以前很困难。
---
{% include JB/setup %}

在这篇文章中，我们将来看一些CSS3新属性，从而用HTML和CSS处理网格的时候更容易。但首先让我们讨论一点HTML和CSS网格的历史，了解清楚为什么以前很困难。

## 网格简史

曾几何时，我们的布局是一团糟。表格和框架是用于创建多列布局的主要工具。虽然他们能完成工作（但其实非常糟糕）。

把目光投向今天。HTML和CSS已经变得非常复杂，Web设计的知名度和复杂度与日俱增。我们曾经使用的旧的布局方法显然已经out了。然而，一个历史遗留问题浮出水面：多列布局。

更复杂的是，我们的页面宽度不再是静态的。响应式大行其道，所以我们倾向于基于百分比的列宽。基于固定960像素宽的简单网格已经行不通——我们需要流体网格。

CSS2规范中用浮动解决列的方法存在一个问题。为了防止父元素破环你的布局，我们需要添加clearfix。通过这种方法，来修正父元素的高度坍塌问题（浮动元素脱离标准流，父元素会认为浮动资源不存在）。我们大部分接受这种方法，但许多人仍然认为它是一种hack（奇技淫巧）。

通过inline-box的方法并不常见，但仍然存在。内联元素会保持在一行，他们自然顺序排列。当一行被占满，后面的元素自然折到下一行。但因为他表现为文本特性，其行为类似文本。这意味着你必须避免HTML元素之间的空白元素(空格，tab，换行……)。Inline-block不是为这设计的，不且工作的并不十分如意。

在这两种方法中，浮动的方法更可靠。这就是为什么它更流行，排在第一位。然而，创建多列后，我们发现需要再次压缩内容，因为我们需要一些填充距离。这就引出最终的问题：盒模型

盒模型是什么，简单来说，一个元素的实际尺寸包括：高度/宽度+内边距+边的宽度。外边据并不使盒子变大，仅仅在自己和其他元素之间增加空隙。所以设置宽度时,比如25%，其盒子的实际宽度比这大得多，这意味着在一行没有足够的空间放下四个元素。

这烦人的问题有不同的解决方案：负外边距，嵌套元素——我知道的全部了。他们都需要额外的CSS或DOM元素，算作hack方法。让我们面对现实，CSS2中没有解决网格的好方法。

然而今天，CSS3提供很好的支持，规范增加了专门用于网格的几个新特性。这些特性都有哪些？我们如何使用他们？让我们看一看。

## box-sizing: border-box

已经解决的问题之一是扩展盒模型的性质。通过设置box-sizing的值为border-box可以解决这个问题。通过减少内容宽度使边和内边距的距离也算到width属性里。

**HTML**

	<div class="row">
	  <div class="column">Col one</div>
	  <div class="column">Col two</div>
	  <div class="column">Col three</div>
	  <div class="column">Col four</div>
	</div>

**CSS**

	.row:after {
	  clear: both;
	  content: '';
	  display: block;
	}
	
	.column {
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	  
	  float: left;
	  min-height: 8em;
	  overflow: hidden;
	  padding: 2em;
	  width: 25%;
	}
	
	.column:nth-child(1) { background-color: #9df5ba; }
	.column:nth-child(2) { background-color: #9df5d7; }
	.column:nth-child(3) { background-color: #9df5f5; }
	.column:nth-child(4) { background-color: #9dd7f5; }

**Demo**

![]({{BLOG_IMG}}100.png)

虽然这工作的很棒，但我们仍然需要使用浮动，我们仍然需要清除浮动。此外，我们我们只能使用内边距作为元素的空间，外边距不再起作用。这意味着在快元素之间没有实际的空间，而是它的内容。虽然这对很多设计非常有用，但仍然觉得它是个小错误。

- Firefox 1
- Chrome 1
- IE 8
- Opera 7
- Safari 3

## width: calc(百分比 – 距离)

另一个伟大的选择是使用calc()函数。他允许我们在不依赖JavaScript的情况下计算元素的真实宽度——可以是不同的单位！

**HTML**

	<div class="row">
	  <div class="column">Col one</div>
	  <div class="column">Col two</div>
	  <div class="column">Col three</div>
	  <div class="column">Col four</div>
	</div>

**CSS**

	.row { margin-left: -1em; }
	
	.row:after {
	  clear: both;
	  content: '';
	  display: block;
	}

	.column {
	  float: left;
	  margin-left: 1em;
	  min-height: 8em;
	  padding: 1em;
	  width: -webkit-calc(25% - 3em);
	  width: -moz-calc(25% - 3em);
	  width: calc(25% - 3em);
	}
	
	.column:nth-child(1) { background-color: #9df5ba; }
	.column:nth-child(2) { background-color: #9df5d7; }
	.column:nth-child(3) { background-color: #9df5f5; }
	.column:nth-child(4) { background-color: #9dd7f5; }

**Demo**

![]({{BLOG_IMG}}101.png)

重新计算实际尺寸的能力是一个伟大的选择，但不幸的的是，我们仍然需要浮动，我们也需要列的容器为负外边距。同上，一个很棒的选择，但仍然有些瑕疵。

- Firefox 4
- Chrome 19
- IE 9
- Opera ?
- Safari 6 (appears to be a little buggy)

## Flexbox

伸缩布局盒是有特定配置行为的元素——有点像表格。这是真的吗？是的没错。表格的行为实际上相当棒，因为它的显示依据它的内容而变化。但现在已经不再使用表格布局，所以表格标签不是一个选项。
起初，伸缩盒看起来有待年复杂。有很多很难理解的属性，尤其像我这样不擅用英语演讲的人。幸运的是，Chirs Coyier写了一个关于伸缩盒的伟大指导，我必须提到。

**HTML**

	<div class="row">
	  <div class="column">Col one</div>
	  <div class="column">Col two</div>
	  <div class="column">Col three</div>
	  <div class="column">Col four</div>
	</div>

**CSS**

	.row {
	    display: -webkit-flex;
	    -webkit-flex-direction: row;
	    -webkit-flex-wrap: nowrap;
	    -webkit-justify-content: space-between;
	
	    display: flex;
	    flex-direction: row;
	    flex-wrap: nowrap;
	    justify-content: space-between;
	}
	
	.column {
	    margin: 0.5em;
	    min-height: 8em;
	    padding: 1em;
	    width: 25%;
	}
	
	.column:nth-child(1) { background-color: #9df5ba; }
	.column:nth-child(2) { background-color: #9df5d7; }
	.column:nth-child(3) { background-color: #9df5f5; }
	.column:nth-child(4) { background-color: #9dd7f5; }

**Demo**

![]({{BLOG_IMG}}102.png)

就这么简单！但……浏览器的支持不是很好。

- Firefox 18
- Chrome 21
- IE 10
- Opera 12.10
- Safari 6.1

## 结论

尽管CSS3带来了许多新特性并且修复了一些历史遗留问题，在我看来，伸缩盒布局是用CSS创建弹性网格的唯一非hack方法。然而，不幸的是浏览器的支持表现平平。尽管如何，其他方法丰富了表现，所以他们是一个进步，并且他们有很好的浏览器支持。

## 注

原文：http://flippinawesome.org/2014/03/03/grids-in-css3/
