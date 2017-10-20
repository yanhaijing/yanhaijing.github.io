---
layout: post
title: Rem布局的原理解析
category : css
tagline: "原创"
tags : [css]
keywords: [rem,css]
description: 本文将讲解rem布局的原理和相关知识
---
{% include JB/setup %}

面试中发现很多人对rem布局的原理不是很清楚，只停留在会使用的阶段，或者理解完全是错误的，本文将给大家讲清楚rem布局的原理，使用方案等知识

## 什么是Rem

rem和em很容易混淆，其实两个都是css的单位，并且也都是相对单位，现有的em，css3才引入的rem，在介绍rem之前，我们先来了解下em

> em作为font-size的单位时，其代表父元素的字体大小，em作为其他属性单位时，代表自身字体大小——MDN

我在面试时经常问会一道和em有关的题，来看一下面试者对css细节的了解程度，如下，问s1、s2、s5、s6的`font-size`和`line-height`分别是多少px，先来想一想，结尾处有答案和解释

```html
<div class="p1">
	<div class="s1">1</div>
  	<div class="s2">1</div>
</div>
<div class="p2">
	<div class="s5">1</div>
  	<div class="s6">1</div>
</div>
```

```css
.p1 {font-size: 16px; line-height: 32px;}
.s1 {font-size: 2em;}
.s1 {font-size: 2em; line-height: 2em;}

.p2 {font-size: 16px; line-height: 2;}
.s5 {font-size: 2em;}
.s5 {font-size: 2em; line-height: 2em;}
```

em可以让我们的页面更灵活，更健壮，比起到处写死的px值，em似乎更有张力，改动父元素的字体大小，子元素会等比例变化，这一变化似乎预示了无限可能

有些人提出用em来做弹性布局页面，但其复杂的计算让人诟病，甚至有人专门做了个px和em的[计算器](https://vasilis.nl/nerd/code/emcalc/)，不同节点像素值对应的em值，o(╯□╰)o

![]({{BLOG_IMG}}519.png)

em做弹性布局的缺点还在于牵一发而动全身，一旦某个节点的字体大小发生变化，那么其后代元素都得重新计算，X﹏X

> rem作用于非根元素时，相对于根元素字体大小；rem作用于根元素字体大小时，相对于其出初始字体大小——MDN

rem取值分为两种情况，设置在根元素时和非根元素时，举个例子



rem和em

rem有rem的优点，em有em的优点，尺有所短，寸有所长，我一直不觉得技术有什么对错，只有适合不适合，有对错的是使用技术的人，杰出与优秀的区别就在于能否选择合适的技术，并让其发挥优势

我一直觉得em就是为字体和行高而生的，有些时候子元素字体就应该相对于父元素，元素行高就应该相对于字体大小

## Rem布局原理



## 比Rem更好的方案



## Rem不是银弹



## Rem布局方案



## 总结



## 相关资料

- [使用CSS3 REM 和 VW 打造等比例响应式页面的便捷工作流](https://zhuanlan.zhihu.com/p/23968868)
- [从网易与淘宝的font-size思考前端设计稿与工作流](http://www.cnblogs.com/lyzg/p/4877277.html)
- [移动web适配之rem](https://www.nihaoshijie.com.cn/index.php/archives/593/)
- [使用 rem 提供一致的字体大小](http://harttle.com/2016/12/20/rem-and-accessibility.html)