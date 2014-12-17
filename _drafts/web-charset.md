---
layout: post
title: Web编码总结
category : web
tagline: "原创"
tags : [web]
keywords: [web,charset]
description: 
---
{% include JB/setup %}

今天遇到了一个奇怪的问题，两次ajax发送的同一个变量值，后端接收到的编码不一样……，一时间，我竟然发现自己对于编码的问题不能说的很清楚。

lisp主张代码即数据，其实我们写的代码也是数据（信息），数据的存储和传播都要就要涉及到编码的问题。就像我们向对方传递信息之前，先要问对方：can you spreak in english。

**小贴士：**嗨，你知道吗！windows的换行符是 \\r\\l，linux的是 \\l，mac的是 \\r，这是有意还是故意的呢……

下面将介绍web开发过程中涉及的编码问题。

-

##编码简史

如果想把编码问题说清楚，那恐怕你看到这里就会把页面关掉了，所以这里仅简要介绍下国内web开发中常用的一些编码。如果你了解或不感兴趣，可以直接跳过本部分。

- ASCII/EASCII（ISO/IEC 646）
- GB2312/GBK/GB18030
- Unicode/UTF8/UTF16

进入数字时代，整个世界都要数字化，最先数字化的就是文字，老外的自我中心论，以为世上仅有abcd…… 26个字母，便发明了ASCII（美国标准信息交换码）。

[ASCII](http://zh.wikipedia.org/wiki/ASCII) 使用一个字节的低7位的不同组合来表示字母数字和一些其他字符，`2^7 = 128`7位二进制共可以代表128个字母。

后来为了表示更多的字符便将ASCII扩展为8位，称为[EASCII](http://zh.wikipedia.org/wiki/EASCII)，并等同于国际标准[ISO/IEC 646](http://zh.wikipedia.org/wiki/ISO/IEC_646)。

而我们为了让汉语也能数字化，变发明了gb2312，gb2312使用两个字节16位表示汉字，为了兼容ASCII将每个字节的高8位置为1，共有14位可用，2^14 = 16384，但GB 2312标准共收录6763个汉字，后来发现不太够用，又扩展了gbk，gb18030。

终于老外发明了 [Unicode](http://zh.wikipedia.org/wiki/Unicode)，一切都解决了，Unicode有两个字节的16位的编码空间，Unicode是一个归法，比较常用的有UTF8和UTF16两种编码方式。

[UTF8](http://zh.wikipedia.org/wiki/UTF-8)在web领域比较常用，是一种变长的编码方式，[UTF16](http://zh.wikipedia.org/wiki/UTF-16)是一种定长方式。

##文件编码

文件编码也可以说是存储的编码。

我们写的代码，最终会以二进制的方式，持久化到计算机的存储设备中。

不同编码的文件，会以不同的规则存储到磁盘中，不同的编码要有自己独特的规则，这样才能在读取的时候不发生冲突，也就是要能识别出来自己，计算机在打开文件的时候都是靠猜测来解码的。

如果存储的编码（算法）和打开的编码（算法）不一致，就会出现乱码的情况。

文件在网络上传入要声明自己的编码，我们一定要清楚源文件的编码，然后才能进行后序工作。

对于前端而言会涉及html，css和js源文件的编码，而国内常用的编码如下：

- ascii
- gbk
- utf-8

推荐大家用utf-8，不容易出问题，但由于历史原因，国内有很多网站的编码都是gbk，下面是BAT的网站情况：

- qq.com gb2312
- taobao.com gbk
- baidu utf-8

百度历史比较悠久的产品线的编码也是gbk，比如百度知道。

##charset








