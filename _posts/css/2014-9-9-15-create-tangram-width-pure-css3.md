---
layout: post
title: 纯CSS3打造七巧板
category : css
tagline: "原创"
tags : [css]
keywords: [css]
description: 最近项目上要制作一个七巧板，脑子里瞬间闪现，什么。。。七巧板不是小时候玩的吗。。。
---
{% include JB/setup %}

最近项目上要制作一个七巧板，脑子里瞬间闪现，什么。。。七巧板不是小时候玩的吗。。。

## 七巧板的由来

先来个科普吧，是我在查资料过程中看到的，感觉很有意思。

宋朝有个叫[黄伯思](http://www.baidu.com/s?wd=%E9%BB%84%E4%BC%AF%E6%80%9D&amp;hl_tag=textlink&amp;tn=SE_hldp01350_v6v6zkg6)的人，对几何图形很有研究，他热情好客，发明了一种用6张小桌子组成的“宴几”——请客吃饭的小桌子。后来有人把它改进为7张桌组成的宴几，可以根据吃饭人数的不同，把桌子拼成不同的形状，比如3人拼成三角形，4人拼成四方形，6人拼成六方形……这样用餐时人人方便，气氛更好。后来，有人把宴几缩小改变到只有七块板，用它拼图，演变成一种玩具。

因为它十分巧妙好玩，所以人们叫它“七巧板”。

今天，在世界上几乎没有人不知道七巧板和七巧图，它在国外被称为“唐图”（Tangram），意思是来自中国的拼图（不是唐代发明的图）。

![](http://images.cnitblog.com/blog/460220/201409/111925058246713.png)

纳尼，原来Tangram是咱们中国的，。。。

## 方案

看完了有趣的东西，该开始正题了，就是无论使用什么技术给我整出个七巧板来。。。（在前端页面里）

结合自己的知识体系，思考了下大概的思路：

1.  Canvas，万能的Cavans一定可以解决问题，加上之前做过[Painter](http://yanhaijing.com/Painter)。灵活性+扩展性满足。
2.  CSS3，每个版子是一个dom元素，然后使用css3搞定。灵活性 扩展性不如canvas。
3.  svg，这个应该也可以吧，但自己对这方面的知识匮乏。
4.  。。。暂时未想出。

考虑到时间成本（太紧了）和其他。。。原因，决定使用css3的方案。

开始想板子使用图片来做，但多亏自己以前写过一篇‘[用CSS代码写出的各种形状图形的方法](http://yanhaijing.com/css/2014/04/04/with-css-code-to-write-various-shapes-graphic-method/)’，里面收录了使用CSS3制作20种图形的方法，有兴趣的同学可以看下，查了下可以满足所需的7种板子的形状。

## 用到属性

- transform
- translation

## 技术验证

开始之前先要验证下，所要用到的CSS3是否可以兼容所要需平台，这多亏http://caniuse.com/。

因为我要运行在移动端，查了下要用到的css3属性，在安卓2.3以上都支持，但需加前缀，所以可以放心使用。

![](http://images.cnitblog.com/blog/460220/201409/111951154816974.png)

## 编码实现

首先我们需要一个容器和起个元素用来表示七块板子。

	<div class="wrap">
	    <div class="t t1 t11"></div>
	    <div class="t t2 t22"></div>
	    <div class="t t3 t33"></div>
	    <div class="t t4 t44"></div>
	    <div class="t t5 t55"></div>
	    <div class="t t6 t66"></div>
	    <div class="t t7 t77"></div>
	</div>

其实我们总共用到的图形总共有三种，三角形、正方形行和平行四边形。这在上面提到的文章里面全有，这里涉及到的一点点数学的知识，就是这些板子之间是有一定大小关系的，只需一点点数学知识姐可以解决了。

至此板子的表示就不是问题了，其次还需把板子移动到指定位置才可以拼成好看的图形，这全靠css3的 transform搞定，可以实现平移、缩放、旋转、变形多种操作。

这里我们设置wap的position为relative。所有板子都为absolute。并设置top和left为零，这样初始化时所有的板子都位于左上角，然后将板子的transform-origin设为左上角，就实现了定位时的好计算，下面是css部分的代码。

	.wrap{
	    position: relative;
	    width:300px;
	    height: 400px;
	}
	.t{
	    position: absolute;
	    top:0;
	    left:0;
	    width: 0;
	    height: 0;
	    transform-origin:0 0;
	}
	.t1{
	    
	    border-top: 212.13203435596425732025330863145px solid red; 
	    border-right: 212.13203435596425732025330863145px solid transparent;
	    transform: translate(150px, 150px) rotate(-135deg);
	}
	.t2{
	    border-top: 212.13203435596425732025330863145px solid #fdaf17; 
	    border-right: 212.13203435596425732025330863145px solid transparent;
	    transform: translate(150px, 150px) rotate(135deg);
	}
	.t3{
	    width: 106.06601717798212866012665431573px;
	    height: 106.06601717798212866012665431573px;
	    background: #c3d946;
	    transform: translate(150px,150px) rotate(45deg);
	}
	.t4{
	    border-top: 106.06601717798212866012665431573px solid #00bdd0; 
	    border-right: 106.06601717798212866012665431573px solid transparent;
	    transform: translate(150px,150px) rotate(-45deg);
	}
	.t5{
	    border-top: 106.06601717798212866012665431573px solid #5dbe79; 
	    border-right: 106.06601717798212866012665431573px solid transparent;
	    transform: translate(75px,225px) rotate(45deg);
	}
	.t6{
	    width: 150px;
	    height: 75px;
	    transform: translate(300px) rotate(90deg) skew(45deg);
	    background: #ffdd01;
	}
	.t7{
	    border-top: 150px solid #0177bf; 
	    border-right: 150px solid transparent;
	    transform: translate(300px,300px) rotate(180deg);
	}

## DEMO

好了，七巧板终于做好了让我们来看下效果吧。

![](http://images.cnitblog.com/blog/460220/201409/112011249811732.png)

<iframe width="100%" height="300" src="http://jsfiddle.net/3tf8ac6q/7/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 提高

仅此而已了吗，当然不是，还有很多可考虑的东西，这里的css都是写死的，灵活性太差，如果用LESS的话（我用的就是less），我们可以设置一个基本长度变量（less支持变量和数学运算哦），然后其他的全部基于这个变量计算，这样只要改变这个变量，就能轻松改变整个七巧板的大小，可扩展性是不是有很大进步（实际上我就是这么做的，但jsfiddle不支持less语法，所以我就写了个css版的）。

其实还可以通过css3变化出多种图形，据说七巧板的可以拼出的图形多大几千种之多。。。快快开动你的脑筋来制作吧，做好了记得给博主留个链接啊。

进一步的提高就是通过CSS3的transtion，制作动画，在配合key-frame，可以制作七巧板变形的复杂动画，效果美轮美奂啊。

这里只贴一个图片吧，不提供代码了。。。

![](http://images.cnitblog.com/blog/460220/201409/131348130127700.gif)

&nbsp;

## 参考资料

- CSS3动画详解（http://beiyuu.com/css3-animation/）
- 腾讯动画手册（http://ecd.tencent.com/css3/guide.html）
