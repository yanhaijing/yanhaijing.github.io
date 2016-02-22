---
layout: post
title: 开始写 CSS 吧
category : css
tagline: "转"
tags : [css]
keywords: [css]
description: 你是否觉得 CSS 不再跟以前一样了呢？最近几年成了热门话题，许多聪明的人也在谈论它。CSS 远不止是前端开发者应该用来美化网页的小玩意儿。我们关心性能，想要创作出更好的网站。
---
{% include JB/setup %}

你是否觉得 CSS 不再跟以前一样了呢？最近几年成了热门话题，许多聪明的人也在谈论它。CSS 远不止是前端开发者应该用来美化网页的小玩意儿。我们关心性能，想要创作出更好的网站。

在这篇文章里，我会分享最近几个月学习 CSS 相关的知识和我个人对编写 CSS 代码确切的看法。作为程序员，我真的对每样东西的结构部分很感兴趣。我觉得编写 CSS 的方式应该改变并对此深入研究。我寻找好的处理方式，最佳准则（best principles）和新的工作流程（workflows）。

这篇文章就像是在 CSS 世界里旅行的总结。很多人说编写 CSS 不是真正的编程。我并不认同，它同样充满乐趣和挑战性。

## CSS 预处理器（CSS Preprocessors）

![]({{BLOG_IMG}}94.jpg)

当一个程序员开始写 CSS 时发生了什么 当一个程序员开始写 CSS 时发生了什么：你 -> 编写代码 -> 预处理器 -> CSS 代码 -> 网页

好吧，让我们面对它。这世上编写纯的 CSS 不是件有趣的事情。预处理器使用一些类似 CSS 语法，神奇地生成有效的 CSS 代码。在你和最终发送给浏览器的样式之间，它添加了一个中间层。这没有听起来那么坏，因为预处理器提供了一些真正实用的特性。

### 合并（Concatenation）

我认为能使你的文件合并在一起是最有价值的事情之一。我确信，你了解当在你的 `.css` 文件用` @import`时，实际上告诉浏览器“麻烦你顺便也捎带这个文件”。 确实如此，发送新的请求，这有点不好，因为你可能会有非常多的文件。发送额外的请求会降低应用的性能。如果你使用 CSS 预处理器，这个问题将会解决。它们会很容易地把你所有的样式编译到单一的 `.css` 文件。

### 扩展 （Extending）

主要有两个 CSS 预处理器 —— [LESS](http://lesscss.org/) 和 [SASS](http://sass-lang.com/)。它们都支持扩展。没错，工作方式略有不同，不过想法（idea）是一样的。你写一个有一串属性的基本类（通常称作 `mixin`），之后把这些属性导入到另一个选择器。例如：

	// less
	.bordered(@color: #000) {
	    border: dotted 2px @color;
	}
	.header { .bordered; }
	.footer { .bordered(#BADA55); }
	
	// compiles to
	.header {
	    border: dotted 2px #000000;
	}
	.footer {
	    border: dotted 2px #bada55;
	}

这里有个问题，如果你定义了一个没有参数的 mixin，也就是说像这样：

	.bordered {
	    border: dotted 2px #000;
	}

它会原样编译到 CSS 文件里，不管你是否使用到。就像这样，因为这是有效的选择器。在 SASS 里，我们会多一点点灵活性。分别是 `mixins`，`extends` 和 `placeholders` （如果你想了解它们准确的不同之处，我强烈推荐[这篇文章](http://krasimirtsonev.com/blog/article/SASS-mixins-extends-and-placeholders-differences-use-cases)。让我们看下 SASS 及其编译后的结果：

	// sass
	@mixin bordered($color: #000) {
	    border: dotted 2px $color;
	}
	.header { @include bordered; }
	.footer { @include bordered(#BADA55); }
	
	// compiles to
	.header {
	    border: dotted 2px black; 
	}
	.footer {
	    border: dotted 2px #bada55; 
	}

看起来几乎和 LESS 相同，但如果我们看下第二个用例，定义一个占位符（a place holder）：

	// sass
	%bordered {
	    border: dotted 2px #000;
	}
	.header { 
	    @extend %bordered; 
	}
	.footer { 
	    @extend %bordered; 
	}
	
	// compiles to
	.header, .footer {
	    border: dotted 2px #000; 
	}

有两个很好的事情发生。首先，这里不会编译 `.bordered` 类（there is no .bordered class compiled）。第二，SASS 合并了选择器，这让我们的 CSS 更短一些。

### 配置 （Configuration）

LESS 和 SASS 都支持定义变量。你可以稍后再访问这些变量，使用它们作为属性的值。

	// sass
	$brand-color: #009f0A;
	...
	h1 {
	    color: $brand-color;
	}

这是个好的特性，因为你可能会在同一个地方，存储一些像公司的颜色或网格宽度之类重要的东西。如果你想要修改,可以不用检查一边所有的代码。

另一个方便的用法是插入变量。下面的例子演示这种方法：

	// sass
	@mixin border($side) {
	    border-#{$side}: solid 1px #000;
	}
	.header {
	    @include border("left");
	}
	
	// compiles to
	.header {
	    border-left: solid 1px #000; 
	}

### 反对预处理器 （Against the preprocessors）

- 预处理器是一个工具，也就是说，你必须多做一件事，把它添加到把你的开发环境中。你可能想要把它整合进你的应用里，当然这需要额外编写代码。

- 如果你不想让你的代码跟预处理器的弄乱，那么你很有可能需要一个监听工具。另一个用来监听你文件的工具,一旦文件有更新就会生成编译后的版本。如果是这样的话，那么每次当你开始开发项目的时候都要运行这个监听工具。也许你会优化这个过程所需的时间，但它还是需要你多留一份心。

- 许多开发者总是只盯着他们的 `.less` 或者 `.sass` 文件。但编译后的文件才是重要的。你的 SASS 代码可能很优雅并优化过的，但这并不意味着你最后得到同样优美的 CSS 代码。你可能会有真正需要关心的特定问题。因此，定期地检查编译后的版本。

## BEM

![]({{BLOG_IMG}}95.jpg)

BEM 代表块 Block 元素 Element 修饰符 Modifier BEM代表块（Block），元素（Element），修饰符（Modifier）。

好吧，我找到一个可以玩的新工具。预处理器也许能够节省大量的时间，但是单独使用它们不能写出好的结构。我开始思考的第一件事是命名规范。让我们看下面 HTML 代码：

	<header class="site-header">
	    <div class="logo"></div>
	    <div class="navigation"></div>
	</header>

样式可能跟这个类似：

	.site-header { ... }
	.logo { ... }
	.navigation { ... }

当然，这会奏效。但有个问题，阅读这个 CSS 你不能理解它，例如， `logo` 属于 `header`。你也许有另一个小的 `logo` 图片用在 `footer`。下一个逻辑步骤是写一个后代选择器。

	.site-header .logo { ... }

然而使用这种选择器不是个好主意，因为这把样式紧绑到特定的标记层次（it tights styles to specific tags hierarchy）。如果我把 `logo` 移到 `header` 标签外面会怎样呢？这样式会失效。另一个你能做的是把 `site-header` 添加到 `logo` 类的名字中：

	.site-header-logo { ... }

这很好，不言自明（self explanatory）。但这不是在所有的情况下都奏效。以后，在十二月份可能想要使用圣诞节版的 logo。那么，我不能写成：

	.site-header-logo-xmas { ... }

因为我的逻辑是写一个选择器能够匹配嵌套在 HTML 里的标记。

[BEM](http://bem.info/method/definitions/) 是这种情况的解决方案。它意思是块（Block），元素（Element），修饰符（Modifier）和创建一些你可以遵循的规则。使用 BEM，我们小小的例子会变成这样：

	.site-header { ... } /* block */
	.site-header__logo { ... } /* element */
	.site-header__logo--xmas { ... } /* modifier */
	.site-header__navigation { ... } /* element */

也就是说，`.site-header` 是我们的块（our block）。logo 和 导航（navigation）这个块的元素（elements），logo 的 `xmas` 版本是修饰符（modifier）。也许这看起来简单，但这真的强大。一旦你开始使用它会发现让你更好的结构化。反对的理由主要是 BEM 的语法。没错，这看来确实有点难看，但我准备好对这个好系统的命名妥协。

（值得阅读：[这里](http://bem.info/method/definitions/) 和 [这里](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) )

## OOCSS

![]({{BLOG_IMG}}96.jpg)

面向对象的 CSS 面向对象的 CSS

我找到了 BEM 就能准确地命名我的类，然后就开始思考构造（composition）。也许我第一次阅读的文章是关于[面向对象的 CSS](https://github.com/stubbornella/oocss/wiki)。面向对象编程有时是关于添加抽象并且 CSS 能够支持它。是否使用预处理器，你都应该了解 OOCSS 。作为码农（coder），我发现这个理念真的跟平时编程很接近，例如 JavaScript 。这是两个主要原则（principles）：

### 结构和表层分开 （Separate structure and skin）

让我们用下面的例子：

	.header {
	    background: #BADA55;
	    color: #000;
	    width: 960px;
	    margin: 0 auto;
	}
	.footer {
	    background: #BADA55;
	    text-align: center;
	    color: #000;
	    padding-top: 20px;
	}

这里有些样式是重复的。我们可以把它们提取到另一个类，如下：

	.colors-skin {
	    background: #BADA55;
	    color: #000;
	}
	.header {
	    width: 960px;
	    margin: 0 auto;
	}
	.footer {
	    text-align: center;
	    padding-top: 20px;
	}

这样，我们就有了可扩展的 `colors-skin` 对象。HTML 代码也许跟下面的类似：

	<div class="header colors-skin"> ... </div>
	<div class="colors-skin"> ... </div>
	<div class="footer colors-skin"> ... </div>

这种改变有几个好处：

- 我们有一个可以使用多次的类。
- 如果我们需要修改，只需修改一处。
- 我们移除了 CSS 文件里的重复项，这让文件更小。

### 容器和内容分开 （Separate container and content）

这里的理念是，不管每个元素放在哪里，都应该被应用同一种样式。因此，你应该避免跟下面类似的选择器用法：

	.header .social-widget {
	    width: 250px;
	}

这是因为如果你把 `.social-widget` 移到 `.header` 容器（container）外面，宽度（width）就会不相同。一般来说这不是好的做法，尤其是给整个页面到处都使用的部分添加样式。这个原则鼓励使 CSS 模块化，我强烈建议利用充足的时间尝试下。就我个人而言，遵守这个原则意味着能够编写出更好的 CSS。

## 框架 （The framework）

如果你在 GitHub 打开 [OOCSS repository](https://github.com/stubbornella/oocss) 会看到一个框架。是的，这个框架用到面向对象的 CSS 理念，并且有一堆很酷的组件可以立即使用（ready-to-use）。某些时候我并不喜欢框架。如果你思考一下的话会发现，framework 这个单词有部分 frame 和 work，你确实在条条框框（frame）里工作（work）。你确实要对框架妥协并且必须遵守它的规则。我更愿意使用微框架（micro-frameworks）或者只提供最基本特性的工具。当然我不是打算重新发明轮子，但我总是试着在两者之间取得平衡。经常这样，现成可用（ready-to-use）的解决方案会带来混乱复杂的系统。我的建议是，干一件事只为了一个特定的目的。如果你可能多地包含方方面面，你的下场将会是……你懂的，一个框架。

但是，我强烈推荐你查看下 OOCSS 框架。这是一个独特的知识（It's an unique piece of knowledge），也许会满足你的需求。[Nicole Sullivan](https://twitter.com/stubbornella) 托管这个 repository （仓库）。她是 OOCSS 的创始人（She is a pioneer in OOCSS），如果你有空的话我建议你查看下这个 [presentations/talks](http://www.youtube.com/watch?v=GhX8iPcDSsI)。

## SMACSS

![]({{BLOG_IMG}}97.jpg)

可量化和模块化 CSS 架构 Scalable and Modular Architecture for CSS 可量化和模块化的 CSS 架构

另一个流行的理念是 [SMACSS](http://smacss.com/)。SMACSS 表示可量化（Scalable）和模块化（Modular）的 CSS 架构。[Jonathan Snook](https://twitter.com/snookca) 为 CSS 开发者介绍了风格指南（introduces something like style guide for the CSS developers）。这个想法是把你的应用分成以下几种类型：

- 基本（Base）—— 为一些简单的选择器设置默认的基本样式。例如 clearfix （清除浮动）。
- 布局（Layout）—— 定义网格（grids）。
- 模块（Module）—— 一组元素组合成模块。例如 header 和 sidebar。
- 状态（State）—— 包括了元素不同的状态。如果特定的对象是隐藏的，点击的（pressed），扩展的（expanded）等等……则定义相应的规则。
- 主题（Theme）—— 更多地面向视觉部分。跟状态类型相似。
我没有使用 SMACSS 的经验，但它非常受欢迎，并确实提倡了好的想法。它更像是一个理念而不是框架，这非常好。因此，你不会受严格的规则，类或者是组件（ components）束缚。

## 原子设计 （Atomic design）

![]({{BLOG_IMG}}98.jpg)

原子设计 原子（Atoms） -> 分子（molecules） -> 组织（organisms） -> 模板（Templates） -> 网页（Pages）

了解 OOCSS 和 SMACSS 之后我寻找一个恰当的象征（metaphor），很快我看到了 [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) 这篇文章，很好地展示 原子设计（ Atomic Design） 这个好的理念。作者是 [Brad Frost](http://bradfrostweb.com/)，是个知名的 Web 开发者，主要从事[自适应式](http://bradfrost.github.io/this-is-responsive/index.html)（responsive）和移动终端方面的工作。

这个理念真的很有趣。效仿一些化学技术，物质的基本单位是原子。Brad 把这移到 CSS，我们的网页是由原子构成的。一个原子是这样的：

	<label>Search the site</label>

或者

	<input type="text" placeholder="enter keyword" />

也就是说，原子包含 DOM 元素一些基本的样式。例如调配颜色（color palette），字体大小或者转换（transitions）。稍后这些部分会合并成一个分子（molecules）。例如：

	<form>
	    <label>Search the site</label>
	    <input type="text" placeholder="enter keyword" />
	    <input type="submit" value="search" />
	</form>

这样 `form` 元素包含了几个原子。像这样的抽象化带来灵活性，因为我们也许会用同样的原子构建另一个分子。这样（Together with that），我们能在不同的地方（contexts）重复使用同样的 `form`。

Brad 并没有止步于此。分子构成了组织（organisms）。按照同样的方法，我们可以写成如下，把它称作组织（organisms）：

	<header>
	    <div class="logo">
	    <nav>
	        <ul>
	            <li><a href="#">Home</a></li>
	            <li><a href="#">About</a></li>
	            <li><a href="#">Contacts</a></li>
	        </ul>
	    </nav>
	    <form>
	        <label>Search the site</label>
	        <input type="text" placeholder="enter keyword" />
	        <input type="submit" value="search" />
	    </form>
	</header>

这个理念的下一个是模板（templates）。这没有跟化学直接相关，而是放到 Web 环境中（web context）。一旦我们开始合并不同的组织，就是在构造模板。之后这些模板形成了最终的网页。

你可能已经使用相似的方法开发你的应用软件。然而，以合理的方式命名会带来好的架构。你和所有你的团队队员在开发中会明白一些事情。把一件东西分成原子和分子是挺重要的一部分，因为这会改善 Web 应用程序的开发过程和维护。

## OrganicCSS

![]({{BLOG_IMG}}99.jpg)

原子设计 有机的 CSS Organic CSS

几个月前我写了一篇关于 [Organic](https://github.com/VarnaLab/node-organic) 的文章。这是一个很小的 JavaScript 应用程序框架。它更像是设计模式，我个人很喜欢它。我甚至在几个项目里使用了 Organic 并且它干得非常好。如果你对它感兴趣，我强烈建议你阅读这篇[博文](http://net.tutsplus.com/tutorials/javascript-ajax/organic-development/)。

当我看 Brad Frost 的文章时，我已经对相似的理念非常熟悉，因为我了解 Organic 。Brad 的 *[Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/)* 十分出色，但我决定更进一步，基于原子设计（Atomic Design）理念试着写自己的微框架。我选择 SASS 作为预处理器并在 Github 创建了[仓库](https://github.com/krasimir/organic-css)

### 原子 （Atoms）

让我们从框架最小的部分开始 —— 原子。在[维基百科](http://zh.wikipedia.org/wiki/%E5%8E%9F%E5%AD%90)的定义是 \*原子是一种元素能保持其化学性质的最小单位。\*。在 CSS 的环境(context)中，我认为是一个属性和它的值。例如：

	margin-top: 24px;

添加原子只是直接在类里面写样式，这种方式不是我想要的。因此如果写成下面这样：

	body {
	    margin-top: 24px;
	}
	header {
	    margin-top: 24px;   
	}

预处理器就会保持这个样子。我想要的最后结果是：

	body, header {
	    margin-top: 24px;
	}

SASS 使用占位符（place holders）实现这个效果。也就是说：

	%margin-top-24 {
	    margin-top: 24px;
	}
	body {
	    @extend %margin-top-24; 
	}
	header {
	    @extend %margin-top-24; 
	}

因此，我必须使用占位符（placeholders）。这也就意味着我必须有大量预定义的并且我能使用的占位符（placeholders）。就在那时，我决定这个框架将只包含原子。也许还有一些类似通常的 `reset.css`，网格定义等等。我想要为 CSS 开发写一些基本的东西（I wanted to write something which acts as a base for the CSS development）。也许一个又一个项目之后我将会看到一些可以放进核心的模式，但刚开始我想保持 repo（仓库）整洁简单。为了使一些东西始终如一的，我为定义原子创建 mixin。如下：

	@include define-atom("block") {
	    display: block;
	}
	@include define-atom("font-family") {
	    font-family: Georgia;
	}

使用这种方式我创建了一堆容易应用到每个项目的原子。你可以在[这里](https://github.com/krasimir/organic-css/tree/master/src/atoms)查阅。我从别的框架里使用了一些最佳做法，所以并不是全归功于我。这里是个在分子里混合原子的 mixin：

	@mixin header { /* <- molecule called 'header' 称作 `header` 的分子*/
	    @include atoms((
	        block,
	        clearfix,
	        font-family
	    ));
	}

### 分子 （Molecules）

分子是需要样式的 DOM 元素，但是没有子代。或者是没有直接联系的子代。例如 `<img src="logo.jpg" />` 可以是分子。如果你觉得在网页里识别出分子，只需思考下什么是有原子构成的。如果一些元素是由其他分子构成的，那么很可能是一个（细胞器）。下面几行展示的是如何定义一个分子：

	@mixin login-box { 
	    @include atoms((
	        block,
	        font-size-20,
	        margin-top-23,
	        bold
	    ));
	}

我面前有些有趣的东西。让我们看下 `body` 标记。这是什么？是一个分子或者其他东西吗？没错，它通过原子需要一些样式，但通常包含了其他分子。它应该是其他东西。我做出决定，CSS 应该是主角。也就是说，如果 `body` 标记需要一些原子提供样式，那就是分子，理论上，我不该给它附加上任何其他的分子。这看起来有点不切实际，但在大多数情况下，这会阻止你使用后代选择器，这个好兆头。

### 细胞器 （Organelles）

一旦你能够识别出哪个 DOM 元素是分子，你将会知道什么细胞器。例如，典型的 `form` 元素是一个细胞器的好例子。它包含了分子像 `label`，`input` 或者 `textarea`。

	.login-form {
	    @include label;
	    @include input;
	    @include textarea;
	}

这个框架中，细胞器（Organelles）是第一个跟当前应用紧密相关的 。原子和分子在不同项目中会有所改变，而细胞器却不会。

### 更多的抽象 （More abstractions）

你也许经常想要在其他地方合并几个细胞器。如果是这种情况，添加其他抽象：

	Atom → Molecule → Organelle → Cell → Tissue → Organ → Sys → Organism

你选择什么来让你的 CSS 结构化，这是个问题。目前为止，我只在一个项目里使用过 OrganicCSS，但我能说，它使项目变清晰了。我把不同的元素放在它们各自的目录（文件夹）里并像这样命名类，例如，分子在一个“molecules”目录（文件夹），里面的文件命名为“header_molecule.scss”我才能容易地找到正在编写的是哪一个。例如，如果有一个叫 `header` 的细胞器，我简单地改成 `o-header`。然后，当我看 HTML 代码时可以是了解到，这个元素的 CSS 样式文件在 `organelles` 文件夹。

## 总结

这个一个有趣的旅行。我不知道是否会在将来使用 OrganicCSS，但这不是重点。我学到的东西才是重要的。我知道必须改变我的 CSS 开发过程，我做到了。我确信我们应该谈论更多 CSS 的结构。如你所见，在文章里我们有很多好的资源。我们只是必须找到它们，学习它们干了什么和如何运行的。只有我们能决定是否使用它们。更好的是，当你了解了整个项目才能创作出能更好满足需求的东西。

## 注

- 原文：http://funwo.tk/2013-09-08-starting-to-write-css-cn.html
- 英文：http://davidwalsh.name/starting-css
