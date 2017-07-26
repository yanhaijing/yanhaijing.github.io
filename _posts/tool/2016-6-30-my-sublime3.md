---
layout: post
title: 我的 Sublime Text 3 笔记
category : tool
tagline: "原创"
tags : [tool]
keywords: [sublime, sublime3, tool]
description: 本文记录我是用sublime 3的笔记，涉及到方方面面，主要是方便自己，也希望能够帮到你。
---
{% include JB/setup %}
今天打开[sublime][1]的官网，发现官网上已经推荐默认推荐大家使用sublime text 3了，作为追赶时代的人，我怎么能够落后呢？我决定开始使用sublime3，同时我也希望你也能够使用。

本文记录我是用sublime 3的笔记，涉及到方方面面，主要是方便自己，也希望能够帮到你。

![]({{BLOG_IMG}}297.png)

**注：**我之前写过一篇[sublime text 2的笔记](http://yanhaijing.com/tool/2014/10/24/my-sublime/)，取走不谢。

## 安装
在[官网][1]下载最新版的安装文件，选择对应的平台，我用的是windows，sublime3和2是能够共存的，我就在自己电脑同时装了3和2，并准备逐步迁移到3上面。

没错本文就是在sublime3 上写的。

## 初始化
sublime3是高度定制化的，安装完成后，我做的第一件事情就是按照自己的习惯定制。

打开Preferences->Setting-Default，在那里面有很多默认配置选项，我们可以在这里改变默认值，但我的建议是在Setting-User里面去进行修改。

修改显示字体大小，我一般习惯使用14号字

    "font_size": 14, // 默认10

保存文件时自动在末尾添加空行（我们的项目有这样的要求）

    "ensure_newline_at_eof_on_save": true, // 默认是false

默认使用Unix换行符，如果大家使用统一的换行符，会让事情变得简单

    "default_line_ending": "unix", // 默认是system

使用空格填充tab键，没有好坏之分，统一就好

    "translate_tabs_to_spaces": true,// 默认是false

我还把-和$两个符号从分隔符中删掉，这样在选择php变量和css选择符的时候就更爽了

    "word_separators": "./\\()\"':,.;<>~!@#%^&*|+=[]{}`~?"

如果你感兴趣也可以修改其他配置选项试试，快去定制属于自己的编辑器吧。

如果你发现你的goto anything非常卡顿，那有可能是安装了巨大的node_modules导致的，你可以修改下面的配置，注意最后三个

        "binary_file_patterns": ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip", "vendor/**", "node_modules/**/node_modules/**", ".certs/**"],

上面我们把node_modules目录下的node_moduels都排除在外，如果你还觉得卡，那就直接把node_moduels也排除在外吧。。。

解决办法，参考[文章](https://blog.michaelchen.io/goto-anything-is-super-slow-in-sublime-text/)

## 快捷键
如果你还不习惯快捷键，那你真的该学习了，我越来越依赖快捷键了。

sublime的快捷键非常非常多，很难都记住，按照80/20原则，只有20%是常用的，下面是我常用的快捷键：

语法说明：

- `ctrl+x` ctrl和x键同时按
- `x & y` x操作后，进行y操作
- `x | y` x操作或y操作
- `(x)` 分组x是一个整体
- `[x]` x是可选操作
- `x, y` x操作, y操作（两个类似操作写到一行）

<table class="table">
<thead>
    <tr><th>Mac 快捷键</th><th>Windows 快捷键</th><th>功能</th></tr>
</thead>
<tbody>
    <tr><td>cmd+shift+p</td><td>ctrl+shift+p</td><td>打开命令面板</td></tr>
    <tr><td>cmd+p</td><td>ctrl+p</td><td>搜索项目中的文件</td></tr>
    <tr><td>cmd+r</td><td>ctrl+r</td><td>前往Method</td></tr>
    <tr><td>ctrl+g</td><td>ctrl+g</td><td>跳转到第几行</td></tr>
    <tr><td>cmd+k & cmd+b</td><td>ctrl+k & ctrl+b</td><td>切换侧边栏显示状态</td></tr>
    <tr><td>cmd+del | ctrl+k</td><td>ctrl+shift+(backspace | del)</td><td>(左侧|右侧)全部删除</td></tr>
    <tr><td>cmd+y</td><td>ctrl+y</td><td>重做或重复</td></tr>
    <tr><td>shift+方向键</td><td>shift+方向键</td><td>移动并选择</td></tr>
    <tr><td>cmd+([ | ])</td><td>ctrl+([ | ])</td><td>缩进|取消缩进</td></tr>
    <tr><td>cmd+opt+([|])</td><td>ctrl+shift+([|])</td><td>(折叠|展开)代码</td></tr>
    <tr><td>cmd+l</td><td>ctrl+l</td><td>选择行，重复可依次增加选择下一行</td></tr>
    <tr><td>ctrl+m</td><td>ctrl+m</td><td>跳转到对应括号</td></tr>
    <tr><td>ctrl+shift+m</td><td>ctrl+shift+m</td><td>选中括号间的内容</td></tr>
    <tr><td>cmd+opt+.</td><td>alt+.</td><td>close tag</td></tr>
    <tr><td>cmd+/</td><td>ctrl+/</td><td>当前行注释状态切换</td></tr>
    <tr><td>cmd+opt+f</td><td>ctrl+h</td><td>替换</td></tr>
    <tr><td>cmd+[shift]+f</td><td>ctrl+[shift]+f</td><td>[全局]查找</td></tr>
    <tr><td>ctrl+[shift]+tab, cmd+num</td><td>ctrl+[shift]+tab, ctrl+pageup, alt+num</td><td>切换tab面板</td></tr>
    <tr><td>cmd+shift+y</td><td>ctrl+shift+y</td><td>将光标处的表达式计算，对于数学不好的很有用</td></tr>
    <tr><td>cmd+[shift]+v</td><td>ctrl+[shift]+v</td><td>[缩进]粘贴</td></tr>
    <tr><td>cmd+d</td><td>ctrl+d</td><td>选择一个选中项的下一个匹配项</td></tr>
    <tr><td>ctrl+cmd+g</td><td>alt+f3</td><td>选择文件中的所有匹配项项</td></tr>
    <tr><td>cmd+shift+k</td><td>ctrl+shift+’</td><td>选择所有选中项的标签</td></tr>
    <tr><td>ctrl+d</td><td>ctrl+shift+a</td><td>选择当前选中项的父容器，可连续使用</td></tr>
    <tr><td>ctrl+cmd+(↑|↓)</td><td>ctrl+shift+(↑|↓)</td><td>(上|下)移动一行</td></tr>
    <tr><td>cmd+shift+d</td><td>ctrl+shift+d</td><td>复制行或选中项</td></tr>
    <tr><td>ctrl+shift+w</td><td>alt+shift+w</td><td>用标签包裹行或选中项</td></tr>
    <tr><td>, cmd+opt+(↑|↓), opt+(↑|↓)</td><td>ctrl+(↑|↓), alt+(↑|↓), alt+shift+(↑|↓)</td><td>(加|减)1, (加|减)10, (加|减)0.1</td></tr>
    <tr><td>cmd+'</td><td>ctrl+shift+;</td><td>移除未闭合的容器元素</td></tr>
    <tr><td>cmd+j</td><td>ctrl+j</td><td>合并选中的行（多行边一行）</td></tr>
    <tr><td>cmd+kk</td><td>ctrl+kk</td><td>从光标处删除至行尾</td></tr>
    <tr><td>ctrl+shift+k</td><td>ctrl+shift+k</td><td>删除整行</td></tr>
</tbody>
</table>

## 插件
sublime是离不开插件的，来晒晒我的插件吧。

### Package Control
sublime的插件工具也是一个插件，这似乎是个悖论，需要安装的插件叫做[Package Control](https://sublime.wbond.net/)。

首先打开控制台，点击sublime的菜单栏 view->show console(或者使用快捷键 ctrl+`)，然后运行下的代码，等待几秒钟。

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())

或者下面的也可以

    import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'https://packagecontrol.io/' + pf.replace(' ','%20')).read())

现在在Preferences中就能看到 Package Control了，如下图所示。

![]({{BLOG_IMG}}143.bmp)

### JavaScript Completions
原生js提示插件，这个插件能够提供很多js语法。

### Vintage
如果你习惯使用vim，那么可以安装这个插件，这个插件可以让sublime像vim一样。

### Babel
最近在写React，jsx用这个来做高亮显示

### [Smarty](https://packagecontrol.io/packages/Smarty)
提供smarty语法的支持。Smarty插件默认的分隔符是`{}`，如果你使用的分隔符不同可以更改插件目录的Smarty.tmPreferences文件，找到其中的SMARTY_LDELIM和SMARTY_RDELIM，修改为你的分隔符即可。

### Liquid
提供Liquid语法支持，如果你也写博客的话不妨试试。

### SyncedSidebarBg
有很多强迫症同学发现自己的目录栏和编辑部分的背景颜色不一致，这个插件可以帮你解决这个让你不爽的问题

### [LESS](https://github.com/danro/LESS-sublime)

这是一个非常棒的插件，可以让sublime支持less的语法高亮和语法提示，对于搞less的同学灰常重要，不做过多解释。

### SCSS
提供sass语法高亮支持，不建议安装SASS，SCSS更适合.scss语法支持。

### Pretty JSON
提供对json文件的美化和格式化功能。

### jQuery
支持jquery的只能语法提示，很赞。

### Emmet
Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度。对于html可以使用tab键，对于其他比如jsx可以使用ctrl+e

- [这里是一篇演示文章](http://www.iteye.com/news/27580)
- [Emmet官网](http://docs.emmet.io/)

### DocBlockr
DocBlockr 可以使你很方便地对代码建立文档。它会解析函数，变量，和参数，根据它们自动生成文档范式，你的工作就是去填充对应的说明。

![]({{BLOG_IMG}}144.gif)

### HTML-CSS-JS Prettify
能够格式化css html 和js。

**注意：**格式化的文件路径中不能有中文，不然会报找不到node的错误（windows下）。

![]({{BLOG_IMG}}168.png)

### BracketHighlighter
像这些符号是成对的：花括号{}， 中括号[],括号：() ，引号“” 等。 这些符号当我们鼠标放在开始符号的位置的时候， 希望能明显看到结尾符号在哪儿sublime默认是下划线，很不明显， 想要明显一点，可以安装插件  BracketHighlighter。

### Terminal
可以sublime中，打开命令行，非常方便哦。还可在自定义打开的命令行，比如我就把默认命令行改为了git-bash。只需在设置中进行如下配置即可（注意路径）。

    "terminal": "D:\\Program Files\\Git\\git-bash.exe"

Terminal会占用默认的`ctrl + shift + t`这个快捷键，这个可以打开刚刚关闭的页面，所以我将这个快捷键修改为 `ctrl + alt + t`。

### Git
安装这个插件就可以在底部状态栏显示当前文件的git状态

### TortoiseSVN
安装这个插件可以在邮件显示svn提交命令，这样我就不用打开文件夹了

### AutoFileName
以前用dreamweave的时候在引用文件的时候，可以自动补全文件名的功能，这个插件让sublime有了这个功能。

### AllAutocomplete
自动完成插件，可在全部打开的文件中，自动完成。

### Alignment
对齐插件，强迫症患者必备，可以按等号对齐两边的变量。

### SideBarEnhancements
增强sublime的右键功能。

### MultiEditUtils
扩展多行编辑的功能。

### Markdown Preview
如果你也喜欢md语法，那么安装这个插件吧，可以很方便的预览。

### HTMLEntity Snippets
当你想输入html实体标签时，然后又记不住时，使用这个插件吧。

### ConvertToUTF8
这个插件可以让sublime3打开gbk编码的文件，但是不能保存，我还没找到更好的插件

### SublimeLinter
如果想对我们的代码风格进行验证，则可安装这个插件，这个插件只是个框架，要验证具体的语言还得安装插件

### SublimeLinter-contrib-eslint
js语言的验证可以安装这个插件

### Package Syncing
最后推荐一个同步插件，这个插件可以在不同的机器同步配置信息和插件，非常方便，但鉴于国内的墙太高，我都是直接把插件给手动备份了，然后直接拖进去，或者直接去github上下载对应的包。

[这里](https://github.com/yanhaijing/mysublime3)是我的Package Syncing 导出来的文件。

## 总结
sublime非常棒的，正是我喜欢的风格。

## 参考资料
- [Gif多图：我常用的 16 个 Sublime Text 快捷键](http://blog.jobbole.com/82527/)
- [12个不可不知的Sublime Text应用技巧和诀窍](http://segmentfault.com/a/1190000000505218)
- [如何优雅地使用Sublime Text3](http://www.jianshu.com/p/3cb5c6f2421c)

[1]: http://www.sublimetext.com/
