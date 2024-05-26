---
layout: post
title: 如何优雅的安装Node.js和npm
category: nodejs
tagline: '原创'
tags: [nodejs, npm]
keywords: [nodejs, npm]
description: 轻松在Mac上安装多个Node.js版本，解决全局安装权限问题，提升开发效率，快来学习一下，提升效率！
---

{% include JB/setup %}

我之前写过一篇[小白的 Mac 上手指南(干货)](https://yanhaijing.com/mac/2017/07/19/my-mac-note/)，受到了很多掘友好评，最近重新安装环境，我发现以前安装 Node 和 npm 的方法还有优化空间，原来老司机也有翻车的时候。

所以我决定重写一篇文章，本文的技巧一定会让你效率翻倍，老规矩本文不止告诉你怎么做，还告诉你为什么这么做。

Node.js 是现代 Web 开发中不可或缺的工具，随着项目需求的变化，可能需要使用不同版本的 Node.js。因此，优雅地管理和切换 Node.js 版本显得尤为重要。本文将介绍如何在 Mac 上使用 Homebrew 安装`n`工具来管理多个 Node.js 版本，并解决 npm 全局安装包时需要`sudo`权限的问题。

开始之前先说明下，我的系统是 macOS 14.x，本文中介绍的工具安装方法，可能具有时效性，比如 brew 的安装可能会过时，如果遇到问题，可以去官网查看最新安装方法。

## 优雅地安装`n`

`n`是一个 Node.js 版本管理工具，允许你轻松地安装、管理和切换多个 Node.js 版本。它的使用简单直观，非常适合开发者。通过`n`，你可以在不同版本的 Node.js 之间快速切换，以满足不同项目的需求。

### 为什么选择 Homebrew？

Homebrew 是 macOS 上的一个包管理工具，它使得软件的安装和管理变得非常方便。通过 Homebrew 安装`n`，可以简化安装过程，并确保环境的整洁和一致性。

### 使用 Homebrew 安装`n`

第 1 步，安装 Homebrew，如果你还没有安装 Homebrew，可以通过以下命令在终端中安装：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

第 2 步，使用 Homebrew 安装`n`：

```sh
brew install n
```

安装完成后，你就可以使用`n`来管理 Node.js 版本了。

## 优雅的管理 Node.js 多版本

### 为什么使用`n`来管理 Node.js 版本？

不同项目可能依赖于不同版本的 Node.js，手动管理这些版本不仅麻烦，而且容易出错。`n`简化了这个过程，使得安装、切换和卸载 Node.js 版本变得非常方便。

类似的工具还有 nvm，这里不对二者的优缺点做评价，笔者平时比较习惯使用 n，所以这里介绍的是 n，当然 nvm 也可以解决这个问题。

### 设置 `N_PREFIX` 环境变量

默认情况下，`n` 会将 Node.js 安装到 `/usr/local` 目录下，这通常需要管理员权限。为了避免权限问题，我们可以设置 `N_PREFIX` 环境变量，将 `n` 安装的 Node.js 版本放在用户目录下。

这个小技巧我最近才知道，再也需要 sudo 了，^\_^。

#### 创建自定义目录

首先，为`n`创建一个目录来存放 Node.js 版本：

```sh
mkdir -p $HOME/.n
```

#### 设置环境变量

如果现在使用 n 安装了 Node.js，你会发现在命令行里执行 node 命令会说找不到 node 命令，这是因为我们改变了 n 的默认安装路径，需要将新的路径加入到 PATH 中，在你的 shell 配置文件中（如`.bashrc`或`.zshrc`）添加以下行：

```sh
export N_PREFIX=$HOME/.n
export PATH=$N_PREFIX/bin:$PATH
```

保存并执行以下命令使配置生效：

```sh
source ~/.bashrc   # 对于Bash用户
source ~/.zshrc    # 对于Zsh用户
```

### 使用`n`安装 Node.js 版本

#### 安装最新的稳定版

通过以下命令安装最新的稳定版 Node.js：

```sh
n stable
```

#### 安装最新的 LTS（长期支持）版

LTS 版本通常更稳定，适合在生产环境中使用。通过以下命令安装最新的 LTS 版本：

```sh
n lts
```

#### 安装指定版本（例如 14.17.0）

有时你可能需要特定版本的 Node.js，可以使用以下命令安装：

```sh
n 14.17.0
```

### 切换 Node.js 版本

列出已安装的版本并选择一个进行切换：

```sh
n
```

### 卸载不需要的 Node.js 版本

为了保持系统整洁，可以卸载不再需要的 Node.js 版本：

```sh
n rm 14.17.0
```

## 解决 npm 全局命令需要 sudo 的问题

### 为什么 npm 全局安装需要 sudo？

默认情况下，如果你安装的 npm 包会创建一个全局命令的话，比如安装 pnpm，会涉及到权限问题。

这是因为 npm 全局安装包会写入系统目录（例如`/usr/local`），这通常需要管理员权限。因此，在安装全局包时需要使用`sudo`，这可能会带来一些不便和安全问题。

### 解决方案：创建用户目录用于全局安装

为了解决这个问题，我们可以为 npm 全局包创建一个用户目录，这样可以避免使用`sudo`安装全局包。

#### 创建自定义目录

首先，为全局 npm 包创建一个目录：

```sh
mkdir -p $HOME/.npm-global
```

#### 设置 npm 配置以使用自定义目录

然后，配置 npm 使用这个新的全局目录：

```sh
npm config set prefix '~/.npm-global'
```

### 修改环境变量

为了确保系统能够找到全局安装的 npm 包，需要将新目录的`bin`子目录添加到`PATH`环境变量中。在你的 shell 配置文件中添加以下行：

```sh
export PATH="$HOME/.npm-global/bin:$PATH"
```

保存并执行以下命令使配置生效：

```sh
source ~/.bashrc   # 对于Bash用户
source ~/.zshrc    # 对于Zsh用户
```

## 总结

通过本文，你学会了如何优雅地在 Mac 上使用 Homebrew 安装`n`，并使用`n`来管理多个 Node.js 版本。同时，你还学会了如何解决 npm 全局安装包时需要`sudo`的问题。希望这些技巧能帮助你在开发过程中更加高效。

这下终于告别 sudo 了，太开心了(_^▽^_)。

原创不易，感谢阅读，你还知道什么 Node.js 和 npm 的技巧，欢迎评论区交流。
