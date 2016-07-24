---
layout: post
title: 详解JavaScript中的原型和继承
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [原型, prototype, inheritance, javascript]
description: 本文将会介绍面向对象，继承，原型等相关知识
---
{% include JB/setup %}
最近组内的童鞋和我说的自己一直搞不太清楚js原型这一块的东西，我想了想觉得这东西也不是一两句话就能解释清楚的，所以我决定来解释解释js中的原型机制，希望也能帮到你。

本文将会介绍面向对象，继承，原型等相关知识，涉及的知识点如下：

- 面向对象与继承
- CEOC
- OLOO
- 臃肿的对象
- 原型与原型链
- 修改原型的方式

## 面向对象与继承
最近学习了下python，还写了篇博文《[重拾编程乐趣——我的Python笔记](http://yanhaijing.com/program/2016/06/28/my-python/)》，加深了我对面向对象的一些理解。

我们会对我们写的程序进行抽象，而不同的语言都提供了不同的抽象工具，比如各种语言里面的数组，集合(键值数组，哈希表，字典等)等提供了对数据的抽象；而VB里面的子程序，类C语言里面的函数，提供了抽象代码段的能力。

有时我们希望将数据和对数据的操作封装到一起，这被称作对象，是一种更高唯独的抽象工具，而这种抽象工具——对象可以对现实世界进行建模。

现实世界中的事物都有一些联系，比如我们可以抽象出来猫，然后又公猫，母猫，显然公猫应该拥有猫的特性，这也就是继承，细分的事物应该有高纬度事物的特点。

想要实现对象和继承这套思维，目前有两种实现方法，分别是CEOC和OLOO。

## CEOC
CEOC(class extend other class)是一套基于类和实例的实现方式，

## OLOO
OLOO(object link other object)是一套基于对象和原型的实现方式，

## 臃肿的对象
来说说JS中的对象机制，JS中的对象显得有些臃肿，JS中的对象承接了两个功能，一是面向对象机制中的对象，另一个是数据抽象中的集合——其他语言中称为键值数组，哈希表或字典。

## 原型与原型链


## 修改原型的方式


## 参考文章
- [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
