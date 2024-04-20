---
layout: post
title: 一文搞懂 JavaScript 模块化
category: javascript
tagline: '原创'
tags: [javascript]
keywords: [javascript]
description: 本文梳理JS模块化的历史和现状，不仅介绍不同模块系统是什么，而是深入介绍不同模块系统诞生的原因和解决的问题，阅读本文将为你解开很多JS模块化的疑惑。
---

{% include JB/setup %}

如果你看过某个现代 JavaScript 库的代码，一定会困惑其复杂的模块适配，下图目前主流的 JavaScript 库模块适配方案。

![image.png]({{BLOG_IMG}}608.png)

本文梳理 JavaScript 模块化的历史和现状，不仅介绍不同模块系统是什么，而是深入介绍不同模块系统诞生的原因和解决的问题，阅读本文将为你解开很多 JavaScript 模块化的疑惑。

## 传统 JavaScript

JavaScript 诞生之初，是一门在浏览器使用的脚本语言，并没有提供模块系统，站在当时的视角来看，确实也并不需要模块系统。

在浏览器中，如果想引用一个脚本文件，只需要使用 script 标签引入即可，非常简单直观，如下所示即可可入 jQuery。

![image.png]({{BLOG_IMG}}609.png)

script 的方式，并没有解决依赖的问题，依赖关系的解决，需要我们手动保证引入的顺序问题，2013 年我曾写过一个较为复杂的绘图程序[Painter](https://yanhaijing.com/Painter/)，手动维护依赖关系，如下图所示，曾经让我非常痛苦。

![image.png]({{BLOG_IMG}}610.png)

JavaScript 缺少模块带来两个问题，一个是封装的问题，一个是依赖的管理问题，关于如何支持模块的问题，浏览器社区和 Node.js 社区分别给出了不同的探索和方案，下面介绍其中影响比较大的模块系统。

## Node.js 模块方案

Node.js 是浏览器之外的另一个运行时，其创建之初，为了弥补 JavaScript 缺失模块的问题，其带来了[commonjs 规范](https://wiki.commonjs.org/wiki/CommonJS)，在 Node.js 中模块是强制的，commonjs 的模块定义和使用示例如下，需要注意外面的 define 在 Node.js 中是自动添加的，不需要写。

```js
define(function (require, exports, module) {
    //使用event 模块
    var ec = require("event");
});
```

随着 Node.js 的发展，commonjs 影响力也越来越大，社区中很多库都提供了 commonjs 的引入方式，在当前这个时间点(2024-03-11)，社区中依然存在大量仅支持 commonjs 的库。

## 浏览器模块方案

当浏览器社区考虑引入模块系统时，发现 commonjs 并不适合浏览器，这是因为 commonjs 是为同步导入设计的模块系统，在 Node.js 中引入一个模块是通过文件系统，同步非常合理，也非常简单。但在浏览器环境中，都是基于网络加载 js 文件的，需要设计一套异步加载规范。

其中最突出的异步加载规范是[AMD(Asynchronous Module Definition)](<https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)>)，如果要使用 AMD 模块，还需要加载器，其中 RequireJS 是使用最为广泛的 AMD 模块加载器。

AMD 规范中定义模块的方式如下：

```js
define(["beta"], function (beta) {
  bata.***//调用模块
});
```

笔者早年间写的[变色方块小游戏](http://yanhaijing.com/inverter/)，就是使用 RequireJS 作为加载器的，其源代码中只加载一个入口文件。

![image.png]({{BLOG_IMG}}612.png)

其依赖的其他模块都通过 RequireJS 异步导入，示例如下：

![image.png]({{BLOG_IMG}}611.png)

目前 AMD 已经很少使用，仅作为了解即可，但在当时 AMD 也有很多用户，很多 JS 库都提供了 AMD 的引入方式。

## 割裂的社区

在 AMD 和 commonjs 双雄并存的年代，不得不面临一个巨大的问题，很多 JS 库，都只提供一种引入方式，这让社区割裂开来，如何在一种模块中使用另一种模块的库，成了模块加载器的急需解决的问题。

##### AMD 如何给 Node.js 使用

RequireJS 提供了在 Node.js 中使用 AMD 模块的方案，其使用方式如下所示：

![image.png]({{BLOG_IMG}}613.png)

为了实现这个功能，给 RequireJS 中添加了冗余代码，其部分源码实现如下所示，即便今天来看，RequireJS 的实现也颇为巧妙。

![image.png]({{BLOG_IMG}}614.png)

##### commonjs 如何给浏览器使用

那么大量的 commonjs 模块如何让浏览器使用呢？最早开始探索的先驱是# [Browserify](https://browserify.org/)，其通过预编译的方式，将 commonjs 编译为传统 script 的方式，其使用方式如下所示：

![image.png]({{BLOG_IMG}}615.png)

Browserify 的这种方式被后来的工具借鉴并发扬光大，今天我们常用的工具都是基于这种方式，比如 webpack，rollup，pracel，vite 等。

## 如何融合 AMD 和 commonjs？

两套模块系统的另一个困扰来自库开发者，我到底该提供哪个模块给大家使用呢？有什么办法可以融合 AMD 和 commonjs 呢？

这个问题最终被 UMD 解决，[UMD](https://github.com/umdjs/umd)的全称是 Universal Module Definition。和它名字的意思一样，这种规范基本上可以在任何一个模块环境中工作。

UMD 的设计非常精巧，其支持传统 JavaScript，AMD 和 commonjs，对于传统 JavaScript，它设置支持了类似 jQuery 中的 noConflict 方法，一段典型的 UMD 代码如下所示：

```js
(function (root, factory) {
  var Data = factory(root);
  if ( typeof define === 'function' && define.amd) {
    // AMD
    define('data', function() {
      return Data;
    });
  } else if ( typeof exports === 'object') {
    // Node.js
    module.exports = Data;
  } else {
    // Browser globals
    var _Data = root.Data;

    Data.noConflict = function () {
      if (root.Data === Data) {
        root.Data = _Data;
      }

      return Data;
    };
    root.Data = Data;
  }
}(this, function (root) {
	var Data = ...
	//自己的代码
	return Data;
}));
```

其实故事到此本该就结束了，一些主要问题，已经基本解决了，没想到半路杀出个程咬金——ESM，对 AMD 和 commonjs 实现了降维打击。

## ESM

2015 年 ECMAScript6 发布，也被称为 ECMAScript2015，其为 JavaScript 语言带来了原生的模块系统 ECMAScript6 Module，下文我们简称为 ESM。

网上有很多文章介绍 ESM，ESM 的科普不是本文的重点，这里不再展开介绍，commonjs 和 ESM 的引用模块的对比如下：

```js
// commonjs
let { stat, exists, readfile } = require("fs");

// ESM
import { stat, exists, readFile } from "fs";
```

## 打包工具如何支持 ESM

ES6 虽然带来了 ESM，但并未提供实际的使用方式，并没有环境支持 ESM，为了使用 ESM 需要借助打包工具，最早支持 ESM 的打包工具应该是 rollup，rollup 给的方案是库提供两个入口，一个是 esm，一个是 commonjs，这样让库同时在 rollup 和其他打包工具中使用。

rollup 建议库中增加`module`字段，来标记 ESM 的入口文件，rollup 有一篇文档详细介绍这个字段 [pkg.module](https://github.com/rollup/rollup/wiki/pkg.module)，值得一提的是由于不同工具的原因，实现同样的诉求，存在两个字段，一个是`module`，一个是`jsnext:main`。

如果库中存在如下字段，rollup 会加载`module`字段文件，其他打包工具则加载`main`。

![image.png]({{BLOG_IMG}}616.png)

后来 webpack 也提供了支持，其是通过增加配置来实现的，`mainFields`中的`main`前面添加`module`配置即可，如下所示：

![image.png]({{BLOG_IMG}}617.png)

你可能会好奇最前面的`browser`字段是啥，那就继续往下看吧。

## 如何解决 Node.js 和浏览器差异的问题

一个库同时支持 Node.js 和浏览器，理想很美好，然后现实却可能遇到挑战，由于环境的不一致问题，同一个库，在不同环境中，可能存在不同的实现方式。

举个例子，我们熟悉的 axios 库，其功能是提供发送请求的友好接口，同时支持在 Node.js 和浏览器中使用，其在浏览器中基于 xhr 实现，但在 Node.js 由于没有 xhr，其基于 http 模块实现。

对于这个问题，可以通过提供两个 npm 包的方式来解决，但这并不优美，库的开发者可能希望只提供一个 npm 包。还有一种解决办法，就是在一个 npm 包中，写分支代码，但这种方式会让浏览器环境中多出来 Node.js 中的代码，虽然可以通过打包工具，避免将 http 模块打包进来，但仍然有冗余代码。

为了解决这个问题，[package-browser-field-spec](https://github.com/defunctzombie/package-browser-field-spec)诞生了，其通过在 package.json 中增加 browser 字段的方式，来区分不同的环境，对于浏览器环境来说，打包工具会自动引用 browser 字段的内容。

其使用方式如下所示，即支持整个入口替换，也支持部分文件的替换。

![image.png]({{BLOG_IMG}}618.png)

![image.png]({{BLOG_IMG}}619.png)

webpack 对于 browser 的支持也通过增加配置的方式，上面我们看到 webpack 配置中的 browser 字段，就是实现这个功能的。

## 浏览器如何支持 ESM

除了借助打包工具，浏览器也对 ESM 提供了原生支持，其通过给 script 标签增加`type="module"`属性的方式，来区分传统加载，还是模块化加载。

举个例子，我们有`main.js`和`hello.js`两个文件，其中`main.js`依赖`hello.js`，内容如下所示：

![image.png]({{BLOG_IMG}}620.png)

![image.png]({{BLOG_IMG}}621.png)

如果通过传统 script 标签直接加载存在`import`和`export`的 js 文件会报错，如下所示：

![image.png]({{BLOG_IMG}}622.png)

只需简单添加`type="module"`即可，示例如下，现在我们使用 vite 在 dev 模式下，就是基于浏览器原生 ESM 加载模块的。

![image.png]({{BLOG_IMG}}623.png)如下

## Node.js 如何支持 ESM

Node.js 对 ESM 的支持比较坎坷，其中实现方案也修改过，导致其比较复杂，Node.js 从 18 版本开始提供了较为稳定的 ESM 支持。

Node.js 支持 ESM 的挑战是，如何兼容大量的存量 commonjs 模块，Node.js 提供了两种方式，一种是通过后缀名区分，一种是通过给 package.json 增加 type 字段来区分。

在一个 npm 包中，可以同时存在这种量情况，归纳起来，可以分为如下情况，`.mjs`是 ESM，`.cjs`是 commonjs，`.js`要看 package.json 的`type`字段。

-   .mjs
-   .js
    -   package.json 没有 type
    -   package.json type=commonjs
    -   package.json type=module
-   .cjs

有一点需要注意，在 Node.js 中 ESM 中可以引用 commonjs，在 commonjs 中不能引用 ESM，如果想了解背后的原因，以及更多细节，可以查看 Node.js 官方的文档：[package 包模块](https://nodejs.cn/api-v16/packages.html#determining-module-system)

目前 webpack 中也支持.mjs，可以通过如下配置来实现：

![image.png]({{BLOG_IMG}}624.png)

##### exports

那么一个库，如何给旧版本 Node.js 提供 commonjs，给新版本 Node.js 提供 ESM 呢，Node.js 提供的答案是引入新的 exports 字段，exports 是重新设计的接口，其支持我们前面提到的全部功能，比如 browser。

下面是 exports 的示例：

-   对于不支持 exports 的环境，会继续读取 main 字段
-   支持 exports，但不支持 ESM 的环境，会使用 require 字段
-   支持 exports，且支持 ESM 的环境，会使用 import 字段

![image.png]({{BLOG_IMG}}625.png)

exports 本身的规则也比较复杂，如果想正确使用 exports 建议仔细阅读规范，下面是工具库 axios 的的 exports 配置，其中 types 是给 typescript 使用的，browser 是支持我们前面提到的 browser 功能。

![image.png]({{BLOG_IMG}}626.png)

目前 webpack 也支持 exports 导入，可以通过如下配置来实现：

![image.png]({{BLOG_IMG}}627.png)

##### 双包问题

对于 Node.js 来说，支持 ESM 并不简单，这里提一个双包的问题，假如我们的 npm 包通过前面的 exports 字段，提供了 ESM 和 commonjs 两种入口，在实际使用中，两种入口可能会被同时使用，导致我们的代码被执行两遍。

举个例子，我们的包是 A，项目中使用 A 的 ESM，项目依赖另一个包 B，B 依赖 A 的 commonjs 时，就会存在双包的问题。

如果我们的包是无副作用的代码，则执行两次问题不大，如果是希望单例的包，这样则会造成严重问题。

解决双包的问题，目前有两个思路：

一种是保守方法，由于 ESM 可以引入 commonjs，在 commonjs 中实现功能代码，在 ESM 中提供一个包装代码，调用我们的 commonjs 即可。

一种是激进办法，只提供 ESM 的包，放弃支持 commonjs 的旧环境。

## Deno

仔细观察你会发现，Node.js 加载 ESM 是基于文件路径，而我们的浏览器是基于 URL，这并不统一，世界上也并不只有 Node.js，比如 Deno 就只支持 URL 加载，如下所示：

![image.png]({{BLOG_IMG}}628.png)

那么 Deno 如何使用我们的 npm 包呢，答案是通过[unpkg](https://www.unpkg.com/)和[esm](https://esm.sh/)这种的平台来实现。

不过这要在我们的 package.json 中添加新的字段，如下所示，unpkg 会自动识别我们的字段，并提供相应的替换和包装功能：

![image.png]({{BLOG_IMG}}629.png)

需要注意，在 Node 17 以后，也支持通过 URL 来加载 ESM。

## 总结

本文介绍了 JavaScript 中主要模块方案和其背后的原因，希望对您有帮助，在日后的工作中看到任何模块，都不再困扰。
