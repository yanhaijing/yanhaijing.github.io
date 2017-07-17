---
layout: post
title: 图解4种git合并分支方法
category : git
tagline: "原创"
tags : [git]
keywords: [git]
description: 本文将用图文并茂的方式介绍git种4种不同的merge方法的区别和试用场景
---
{% include JB/setup %}

有时候我们会后悔，有时候我们会想回到过去，有时候我们想改变历史，然而在我们这个世界，目前来看是无法回到过去改变历史的

但在git的世界里，一切皆有可能，我们可以在多维空间里任意切换，随意改变一个宇宙的时间线，只要我们愿意，git的分支就是这么神奇

然而很多时候你以为你改变了历史，不为人知，那个宇宙并没有消失，而是遗失在了git的世界里，有能力的人便能找到

彼此分开的世界也能随时交叉合并，世界就这样开开合合，偶会需要解决合并冲突

git中的分支非常的轻量，其实就是一个文件，里面记录了分支所指向的commit id，下图中有两个分支分别是master和test，他们都指向了A2这个提交，HEAD是一个特殊的指针，他永远指向你当前所在的位置；有时候你可能不在某一个分支上，不要惊慌，你随时有权利去你想去的分支，git赋予了你新建，切换分支的能力

![]({{BLOG_IMG}}496.png)

然后有时候世界并不总如上图那般美好，面对分叉的两个分支，git新手总是一脸茫然，本文我将讲述git中合并分支的方法

在git中合并分支有三种方法，分别是merge，rebase，cherry-pick，而其中merge又有三种区别，下面将一一介绍

## fast-forward
如果带合并的分支在当前分支的下游，也就是说没有分叉时，会发生快速合并，从test分支切换到master分支，然后合并test分支

    git checkout master
    git merge test

这种方法相当于直接把master分支移动到test分支所在的地方，并移动HEAD指针

![]({{BLOG_IMG}}498.gif)

## no-ff
如果我们不想要快速合并，那么我们可以强制指定为非快速合并，只需加上`--no-ff`参数

    git checkout master
    git merge –no-ff test

这种合并方法会在master分支上新建一个提交节点，从而完成合并

![]({{BLOG_IMG}}499.gif)

## squash
svn的在合并分支时采用的就是这种方式，squash会在当前分支新建一个提交节点

squash和no-ff非常类似，区别只有一点不会保留对合入分支的引用

    git checkout master
    git merge –squash test

![]({{BLOG_IMG}}500.gif)

## rebase
当要合并两个分叉的分支时，merge的方式是将待合入分支和当前分支不同的部分，在当前分支新建节点，如下图所示

![]({{BLOG_IMG}}501.png)

rebase与merge不同，rebase会将合入分支上超前的节点在待合入分支上重新提交一遍，如下图，B1 B2会变为B1' B2'，看起来会变成线性历史

![]({{BLOG_IMG}}502.png)

## cherry-pick
这命令简直就是神器，给你自由，你想把那个节点merge过来就把那个节点merge过来，其合入的不是分支而是提交节点

## 总结
只有知道了这些合并方式的区别，才能git在手，天下我有，任你分支在凌乱，我自岿然不动

## 继续学习
- [起底Git-开篇](http://yanhaijing.com/git/2017/01/19/deep-git-0/)
- [起底Git-版本控制简史](http://yanhaijing.com/git/2017/01/19/deep-git-1/)
- [起底Git-Git简史](http://yanhaijing.com/git/2017/01/19/deep-git-2/)
- [起底Git-Git内部原理](http://yanhaijing.com/git/2017/02/08/deep-git-3/)
- [起底Git-Git基础](http://yanhaijing.com/git/2017/02/09/deep-git-4/)
- [起底Git-Git进阶](http://yanhaijing.com/git/2017/02/09/deep-git-5/)
- [起底Git-Git开发流程](http://yanhaijing.com/git/2017/02/09/deep-git-6/)
- [起底Git-Git常用命令总结](http://yanhaijing.com/git/2014/11/01/my-git-note/)
