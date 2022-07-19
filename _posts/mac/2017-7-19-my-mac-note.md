---
layout: post
title: 一个Mac小白的自我修养
category: mac
tagline: '原创'
tags: [mac]
keywords: [mac, note]
description: 一个前端的mac笔记
---

{% include JB/setup %}

作为一个前端，坚守了 9 年的 windows 平台，也是惭愧，但主要还是因为穷，最近终于换上了 mac，但却是各种不习惯，各种折腾，本文记录下自己遇到的问题和解决办法，希望能够帮助 mac 新同学们

## Mac 编年史

一直理不清 mac 的历史，下面简单总结下，最开始的苹果电脑叫做 Apple，比如 Apple I，Apple II，其操作系统叫做 System，大概从 1984-1997

- System1.0 - 5.0
- System6.0 彩色
- System7.0
- System7.5
- System7.6

后来苹果推出新的 Mac 电脑，Mac OS 系统诞生了

- Mac OS 8
- Mac OS 8.5
- Mac OS 9

苹果将 Mac OS10 改名为 OS X，并给每个版本命名一个大型猫科动物

| 系统          | 代号              | 时间       |
| ------------- | ----------------- | ---------- |
| Mac OS X 10.0 | 猎豹 Cheetah      | 2001.3.24  |
| Mac OS X 10.1 | 美洲狮 Puma       | 2001.9.25  |
| Mac OS X 10.2 | 美洲虎 Jaguar     | 2002.8.24  |
| Mac OS X 10.3 | 黑豹 Panther      | 2003.10.24 |
| Mac OS X 10.4 | 虎 Tiger          | 2005.4.29  |
| Mac OS X 10.5 | 花豹 Leopard      | 2007.10.26 |
| Mac OS X 10.6 | 雪豹 Snow Leopard | 2008.6.9   |
| Mac OS X 10.7 | 狮子 Lion         | 2011.6.7   |

苹果为了整合 iphone 和 mac 将 Mac OS X 改为名 OS X，猫科动物也快用完了，10.8 以后就改用地名了。。。

| 系统       | 代号               | 时间      |
| ---------- | ------------------ | --------- |
| OS X 10.8  | 山狮 Mountain Lion | 2012.2.16 |
| OS X 10.9  | 巨浪 Mavericks     | 2013.6.10 |
| OS X 10.10 | 优胜美地 Yosemite  | 2014.6.3  |
| OS X 10.11 | 酋长岩 El Capitan  | 2015      |

看起来整合 iphone 和 mac 的计划失败了，苹果将 mac 的系统改名为 macOS

| 系统        | 代号                       | 时间       |
| ----------- | -------------------------- | ---------- |
| macOS 10.12 | 内华达山脉 Sierra          | 2016.6.14  |
| macOS 10.13 | 内华达高脊山脉 High Sierra | 2017.6.5   |
| macOS 10.14 | 莫哈维沙漠 Mojave          | 2018.9.24  |
| macOS 10.15 | 圣卡塔利娜岛 Catalina      | 2019.10.7  |
| macOS 11.x  | 大瑟尔 Big Sur             | 2020.11.12 |
| macOS 12.x  | 蒙特利湾 Monterey          | 2021.7.1   |
| macOS 13.x  | 范朵拉 Ventura             | 2022.6.6   |

## Mac 基础

初次接触 mac 会很不习惯，开始菜单呢？桌面上怎么没有软件？怎么安装软件？别慌，试着忘掉 windows 中的概念，先来了解下 mac 中的功能

### Dock

Dock 是码头的意思，Dock 位于屏幕的底部，打开的 app 会在上面显示，类似 windows 底部的任务栏，可以把常用 app 设置为在 Dock 中常驻，这样非常方便

### Launchpad

windows 中会在桌面上放置软件的快捷方式，非常方便，mac 类似的功能就是 Launchpad，打开 Launchpad 会看到所有的安装的软件，顶部的搜索框可以用来搜索 app，非常方便

### Spotlight

Spotlight 是聚光灯的意思，可以快速找到电脑上的软件和文件，这是一个神器，大概相当于 windows 上的开始菜单搜索和文件全局搜索，通过 command+空格键打开，如果记得 app 的名字，通过这个打开 app 会比 Launchpad 快很多，Spotlight 开可以用来搜索文件，只要记得文件名字就行

除了上面提到的功能，还有很多功能，比如快速计算，换算单位。。。

### Finder

mac 下没有 windows 下的文件管理器，类似的功能是 Finder，但是功能比 windows 弱很多，Finder 的本意是访问并达到，而不是文件管理

打开 Finder，哎呦我去 C 盘，D 盘，E 盘哪去了？嗯 mac 下就一个磁盘，那以前 D 盘放软件，E 盘放学习资料，F 盘放娱乐资料的习惯怎么破？你可以通过目录来解决，系统默认帮你建好了一些目录，比如：

- 图片
- 文稿
- 下载
- 。。。

那重装系统是安装到 C 盘，不会覆盖其他盘文件怎么破？这个我还没研究明白 o(╯□╰)o 据说 mac 不用重装系统。。。

Finder 中选中文件回车是修改文件名，如果想预览文件，可以按空格键，如果想打开文件可以 command+o，这点和 windows 很不一样

Finder 默认的设置非常难用，需要进行一些自定义设置才能好用点，如下：

- 新标签页打开文件，默认是新窗口
- 左侧显示内容太少，根本不够用
- 搜索时搜索当前目录，默认是全局搜索
- 显示状态栏，显示路径栏，显示预览，默认全都不显示

### 多桌面

mac 下的桌面存在感很弱，我基本用不到，除了设置好看的壁纸之外，o(╯□╰)o

但多桌面是一个非常好用的功能，windows10 也有，简单来说就是多个工作空间互不影响，我设置了两个桌面，一个工作，一个生活，这样工作和生活就能不互相干扰了

### Mission Control

一般切换程序是使用 command+tab，但如果一个程序双开的话，command+tab 就不灵了，还有些弹出窗口一不小心就不见了怎么破？Mission Control 可以让你找到所有的界面，只要四指向上滑动就可以了，就是这么简单

### 软件界面

mac 中的软件关闭按钮在左边，不在右边。。。三个按钮分别是关闭，最小化和最大化，不过一般没什么用，关闭的快捷键是 command+w，最小化的快捷键是 command+h，双击三个按钮旁边的位置可以让软件自适应大小

mac 中的软件菜单栏也是分离的，这个比较个性。。。

### 退出程序

mac 中左上角的关闭（command+w），其实并没有退出程序，感觉和最小化差不多，mac 中退出程序有两种方式：

- Dock 中在软件上右键退出
- command+q

有时候程序可能卡死，需要强制退出，强制退出也有两种方法：

- 按住 option 键，Dock 中在软件上右键强制退出
- command+option+esc，然后弹出的界面中退出，类似 windows 的任务管理器

## 软件系统

Mac 下的软件都安装在了 Applications 目录下，很多 xxx.app 结尾的就是一个一个软件，直接点击就可以打开，但其实这些都不是一个文件，而是一个文件夹，右键-> 显示包含内容，就能看到里面的内容，里面包括软件资源和可执行文件，xxx.app 可以理解为软件的安装目录

下面来说说安装软件，安装软件可以通过 AppStore 来进行安装，但有时候很多软件里面都没有，需要自己下载软件来安装，下载的时候可能下载到.app、.dmg、.pkg 结尾，下面介绍下区别

.app 的直接打开就行，首次打开会提示你拷贝到 Applications 目录去，就是这么简单

dmg 是苹果的压缩镜像文件（类似 Windows 下的 iso ），Mac 应用软件通用的打包格式，里面一般包含 `应用程序.app` 的图标和一个应用程序文件夹（`/Applications`）快捷方式，直接将 `应用程序.app` 拖曳至应用程序文件夹即可完成安装，相当于绿色软件，卸载就是直接删除就行

pkg 相当于 win 下面的大型安装包，pkg 安装一般要求 sudo 授权，会对系统进行修改，卸载的话会麻烦一点

## 命令行

命令行才是程序员的最爱，mac 下的命令行几乎和 linux 一样好用，比 windows 好用太多，下面介绍一些命令行的知识

### 配置文件

如果想设置环境变量，修改 PATH，自定义别名都涉及到对 shell 进行配置，网上搜的话还是比较混乱的，有的说`.bash_profile`，有的说`.bashrc`，怎么我的 mac 没有.bashrc？下面给大家分享下自己的认识

需要注意我说的都是`~`目录下的配置文件，不涉及`/etc/`下的配置文件

`.bash_profile`是为 bash 的配置文件，由于历史原因 shell 是有很多分支的，比如 bshell，kshell，zshell，通过下面的命令可以查看系统支持的全部 shell

```bash
$ cat /etc/shells
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

如果当前使用 bash，mac 中每次打开命令终端，或者新开 tab 页都会加载`.bash_profile`文件，mac 下没有`.bashrc`文件，可以自己新建一个，但还需要在`.bash_profile`手动加载`.bashrc`

```bash
$ vi ~/.bash_profile
# 环境变量
# PATH设置

# 如果当前是bash，则手动加载.bashrc
if [ -f ~/.bashrc ] && [ $SHELL = '/bin/bash' ]; then
   source ~/.bashrc
fi
```

一般在`.bash_profile`中设置 path，环境变量等；在`.bashrc`中设置 bash 自己私有的东西，比如 bash 下的别名

```bash
$ vi ~/.bashrc
# bash shell私有设置
alias ll=ls -l
```

一句话总结，`.bash_profile`中的内容会和其他 shell 共享，`.bashrc`中的内容仅仅 bash 会加载

### 添加 PATH

程序员经常和环境变量打交道，下面来介绍下 mac 下如何设置环境变量，总的来说有两种方法

下载了一个可执行程序，想放到环境变量的最简单方法就是通过软链接连接到`/usr/local/bin`目录下，这里需要注意的就是必须要写绝对路径，不然可能出错

```bash
$ ln -s /Users/yan/adb /usr/local/bin
```

如果想把一个目录加到 PATH，上面的方法就行不通了，但是可以再`~/.bash_profile`修改 path，下面把 platform-tools 添加到 PATH 中

```bash
$ vi ~/.bash_profile
# 环境变量
# PATH设置
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### zsh

有人说 zsh 是终极 shell，确实 z 是最后一个字母了 o(╯□╰)o，zsh 配置很复杂，搞不好好不如不用，不过这么复杂事情已经有人给搞好了，[Oh My ZSH](http://ohmyz.sh/)让 zsh 可以开箱即用，下面赶紧来使用 zsh 吧

mac 下自带 zsh，仅需一个命令就可以切换到 zsh 了

```Bash
$ chsh -s /bin/zsh
```

下面还得安装 oh my zsh，安装 oh my zsh 需要先安装 git，好在 mac 自带了 git，oh my zsh 官网有安装的命令，就一行

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

zsh 的配置文件位于`~/.zshrc`，zsh 不会加载`.bash_profile`，这可麻烦了，之前设置的环境变量怎么办？简单只需要在`.zshrc`中手动加载`.bash_profile`就行了

```bash
$ vi ~/.zshrc
# 加载 .bash_profile
source ~/.bash_profile
```

oh my zsh 进行了很多配置，让 zsh 比 bash 好用很多，比如大量 alias 的设置，完整的别名列表见[这里](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet)

```
.. # 等同于 cd ..
... # 等同于 cd ../..
~ # 等同于 cd ~
```

oh my zsh 有很多功能，比如换肤，这里就不折腾了，你要是喜欢就自己折腾吧

我安装了如下几个插件

```Bash
$ vi ~/.zshrc
plugins=(git sublime code z zsh-autosuggestions zsh-syntax-highlighting)
```

- git 插件可以让你的命令行显示出来分支名，工作区状态，非常好用；
- sublime 插件会添加一个全局的`st`命令，通过这个命令可以通过命令行用 sublime 打开任何文件
- vscode 的插件，同 sublime 插件的作用
- z 提供类似 jump 的功能，可以进入过得目录，快速跳转
- zsh-syntax-highlighting 是一个非常有用的命令，可以提示输入的命令是否正确
- zsh-autosuggestions 会根据你的历史记录，提供自动提示功能，非常好用

### 安装命令

下面来介绍下 mac 如何安装第三方命令，在开始介绍之前，先介绍一点基本知识，mac 中程序一般位于三个目录：

- /bin 系统程序存放处
- /usr/bin mac 自动第三方程序存放处，如 git python ruby
- /usr/local/bin 用户安装第三方程序存放处

其中覆盖优先级是`/usr/local/bin ` > `/usr/bin` > `/bin`，优先级其实是由 PATH 中的设置决定的，上面的顺序是系统默认的设置

mac 下安装命令最简单的方式就是手动下载安装，比如手动下载 git 的安装包，但缺点很多，就不介绍了

mac 下有两个安装命令的工具一个是[MacPorts](http://www.macports.org/)，另一个是[Homebrew](http://brew.sh/)，下面主要介绍下 Homebrew

Homebrew（简称 brew）是 Mac 不可或缺的软件管理工具，让 Mac 拥有类似 apt-get 的功能，用以简化软件的安装、升级和卸载过程

brew 会下载源代码，然后执行 `./configure` && `make install` ，将软件安装到单独的目录（`/usr/local/Cellar`）下，然后软链（symlink）到 `/usr/local/bin` 目录下，同时会自动检测下载相关依赖库，并自动配置好各种环境变量，这简直不能太好用了^\_^

brew 的安装也非常简单，去官网拷贝安装代码即可，其中 ruby 和 curl 都是 mac 的自带程序

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装好后就可以通过 brew 来安装程序了

```bash
$ brew install wget # 安装wget
$ brew install git # 安装git
$ brew install node # 安装node
```

brew 比较常用的命令如下：

```
brew install xxx # 安装
brew uninstall xxx # 卸载
brew upgrade xxx # 升级程序
brew list # 写出本地安装程序
brew search xxx # 查询可以用程序
brew info xxx # 查看制定程序的信息
```

可以通过 brew 安装系统已经存在的程序，比如 git，python 等，brew 安装的程序会覆盖系统安装的程序，但由于安装目录不同，仍可通过绝对路径访问系统自带程序

```bash
$ git # brew安装git
$ /usr/bin/git # 系统自带git
$ /usr/local/bin/git # brew安装git
```

### 安装 python

系统自带的 python 是 2.7.10，但没有自带 pip，python 从 2.7.13 开始自带 pip，由于要用 pip 所以我想在安装一个 python，就可以通过 brew 安装

搜索 python，看到有两个

```bash
$ brew search python
python python3 ...
```

我想安装 python2，应该是第一个，下面通过 info 看下具体信息，会出现很多信息，关注版本就好了

```bash
$ brew info python
python: stable 2.7.14 (bottled), HEAD
...
```

下面安装 python

```bash
$ brew install python
...
```

brew 会告诉你安装到了哪里，修改了 PATH，怎么调用 pip，可以发现现在 python 已经指向新安装的 python 了，但，需要通过 pip2 来使用 pip 功能

```bash
$ python --version
Python 2.7.13

$ pip
zsh: command not found: pip

$ pip2 --version
pip 9.0.1 from /usr/local/lib/python2.7/site-packages (python 2.7)
```

除了通过升级 python 的方式安装 pip，也可以单独安装 pip

首先需要手动下载 pip 安装文件，下载 get-pip.py(https://bootstrap.pypa.io/get-pip.py)

然后运行下面的命令即可

```bash
$ python get-pip.py
```

安装好 pip 以后，就可以通过 pip 来进行自身的升级

```bash
$ pip install --upgrade pip
```

### 安装 ruby

mac 自带的 ruby 是 2.3，我的博客需要用到 jekyll，jekyll 已经不支持 2.3 了，需要安装更高版本的 ruby，可以通过 brew 直接安装一个，但 ruby 有自己的多版本管理工具[RVM](https://rvm.io/)，RVM 是一个命令行工具，可以提供一个便捷的多版本 Ruby 环境的管理和切换

rvm 的官网有安装程序的命令

```bash
$ \curl -sSL https://get.rvm.io | bash -s stable
```

下面来安装指定版本的 ruby

```bash
$ rvm list known # 列出ruby所有版本
[ruby-]2.4[.1]
...

$ rvm install 2.4.1 # 安装指定版本

$ ruby -version
ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-darwin16]
```

rvm 安装的 ruby 位于`~yan/.rvm/rubies`目录下，不会和系统的 ruby 冲突，系统自带 ruby 位于`/usr/bin/ruby`

如果很长时间安装不上，可能是 rvm 的下载源不稳定，可以尝试切换为[淘宝的源](https://cache.ruby-china.org/)

```bash
$ echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
```

rvm 常用命令如下：

```bash
$ rvm list # 列出本地版本
$ rvm use 2.4.1 # 如果本地安装了多个版本，可切换到指定版本
$ rvm remove 2.4.1 # 卸载指定版本
```

rvm 还有很多其他的功能，不过我就用到这么多，自己摸索吧

## 常用软件

下面整理下自己常用的软件

- draw.io 跨平台的 viso，主要用来画一些流程图，线框图，结构图
- OmniGraffle 画各种图，基本用不到
- OmniPlan 画甘特图，项目管理神器
- typora 所见即所得的 md 工具，一用就会爱上
- cheatsheet 一键查看当前工具的快捷键神器，再也不怕忘记快捷键了
- Charles mac 下的 fiddler，用来抓取 http 请求
- Foxit Reader 一款 pdf 阅读器，跨平台，免费的
- iZip Unarchiver 用来在 mac 下接呀 rar 压缩包
- LICEcap 用来录制屏幕 gif 图
- Read CHM 用来阅读 chm 文件
- SwitchHosts! 用来管理 host
- VirtualBox 虚拟机软件，跨平台，用来安装 windows 和 linux
- AppCleaner 查看软件的文件路径，还能清理软件，适合有洁癖的人使用
- Dr. Cleaner mac 清理工具，不怎么用得到
- Beyond Compare 跨平台的文件比较工具
- CatchMouse 如果你有三个显示器的，在不同显示器之间快速切换鼠标的工具
- 百度 PPT 遥控器 通过手机代替遥控笔，适合会议室没有遥控笔的情况
- RescueTime 事件追踪软件，只顾过数据都会上报，不适合公司电脑使用
- AnyDesk 一个小而美的远程控制软件，跨平台

## 总结

最后推荐大家阅读池建强老师的《[MacTalk·人生元编程](https://amazon.cn/gp/product/B00ID5UV30/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=yanhaijing-23&creative=3200&linkCode=as2&creativeASIN=B00ID5UV30&linkId=2058fdf9c81d13e245a8e85ab48b022c)》，书中介绍了很多 mac 知识和 mac 技巧，并且包含了很多受益匪浅的人生哲理，非常值得阅读
