---
layout: post
title: 我的 Sublime Text 2 笔记
category : tool
tagline: "原创"
tags : [工具]
keywords: [工具]
description: 作为aptana死忠粉的我，最近由于工作需要最近开始使用sublime，初次使用，就被其秒开的启动速度，简洁的界面设计，无干扰的信息提示所这幅。
---
{% include JB/setup %}

作为aptana死忠粉的我，最近由于工作需要最近开始使用sublime，初次使用，就被其秒开的启动速度，简洁的界面设计，无干扰的信息提示所这幅。

俗话说，工欲善其事必先利其器，作为码农，在开始编码之前，必须要对自己的工具熟悉，才能事半功倍，所以开始了一番折腾，下面记录下一些笔记。

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
<tr><td>ctrl+l</td><td>选择行，重复可依次增加选择下一行</td></tr>
<tr><td>ctrl+m</td><td>跳转到对应括号</td></tr>
<tr><td>ctrl+shift+m</td><td>选中括号间的内容</td></tr>
<tr><td>alt+.</td><td>close tag</td></tr>
<tr><td>ctrl+/</td><td>当前行注释状态切换</td></tr>
<tr><td>ctrl+shift+[|]</td><td>折叠|展开(代码)</td></tr>
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
</tbody>
</table>

##插件
sublime的功能已经很满足大部分需求了，但还是有个别差异化的需求，无法满足，这时候sublime的插件派上用场，先来晒下我的插件。

![]({{BLOG_IMG}}141.png)

由于sublime 2本身不带插件，所以要先安装插件管理器（[package control](https://sublime.wbond.net/)），首先打开控制台，点击sublime的菜单栏 view->show console(或者使用快捷键 ctrl+`)。

现在打开了控制台， 这个控制台有上下两栏， 上面一栏会实时显示sublime执行了什么插件，输出执行结果， 如果你安装的某个插件不能正常运行，应该先在这里看看有没有报错。下面栏是一个输入框，可以运行python代码。

![]({{BLOG_IMG}}142.png)

我们输入下面的代码点击回车运行， 就能安装好package control了。

	import urllib2,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')

运行结束以后，记得重启编辑器，就能在Preferences中看到 package control了。

![]({{BLOG_IMG}}143.bmp)

然后我们按住 ctrl+shift+p。此时会输出一个输入框，即可安装，删除，更新插件了。

###[LESS](https://github.com/danro/LESS-sublime)

这是一个非常棒的插件，可以让sublime支持less的语法高亮和语法提示，对于搞less的同学灰常重要，不过多解释。

###Emmet

Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度。

- [这里是一篇演示文章](http://www.iteye.com/news/27580)
- [Emmet官网](http://docs.emmet.io/)

###SublimeLinter

可以验证各种语法错误，不多解释。

###DocBlockr

DocBlockr 可以使你很方便地对代码建立文档。它会解析函数，变量，和参数，根据它们自动生成文档范式，你的工作就是去填充对应的说明。

![]({{BLOG_IMG}}144.gif)

###JsFormat

专门用来格式化js的工具，非常给力。

###HTML/CSS/JS Prettify

不解释，神奇，秒杀jsFormat，能够格式化css html 和js。

**注意：**格式化的文件路径中不能有中文，不然会报找不到node的错误（windows下）。

![]({BLOG_IMG/168.png})

###BracketHighlighter

像这些符号是成对的：花括号{}， 中括号[],括号：() ，引号“” 等。 这些符号当我们鼠标放在开始符号的位置的时候， 希望能明显看到结尾符号在哪儿sublime默认是下划线，很不明显， 想要明显一点，可以安装插件  BracketHighlighter。

###GBK Encoding Support

这个插件还是非常有用的，因为sublime 本身 不支持gbk编码，在utf8如此流行的今天，我们整站还是gbk编码，o(︶︿︶)o 唉，所以全靠这个插件了。

###Terminal

可以sublime中，打开命令行，非常方便哦。

###jQuery

支持jquery的只能语法提示，很赞。

###SyncedSideBar

支持当前文件在左侧面板中定位，不错。

###Clipboard History
可以保存粘贴的历史，很赞的功能，再也不用担心历史丢失了。ctrl+alt+v可打开历史面板，上下选择即可，安装后会和默认的ctrl+shift+v（粘贴缩进）冲突，干掉这个快捷键。

###CSS3_Syntax
对css语法高亮的支持，view-syntax-css3选中css3就能使用css3高亮了。必须每条属性都加上分号，并且属性必须小写，不然不会高亮，有点鸡肋啊。

##总结

sublime非常棒的，正是我喜欢的风格。

##参考资料

- [Gif多图：我常用的 16 个 Sublime Text 快捷键](http://blog.jobbole.com/82527/)