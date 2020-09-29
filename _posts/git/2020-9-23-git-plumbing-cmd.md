---
layout: post
title: Git常用低频底层命令
category: git
tagline: "原创"
tags: [git]
keywords: [git]
description: 本文介绍Git中比较常用的底层命令，如rev-parse, hash-object, cat-file等
---

{% include JB/setup %}

在一些git脚本中，或者git hook中，经常会见到一些不认识的git命令，比如rev-parse, hash-object, cat-file等，这些命令是干什么的？

别急，我们需要先了解一下Git中的内部文件类型，git中最基本的单元是文件，多个文件组成文件树，文件树会被提交对象引用，提交对象会被分支引用，如图所示

![]({{BLOG_IMG}}468.png)

需要注意一点的是，Git中所有这些文件都被拉平，通过一个魔法key来区分不同的文件，Key是通过文件内容自动计算出来的，文件内容不同Key就会不一样，引用关系被存在了文件内容里

![]({{BLOG_IMG}}466.png)

> 关于git中内部对象的详细介绍，可以看我的另一篇文章[起底Git-Git内部原理](https://yanhaijing.com/git/2017/02/08/deep-git-3/)

Git给每类文件都提供了相关的底层命令，用来直接操作git中的文件，一般要写一些git工具，就绕不开这些命令，本文我们来介绍下Git中比较常用的底层命令

## Blob操作

我们本地的文件，存入Git中就变成了Blob文件，`hash-object`命令可以直接向git中写入一个文件，同时会输入文件的魔法key

```bash
$ echo 'test content' | git hash-object --stdin
# d670460b4b4aece5915caf5c68d12f560a9fe3e4

$ echo 'test content' > a
$ git hash-object a # 和效果上面一样
# d670460b4b4aece5915caf5c68d12f560a9fe3e4
```

上面并没有真正将文件放入git中，只是计算了下文件的key，如果要将文件真正写入git中，需要加上-w参数

```bash
$ echo 'test content' | git hash-object -w --stdin
```

怎么确定写入git中了呢？可以用上面的key去git的文件目录中查看，**注意d6后面的/**

```
$ cat .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
# xK??OR04f(I-.QH??+I?+?K?
```

通过cat直接读取，读出来的是乱码，git提供了`cat-file`命令，可以通过key读取文件内容和文件信息

```bash
$ git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
# test content

$ git cat-file -t d670460b4b4aece5915caf5c68d12f560a9fe3e4 # 查看文件类型
# blob

$ git cat-file -s d670460b4b4aece5915caf5c68d12f560a9fe3e4 # 查看文件size
# 13
```

## Tree操作

现在我们工作区的结构如下，该如何存入git中呢？

```bash
$ echo a > a.txt
$ mkdir b
$ echo b > b/b.txt
$ tree
# .
# ├── a.txt
# └── b
#     └── b.txt
```

git提供了write-tree和read-tree两个命令，这两个命令都只能对索引区进行读取，所以我们需要将我们的文件先放入索引区，可以使用update-index命令

这里需要用到递归，首先我们将b文件夹放入索引

```bash
$ git hash-object -w b/b.txt
# 63d8dbd40c23542e740659a7168a0ce3138ea748

$ git update-index --add b/b.txt
$ git write-tree
# a14f1d9c64fb11590f86de876f3cd45f24ecfb4a
```

write-tree会返回tree文件的key，可以通过cat-file来查看tree对象

```bash
$ git cat-file -p a14f1d9c64fb11590f86de876f3cd45f24ecfb4a
# 040000 tree bc4d1181aca5a33673d7c5d4c209d09ce1cfabd7	b
```

下面我们再来把根目录写入

```bash
$ git hash-object -w a.txt
# 2e65efe2a145dda7ee51d1741299f848e5bf752e

$ git update-index --add a.txt
$ git write-tree
# ba78921ed5403ef643a55125e56f21f7bd2206eb

$ git cat-file -p ba78921ed5403ef643a55125e56f21f7bd2206eb
# 100644 blob 2e65efe2a145dda7ee51d1741299f848e5bf752e	a.txt
# 040000 tree bc4d1181aca5a33673d7c5d4c209d09ce1cfabd7	b
```

通过read-tree可以将文件对象读到index区，在通过checkout-index就可以复制到工作区

```bash
$ git read-tree --prefix=newb a14f1d9c64fb11590f86de876f3cd45f24ecfb4a
$ git checkout-index -a
$ ls
# a.txt b newb
```

## Commit操作

git中的commit被存储为commit对象，可以通过commit-tree将树对象提交，参数为树对象的key，还可以指定一个父提交

```bash
$ echo 'first commit' | git commit-tree ba78921ed5403ef643a55125e56f21f7bd2206eb
# 1c620dd0179c5ecd32ea6a8aaf7ce7218cf11c7b

$ git cat-file -p 1c620dd0179c5ecd32ea6a8aaf7ce7218cf11c7b
# tree ba78921ed5403ef643a55125e56f21f7bd2206eb
# author yanhaijing <yanhaijing@yeah.net> 1601380098 +0800
# committer yanhaijing <yanhaijing@yeah.net> 1601380098 +0800
# 
# first commit
```

## Ref操作

ref被设计出来方便大家使用commit，有了ref就可以不用去记录commit key了，可以通过update-ref命令来更新ref

```bash
$ git update-ref refs/heads/master 1c620dd0179c5ecd32ea6a8aaf7ce7218cf11c7b

$ git show-ref master
# 1c620dd0179c5ecd32ea6a8aaf7ce7218cf11c7b refs/heads/master
```

## 其他

rev-parse命令，可以将对人友好的参数，转换成对git友好的参数，在写git工具时会非常有用

```bash
# 输出git目录
$ git rev-parse --git-dir 
# .git 

$ git rev-parse HEAD # 输出HEAD的key
```

## 参考文章

- [Git 中文参考](https://www.bookstack.cn/read/git-doc-zh/docs-77.md)
- [Git 内部原理](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-Git-%E5%AF%B9%E8%B1%A1)