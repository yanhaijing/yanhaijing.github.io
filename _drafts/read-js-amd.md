---
layout: post
title: 解读JavaScript异步模块定义规范（AMD）
category : js
tagline: "原创"
tags : [js]
keywords: [amd, js]
description: 
---
{% include JB/setup %}

自11年始AMD逐渐流行起来，解决了js对模块功能的缺失，在此之前我们只能只能手动维护这个过程，本文将从如下几个方面解读AMD规范。

##从命令行说起
当我们在命令行敲入一个命令，就会执行这个命令，像下面这样，我们执行了git命令。

![]({BLOG_IMG}/166.png)

如果我们执行一个不存在的命令，命令行会告诉我们找不到命令：

![]({BLOG_IMG}/167.png)

用过命令行的windows用户，应该知道path，我们把一个命令扔到system32下，或者把命令所在的路径加入path中，就可以运行这个命令了，但我们更新了path，只对重新打开的命令行起作用，对已经打开的不起作用，我们可以

##commonjs

##AMD

##lodJS

##参考资料
- [AMD规范](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [JavaScript模块化开发一瞥](http://www.ituring.com.cn/article/1091)



