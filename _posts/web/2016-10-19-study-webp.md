---
layout: post
title: 调研webp图片格式
category : web
tagline: "原创"
tags : [web]
keywords: [web, webp]
description: 最近在调研经验引入webp的可能有，下面总结一下最近的调研成果。
---
{% include JB/setup %}

最近在调研为经验引入webp的可能性，下面总结一下最近的调研成果。

## 简介
webp是谷歌在2010年开源的一种新的图片格式，目前在谷歌浏览器（9+）和安卓（4.0+）里面都有很好的兼容性。
 
根据谷歌官方给出的数据，无损压缩webp图片比png图片小26%，有损压缩的webp可以比jpeg小25-34%，下面测试案例中有具体的demo，大家可以亲眼查看效果。
 
鉴于webp的优点，推荐引入webp格式。
 
**注意：webp格式会增加解码时间，是png的4-5倍（毫秒级）**
 
谷歌官方给了几种向后兼容使用webp的方案：
 
- 服务器端检测
- js监测
- html5 picture
 
## PC端方案
通过[caniuse](http://caniuse.com/#search=webp)，我们可以看到opera(11+)和chrome(9+)支持webp格式，但其他浏览器几乎全军覆没。
 
![]({{BLOG_IMG}}443.png)
 
通过百度流量研究院给出的[浏览器数据](http://tongji.baidu.com/data/browser)看，chrome占比非常高，你应该根据自己网站的流量统计作出具体决定。

![]({{BLOG_IMG}}445.png)

pc端建议的方案是html5的[picture](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/picture)，[caniuse](http://caniuse.com/#search=picture)显示picture和webp兼容性（在chrome上）几乎是一样的。
 
![]({{BLOG_IMG}}444.png)

一个picture的简单demo如下：
 
    <picture>
        <source srcset="xxx.webp" type="image/webp">
        <img src="xxx.png" alt="test">
    </picture>
 
## 移动端方案
webp在安卓上的兼容性非常好，但ios完全不支持，[caniuse](http://caniuse.com/#search=webp)显示兼容安卓4.0以上版本
 
![]({{BLOG_IMG}}446.png)

通过百度统计出来的流量看，移动端安卓占比为70%+，你应该根据自己网站的流量统计作出具体决定。

![]({{BLOG_IMG}}447.png)

由于picture在移动端兼容性不好，所以这种方案不太可取，可以采用js监测方案，js方案要求图片必须是异步加载，下面是谷歌官方给出的代码示例
 
    // check_webp_feature:
    //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
    //   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
    function check_webp_feature(feature, callback) {
        var kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        var img = new Image();
        img.onload = function () {
            var result = (img.width > 0) && (img.height > 0);
            callback(feature, result);
        };
        img.onerror = function () {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    }
 
目前是基于回调，可以封装成promise。

我写了一组测试的demo，可以看这里：https://github.com/yanhaijing/webp

## 相关工具
- [iSparta 图片压缩与格式转换工具](https://isparta.github.io/)
- [智图 高效优质的图片优化平台](http://zhitu.isux.us/)

## 测试案例
- [官方demo](https://developers.google.com/speed/webp/gallery)
- [isparta静态图片](https://isparta.github.io/compare-webp/index.html#12345)
- [isparta动图](https://isparta.github.io/compare-webp/index_a.html#12)

## 参考资料
- [webp官网](https://developers.google.com/speed/webp/)
- [WebP 探寻之路](https://isux.tencent.com/introduction-of-webp.html)
- [WebP使用方案](http://zhitu.isux.us/index.php/preview/webp)   
- [WebP Images & Performance](https://davidwalsh.name/webp-images-performance)
