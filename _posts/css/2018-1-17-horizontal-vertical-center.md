---
layout: post
title: CSS实现水平垂直居中的方式
category : css
tagline: "原创"
tags : [css, interviewee]
keywords: [css, 水平, 垂直, 居中, 水平垂直居中]
description: 本文将讲解css实现水平垂直居中的几种方式
---
{% include JB/setup %}

划重点，这是一道面试必考题，很多面试官都喜欢问这个问题，我就被问过好几次了

本文总结了一下CSS实现水平垂直居中的方式大概有下面这些，本文将逐一介绍一下，我将本文整理成了一个[github仓库](https://github.com/yanhaijing/vertical-center)，欢迎大家star

仅居中元素定宽高适用

- absolute + 负margin
- absolute + margin auto
- absolute + calc

居中元素不定宽高
- absolute + transform
- writing-mode
- lineheight
- table
- css-table
- flex
- grid

## absolute + 负margin

## absolute + margin auto

## absolute + calc

## absolute + transform

## writing-mode

## lineheight

## table

## css-table

## flex

## grid


## 总结

下面对比下各个方式的优缺点，肯定又双叒叕该有同学说回字的写法了，简单总结下

- PC端有兼容性要求推荐css-table，否则推荐flex
- 移动端推荐使用flex

| 方法                     | 居中元素定宽高固定 | PC兼容性                        | 移动端兼容性          |
| ---------------------- | --------- | ---------------------------- | --------------- |
| absolute + 负margin     | 是         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + margin auto | 是         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| absolute + calc        | 是         | ie9+, chrome19+, firefox4+   | 安卓4.4+, iOS6+   |
| absolute + transform   | 否         | ie9+, chrome4+, firefox3.5+  | 安卓3+, iOS6+     |
| writing-mode           | 否         | ie6+, chrome4+, firefox3.5+  | 安卓2.3+, iOS5.1+ |
| lineheight             | 否         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| table                  | 否         | ie6+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| css-table              | 否         | ie8+, chrome4+, firefox2+    | 安卓2.3+, iOS6+   |
| flex                   | 否         | ie10+, chrome4+, firefox2+   | 安卓2.3+, iOS6+   |
| grid                   | 否         | ie10+, chrome57+, firefox52+ | 安卓6+, iOS10.3+  |
