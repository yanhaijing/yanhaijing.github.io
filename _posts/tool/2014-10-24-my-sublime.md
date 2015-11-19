---
layout: post
title: 我的 Sublime Text 2 笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [sublime, tool]
description: 作为aptana死忠粉的我，最近由于工作需要最近开始使用sublime，初次使用，就被其秒开的启动速度，简洁的界面设计，无干扰的信息提示所这幅。
---
{% include JB/setup %}

作为aptana死忠粉的我，最近由于工作需要最近开始使用sublime，初次使用，就被其秒开的启动速度，简洁的界面设计，无干扰的信息提示所这幅。

俗话说，工欲善其事必先利其器，作为码农，在开始编码之前，必须要对自己的工具熟悉，才能事半功倍，所以开始了一番折腾，下面记录下一些笔记。

## 初始化
安装完编辑器后就可以使用了，但我一般会进行一些配置，希望你也按照自己的喜欢进行配置。

下面的配置都是打开Preferences->Setting-Default，在那里面有很多默认配置选项，我们可以在这里改变默认值。

修改显示字体大小，我一般习惯使用14号字

    "font_size": 14, // 默认10

保存文件时自动在末尾添加空行（我们的项目有这样的要求）

    "ensure_newline_at_eof_on_save": true, // 默认是false

默认使用Unix换行符，如果大家使用统一的换行符，会让事情变得简单

    "default_line_ending": "unix", // 默认是system

使用空格填充tab键，没有好坏之分，统一就好

    "translate_tabs_to_spaces": true,// 默认是false

上面的配置项，如果你是一个完美主义者，可以在用户配置文件中配置，不修改默认配置文件。

##快捷键

作为码农，很多时间都是在敲键盘的，所以快捷键是非常重要的，sublime的快捷键非常非常多，很难都记住，按照80/20原则，只有20%是常用的，下面是我常用的快捷键：

<table class="table">
<thead>
<tr><th>快捷键</th><th>功能</th></tr>
</thead>
<tbody>
<tr><td>ctrl+shift+p</td><td>打开命令面板</td></tr>
<tr><td>ctrl + p</td><td>搜索项目中的文件</td></tr>
<tr><td>ctrl+r</td><td>前往Method</td></tr>
<tr><td>ctrl+g</td><td>跳转到第几行</td></tr>
<tr><td>ctrl+k, ctrl+b</td><td>切换侧边栏显示状态</td></tr>
<tr><td>ctrl+shift+[backspace|del]</td><td>左侧|右侧全部删除</td></tr>
<tr><td>ctrl+y</td><td>重做或重复</td></tr>
<tr><td>shift+方向键</td><td>移动并选择</td></tr>
<tr><td>ctrl+[|]</td><td>缩进|取消缩紧</td></tr>
<tr><td>ctrl+shift+[|]</td><td>折叠|展开(代码)</td></tr>
<tr><td>ctrl+l</td><td>选择行，重复可依次增加选择下一行</td></tr>
<tr><td>ctrl+m</td><td>跳转到对应括号</td></tr>
<tr><td>ctrl+shift+m</td><td>选中括号间的内容</td></tr>
<tr><td>alt+.</td><td>close tag</td></tr>
<tr><td>ctrl+/</td><td>当前行注释状态切换</td></tr>
<tr><td>ctrl+h</td><td>替换</td></tr>
<tr><td>ctrl+[shift]+f</td><td>[全局]查找</td></tr>
<tr><td>ctrl+tab, alt+num, ctrl+pageup</td><td>切换tab面板</td></tr>
<tr><td>ctrl+shift+y</td><td>将光标处的表达式计算，对于数学不好的很有用</td></tr>
<tr><td>ctrl+shift+v|ctrl+v</td><td>粘贴并缩紧|粘贴</td></tr>
<tr><td>ctrl+d</td><td>选择一个选中项的下一个匹配项</td></tr>
<tr><td>alt+f3</td><td>选择文件中的所有匹配项项</td></tr>
<tr><td>ctrl+shift+’</td><td>选择所有选中项的标签</td></tr>
<tr><td>ctrl+shift+a</td><td>选择当前选中项的父容器，可连续使用</td></tr>
<tr><td>ctrl+shift+[↑↓]</td><td>上移或下移行</td></tr>
<tr><td>ctrl+shift+d</td><td>复制行或选中项</td></tr>
<tr><td>alt+shift+w</td><td>用标签包裹行或选中项</td></tr>
<tr><td>ctrl+[↑↓]|alt+[↑↓]|alt+shift+[↑↓]</td><td>加1|加10|加0.1</td></tr>
<tr><td>ctrl+shift+;</td><td>移除未闭合的容器元素</td></tr>
<tr><td>ctrl+j</td><td>合并选中的行（多行边一行）</td></tr>
<tr><td>ctrl+kk</td><td>从光标处删除至行尾</td></tr>
<tr><td>ctrl+shift+k</td><td>删除整行</td></tr>
</tbody>
</table>

##插件
sublime的功能已经很满足大部分需求了，但还是有个别差异化的需求，无法满足，这时候sublime的插件派上用场，先来晒下我的插件。

![]({{BLOG_IMG}}141.png)

### Package Control
由于sublime 2本身不带插件，所以要先安装插件管理器（[Package Control](https://sublime.wbond.net/)），可以通过在线和离线安装。

#### 在线安装
首先打开控制台，点击sublime的菜单栏 view->show console(或者使用快捷键 ctrl+`)。

现在打开了控制台， 这个控制台有上下两栏， 上面一栏会实时显示sublime执行了什么插件，输出执行结果， 如果你安装的某个插件不能正常运行，应该先在这里看看有没有报错。下面栏是一个输入框，可以运行python代码。

![]({{BLOG_IMG}}142.png)

我们输入下面的代码点击回车运行， 就能安装好package control了。

    import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')

运行结束以后，记得重启编辑器，就能在Preferences中看到 Package Control了。

![]({{BLOG_IMG}}143.bmp)

#### 离线安装
如果在线安装失败，你可以试试离线安装，前提是需要一个[Package Control的安装包](http://sublime.wbond.net/Package%20Control.sublime-package)，将该安装包替换到Sublime Text2的相关路径下即可，这里有两个路径，经验证放置到其中任意一处均可。

- 路径一：打开Sublime Text 2，点击PreFerences --> Browse Packages，进入一个文件夹后返回该文件夹的上一级“Sublime Text2”，找到一个“Installed Packages”文件夹（如果没有该文件夹则创建个新的），将下载好的Package Control的安装包放到“Installed Packages”文件夹下即可。
- 路径二：Sublime Text 2 的安装路径，“Sublime Text 2\Pristine Packages\”文件夹下。

其中路径一是官方推荐的防止路径，详细信息，请看[这里](https://sublime.wbond.net/installation#Simple)。

安装完成后，按住 ctrl+shift+p。此时会输出一个输入框，即可安装，删除，更新插件了。

### Vintage
如果你习惯使用vim，那么可以安装这个插件，这个插件可以让sublime像vim一样。

### [Smarty](https://packagecontrol.io/packages/Smarty)
提供smarty语法的支持。Smarty插件默认的分隔符是`{}`，如果你使用的分隔符不同可以更改插件目录的Smarty.tmPreferences文件，找到其中的SMARTY_LDELIM和SMARTY_RDELIM，修改为你的分隔符即可。

- [github](https://github.com/amitsnyderman/sublime-smarty)

### Liquid
提供Liquid语法支持，如果你也写博客的话不妨试试。

### CSS3_Syntax
对css语法高亮的支持，view-syntax-css3选中css3就能使用css3高亮了。必须每条属性都加上分号，并且属性必须小写，不然不会高亮，有点鸡肋啊。

### Autoprefixer
可以给css自动加前缀功能

### [LESS](https://github.com/danro/LESS-sublime)

这是一个非常棒的插件，可以让sublime支持less的语法高亮和语法提示，对于搞less的同学灰常重要，不过多解释。

### SASS
提供sass语法高亮支持。

### JavaScriptNext - ES6 Syntax
提供ES6的语法支持。

### jQuery
支持jquery的只能语法提示，很赞。

### Emmet
Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度。

- [这里是一篇演示文章](http://www.iteye.com/news/27580)
- [Emmet官网](http://docs.emmet.io/)

### SublimeLinter
可以验证各种语法错误，不多解释。

### DocBlockr
DocBlockr 可以使你很方便地对代码建立文档。它会解析函数，变量，和参数，根据它们自动生成文档范式，你的工作就是去填充对应的说明。

![]({{BLOG_IMG}}144.gif)

### HTML/CSS/JS Prettify
能够格式化css html 和js。

**注意：**格式化的文件路径中不能有中文，不然会报找不到node的错误（windows下）。

![]({{BLOG_IMG}}168.png)

### BracketHighlighter
像这些符号是成对的：花括号{}， 中括号[],括号：() ，引号“” 等。 这些符号当我们鼠标放在开始符号的位置的时候， 希望能明显看到结尾符号在哪儿sublime默认是下划线，很不明显， 想要明显一点，可以安装插件  BracketHighlighter。

### GBK Encoding Support
这个插件还是非常有用的，因为sublime 本身 不支持gbk编码，在utf8如此流行的今天，我们整站还是gbk编码，o(︶︿︶)o 唉，所以全靠这个插件了。

### Terminal
可以sublime中，打开命令行，非常方便哦。还可在自定义打开的命令行，比如我就把默认命令行改为了git-bash。只需在设置中进行如下配置即可（注意路径）。

	"terminal": "D:\\Program Files\\Git\\git-bash.exe"

### SyncedSideBar
支持当前文件在左侧面板中定位，不错。

### Clipboard History
可以保存粘贴的历史，很赞的功能，再也不用担心历史丢失了。ctrl+alt+v可打开历史面板，上下选择即可，安装后会和默认的ctrl+shift+v（粘贴缩进）冲突，干掉这个快捷键。

### AllAutocomplete
自动完成插件，可在全部打开的文件中，自动完成。

### HexViewer
提供十六进制文件查看功能。

### MultiEditUtils
扩展多行编辑的功能。

### Package Syncing
最后推荐一个同步插件，这个插件可以在不同的机器同步配置信息和插件，非常方便，但鉴于国内的墙太高，我都是直接把插件给手动备份了，然后直接拖进去，或者直接去github上下载对应的包。

[这里](https://github.com/yanhaijing/mysublime)是我的Package Syncing 导出来的文件。

##总结
sublime非常棒的，正是我喜欢的风格。

##参考资料
- [Gif多图：我常用的 16 个 Sublime Text 快捷键](http://blog.jobbole.com/82527/)
- [12个不可不知的Sublime Text应用技巧和诀窍](http://segmentfault.com/a/1190000000505218)
