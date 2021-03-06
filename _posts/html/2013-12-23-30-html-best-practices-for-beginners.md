---
layout: post
title: 给HTML初学者的30条最佳实践
category : html
tagline: "整理"
tags : [html]
keywords: [html]
description: 闲话少说，让我们回顾三十个创建标记的最佳实践。
---
{% include JB/setup %}

[Nettuts +](http://net.tutsplus.com/)运营最困难的方面是为很多技能水平不同的用户提供服务。如果我们发布太多高级教程，我的新手用户将无法从中受益。相反也是如此。我们尽我们最大的努力，但如果你觉得你被忽略了请联系我们。这个网站是为你服务的，所以说出来！如此说来，今天的教程是专为那些刚刚进入web开发领域的人准备的。如果你的经验是一年或更少，希望在这里列出的一些技巧将帮助你成为更好、更高效的开发者!

闲话少说，让我们回顾三十个创建标记的最佳实践。

## 1.保持标签闭合 ##

以前，经常见到类似下面的代码（译注：这是多久以前啊……）：

    <li>Some text here.  
    <li>Some new text here.  
    <li>You get the idea.

注意外面包裹的UL/OL标签被遗漏了（谁知是故意还是无意的），而且还忘记了关闭LI标签。按今天的标准来看，这是很明显的糟糕做法，应该100%避免。总之，保持闭合标签。否则，你验证html标签的时候可能遇到问题。

更好的方式

    <ul>  
      <li>Some text here. </li>  
      <li>Some new text here. </li>  
      <li>You get the idea. </li>  
    </ul> 

## 2.声明正确的文档类型 ##

![声明正确的文档类型]({{ BLOG_IMG }}28.png)

笔者早先曾加入过许多CSS论坛，每当用户遇到问题，我们会建议他首先做两件事：

1. 验证CSS文件，保证没有错误。

2. 确认添加了正确的doctype

> DOCTYPE 出现在HTML标签之前，它告诉浏览器这个页面包含的是HTML，XHTML，还是两者混合，这样浏览器才能正确解析。

通常有四种文档类型可供选择：

    <!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.01//EN” “http://www.w3.org/TR/html4/strict.dtd”>

    <!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.01 Transitional//EN” “http://www.w3.org/TR/html4/loose.dtd”>

    <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>

    <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Strict//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd”>

关于该使用什么样的文档类型声明，一直有不同的说法。通常认为使用最严格的声明是最佳选择，但研究表明，大部分浏览器会使用普通的方式解析这种声明，所以很多人选择使用HTML4.01标准。选择声明的底线是，它是不是真的适合你，所以你要综合考虑来选择适合你得项目的声明。

## 3.永远不要使用内联样式 ##

当你在埋头写代码时，可能会经常顺手或偷懒的加上一点行内css代码，就像这样：

    <p style="color: red;">I'm going to make this text red so that it really stands out and makes people take notice! </p> 
 
这样看起来即方便又没有问题。然而，这在你的编码实践中是个错误。

在你写代码时，在内容结构完成之前最好不要加入样式代码。


> 这样的编码方式就像打游击，是一种很山寨的做法。——Chris Coyier

更好的做法是，完成标签部分后，再把这个P的样式定义在外部样式表文件里。

**建议**

    #someElement > p {  
      color: red;  
    }

## 4.将所有外部css文件放入head标签内 ##

理论上讲，你可以在任何位置引入CSS样式表，但HTML规范建议在网页的head标记中引入，这样可以加快页面的渲染速度。


> 雅虎的开发过程中，我们发现，在head标签中引入样式表，会加快网页加载速度，因为这样可以使页面逐步渲染。 —— ySlow团队

    <head>  
    <title>My Favorites Kinds of Corn</title>  
    <link rel="stylesheet" type="text/css" media="screen" href="path/to/file.css" />  
    <link rel="stylesheet" type="text/css" media="screen" href="path/to/anotherFile.css" />  
    </head>  

## 5.javascript文件放在底部 ##

![javascript文件放在底部]({{ BLOG_IMG }}29.png)

要记住一个原则，就是让页面以最快的速度呈现在用户面前。当加载一个脚本时，页面会暂停加载，直到脚本完全载入并执行完成。因此会浪费用户更多的时间。

如果你的JS文件只是要实现某些功能，（比如点击按钮事件），那就放心的在body底部引入它，这绝对是最佳的方法。

**建议**

    <p>And now you know my favorite kinds of corn. </p>  
    <script type="text/javascript" src="path/to/file.js"></script>  
    <script type="text/javascript" src="path/to/anotherFile.js"></script>  
    </body>  
    </html> 

## 6.永远不要使用内联javascript。现在不是1996年了！ ##

许多年以前，还存在一种这样的方式，就是直接将JS代码加入到HTML标签中。尤其是在简单的图片相册中非常常见。本质上讲，一个“onclick”事件是附加在 标签上的，其效果等同于一些JS代码。不需要讨论太多，非常不应该使用这样的方式，应该把代码转移到一个外部JS文件中，然后使用“ addEventListener / attachEvent ”加入事件监听器。或者使用[jquery](http://jquery.com/)等框架，只需要使用“click”方法。

    $('a#moreCornInfoLink').click(function() {  
      alert('Want to learn more about corn?');  
    }); 

## 7.边开发，边验证 ##

![]({{ BLOG_IMG }}30.png)

很多人并不真正理解标准验证的意义和价值，笔者在一篇博客中详细分析了这个问题。一句话，验证是为你服务的，不是给你找麻烦的。

如果你刚开始从事网页制作，那强烈建议你下载[Web Developer Toolbar](https://addons.mozilla.org/en-US/firefox/addon/60)（chrome用户请自行在应用商店搜索，ie用户可能就杯具了） ，并在编码过程中随时使用”HTML标准验证”和“CSS标准验证”。如果你认为CSS是一种非常好学的语言，那么它会把你整的死去活来。你不严谨的代码会让你的页面漏洞百出，问题不断，一个好的方法就是—— 验证，验证，再验证。

## 8.下载firebug ##

![]({{ BLOG_IMG }}31.png)

Firebug是当之无愧的网页开发最佳插件，它不但可以调试JavaScript，还可以直观的让你了解页面标记的属性和位置。不用多说， [下载](https://addons.mozilla.org/en-US/firefox/addon/1843)！

## 9.使用firebug ##

![]({{ BLOG_IMG }}32.png)

据笔者观察，大部分的使用者仅仅使用了Firebug 20%的功能，那真是太浪费了，你不妨花几个小时的时间来系统学习这个工具，相信会让你事半功倍。

**资源**

- [Overview of Firebug](http://michaelsync.net/2007/09/08/firebug-tutorial-overview-of-firebug)
- [Debug Javascript With Firebug – video tutorial](http://www.digitalmediaminute.com/screencast/firebug-js/)

## 10.保持标签名小写 ##

理论上讲，html不区分大小写，你可以随意书写，例如：

    <DIV>  
    <P>Here's an interesting fact about corn. </P>  
    </DIV>

但最好不要这样写，费力气输入大些字母没有任何用处，并且会让代码很难看.

**建议**

    <div>  
    　　<p>Here's an interesting fact about corn. </p>  
    </div> 

## 11.使用H1-H6标签 ##

笔者建议你在网页中使用其中全部六种标记，虽然大部分人只会用到前四个，但使用最多的H会有很多好处，比如设备友好、搜索引擎友好等，不妨把你的P标签都替换成H6。

    <h1>This is a really important corn fact! </h1>  
    <h6>Small, but still significant corn fact goes here. </h6>

## 12.写博客时，请将H1留给文章标题 ##

![]({{ BLOG_IMG }}33.jpg)

今天笔者在[Twitter](http://www.twitter.com/nettuts)上发起一次讨论：是该把H1定义到LOGO上还是定义到文章标题上，有80%的人选择了后者。

当然具体如何使用要看你的需求，但我建议你在建立博客的时候，将文章题目定为H1，这对搜索引擎优化(seo)是非常有好处的。

## 13.下载ySlow ##

![]({{ BLOG_IMG }}34.png)

在过去几年里，雅虎的团队在前端开发领域做了许多伟大的工作。前不久，它们发布了一个叫ySlow的Firebug扩展，它会分析你的网页，并返回 一个“成绩单”，上面细致分析了这个网页的方方面面，提出需要改进的地方，虽然它有点苛刻，但它绝对会对你有所帮助，强烈推荐—— [ySlow](http://developer.yahoo.com/yslow/)！

## 14.使用无序列表（UL）包裹导航菜单 ##

![]({{ BLOG_IMG }}35.png) 

通常网站都会有导航菜单，你可以用这样的方式定义：

    <div id="nav">  
     <a href="#">Home </a>  
      <a href="#">About </a>  
      <a href="#">Contact </a>  
    </div>

如果你想书写优美的代码，那最好不要用这种方式。

> 为什么要用UL布局导航菜单？ ——因为UL生来就是为定义列表准备的

最好这样定义：

    <ul id="nav">  
      <li><a href="#">Home</a></li>  
      <li><a href="#">About</a></li>  
      <li><a href="#">Contact</a></li>  
    </ul>  

## 15.学习如何应对IE ##

IE一直以来都是前端开发人员的噩梦！

如果你的CSS样式表基本定型了，那么可以为IE单独建立一个样式表，然后这样仅对IE生效：

    <!--[if lt IE 7]>  
       <link rel="stylesheet" type="text/css" media="screen" href="path/to/ie.css" />  
    <![endif]-->  

这些代码的意思是：如果用户浏览器是IE6及以下，那这段代码才会生效。如果你想把IE7也包含进来，那么就把“[if lt IE 7]”改为“[if lte IE 7]”。

## 16.选择合适的IDE ##

![]({{ BLOG_IMG }}36.png) 

不论你是Windows还是Mac用户，这里都有很多优秀的编辑器供你选择：

Mac 用户

- [Coda](http://www.panic.com/coda)
- [Espresso](http://macrabbit.com/espresso/)
- [TextMate](http://macromates.com/)
- [Aptana](http://www.aptana.com/)
- [DreamWeaver CS4](http://www.adobe.com/products/dreamweaver/)
PC 用户

- [InType](http://intype.info/home/index.php)
- [E-Text Editor](http://www.e-texteditor.com/)
- [Notepad++](http://notepad-plus.sourceforge.net/uk/site.htm)
- [Aptana](http://www.aptana.com/)
- [Dreamweaver CS4](http://www.adobe.com/products/dreamweaver/)

## 17.上线前，压缩代码 ##

![]({{ BLOG_IMG }}37.png)  

通过压缩您的CSS和Javascript文件，您可以减少总大小的25%左右，但在开发过程中不必压缩，然而，一旦网站完成后，利用一些网络压缩程序或多或少节省一些带宽。下面列出一些工具。

**Javascript 压缩服务**

- [Javascript Compressor](http://javascriptcompressor.com/)
- [JS Compressor](http://www.xmlforasp.net/JSCompressor.aspx)

**CSS Compression Services**

- [CSS Optimiser](http://www.cssoptimiser.com/)
- [CSS Compressor](http://www.cssdrive.com/index.php/main/csscompressor/)
- [Clean CSS](http://www.cleancss.com/)

## 18.精简，精简，在精简 ##

![]({{ BLOG_IMG }}38.jpg)

回望我们大多数人写的第一个页面，一定会发现严重的 “DIV癖”( divitis )，通常初学者的本能就是把一个段落用DIV包起来，然后为了控制定位而套上更多的DIV。—— 其实这是一种低效而有害的做法。

> 网页写完后，一定要多次回头检查，尽量的减少元素的数量。 能用UL布局的列表就不要用一个个的DIV去布局。

正如写文章的关键是“缩减，缩减，缩减”一样，写页面也要遵循这个标准。

## 19.给所有图片加上“alt”属性 ##

为图片加上alt属性的好处是不言而喻的 —— 这样可以让禁用图片或者使用特殊设备的用户无障碍得了解你的王爷信息，并且对图像搜索引擎友好。

**糟糕的做法**

    <IMG SRC="cornImage.jpg" /> 
 
**更好的做法**

    <img src="cornImage.jpg" alt="A corn field I visited." />  

## 20.通宵达旦 ##

我经常不知不觉的学习工作到凌晨，我认为这是个很好的状况。

我的“啊～哈！”时间（ “AH-HA” moments，指柳暗花明或豁然开朗的时刻）通常都发生在深夜，比如我彻底理解JavaScript的“闭包”概念，就是在这样一种情况下。如果你还没有感受过这种奇妙的时刻，那就马上试试吧！

## 21.查看源代码 ##

![]({{ BLOG_IMG }}39.png) 

没有什么比模仿你的偶像能让你更快的学习HTML。起初，我们都要甘做复印机，然后慢慢得发展自己的风格。研究你喜欢的网站页面代码，看看他们是怎么实现的。这是高手的必经之路，你一定要试一下。注意：只是学习和模仿他们的编码风格，而不是抄袭和照搬！

留意网络上各种炫酷的JavaScript效果，如果看上去是使用了插件，那根据它源码中head标签内的文件名，就可以找到这个插件名称，然后就可以学习它据为己用。

## 22.为所有的元素定义样式 ##

这一条在你制作其他公司企业网站时尤为必要。你自己不使用blockquote标记？那用户可能会用，你自己不使用OL？用户也可能会。花时间做一个页面，显示出ul, ol, p, h1-h6, blockquotes, 等等元素的样式，检查一下是否有遗漏。

## 23.使用第三方服务 ##

![]({{ BLOG_IMG }}40.gif) 

现在互联网上流行着许多可以免费加在网页中的API，这些工具非常强大。它可以帮你实现许多巧妙的功能，更重要的是可以帮你宣传网站。

24.掌握Photoshop

![]({{ BLOG_IMG }}41.png)  

Photoshop是前端工程师的一个重要工具，如果你已经熟练掌握HTML和CSS，那不妨多学习一下Photshop。

1. 观看Psdtuts+上的[视频课程](http://psd.tutsplus.com/category/videos/)。
2. 花费每月25$注册成为[Lynda.com](http://www.lynda.com/)的会员，海量精品课程。
3. 推荐“[You Suck at Photoshop](http://www.mydamnchannel.com/You_Suck_at_Photoshop/Season_1/1DistortWarpandLayerEffects_1373.aspx)”系列
4. 花费几个小时记住尽可能多的PS快捷键。

## 25.学习每一个HTML标签 ##

虽然有些HTML标签很少用到，但你依然应该了解他们。比如“abbr”、“cite”等，你必须学习它们以备不时之需。

顺便说下，如果你不熟悉上面两个标签，可以看下下面的解释：

- **abbr** 和你估计的差不多，它是abbreviation的缩写（英语差的估计不到），“Blvd”能用`<abbr>`标签包裹，因为他是“boulevard”的缩写。（喜大普奔也可以喽）。
- **cite** 被用来作为引用内容的标题（blockquote）。例如，如果你在你的博客中引用本篇文章，你可以将“给HTML初学者的三十条最佳实践”用`<cite>`包裹，注意它不应该被用来包裹引用的作者，这是常见的误区。


## 26.参与社区讨论 ##

网络上有许许多多优秀的资源，而社区中也隐藏着许多高手，这里你既可以自学，也能请教经验丰富的开发者。

## 27.使用reset.css ##

Css Reset也就Reset Css ,就是重置一些HTML标签样式，或者说默认的样式。

关于是否应该使用CSS Reset，网上也有激烈的争论，笔者是建议使用的。你可以先选用一些成熟的CSS Reset，然后慢慢演变成适合自己的。

    html, body, div, span,   
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,  
    a, abbr, acronym, address, big, cite, code,  
    img, ins, kbd, q, s, samp,  
    small, strike, strong,   
    dl, dt, dd, ol, ul, li,  
    fieldset, form, label, legend,  
    table, caption, tbody, tfoot, thead, tr, th, td {  
        margin: 0;  
        padding: 0;  
        border: 0;  
        outline: 0;  
        font-size: 100%;  
        vertical-align: baselinebaseline;  
        background: transparent;  
    }  
    body {  
        line-height: 1;  
    }  
    ol, ul {  
        list-style: none;  
    }  
    blockquote, q {  
        quotes: none;  
    }  
    blockquote:before, blockquote:after,  
    q:before, q:after {  
        content: '';  
        content: none;  
    }  
      
    table {  
        border-collapse: collapse;  
        border-spacing: 0;  
    }

## 28.对齐元素 ##

![]({{ BLOG_IMG }}42.png)

简单来说，你应该尽可能的对齐你的网页元素。可以观察一下你喜欢的网站，它们的LOGO、标题、图表、段落肯定是对得非常整齐的。否则就会显得混乱和不专业。

## 29.关于PSD切片 ##

![]({{ BLOG_IMG }}43.jpg)

现在你已经掌握了HTML、CSS、Photoshop知识，那么你还需要学习如何把PSD转换为网页上的图片和背景，下面有两个不错的教程：

- [Slice and Dice that PSD](http://net.tutsplus.com/videos/screencasts/slice-and-dice-that-psd/)
- [From PSD to HTML/CSS](http://net.tutsplus.com/videos/screencasts/converting-a-design-from-psd-to-html/)


## 30.不要随意使用框架 ##

Javascript和CSS都有许多优秀的框架，但如果你是初学者，不要急于使用它们。如果你还没能熟练的驾驭CSS，使用框架会混淆你的知识体系。尽管你可能能会说javascript和jQuery是可以同事学习的，但这对css并不适合。我个人提倡960 CSS 网格框架，并且我经常使用它。还是那句话，如果你是css的初学者，学习框架只会让你更加困惑。

CSS框架是为熟练开发者设计的，这样会节省它们大量的时间。

## 译者注 ##

这篇文章发表于2009年，弹指一挥间，4年时间已悄然溜走，文中有些知识已显得陈旧过时，但很多规则同样适用，下面是译者补充的关于已经过时的建议，如果你觉得哪里需要改进可以参与讨论。

**#1**

html5标准放宽了要求，允许标签不闭合，而且浏览器也能很好的修正这个问题，但这并不是你不闭合标签的理由，有时不闭合标签可能带来无法预知的错误。放宽标准其实是降低了开发的门槛，这本是web的真谛，人人可参与，其实xhtml规范要求页面有错误就停止渲染，这本身并不现实，而且浏览器也从来没有这么做过，毕竟用户宁愿看到有些错误的页面，也不愿看到白板一张。

**#8**

跨浏览器的firebug正在开发当中，然而发布之日却遥遥无期，chrome，safari，ie和opera都有自己的开发者工具，而且功能也不错，这里推荐chrome的开发者工具，大有后来者居上之风，其发展可谓一日千里，相信超越firebug指日可待。

**#9**

[Firebug入门指南-阮一峰的博客](http://www.ruanyifeng.com/blog/2008/06/firebug_tutorial.html)

**#16**

[sublime](http://www.sublimetext.com/)

**#20**

我以前也曾这样，确实学到不少知识，但自从看了曲黎敏副教授讲解的《黄帝内经》后，就不这样了，我也不建议你这样，11点是睡觉的最晚时间了

**#23**

英文原文标题为“使用twitter ”，这个在中国应该是微博么！！！

**#25**

address标签也容易被误用，你不见得知道哦！

**#27**

上面给出的代码可能已经更新，下面有地址，建议用normalize.css而非rerset.css

- [meyer 的 reset.css](http://meyerweb.com/eric/tools/css/reset/)
- [html5doctor的 reset.css](http://html5doctor.com/html-5-reset-stylesheet/)
- [normalize.css](http://necolas.github.io/normalize.css/)

**#30**

现在[bootstrap](http://www.bootcss.com/)或来着居上，本人提倡这个框架，发展很猛，当然还有好多框架都很不错哦。

**#31**

本文为翻译文章原文 "[30 html best practices for beginner](http://net.tutsplus.com/tutorials/html-css-techniques/30-html-best-practices-for-beginners/)"，本文为本人整理，[原译文](http://www.bitscn.com/school/HTMLCSS/201002/181730.html)在此 译文，在原译文基础上有所改动。

本系列文章有三篇，令两篇如下：

- [给javascript初学者的24条建议](http://yanhaijing.com/javascript/2013/12/11/24-JavaScript-best-practices-for-beginners)
- [高效jQuery的奥秘](http://yanhaijing.com/jquery/2013/12/05/writing-better-jquery-code)