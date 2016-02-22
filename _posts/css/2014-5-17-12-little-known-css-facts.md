---
layout: post
title: 12个很少被人知道的CSS事实
category : css
tagline: "转"
tags : [css]
keywords: [css]
description: CSS不是一门很复杂的语言，但是即使你已经写css很多年了，也很有可能遇到一些新玩意儿-某些属性从来没用过，某些值从来未曾考虑，或者某些规范细则你从来不知道。
---
{% include JB/setup %}

CSS不是一门很复杂的语言，但是即使你已经写css很多年了，也很有可能遇到一些新玩意儿-某些属性从来没用过，某些值从来未曾考虑，或者某些规范细则你从来不知道。

我经常会遇到一些css小细节，所以我想在这片文章中和大家分享，需要承认的是，这篇文章中的很多东西并不具有实操价值，但也许你可以留作后用。

## body上的color不只是应用于文字

让我们从最简单的开始吧，color属性是被广泛运用的属性，某些人可能不曾注意，它并不仅仅只是定义文本的颜色。

让我们看这个例子：

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="431" id="cp_embed_CtwFG" scrolling="no" src="http://codepen.io/anon/embed/CtwFG?height=431&amp;theme-id=5083&amp;slug-hash=CtwFG&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

请注意我们只是给body设定了color为yellow，但是你可以看到，页面里的元素都变成了黄色，他们包括:

- 图片的alt文字的值，就是当图片源载入不了时显示的文字
- 列表元素的边框
- 无序列表的点
- 有序列表的数字
- hr元素

有趣的是，hr元素默认是不会继承color属性得，我需要强制他继承border-color: inherit，这对我来说有点怪异。

W3c规范是这么[定义](http://www.w3.org/TR/css3-color/#foreground)的:

> 这个属性用来描述元素的文本的前景颜色，附带被用来为其他接受颜色值的其他属性提供潜在的间接的值。 

我不是很明确地知道有哪些是被当做所谓的前景的，如果你知道的话，请在评论中告诉我。

## visibility还可以设置 “collapse”值

你可能已经用过visibility上千遍了，最常用的是visible和hidden，用来使元素显示或者隐藏。

还有第三个很少被用到的值是collapse，除了在表格的行，列中使用有差异外，他和hidden的作用是等同的。

下面让我们看看在表格元素中，collapse是怎么工作的，不过前提是table的border-collapse需要设定成separate才会有效果哦！

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="406" id="cp_embed_jeICw" scrolling="no" src="http://codepen.io/anon/embed/jeICw?height=406&amp;theme-id=5083&amp;slug-hash=jeICw&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

CSS-Trick 网站的Almanac同学说[不要用这个属性](http://css-tricks.com/almanac/properties/v/visibility/)，因为这个属性存在兼容问题。

我的测试结果是：

- 在Chrome中，collapse和hidden的表现并无不同（请看[bug报告和讨论](https://code.google.com/p/chromium/issues/detail?id=174167)）
- 在firefox，opera和ie11中，collpase的工作是正常的，那就是，表格的行被清除了，而且不再占据空间。

我得承认，这个值可能很少会被用到，但是他确实是存在的。

## background这个简写又有了新值

在css2.1中，background是这5个值的缩写，background-color, background-image, background-repeat, background-attachment, background-position。现在，在css3中，又有三个成员被加进来了，现在总共有8个值，他们是：

	background: [background-color] [background-image] [background-repeat]
            	[background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];

请注意那个正斜杠，和font，[border-radius](http://www.sitepoint.com/setting-css3-border-radius-with-slash-syntax/)类似，这个正斜杠允许你在写完position后加上background-size。

另外，还有两个可选的值是background-origin和background-clip。

实操中语法会变成这个样子

	.example {
	  background: aquamarine url(img.png)
	              no-repeat
	              scroll
	              center center / 50%
	              content-box content-box;
	}

让我们在demo中来一起 感受它:

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="359" id="cp_embed_wdsef" scrolling="no" src="http://codepen.io/anon/embed/wdsef?height=359&amp;theme-id=5083&amp;slug-hash=wdsef&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

这些新值在现代浏览器中工作完美，但是你可能需要为不支持的浏览器优雅降级。

## clip只对absolute元素和fixed元素有效

上边我们谈到了backgrond-clip，现在我们谈谈clip，我们一般是这么写的:

	.example {    
	  clip: rect(110px, 160px, 170px, 60px);
	}

我们用这个方法来剪切元素的一部分，但是它的前提是这个元素必须是absolute定位的(这里有[解释](http://www.impressivewebs.com/css-clip-property/))，所以代码变成这样

	.example {
	    position: absolute;
	    clip: rect(110px, 160px, 170px, 60px);
	}

你可以看到当我们切换这个元素absolute定位的时候，clip也会跟着变化:

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="494" id="cp_embed_siFJu" scrolling="no" src="http://codepen.io/anon/embed/siFJu?height=494&amp;theme-id=5083&amp;slug-hash=siFJu&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

你也可以通过设定position：fixed来让clip变得有效，因为根据[规范](http://www.w3.org/TR/CSS2/visuren.html#absolute-positioning)，fixed元素有资格被当做absolute元素。

## 垂直百分比是根据父层的宽度计算的，而不是父层高度计算的

这个说起来有[一点麻烦](http://www.impressivewebs.com/vertical-percentages-css/)，你应该知道百分比宽度是根据父层的宽度计算的，但是如果像padding，margin这样的属性用上百分比的时候，最终的结果是根据父层的宽度计算的，而不是根据父层的高度计算。

大家来看这个例子：

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="475" id="cp_embed_qLnpm" scrolling="no" src="http://codepen.io/anon/embed/qLnpm?height=475&amp;theme-id=5083&amp;slug-hash=qLnpm&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

注意当我们滑动滑块的时候，只是改变了父层容器的宽度，但是padding-bottom的值却产生了变化。

## border实际上是简写属性的简写

我们都写过这样的语句:

	.example {
	  border: solid 1px black;
	}

border属性是border-style，border-width，border-color的简写 但是请不要忘了，这三个属性每个属性都包含有自身的简写，比如:

	.example {
	  border-width: 2px 5px 1px 0;
	}

这样会让四个border获得不同的宽度，同理，border-color和border-style也是这样：

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="302" id="cp_embed_ClKFE" scrolling="no" src="http://codepen.io/anon/embed/ClKFE?height=302&amp;theme-id=5083&amp;slug-hash=ClKFE&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

这里的重点是，你没法用border这个属性为四条边做出不同的颜色，宽度，样式，所以属性简写再简写后，表达就变得不那么精确了。

## text-decoration实际上是三种属性的简写

我知道这篇文章所说的的可能会让你有一点点晕。

根据w3c规范，现在这个语句是符合标准的:

	a {
	  text-decoration: overline aqua wavy;
	}

text-decoration现在是这三个属性的缩写：text-decoration-line, text-decoration-color和text-decoration-style.

不幸的是，目前只有firefox一家支持这个新属性:

<iframe id="cp_embed_HapgB" src="//codepen.io/anon/embed/HapgB?height=178&amp;theme-id=5083&amp;slug-hash=HapgB&amp;default-tab=result" scrolling="no" frameborder="0" height="178" allowtransparency="true" class="cp_embed_iframe" style="width: 100%; overflow: hidden;"></iframe>

在这个demo中，我们用了类似text-decoration-color这样的写法，我知道这样写很不爽，因为目前很多浏览器不支持，如果我们直接写text-decoration: overline aqua wavy;的话，无疑目前的浏览器识别不了这样的写法，于是只能不解析有，所以为了向下兼容，我们只能这么写了。

## border-width 支持关键字值

这个并不是那么惊天地泣鬼神，但是除了接受标准的值外（像5px或者1em），border-width同时还接受三个关键字值: medium, thin,和 thick。

实际上，border-width的初始值是medium，下面这个例子中用的是thick:

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="216" id="cp_embed_HcaED" scrolling="no" src="http://codepen.io/anon/embed/HcaED?height=216&amp;theme-id=5083&amp;slug-hash=HcaED&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

当浏览器渲染这些关键字值得时候，规范并没有要求他们用特定的宽度值，但是在我的测试中，所有的浏览器都是把这三个值转化成了1px，3px，和5px。

## 很少有人用border-image

我曾经写过一篇关于css3的 border-image的[文章](http://www.sitepoint.com/css3-border-images)，这个特性已经被现代浏览器很好的支持了，除了ie10及以下版本。但是有人在意吗？

>如果你不喜欢阅读英文，你可以阅读我早前写的一篇关于CSS3的border-image的基础教程。——@大漠 

它看起来是一个很优美的特性，允许你创建流动的图片边框，在这个例子中，你可以缩放窗口来观察图片边框的流动。

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="384" id="cp_embed_DvhKL" scrolling="no" src="http://codepen.io/anon/embed/DvhKL?height=384&amp;theme-id=5083&amp;slug-hash=DvhKL&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

不幸的是，border-image仍然像一个新奇事物一样并未被很多人使用。但也许我是错的。如果你知道有哪个真实案例中有使用border-image，或者你就使用过它的话，请在评论中让我知道，我会很乐意承认我错了。

## 还存在empty-cells 这样一个属性

这个属性是被广泛支持的，包括ie8，它写起来是这个样子的：

	table {
	  empty-cells: hide;
	}

你也许已经知道了，它是用在表格中的，它告诉浏览器是否显示空的单元格。试着点击切换按钮来观察empty-cells的效果：

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="300" id="cp_embed_yfhtq" scrolling="no" src="http://codepen.io/anon/embed/yfhtq?height=300&amp;theme-id=5083&amp;slug-hash=yfhtq&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

在这个例子中，需要确保表格的边框是可见的，而且border-collapse没有被设定成 collapsed。

## font-style 还有一个值是“oblique”

当我们使用font-style属性得时候，经常用到的两个值是normal和italic，但是你还可以给它另一个值oblique:

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="282" id="cp_embed_lItBj" scrolling="no" src="http://codepen.io/anon/embed/lItBj?height=282&amp;theme-id=5083&amp;slug-hash=lItBj&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

但是它到底是个神马意思呢？还有就是它和italic看起来一样吗？

规范对于oblique是[这么解释](http://dev.w3.org/csswg/css-fonts/#font-style-prop)的：

>应用oblique样式，如果没有的话就用italic样式 

规范对于italic的解释和oblique基本上差不多，oblique这个词是一个[排版术语](https://en.wikipedia.org/wiki/Oblique_type)，表示是在normal的基础上倾斜的字体，而不是真正的斜体。

由于css处理oblique的方式，其实它和italic是通用的，除非这个字体就是一个oblique字体。

而我从未听说过有oblique字体，但是也许我是错的。我的研究是，oblique是当一个字体没有真斜体的时候的一个仿斜体。

所以，如果我没有错的话，这就意味着如果一个字体没有真斜体字体，那么如果我们写了font-style:italic实际上会让字体变成font-style:oblique的形式。

>下边这个图可以很直观的知道仿斜体和真斜体的区别。灰色的是oblique仿斜体。 ——@大圆
12个很少被人知道的CSS事实

![]({{BLOG_IMG}}139.png)

## word-wrap和overflow-wrap是等同的

word-wrap不是一个被经常用到的[属性](http://www.impressivewebs.com/word-wrap-css3/)，但在某些情况下是非常有用的，一个常见的例子是让长url换行，以免它撑开父容器，例子如下：

<iframe allowtransparency="true" class="cp_embed_iframe" frameborder="0" height="206" id="cp_embed_DFqyI" scrolling="no" src="http://codepen.io/anon/embed/DFqyI?height=206&amp;theme-id=5083&amp;slug-hash=DFqyI&amp;default-tab=result" style="width: 100%; overflow: hidden;"></iframe>

由于这个属性是微软原创的，所以它被所有的浏览器支持了，包括ie5.5。

尽管它跨浏览器，而且被一贯地支持，W3C依然决定把word-wrap换成overflow-wrap- 我猜是之前的命名有点名不副实？ overflow-wrap和word-wrap有着同样的值，而word-wrap被当作是overflow-wrap的一个后补语法。

现在有一些浏览器是支持overflow-wrap的，但这么做貌似是无意义的，因为所有旧的浏览器都把word-wrap解析得很好，而且由于历史原因所有的浏览器都被要求继续支持word-wrap。

我们可以在浏览器升级后开始使用overflow-wrap，但是直到现在，我依然看不到换成新语法的意义何在。

## 这里边有多少是你不知道的呢？

不知你从这篇文章中有没有学到什么，我希望是这样，也许大多数有经验的css开发者知道很多，但是对于css新手应该会受益多一点。

大家都来扒一扒有几条是新发现呢？欢迎在评论中告诉我们！

## 注

英文出处：http://www.sitepoint.com/12-little-known-css-facts/

中文译文：http://www.w3cplus.com/css/12-little-known-css-facts.html
