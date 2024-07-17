---
layout: post
title: 一文搞定函数参数默认值
category: javascript
tagline: '原创'
tags: [javascript, 面试知识, jsmini]
keywords: [javascript]
description: 写了5年前端，你依然不会处理JavaScript参数——一个复杂却必备的技能。你还不知道？现在就来掌握！
---

{% include JB/setup %}

> 本文已收录到《[jsmini系列文章](https://yanhaijing.com/tags/#jsmini-ref)》

**划重点，这是一道面试必考题，我就问过很多面试者这个问题，✧(≖ ◡ ≖✿)嘿嘿**

在JavaScript的世界里，函数参数的处理不仅是代码复用性和模块化设计的核心，也是提高开发效率和可维护性的关键。随着JavaScript语言的发展，我们见证了从基本技术到复杂处理的演变。本文将探讨JavaScript中处理函数参数和默认值的历史，包括早期的技术、ECMAScript 2015引入的现代语法，以及如何高级处理复杂对象。

## 在ECMAScript 2015之前的参数默认值
在 ECMAScript 2015 之前，语言层面并不支持函数默认值，一般都是函数内部自己处理，比较常见的做法是使用或逻辑运算符

```javascript
function leftpad(str, len, char) {
  len = len || 2;
  char = char || '0';
}
```

或运算符是一个短路运算符，当前面的值是真值时，返回前面的值；当前面的值是徦值时，返回后面的值，在参数默认值这个场景下，对于假值或运算符是有问题的。

JavaScript 中的徦值包括：`空字符串, 0, undefined, null`，对于参数默认值来说，当值为`undefined`返回默认值是正确的行为，空字符串，0 和 null 都会被错误的返回默认值。

```js
undefined || 1; // 1
null || 1; // 1
0 || 1; // 1
'' || 1; // 1
```

更好的做法是直接判断`undefined`，前面介绍过需要使用`typeof`判断`undefined`。

```js
function leftpad(str, len, char) {
  len = typeof len === 'undefined' ? len : 2;
  char = typeof char === 'undefined' ? char : '0';
}
```

## ECMAScript 2015引入的默认参数值

ES2015引入了原生的参数默认值，极大地简化了语法：

```javascript
function leftpad(str, len = 2, char = '0') {}
```

这种方式在函数定义时直接指定默认值，更加直观且避免了之前方法的缺陷。它确保只有在参数未传递或传递`undefined`时才使用默认值。

这一变化使得函数更易于阅读和维护，也使得代码更加干净和现代化。开发者可以更容易地理解函数的用途和行为，从而提高代码的可维护性。

## 对象参数的默认值处理

处理对象参数时，简单的默认参数方法不管用了，解决这个问题有多种办法下面分别介绍下。

第1种，可以使用 ECMAScript 2015 带来的`Object.assign`函数，其可以实现将多个对象合并，后面对象的属性可以覆盖前面的属性。

```javascript
function leftpad(str, opt) {
  opt = Object.assign({ len: 2, char: '0' }, opt);
}
```

第2种，同样的思路还可以使用 ECMAScript 2018 带来的对象解构，类似数组解构方法，解构的语法看起来更简洁。

```js
function leftpad(str, opt) {
  opt = { len: 2, char: '0', ...opt };
}
```

第3种，另一种解构语法，在展开对象时，允许设置默认值，将解构默认值和函数参数结合起来，对于对象属性默认值，推荐使用这种办法。

```js
function leftpad(str, { len = 2, char = '0' }) {
  console.log(len, char);
}
```

下面思考下，假如对象的层级变深时，传入可选参数的默认值问题，下面看个例子，现在 len 变成了有最大值和最小值的对象。

```js
function leftpad(str, { len = { min = 1, max = 10 }, char = '0' }) {
    console.log(len, char)
}

leftpad('a', {len:  {max: 5 }}) // min会被覆盖
```

对于有两层数据或者更多层数据的参数对象，前面的办法不能很好的保留默认值，下面让我们看看如何解决这个问题。

## 深层对象参数的默认值问题

处理多层嵌套对象时，使用简单的方法可能不足以确保所有层级的属性都能正确设置默认值。这需要更复杂的策略，如递归合并：

`@jsmini/type`库来自于我之前写的文章：[如何回答面试中的JavaScript获取变量类型问题？](https://yanhaijing.com/javascript/2022/07/09/js-type/)

```js
import { type } from '@jsmini/type';

export function extend(defaultOpt, customOpt) {
  for (let name in customOpt) {
    const src = defaultOpt[name];
    const copy = customOpt[name];

    // 非可枚举属性，例如原型链上的属性
    if (!hasOwnProp(customOpt, name)) {
      continue;
    }

    // 对于对象需要递归处理
    if (copy && type(copy) === 'object') {
      // 如果default上不存在值时，会自动创建空对象
      const clone = src && type(src) === 'object' ? src : {};
      // 递归合并
      defaultOpt[name] = extend(clone, copy);
    } else if (typeof copy !== 'undefined') {
      // 非对象且值不为undefined
      defaultOpt[name] = copy;
    }
  }

  return defaultOpt;
}
```

## 改进`extend`函数以防止原对象被修改

上面的代码基本实现了功能，但还有一个比较严重的问题，就是会改写`defaultOpt`，对于使用方来说可能存在问题，考虑下面的场景：

```js
// 使用方法一
extend({ len: { min: 1, max: 10 } }, { len: { max: 5 } }); // 改写defaultOpt没问题

// 使用方法二
const defaultOpt = { len: { min: 1, max: 10 } };

extend(defaultOpt, { len: { max: 5 } }); // 改写了defaultOpt
extend(defaultOpt, { len: { min: 2 } }); // 再次调用时会返回错误结果，max返回5，期望返回10
```

解决这个问题其实并不难，只需要在最开始将`defaultOpt`复制一份，后面修改复制的数据即可，这样就不会影响传入的`defaultOpt`了。

`@jsmini/clone`库来自于我之前写的文章：[深拷贝的终极探索](https://yanhaijing.com/javascript/2018/10/10/clone-deep/)

```js
import { clone } from '@jsmini/clone';

export function extend(defaultOpt, customOpt) {
  defaultOpt = clone(defaultOpt); // 拷贝一份defaultOpt，隔离数据

  // 此处省略代码，见上面

  return defaultOpt;
}
```


## 相关工具介绍

### Lodash的`merge`功能

在Lodash库中，`merge`函数是处理对象合并的强大工具，特别适用于需要合并多个源对象到一个目标对象的情况，这在处理配置对象或状态对象时尤为常见。`merge`函数不仅合并属性，还能递归合并嵌套结构的对象，确保深层属性也能得到正确处理。

```javascript
const object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};

const other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};

_.merge(object, other);
// 结果: { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
```

在这个例子中，`merge`函数深度合并了两个对象中的数组和嵌套对象，而不是简单地替换掉相同路径的值，这显示了其在复杂数据结构中处理默认值和可选参数的能力。

### Webpack中的webpack-merge功能

Webpack是现代前端开发中不可或缺的工具，其配置文件的管理可以变得相当复杂。`webpack-merge`是一个专门为Webpack设计的合并工具，用于合并多个配置对象。这在管理不同环境的Webpack配置时尤其有用，例如将通用配置与环境特定配置合并。

```javascript
const { merge } = require('webpack-merge');
const commonConfig = {
  entry: './src/index.js',
  // 其他通用配置...
};
const productionConfig = {
  mode: 'production',
  // 生产环境专有配置...
};
const finalConfig = merge(commonConfig, productionConfig);
```

在此示例中，`commonConfig` 包含所有环境下都会用到的配置，而 `productionConfig` 包含生产环境下特有的配置。通过 `merge`，可以灵活地合并这些配置，生产环境的特定设置将覆盖通用配置中的相应设置。这种方法大大简化了配置的复杂性，提高了可维护性和扩展性。

## 结论

掌握现代JavaScript中的参数和默认值处理是每个开发者的必备技能。随着ES2015及后续标准的推广，我们拥有了更多工具和技术来编写更清晰、更健壮的代码。鼓励所有开发者探索这些技术，将它们应用到自己的项目中，以实现更好的软件工程实践。

这篇博文提供了JavaScript函数参数和默认值的全面讨论，从基本概念到高级实践，帮助开发者深入理解并应用这些重要的技术。

你可以在项目中直接使用`extend`库，源代码地址如下：[https://github.com/jsmini/extend](https://github.com/jsmini/extend)

原创不易，感谢阅读，如果有进一步的问题或需要详细讨论某个主题，欢迎评论区交流。
