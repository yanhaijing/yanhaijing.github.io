---

layout: post
title: Git在rebase时如何保留merge commit
category: git
tagline: "原创"
tags: [git]
keywords: [git]
description: 本文通过一个例子来讲解下git rebase遇到merge commit时该如何应对
---

{% include JB/setup %}

rebase是git中一个神奇的命令，可以让并行的提交，变得像线性开发的一样，最近发现rebase在遇到merge commit时可能和认知不太一样，本文通过一个例子来讲解下git rebase遇到merge commit时该如何应对

## 经典rebase

先来看下rebase的典型使用场景，假设我们有如下一个提交记录

![]({{BLOG_IMG}}543.png)

当dev想同步上游(master)的修改时，有两种方案，一种是merge，一种是rebase

merge会创建一个commit节点，并且能够保留分支关系

```bash
$ git merge master
```

![]({{BLOG_IMG}}544.png)

但是一般上游到下游的操作，是不需要保留分支关系的，rebase正是为了这个场景设计的，rebase会将dev上的节点，重新在master上重新创建一遍，看起来就是是在master分支最后开发的一样

```bash
$ git rebase master
```

![]({{BLOG_IMG}}545.png)

至此就介绍完了rebase常规的使用场景

## merge rebase

如果被rebase的分支上有merge commit，会发生什么呢？假设我们有如下的log tree（请原谅我懒得画图了^_^）

```bash
* 31ef4ec (HEAD -> master) e
| *   b554f2d (dev) Merge branch 'test' into dev
| |\  
| | * 853aaf6 (test) c
| * | 1af86fa d
| |/  
| * c1b49a5 b
|/  
* 763a350 a
```

master分支在dev分支后面又有了新的提交，dev分支合并了test分支，现在dev分支想同步master分支，继续使用rebase操作

```bash
* 8924fda (HEAD -> dev) c
* 06201b2 d
* e0c6b78 b
* 31ef4ec (master) e
| * 853aaf6 (test) c
| * c1b49a5 b
|/  
* 763a350 a
```

可以rebase将merge commit抛弃了，同时test分支上的提交`c`的内容被patch到了dev分支上

这可能和我的认知不太一样，我希望的效果是继续保留merge commit，rebase 为我们提供`--rebase-merges`参数来这个问题

```bash
$ git rebase --rebase-merges master
```

看下log tree，变基成功了，merge commit被保留了，但test分支也被变基了，test分支上的commit还是被复制了一份

```bash
*   88e6cf7 (HEAD -> dev) Merge branch 'test' into dev
|\  
| * e2fae10 c
* | 65869a2 d
|/  
* e61592d b
* 31ef4ec (master) e
| * 853aaf6 (test) c
| * c1b49a5 b
|/  
* 763a350 a
```

## 总结

最后建议大家merge和rebase尽量使用一种即可，即rebase的代码，不要包含merge commit；使用了merge操作，就不要在rebase了

## 参考文档

- [git: Preserving merge commits while rebasing](https://mtyurt.net/post/2019/git-rebase-merges-option.html)

