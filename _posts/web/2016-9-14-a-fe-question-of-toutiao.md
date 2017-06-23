---
layout: post
title: 分享一套校招前端笔试题
category : web
tagline: "原创"
tags : [web]
keywords: [web]
description: 分享一套今日头条的校招笔试题
---
{% include JB/setup %}

我说我去面试了，你信不信？这是头条的校招前端笔试题，如果侵权了，请联系我。

## HTML
1. 针对移动浏览器端开发页面，不期望用户放大屏幕，且要求“视口（viewport）”宽度等于屏幕宽度，视口高度等于设备高度，如何设置？

2. data-xxx 属性的作用是什么？

3. 请描述一下cookies，sessionStorage和localStorage的区别？

4. 什么时候浏览器的标准模式（standards mode）和怪异模式（quirks mode）

## CSS
1. 解释一下box-model：全部属性，各个属性取值类型，范围，计算值方式，负值作用，box-sizing概念。

2. BFC(Block Formatting Context)是什么？有哪些应用？

3. 如何要求容器在宽度自由很缩的情况下，A/B/C的宽度始终是1:1:1，如何实现，写出两种方法。

![]({{BLOG_IMG}}441.png)

4. 如图，A若宽高已知，如何实现水平、垂直均相对于父元素居中？若A高度未知呢？

![]({{BLOG_IMG}}442.png)

## JAVASCRIPT
1. 函数中的arguments是什么？是数组吗？若不是，如何将它转化为真正的数组？

2. 列举JavaScript中typeof操作符的可能结果，如何区分：{}和[]类型？

3. Function中的call、apply、bind的区别是什么？请针对每一个写出一个代码示例。

4. 使用jQuery，找到id位`selector`的select标签中有用`data-target`属性为`isme`的option的值？

5. 请优化下段代码：

        for (var i = 0; i < document.getElementsByTagName('a').length; i++) {
            document.getElementsByTagName('a')[i].onmouseover = function () {
                this.style.color = 'red';
            }
            document.getElementsByTagName('a')[i].onmouseout = function () {
                this.style.color = '';
            }
        }

## 总结
整套题比较基础，属于初级工程师水平。
