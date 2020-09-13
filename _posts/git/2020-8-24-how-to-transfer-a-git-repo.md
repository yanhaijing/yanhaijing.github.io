---
layout: post
title: 如何迁移一个Git仓库
category: git
tagline: "原创"
tags: [git]
keywords: [git]
description: 本文将向大家介绍迁移 Git 仓库的的方法
---

{% include JB/setup %}

最近要把 Git 仓库迁移，看有些同学迁移中不太顺利，自己研究总结了下，分享给大家，本文将向大家介绍迁移 Git 仓库的的方法

## 直接PUSH

有同学说，这不是很简答么，像下面这样不就好了？

```bash
$ git remote add remote2 xxx
$ git push --all remote2 
```

上面做法的问题在于只能把本地存在的分支推送到remote2，一般公共仓库的话，我们本地都不会有全部远端分支的引用

那怎么办？别急，这事其实还不太简单，下面先来研究下push命令，平时推送分支，我们都是直接 push

```bash
$ git push
```

其实 git 在 push 时会自动填充填充缺省参数，比如上面的命令完整命令应该是下面这样

```bash
$ git push origin branch # 自动填充源 origin 以及当前分支 branch
```

git在push时除了自动填充参数，还会自动展开分支，上面的命令展开后如下

```bash
$ git push origin refs/heads/branch:refs/heads/branch
```

查看下.git下的refs目录，就会发现git会把远端的分支存放在remotes目录

```
.git/refs/remotes/origin/xxx
```

那我们可以用下面的命令进行仓库迁移

```bash
$ git push remote2 refs/remotes/origin/*:refs/heads/*
```

但这样做还有个问题不能解决，就是tag引用还是丢失了，下面介绍的方法可以解决这个问题

## 裸仓库
git有一个裸仓库的概念，只要在克隆时建一个--bare参数即可

```bash
$ git clone --bare xxx
```

裸仓库是没有工作目录的，克隆完的仓库只有.git下的内容，同时也不能再做更新工作

但裸仓库可以再次push到另一个源，刚好可以完成我们仓库迁移的任务

```bash
$ git remote add remote2 xxx
$ git push --mirror remote2
```

## 镜像仓库
镜像仓库和裸仓库类似，但裸仓库不能更新，镜像仓库可以实现后续的更新工作

镜像仓库的创建只需要在克隆的时候加上--mirror参数即可

```bash
$ git clone --mirror xxx
```

镜像仓库的push操作和裸仓库一样，也可以完成我们仓库迁移的任务

```bash
$ git remote add remote2 xxx
$ git push --mirror remote2
```

## 总结
本文总结了git迁移仓库的不同方法和区别，迁移源的问题，推荐大家使用裸仓库的方法，希望同学们遇到问题可以多思考多总结

## 参考资料

-   [git push all branches from one remote to another remote](https://stackoverflow.com/questions/37884832/git-push-all-branches-from-one-remote-to-another-remote)
- [What's the difference between git clone --mirror and git clone --bare](https://stackoverflow.com/questions/3959924/whats-the-difference-between-git-clone-mirror-and-git-clone-bare)
