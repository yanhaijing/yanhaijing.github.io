---
layout: post
title: 移动端flex布局实战
category : css
tagline: "原创"
tags : [css]
keywords: [flex,css]
description: 本文将介绍在移动端如何优雅的使用flex，包括最佳实践和经验
---
{% include JB/setup %}

做过移动端的同学都知道移动端布局太难了，终端太多了，传统的布局方式已经力不从心，各种新的布局方式被发明

在flex之前，传统布局有流式布局（就是默认的方式），绝对定位布局，弹性布局（em），和浮动布局，其中浮动布局并不是为布局而设计的，使用起来略显繁琐

2009年，对前端来说是不平凡的一年，html5定稿，es5.1发布，flex应运而生，天生响应式，生而为布局，使用及其简单

但是理想很丰满，现实很骨感，flex三改其规范，浏览器实现不一，各种神坑，本文将总结2017年移动端使用flex的最佳实践和经验

## 兼容性
2017年9月份，现在来看下flex的[兼容性](http://caniuse.com/#search=flex)，可以发现绝大部分都是绿色

![]({{BLOG_IMG}}516.png)

上图中红色箭头代表我们应该兼容的浏览器情况，在国内，UC和QQ浏览器的份额不容忽视，上图中的 1 2 3 其实代表flex的三版语法，flex有09年版语法，11年版语法和标准语法，可以发现在移动端主要是09版语法和标准语法

**注：右上角带黄色小方块的代表需要添加-webkit-前缀，可以发现09版语法都要添加前缀，标准语法也要前缀版和非前缀版**

再来看一下百度给出的移动设备的[统计情况](https://mtj.baidu.com/data/mobile/device)，分别是安卓和ios，可以发现现在需要兼容安卓4.1+，IOS7+，这里百度给出的数据，当然你应该根据自己产品的统计情况来确定兼容情况

![]({{BLOG_IMG}}517.png)

![]({{BLOG_IMG}}518.png)

总结一下本文各处的最佳实践，兼容性目标是安卓4.1+，IOS7+，UC和qq浏览器

## 属性对照
通过上面的目标和caniuse，很容易得出我们需要写09和标准两版语法，只有在两版语法中都存在属性才能使用，下面给出两版语法的对照关系，注意这不是语法指南，语法指南请看结尾处的推荐资料

### 容器的属性

容器属性包括：

- display

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

display

| 标准版                  | 09版                 |
| -------------------- | ------------------- |
| display: flex        | display: box        |
| display: inline-flex | display: inline-box |

flex-direction

| 标准版                            | 09版                                      |
| ------------------------------ | ---------------------------------------- |
| flex-direction: row            | box-orient: horizontal; box-direction: normal |
| flex-direction: row-reverse    | box-orient: horizontal; box-direction: reverse |
| flex-direction: column         | box-orient: vertical; box-direction: normal |
| flex-direction: column-reverse | box-orient: vertical; box-direction: reverse |

flex-wrap

| 标准版                     | 09版                 |
| ----------------------- | ------------------- |
| flex-wrap: nowrap       | box-lines: single   |
| flex-wrap: wrap         | box-lines: multiple |
| flex-wrap: wrap-reverse | 无                   |

flex-flow是flex-direction和flex-wrap两个属性的简写，09版无对应属性，09版可以分开写两条属性

justify-content

| 标准版                            | 09版               |
| ------------------------------ | ----------------- |
| justify-content: flex-start    | box-pack: start   |
| justify-content: flex-end      | box-pack: end     |
| justify-content: center        | box-pack: center  |
| justify-content: space-between | box-pack: justify |
| justify-content: space-around  | 无                 |

align-items

| 标准版                     | 09版                 |
| ----------------------- | ------------------- |
| align-items: flex-start | box-align: start    |
| align-items: flex-end   | box-align: end      |
| align-items: center     | box-align: center   |
| align-items: baseline   | box-align: baseline |
| align-items: stretch    | box-align: stretch  |

align-content，09版无对应属性

### 项目的属性

项目属性包括：

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

order

| 标准版           | 09版                       |
| ------------- | ------------------------- |
| order: number | box-ordinal-group: number |

flex-grow，09版无对应属性

flex-shrink，09版无对应属性

flex-basis，09版无对应属性

flex，标准版的flex是一个复合属性，09版的box-flex仅支持配置数字

| 标准版                                    | 09版              |
| -------------------------------------- | ---------------- |
| flex: flex-grow flex-shrink flex-basis | box-flex: number |

align-self，09版无对应属性

**09版的语法对flex项目的可配置功能非常弱，仅能调整顺序和伸缩性**

## 采坑经验

一般来说只要09版语法有对应功能，就可以使用了，但是移动端还有一些坑，导致某些属性不能用

justify-content: space-around 不能用，旧版语法没有，但是可以用space-between+容器的padding模拟

flex-wrap: wrap 不能用，对应的旧版语法 box-lines: mutiple 大部分浏览器不支持，也就是说不能折行

uc span行内元素作为子项时 display 必须设置为block，最好直接使用块级元素

## 实战

说了这么多下面给一份标准的写法，一个flex属性应该这么写

    webkit前缀09版
    webkit前缀标准版
    标准版

举个例子，display: flex要这么写

```css
display: -webkit-box;
display: -webkit-flex;
display: flex;
```

一定有同学说这也太麻烦了，有没有啥简单的办法呢？还真有，共有三种办法，感谢前辈

第一种，编辑器插件，有一个叫做autoprefix插件，sublime就可以安装，你只需写标准属性，然后按一下快捷键就能够自动填充前缀属性。这种方法用起来最简单，但这种方法后面会不太好维护，比如有一天不需要09版语法了怎么破？？？一个一个去改吧，o(╯□╰)o

第二种，预处理器mixin，如果你用过less或者sass的话，一定知道mixin，下面已less 2.x为例，sass大同小异

```less
.display-flex(@display: flex) {
    & when (@display =flex) {
        display: -webkit-box;
    }
    & when (@display =inline-flex) {
        display: -webkit-inline-box;
    }
    display: e("-webkit-@{display}");
    display: @display;
}

.flex-direction(@direction) {
    & when (@direction =row) {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
    }
    & when (@direction =row-reverse) {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
    }
    & when (@direction =column) {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
    }
    & when (@direction =column-reverse) {
        -webkit-box-orient: vertical;
        -webkit-box-direction: reverse;
    }
    -webkit-flex-direction: @direction;
    flex-direction: @direction;
}

.flex-wrap(@wrap) {
    & when (@wrap =nowrap) {
        -webkit-box-lines: single;
    }
    & when (@wrap =wrap) {
        -webkit-box-lines: multiple;
    }
    -webkit-flex-wrap: @wrap;
    flex-wrap: @wrap;
}

.justify-content(@justify-content) {
    & when (@justify-content =flex-start) {
        -webkit-box-pack: start;
    }
    & when (@justify-content =flex-end) {
        -webkit-box-pack: end;
    }
    & when (@justify-content =center) {
        -webkit-box-pack: center;
    }
    & when (@justify-content =space-between) {
        -webkit-box-pack: justify;
    }
    -webkit-justify-content: @justify-content;
    justify-content: @justify-content;
}

.align-items(@align-items) {
    & when (@justify-content =flex-start) {
        -webkit-box-pack: start;
    }
    & when (@justify-content =flex-end) {
        -webkit-box-pack: end;
    }
    & when (@justify-content =center) {
        -webkit-box-pack: center;
    }
    & when (@justify-content =baseline) {
        -webkit-box-pack: baseline;
    }
    & when (@justify-content =stretch) {
        -webkit-box-pack: stretch;
    }
    -webkit-align-items: @align-items;
    align-items: @align-items;
}

.order(@order) {
    -webkit-box-ordinal-group: @order;
    -webkit-order: @order;
    order: @order;
}

.flex(@flex) {
    -webkit-box-flex: @flex;
    -webkit-flex: @flex;
    flex: @flex;
}
```

在使用的只要一行就行了

```less
.container {
    .display-flex;
    .flex-direction(row);
    .justify-content(center);
}
```

上面的代码less编译完的结果如下

```css
.container {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
```

有同学说这么麻烦，我不想写啊？其实应该有人已经写好了，比如[compass](https://github.com/Igosuki/compass-mixins/blob/master/lib/compass/css3/_flexbox.scss)，可以参考一下

这种方式的前提就是已经使用了css预处理器，可维护性比第一种方法更好；但是以我的经验来说，其实大部分项目的mixin未必是有人维护的，比如可能有一天不需要前缀版本了，但是并一定会有人去更新的

第三种，css后处理器，其实自从postcss出来之后，自动加前缀的活就该交给postcss来做了，有了这个插件我们只需要配置要兼容的浏览器版本就可以了，加前缀的事情后处理器自动帮你解决，最近babel也出了一个类似的babel-env

fis中可以使用`fis-postprocessor-autoprefixer`这个插件，我在之前的文章《[经验无线步骤页改版总结](http://yanhaijing.com/program/2016/09/07/exp-wap-step/)》中有介绍

webpack中可以使用[postcss-loader](https://github.com/postcss/postcss-loader)这个loader

终于可以和浏览器前缀愉快的玩耍了^_^

**普及一个小科普知识，css后面的实验室性不会再以加前缀的方式进行了，而是会通过浏览器的设置方式来显示开启实验属性，因为前缀的方式不够优雅。。。这锅主要还是怪前端开发者，因为我们啊，只写webkit前缀，都不写标准属性，o(╯□╰)o**

## 总结
希望本文能够帮助你更好的使用flex，少踩一些坑，现在在移动端已经可以任性的使用flex了，但pc端还不行，ie8。。。如果没有兼容性问题，那就快来使用这一好用的布局方式吧

最后我强烈建议大家阅读大漠老师的《[图解CSS3](https://amazon.cn/gp/product/B00LHL3DV4/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=yanhaijing-23&camp=536&creative=3200&linkCode=as2&creativeASIN=B00LHL3DV4&linkId=ce75459043755ec9e78830fa6e65f2be)》，这是我见过讲css3讲的最好的书了

## 相关资料
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
