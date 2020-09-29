---
layout: post
title: 一个Mac小白的自我修养
category : mac
tagline: "原创"
tags : [mac]
keywords: [mac, note]
description: 一个前端的mac笔记
--- 
{% include JB/setup %}

作为一个前端，坚守了9年的windows平台，也是惭愧，但主要还是因为穷，最近终于换上了mac，但却是各种不习惯，各种折腾，本文记录下自己遇到的问题和解决办法，希望能够帮助mac新同学们

## Mac编年史
一直理不清mac的历史，下面简单总结下，最开始的苹果电脑叫做Apple，比如Apple I，Apple II，其操作系统叫做System，大概从1984-1997

- System1.0 - 5.0
- System6.0 彩色
- System7.0
- System7.5
- System7.6

后来苹果推出新的Mac电脑，Mac OS系统诞生了
- Mac OS 8
- Mac OS 8.5
- Mac OS 9

苹果将Mac OS10改名为OS X，并给每个版本命名一个大型猫科动物

| 系统            | 代号              | 时间         |
| ------------- | --------------- | ---------- |
| Mac OS X 10.0 | 猎豹 Cheetah      | 2001.3.24  |
| Mac OS X 10.1 | 美洲狮 Puma        | 2001.9.25  |
| Mac OS X 10.2 | 美洲虎 Jaguar      | 2002.8.24  |
| Mac OS X 10.3 | 黑豹 Panther      | 2003.10.24 |
| Mac OS X 10.4 | 虎 Tiger         | 2005.4.29  |
| Mac OS X 10.5 | 花豹 Leopard      | 2007.10.26 |
| Mac OS X 10.6 | 雪豹 Snow Leopard | 2008.6.9   |
| Mac OS X 10.7 | 狮子 Lion         | 2011.6.7   |

苹果为了整合iphone和mac将Mac OS X改为名OS X，猫科动物也快用完了，10.8以后就改用地名了。。。

| 系统         | 代号               | 时间        |
| ---------- | ---------------- | --------- |
| OS X 10.8  | 山狮 Mountain Lion | 2012.2.16 |
| OS X 10.9  | 巨浪 Mavericks     | 2013.6.10 |
| OS X 10.10 | 优胜美地 Yosemite    | 2014.6.3  |
| OS X 10.11 | El Capitan       | 2015      |

看起来整合iphone和mac的计划失败了，苹果将mac的系统改名为macOS

| 系统          | 代号          | 时间        |
| ----------- | ----------- | --------- |
| macOS 10.12 | Sierra      | 2016.6.14 |
| macOS 10.13 | High Sierra | 2017.6.5  |

## Mac基础

初次接触mac会很不习惯，开始菜单呢？桌面上怎么没有软件？怎么安装软件？别慌，试着忘掉windows中的概念，先来了解下mac中的功能

### Dock

Dock是码头的意思，Dock位于屏幕的底部，打开的app会在上面显示，类似windows底部的任务栏，可以把常用app设置为在Dock中常驻，这样非常方便

### Launchpad

windows中会在桌面上放置软件的快捷方式，非常方便，mac类似的功能就是Launchpad，打开Launchpad会看到所有的安装的软件，顶部的搜索框可以用来搜索app，非常方便

### Spotlight

Spotlight是聚光灯的意思，可以快速找到电脑上的软件和文件，这是一个神器，大概相当于windows上的开始菜单搜索和文件全局搜索，通过command+空格键打开，如果记得app的名字，通过这个打开app会比Launchpad快很多，Spotlight开可以用来搜索文件，只要记得文件名字就行

除了上面提到的功能，还有很多功能，比如快速计算，换算单位。。。

### Finder

mac下没有windows下的文件管理器，类似的功能是Finder，但是功能比windows弱很多，Finder的本意是访问并达到，而不是文件管理

打开Finder，哎呦我去C盘，D盘，E盘哪去了？嗯mac下就一个磁盘，那以前D盘放软件，E盘放学习资料，F盘放娱乐资料的习惯怎么破？你可以通过目录来解决，系统默认帮你建好了一些目录，比如：

- 图片
- 文稿
- 下载
- 。。。

那重装系统是安装到C盘，不会覆盖其他盘文件怎么破？这个我还没研究明白o(╯□╰)o据说mac不用重装系统。。。

Finder中选中文件回车是修改文件名，如果想预览文件，可以按空格键，如果想打开文件可以command+o，这点和windows很不一样

Finder默认的设置非常难用，需要进行一些自定义设置才能好用点，如下：

- 新标签页打开文件，默认是新窗口
- 左侧显示内容太少，根本不够用
- 搜索时搜索当前目录，默认是全局搜索
- 显示状态栏，显示路径栏，显示预览，默认全都不显示

### 多桌面

mac下的桌面存在感很弱，我基本用不到，除了设置好看的壁纸之外，o(╯□╰)o

但多桌面是一个非常好用的功能，windows10也有，简单来说就是多个工作空间互不影响，我设置了两个桌面，一个工作，一个生活，这样工作和生活就能不互相干扰了

### Mission Control

一般切换程序是使用command+tab，但如果一个程序双开的话，command+tab就不灵了，还有些弹出窗口一不小心就不见了怎么破？Mission Control可以让你找到所有的界面，只要四指向上滑动就可以了，就是这么简单

### 软件界面

mac中的软件关闭按钮在左边，不在右边。。。三个按钮分别是关闭，最小化和最大化，不过一般没什么用，关闭的快捷键是command+w，最小化的快捷键是command+h，双击三个按钮旁边的位置可以让软件自适应大小

mac中的软件菜单栏也是分离的，这个比较个性。。。

### 退出程序

mac中左上角的关闭（command+w），其实并没有退出程序，感觉和最小化差不多，mac中退出程序有两种方式：

- Dock中在软件上右键退出
- command+q

有时候程序可能卡死，需要强制退出，强制退出也有两种方法：

- 按住option键，Dock中在软件上右键强制退出
- command+option+esc，然后弹出的界面中退出，类似windows的任务管理器

## 软件系统

Mac下的软件都安装在了Applications目录下，很多xxx.app结尾的就是一个一个软件，直接点击就可以打开，但其实这些都不是一个文件，而是一个文件夹，右键-> 显示包含内容，就能看到里面的内容，里面包括软件资源和可执行文件，xxx.app可以理解为软件的安装目录

下面来说说安装软件，安装软件可以通过AppStore来进行安装，但有时候很多软件里面都没有，需要自己下载软件来安装，下载的时候可能下载到.app、.dmg、.pkg结尾，下面介绍下区别

.app的直接打开就行，首次打开会提示你拷贝到Applications目录去，就是这么简单

dmg是苹果的压缩镜像文件（类似 Windows 下的 iso ），Mac 应用软件通用的打包格式，里面一般包含 `应用程序.app` 的图标和一个应用程序文件夹（`/Applications`）快捷方式，直接将 `应用程序.app` 拖曳至应用程序文件夹即可完成安装，相当于绿色软件，卸载就是直接删除就行

pkg相当于win下面的大型安装包，pkg 安装一般要求 sudo 授权，会对系统进行修改，卸载的话会麻烦一点

## 命令行

命令行才是程序员的最爱，mac下的命令行几乎和linux一样好用，比windows好用太多，下面介绍一些命令行的知识

### 配置文件

如果想设置环境变量，修改PATH，自定义别名都涉及到对shell进行配置，网上搜的话还是比较混乱的，有的说`.bash_profile`，有的说`.bashrc`，怎么我的mac没有.bashrc？下面给大家分享下自己的认识

需要注意我说的都是`~`目录下的配置文件，不涉及`/etc/`下的配置文件

`.bash_profile`是为bash的配置文件，由于历史原因shell是有很多分支的，比如bshell，kshell，zshell，通过下面的命令可以查看系统支持的全部shell

```bash
$ cat /etc/shells
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

如果当前使用bash，mac中每次打开命令终端，或者新开tab页都会加载`.bash_profile`文件，mac下没有`.bashrc`文件，可以自己新建一个，但还需要在`.bash_profile`手动加载`.bashrc`

```bash
$ vi ~/.bash_profile
# 环境变量
# PATH设置

# 如果当前是bash，则手动加载.bashrc
if [ -f ~/.bashrc ] && [ $SHELL = '/bin/bash' ]; then
   source ~/.bashrc
fi
```

一般在`.bash_profile`中设置path，环境变量等；在`.bashrc`中设置bash自己私有的东西，比如bash下的别名

```bash
$ vi ~/.bashrc
# bash shell私有设置
alias ll=ls -l
```

一句话总结，`.bash_profile`中的内容会和其他shell共享，`.bashrc`中的内容仅仅bash会加载

### 添加PATH

程序员经常和环境变量打交道，下面来介绍下mac下如何设置环境变量，总的来说有两种方法

下载了一个可执行程序，想放到环境变量的最简单方法就是通过软链接连接到`/usr/local/bin`目录下，这里需要注意的就是必须要写绝对路径，不然可能出错

```bash
$ ln -s /Users/yan/adb /usr/local/bin
```

如果想把一个目录加到PATH，上面的方法就行不通了，但是可以再`~/.bash_profile`修改path，下面把platform-tools添加到PATH中

```bash
$ vi ~/.bash_profile
# 环境变量
# PATH设置
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### zsh

有人说zsh是终极shell，确实z是最后一个字母了o(╯□╰)o，zsh配置很复杂，搞不好好不如不用，不过这么复杂事情已经有人给搞好了，[Oh My ZSH](http://ohmyz.sh/)让zsh可以开箱即用，下面赶紧来使用zsh吧

mac下自带zsh，仅需一个命令就可以切换到zsh了

```Bash
$ chsh -s /bin/zsh
```

下面还得安装oh my zsh，安装oh my zsh需要先安装git，好在mac自带了git，oh my zsh官网有安装的命令，就一行

```bash
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

zsh的配置文件位于`~/.zshrc`，zsh不会加载`.bash_profile`，这可麻烦了，之前设置的环境变量怎么办？简单只需要在`.zshrc`中手动加载`.bash_profile`就行了

```bash
$ vi ~/.zshrc
# 加载 .bash_profile
source ~/.bash_profile
```

oh my zsh进行了很多配置，让zsh比bash好用很多，比如大量alias的设置，完整的别名列表见[这里](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet)

```
.. # 等同于 cd ..
... # 等同于 cd ../..
~ # 等同于 cd ~
```

oh my zsh有很多功能，比如换肤，这里就不折腾了，你要是喜欢就自己折腾吧

我安装了如下几个插件

```Bash
$ vi ~/.zshrc
plugins=(git sublime code z zsh-autosuggestions zsh-syntax-highlighting)
```

- git插件可以让你的命令行显示出来分支名，工作区状态，非常好用；
- sublime插件会添加一个全局的`st`命令，通过这个命令可以通过命令行用sublime打开任何文件
- vscode的插件，同sublime插件的作用
- z 提供类似jump的功能，可以进入过得目录，快速跳转
- zsh-syntax-highlighting是一个非常有用的命令，可以提示输入的命令是否正确
- zsh-autosuggestions会根据你的历史记录，提供自动提示功能，非常好用

### 安装命令

下面来介绍下mac如何安装第三方命令，在开始介绍之前，先介绍一点基本知识，mac中程序一般位于三个目录：

- /bin 系统程序存放处
- /usr/bin mac自动第三方程序存放处，如 git python ruby
- /usr/local/bin 用户安装第三方程序存放处

其中覆盖优先级是`/usr/local/bin ` > `/usr/bin` > `/bin`，优先级其实是由PATH中的设置决定的，上面的顺序是系统默认的设置

mac下安装命令最简单的方式就是手动下载安装，比如手动下载git的安装包，但缺点很多，就不介绍了

mac下有两个安装命令的工具一个是[MacPorts](http://www.macports.org/)，另一个是[Homebrew](http://brew.sh/)，下面主要介绍下Homebrew

Homebrew（简称 brew）是Mac不可或缺的软件管理工具，让 Mac 拥有类似 apt-get 的功能，用以简化软件的安装、升级和卸载过程

brew会下载源代码，然后执行 `./configure` && `make install` ，将软件安装到单独的目录（`/usr/local/Cellar`）下，然后软链（symlink）到 `/usr/local/bin` 目录下，同时会自动检测下载相关依赖库，并自动配置好各种环境变量，这简直不能太好用了^_^

brew的安装也非常简单，去官网拷贝安装代码即可，其中ruby和curl都是mac的自带程序

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装好后就可以通过brew来安装程序了

```bash
$ brew install wget # 安装wget
$ brew install git # 安装git
$ brew install node # 安装node
```

brew比较常用的命令如下：

```
brew install xxx # 安装
brew uninstall xxx # 卸载
brew upgrade xxx # 升级程序
brew list # 写出本地安装程序
brew search xxx # 查询可以用程序
brew info xxx # 查看制定程序的信息
```

可以通过brew安装系统已经存在的程序，比如git，python等，brew安装的程序会覆盖系统安装的程序，但由于安装目录不同，仍可通过绝对路径访问系统自带程序

```bash
$ git # brew安装git
$ /usr/bin/git # 系统自带git
$ /usr/local/bin/git # brew安装git
```

### 安装python

系统自带的python是2.7.10，但没有自带pip，python从2.7.13开始自带pip，由于要用pip所以我想在安装一个python，就可以通过brew安装

搜索python，看到有两个

```bash
$ brew search python 
python python3 ...
```

我想安装python2，应该是第一个，下面通过info看下具体信息，会出现很多信息，关注版本就好了

```bash
$ brew info python
python: stable 2.7.14 (bottled), HEAD
...
```

下面安装python

```bash
$ brew install python
...
```

brew会告诉你安装到了哪里，修改了PATH，怎么调用pip，可以发现现在python已经指向新安装的python了，但，需要通过pip2来使用pip功能

```bash
$ python --version
Python 2.7.13

$ pip
zsh: command not found: pip

$ pip2 --version
pip 9.0.1 from /usr/local/lib/python2.7/site-packages (python 2.7)
```

除了通过升级python的方式安装pip，也可以单独安装pip

首先需要手动下载pip安装文件，下载get-pip.py(https://bootstrap.pypa.io/get-pip.py)

然后运行下面的命令即可

```bash
$ python get-pip.py
```

安装好pip以后，就可以通过pip来进行自身的升级

```bash
$ pip install --upgrade pip
```

### 安装ruby

mac自带的ruby是2.3，我的博客需要用到jekyll，jekyll已经不支持2.3了，需要安装更高版本的ruby，可以通过brew直接安装一个，但ruby有自己的多版本管理工具[RVM](https://rvm.io/)，RVM 是一个命令行工具，可以提供一个便捷的多版本 Ruby 环境的管理和切换

rvm的官网有安装程序的命令

```bash
$ \curl -sSL https://get.rvm.io | bash -s stable
```

下面来安装指定版本的ruby

```bash
$ rvm list known # 列出ruby所有版本
[ruby-]2.4[.1]
...

$ rvm install 2.4.1 # 安装指定版本

$ ruby -version
ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-darwin16]
```

rvm安装的ruby位于`~yan/.rvm/rubies`目录下，不会和系统的ruby冲突，系统自带ruby位于`/usr/bin/ruby`

如果很长时间安装不上，可能是rvm的下载源不稳定，可以尝试切换为[淘宝的源](https://cache.ruby-china.org/)

```bash
$ echo "ruby_url=https://cache.ruby-china.org/pub/ruby" > ~/.rvm/user/db
```

rvm常用命令如下：

```bash
$ rvm list # 列出本地版本
$ rvm use 2.4.1 # 如果本地安装了多个版本，可切换到指定版本
$ rvm remove 2.4.1 # 卸载指定版本
```

rvm还有很多其他的功能，不过我就用到这么多，自己摸索吧

## 常用软件

下面整理下自己常用的软件

- draw.io 跨平台的viso，主要用来画一些流程图，线框图，结构图
- OmniGraffle 画各种图，基本用不到
- OmniPlan 画甘特图，项目管理神器
- typora 所见即所得的md工具，一用就会爱上
- cheatsheet 一键查看当前工具的快捷键神器，再也不怕忘记快捷键了
- Charles mac下的fiddler，用来抓取http请求
- Foxit Reader 一款pdf阅读器，跨平台，免费的
- iZip Unarchiver 用来在mac下接呀rar压缩包
- LICEcap 用来录制屏幕gif图
- Read CHM 用来阅读chm文件
- SwitchHosts! 用来管理host
- VirtualBox 虚拟机软件，跨平台，用来安装windows和linux
- AppCleaner 查看软件的文件路径，还能清理软件，适合有洁癖的人使用
- Dr. Cleaner mac清理工具，不怎么用得到
- Beyond Compare 跨平台的文件比较工具
- CatchMouse 如果你有三个显示器的，在不同显示器之间快速切换鼠标的工具
- 百度PPT遥控器 通过手机代替遥控笔，适合会议室没有遥控笔的情况
- RescueTime 事件追踪软件，只顾过数据都会上报，不适合公司电脑使用
- AnyDesk 一个小而美的远程控制软件，跨平台

## 总结

最后推荐大家阅读池建强老师的《[MacTalk·人生元编程](https://amazon.cn/gp/product/B00ID5UV30/ref=as_li_qf_asin_il_tl?ie=UTF8&tag=yanhaijing-23&creative=3200&linkCode=as2&creativeASIN=B00ID5UV30&linkId=2058fdf9c81d13e245a8e85ab48b022c)》，书中介绍了很多mac知识和mac技巧，并且包含了很多受益匪浅的人生哲理，非常值得阅读
