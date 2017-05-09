---
layout: post
title: HTML5视频的那些事儿
category : html
tagline: "原创"
tags : [html]
keywords: [video, html5]
description: 本文将总结下自己对视频研究的结果，做个记录，同时也能方便后来人的学习，涉及视频的方方面面
---
{% include JB/setup %}

最近在研究HTML5播放视频的事情，发现这个东西真是据复杂无比啊，我勒个去了，然后给团队做了个技术分享。

本文将总结下自己对视频研究的结果，做个记录，同时也能方便后来人的学习，涉及视频的方方面面。

刚刚突然发现了自己800年前做的一个[视频播放器](http://yanhaijing.com/player/localPlayer.html)，才想起来当时好像也研究过一点。

## 视频
其实视频早于Web而存在的，1990年Web诞生，但早在此之前视频就已经存在了，视频技术这么多年的发展，其历史复杂性超乎你的想象。同	时富文本格式本来就是一件复杂的事情，更是让视频变得复杂无比。

### 常用格式
我们生活场可能遇到过下面这些格式的视频：

- rm/rmvb/mkv
- avi（Audio Video Interleave）
- flv（Flash Video）
- mp4（MPEG-4 Part 14）
- ogv
- webm

### 视频组成
如果拍脑袋想的话，一个完整的视频大概有下面一些部分组成：

- meta信息
- 视频
- 音频
- 字幕
- 缩略图
- 其他信息

视屏的组成大概如下图所示：

![]({{BLOG_IMG}}249.png)

下面三幅图都是mp4格式，但其视频编码确实不同的。

![]({{BLOG_IMG}}250.png)

![]({{BLOG_IMG}}251.png)

![]({{BLOG_IMG}}252.png)

### 三种格式
我们平时说的mp4到底是什么？其实对于一个视频有三种格式，如下：

- 容器格式
- 视频编解码器
- 音频编解码器

以后再有人问你视频是什么格式的时候，一定要先问问对方问的是那种格式。

容器格式规定了一个视屏文件的视频编码器，音频编码器，字幕，缩略图等信息的格式，常用的视频格式如下，括号中是对应的文件后缀名。

- Ogg容器（.ogv）
- MPEG4-容器（.mp4）
- Webm容器（.webm）
- Matroska容器（.mkv）

再来说说视频编解码器，视频编解码器规定了压缩视频和播放视频时使用的算法，常用的视频编码如下：

- H.264（AVC Advanced Video Codec）
- VP8
- Ogg Theora

**注意：AVC就是H.264。**

音频编解码器和视屏编解码器类似，规定了音频的压缩和播放的算法，常用的音频编码如下：

- AAC（Advanced Audio Coding）
- MPEG-3
- Ogg Vorbis

### 视频总结
说了这么多，总结起来就是下面的一张表格，下面列出了常用的视频文件格式和其对应的视频格式。

![]({{BLOG_IMG}}253.png)

## HTML5 Video
理清了视频的历史，该轮到今天的主角上场了，再来说说HTML5的Video，HTML5的Video包括如下的一堆内容：

- img audio video 富媒体标签
- 一堆属性
- DOM接口
- DOM事件
- 向后兼容
- 字幕

### embed & flash
在开始介绍Video之前先来介绍介绍在之前是如何在网页中播放视频的，在最开始的时候我们使用embed标签来嵌入插件的方式来播放的，其会调用系统上的原生播放器，如windows上的 media player，mac上的quick time等。

这样做的缺点就是这块区域完全是黑盒，无法和播放器进行通信，甚至不知道是否在播放。

使用的方式相对简单，只需下面的一行代码即可，其中src是视屏的路径。

	<embed src="media/helloworld.swf" />

由于embed的缺陷，flash来了，感谢flash带来了很棒的体验，并且其装机量能够达到99%，这种做法优点是能够和播放器交互，也能定制皮肤等；但缺点也很明显，需要开发单独的播放器插件（虽然可以用别人开发好的），并且其使用方式略显复杂，需要依赖第三方插件。

播放flash的代码如下，我想没人能够记得住吧，就想XHTML的doctype一样，囧。

	<object id="flowplayer" width="704" height="400" data="media/flowplayer-3.2.16.swf" type="application/x-shockwave-flash">
        <param name="movie" value="media/flowplayer-3.2.16.swf" /> 
        <param name="flashvars" value='config={"clip":"media/beach.mp4"}' />
    </object>

### video标签
video标签的灵感来源于img标签，都是富媒体，既然能用img引入图片，那么为何不能用video引入vide呢？于是便有了video标签。

在页面中引入一个视频的代码和引入图片一样简单。

	<video src="media/butterfly.mp4" controls>
		您的浏览器不支持 video 标签。
	</video>

`src`是视频的路径，controls表示显示视频播放控件，默认是不显示的。标签之间的文字会出现在不支持video标签的浏览器中，作为后备内容出现，用来兼容不支持video标签的浏览器。

怎么样是不是很简单，其实video标签还有一些属性可以配置。属性列表可以[查看这里](http://www.w3school.com.cn/tags/tag_video.asp)。

### Video DOM
video标签对应有Video对象，可以通过js进行操作。Video对象有一组属性和方法，同时还包括一组事件。

比如可以读取一个视频的时长和当前播放的时间，同时还能设置当前播放的时间，可以在视频暂停的时候添加自定义事件等。

- [属性列表](http://www.w3school.com.cn/jsref/dom_obj_video.asp)
- [方法列表](http://www.w3school.com.cn/jsref/dom_obj_video.asp)
- [事件列表](http://www.w3school.com.cn/tags/html_ref_eventattributes.asp)

### 兼容性
浏览器对视频格式的支持各不相同，小一点的浏览器厂商比如firefox和opera不愿支持商业的视频格式（mp4），因为需要支付专利费，而大一点的厂商如微软苹果等，不愿支持开源的格式，因为可能有专利问题。

好消息是现在firefox也支持mp4了，而opera从12版本后就换成了webkit内核也不存在这个问题了。

下面看一下PC上的浏览器对视频格式的支持情况。

![]({{BLOG_IMG}}254.png)

再来看看手机上的兼容情况。

![]({{BLOG_IMG}}255.png)

### Source
未解决兼容性的问题，HTML5也给出了解决办法，那就是source标签。

	<video controls autoplay>
        <source src="media/butterfly.mp4" type="video/mp4">
        <source src="media/butterfly.webm" type="video/webm">
        <source src="media/butterfly.ogv" type="video/ogg">
    </video>

浏览器会最先尝试播放第一个视频，如果发现不支持会播放第二个，依次类推直到找到一个可以播放的，或者全部能播放。。。

**注意：浏览器支持video标签，不能播放视频的情况下是不会显示后备方案的，需要和不支持video标签的情况区分开。**

### 字幕
字幕也是一个复杂的问题，简单的一个字幕就可能有下面的需求：格式，换行，颜色，卡拉OK等。所以现存的字幕格式就有50多种。

使用字幕的方式和使用source的方式类似，同时可指定多个字幕文件，用来指代不同语言的字幕，用户可以自己选择想要的字幕。

	<video controls loop autoplay>
        <source src="media/butterfly.mp4" type="video/mp4">
        <source src="media/butterfly.webm" type="video/webm">
        <track src="media/butterfly.vtt" srclang="en" kind="subtitles" label="English" default>
        <track src="media/butterfly_fr.vtt" srclang="fr" kind="subtitles" label="French">
    </video>

vtt格式如下所示，标记了每个字幕开始出现的时间和消失的时间。

	WEBVTT

	00:00:01.000 --> 00:00:03.000
	Butterflies are lovely.
	
	00:00:04.000 --> 00:00:08.000
	Don't you think?

### 一套方案
这里提供一套完整的方案，支持video的浏览器优先使用video，否则退化为使用flash，如果也不支持flash则退化为提示文案。

	<video controls width="704" height="400">
        <source src="media/beach.mp4" type="video/mp4">
        <source src="media/beach.webm" type="video/webm">
        <object id="flowplayer" width="704" height="400" data="flowplayer-3.2.16.swf" type="application/x-shockwave-flash">
            <param name="movie" value="flowplayer-3.2.16.swf" /> 
            <param name="flashvars" value='config={"clip":"media/beach.mp4"}' />
            <p>您的浏览器不支持此视频</p>
        </object>
    </video>

当然整个流程其实也可以反过来，即优先使用flash。

## 播放器
很多时候我们不能使用video标签的播放控件，可能有种种原因，比如自定义皮肤。这时候需要我们自己写一个播放器。

头脑风暴一下我们大概需要实现以下功能：

- 兼容性
- 自定义一套皮肤
- 各种api
- 各种消息（事件）

如果你感兴趣可以自己尝试下，其实自己写一个完整的播放器还是很有挑战性的，好在社区已经为我们写好了，推荐两个不错的播放器插件。

- [VideoJS](http://videojs.com/)
- [jwplayer](https://www.jwplayer.com/)（收费）

如果上面介绍的两个插件还不能满足你的需求，你可能需要更多的视频插件，可以[查看这里](https://www.awesomes.cn/repos/Media/Video
)。

## 总结
好了到这里本文就结束了，如果你还有什么疑惑或建议那么在下面的评论区给我留言讨论吧。

本文提到的所有代码都可以在[这里找到](https://github.com/yanhaijing/video-demo)。

## 相关资料
- [移动端HTML5<video>视频播放优化实践](http://www.xuanfengge.com/html5-video-play.html)
- [视频播放的那些事](http://taobaofed.org/blog/2016/05/23/video-player/)

## 参考资料
- [《HTML5秘籍》第二版](http://www.amazon.cn/gp/product/B00VDSW71S/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B00VDSW71S&linkCode=as2&tag=yanhaijing-23)
- [《HTML5程序设计》第二版](http://www.amazon.cn/gp/product/B0081E9X0K/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B0081E9X0K&linkCode=as2&tag=yanhaijing-23)
- [维基百科](https://zh.wikipedia.org/)
- [w3school](http://www.w3school.com.cn/index.html)
