---
layout: post
title: Git新命令switch和restore
category: git
tagline: "原创"
tags: [git]
keywords: [git]
description: 
---

{% include JB/setup %}

最近发现git在修改完文件后，提示恢复修改的命令是restore，如下所示，印象中应该是checkout，所以就研究了下，总结一下分享给大家


```bash
$ git status

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   _posts/git/2020-8-24-how-to-transfer-a-git-repo.md
```

原来是git中的checkout命令承载了分支操作和文件恢复的部分功能，有点复杂，并且难以使用和学习，所以社区解决将这两部分功能拆分开，在git 2.23.0中引入了两个新的命令switch和restore用来取代checkout

下面分别来说说分支操作和文件恢复，如果你对git还不太熟悉，可以先阅读我的git入门文章

- [起底Git](https://yanhaijing.com/git/2017/01/19/deep-git-0/)
- [我的git笔记](https://yanhaijing.com/git/2014/11/01/my-git-note/)
- [图解4种git合并分支方法](https://yanhaijing.com/git/2017/07/14/four-method-for-git-merge/)

## 分支操作
原来git有两个命令用来操作分支，分别是branch和checkout

其中branch用来管理分支

```bash
$ git branch ## 查看当前所在分支
$ git branch aaa # 新建分支aaa
$ git branch -d aaa # 删除分支aaa
```

checkout用来切换分支，切换分支时，也可以新建分支

由于git中分支仅仅是一个commit id的别名，所以checkout也可以切换到一个commit id

```bash
$ git checkout aaa # 切换到 aaa分支
$ git checkout -b aaa # 创建aaa，然后切换到 aaa分支
$ git checkout commitid # 切换到某个commit id
```

checkout命令会用仓库中的文件，覆盖索引区(staged or index)和工作目录(work tree)

新的switch命令用来接替checkout的功能，但switch不能切换到commit id

```bash
$ git switch aaa # 切换到 aaa分支
$ git switch -c aaa # 创建aaa，然后切换到 aaa分支
```

下面来总结对比下

| 操作            | 2.23-           | 2.23+         |
| --------------- | --------------- | ------------- |
| 管理分支        | git branch      | git branch    |
| 切换分支        | git checkout    | git switch    |
| 新建+切换分支   | git checkout -b | git switch -c |
| 切换到commit id | git checkout    | git checkout  |

## 文件恢复
原来git中文件恢复涉及到两个命令，一个是checkout，一个是reset，reset除了重置分支之外，还提供了恢复文件的能力

```bash
$ git checkout -- aaa # 从staged中恢复aaa到worktree
$ git reset -- aaa # 从repo中恢复aaa到staged
$ git checkout -- HEAD aaa # 从repo中恢复aaa到staged和worktree
$ git reset --hard -- aaa # 同上
```

一图胜千言系列

![]({{BLOG_IMG}}541.png)

新的restore命令专门用来恢复staged和worktree的文件

```bash
$ git restore [--worktree] aaa # 从staged中恢复aaa到worktree
$ git restore --staged aaa # 从repo中恢复aaa到staged
$ git restore --staged --worktree aaa # 从repo中恢复aaa到staged和worktree
$ git restore --source dev aaa # 从指定commit中恢复aaa到worktree
```

一图胜千言系列

![]({{BLOG_IMG}}542.png)

可以看到restore提供checkout和reset两个命令才能提供的文件恢复能力，也提供了更好的语义

## 总结

大家可以继续使用自己熟悉的命令，毕竟熟悉的才好用，本文希望能够帮助大家理清这个问题，满足大家的好奇心

git这样一个成熟的项目，一直处在不停的演进进化中，我们作为开发者也要保持持续学习演进的能力，共勉👊