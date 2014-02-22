---
layout: post
title: 如何在电脑上测试手机网站
category : web
tagline: "原创"
tags : [web]
keywords: [测试, 手机网站]
description: 最近公司要开发网站的移动版，让我准备准备知识，话说本人开发移动网站的经验还真不多，最悲剧的事情就是我的手机是个经典的诺基亚，而且公司还不给配手机，这是有多讨厌，没办法，没有手机只能用电脑模拟了，相办法代替，查了很多资料，尝试了大部分方法，下面将这一天的努力总结下分享给大家，也让大家免去看那么多文章，以下介绍的方法，都是本人亲自测试成功的方法，测试环境winxp。
---
{% include JB/setup %}

最近公司要开发网站的移动版，让我准备准备知识，话说本人开发移动网站的经验还真不多，最悲剧的事情就是我的手机是个经典的诺基亚，而且公司还不给配手机，这是有多讨厌，没办法，没有手机只能用电脑模拟了，相办法代替，查了很多资料，尝试了大部分方法，下面将这一天的努力总结下分享给大家，也让大家免去看那么多文章，以下介绍的方法，都是本人亲自测试成功的方法，测试环境winxp。

## Chrome\* ##

chrome模拟手机总共有四种方法，原理都一样，通过伪装User-Agent，将浏览器模拟成Android设备。以下标星的为推荐方法。

### 1.新建Chrome快捷方式

右击桌面上的Chrome浏览器图标，在弹出的右键菜单中选择“复制”，复制一个图标副本到桌面。右击该副本，选择“属性”，打开相应的对话框，在“目标”文本框的字符后面添加以下语句：“--user-agent="Android"”，如下图：

![]({{ BLOG_IMG }}59.png)

注意user前面是两个“-”，并且“chrome.exe”与“--user”之间有一个空格。确定之后，打开这个新建的Chrome快捷方式，输入3g.qq.com就可以浏览到像手机里打开一样的页面了。

这时可以新建一个用户，就不影响原来用户访问的时候也是访问的手机版。


### 2.一次性模拟iPhone和安卓手机

开始–运行中输入以下命令，启动浏览器：

模拟谷歌Android：

	chrome.exe --user-agent="Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
模拟苹果iPhone：

	chrome.exe --user-agent="Mozilla/5.0 (iPad; U; CPU OS 3_2_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B500 Safari/531.21.10"
这种方法仅供特殊情况下使用，因为重启Chrome将不能恢复正常User-Agent，所以是一次性。

![]({{ BLOG_IMG }}60.png)

更多的user-agent请自行搜索。

### 3.安装插件

插件可以很方便切换各种user-agent，很方便，但是可能会稍微影像性能。

User-Agent Selector地址：[https://chrome.google.com/webstore/detail/user-agent-selector/fnbmdojpgjpmjjmnjdnbobcdhenmmgod/related](https://chrome.google.com/webstore/detail/user-agent-selector/fnbmdojpgjpmjjmnjdnbobcdhenmmgod/related)

![]({{ BLOG_IMG }}61.png) 

从上图可以看到，还有很多类似的插件，其实功能都大同小异。

### 4：自带模拟器\*

打开chrome开发者工具，按F12（r32版本），然后找到右上角的齿轮按钮，打开设置面板，选择Overrides，勾上Show 'Emulation' view in console drawer（在控制台视图中显示“仿真”）。

![]({{ BLOG_IMG }}62.png)

然后关闭设置面板，选择Elements面板（非Console就可以），找到右上角打开控制台面板，选择控制台面板里的Emulation面板，右边有很多选项，选择一个点击Emulate就可以了，Reset按钮能恢复到默认状态。

![]({{ BLOG_IMG }}63.png)

打开仿真后，打开[http://yanhaijing.com](http://yanhaijing.com)，即可看到如下的手机下的界面

![]({{ BLOG_IMG }}64.png)

这种方法简单好用，而且不需要重启，推荐这种方法。

**注意：以上第一种和第二种方法都需要将全部打开的chrome窗口关闭，再打开才能起作用。**

## Firefox* ##

### 1.修改user-agent

和chrome一样安装插件修改user-agent的方法

具体方法移步这里：[http://blog.sina.com.cn/s/blog_645813a30100qf68.html](http://blog.sina.com.cn/s/blog_645813a30100qf68.html)

### 2.火狐响应式设计+修改user-agent\*

最近的火狐自己添加响应式设计功能和3D试图都很棒，打开火狐自己的控制台（非firebug），找到右上角的响应式设计按钮。

![]({{ BLOG_IMG }}65.png)

打开后即切换到响应式设计界面

![]({{ BLOG_IMG }}66.png)

但我们看到打开QQ的站点并未被自动引到QQ的移动页面，这样只对响应式设计的界面起作用，对想QQ这样云端判断，返回不同页面的并不适应，这里就要配合上面的方法，再改下user-agent，即可实现类似chrome的调试功能。

![]({{ BLOG_IMG }}67.png)

### 3.Firefox OS 模拟器

安装的方法 参考这里：[https://developer.mozilla.org/zh-CN/docs/Tools-840092-dup/Firefox_OS_%E6%A8%A1%E6%8B%9F%E5%99%A8#Installing](https://developer.mozilla.org/zh-CN/docs/Tools-840092-dup/Firefox_OS_%E6%A8%A1%E6%8B%9F%E5%99%A8#Installing)

安装完成后可打开如下界面，可用里面的浏览器打开网站即可，但这种方法打开的是电脑网站，而不是手机网站，也就是他的user-agent不是手机的，故对响应式界面起作用，对判断user-agent的网站不起作用，访问qq，baidu等返回的都是电脑界面。

![]({{ BLOG_IMG }}68.png)

## Opera\*

### 1.修改user-agent

和chrome和firefox类似，可自行安装插件，自opera12之后，opera改用webkit内核，故可安装chrome的插件，也可自行在opera的商店中搜索插件

User Agent Changer下载： [https://addons.opera.com/zh-cn/extensions/details/user-agent-changer/?display=en](https://addons.opera.com/zh-cn/extensions/details/user-agent-changer/?display=en)

### 2.Opera Mobile Emulator + dragonfly\*

下载适合自己的版本，安装完毕会开如下界面：

![]({{ BLOG_IMG }}69.png)

左侧选择平台，右侧选择参数，选择完毕点击启动，如下的几面，用过手机opera的朋友会很熟悉，就是手机opera

![]({{ BLOG_IMG }}70.png)

关于opera mobile emulator的更详细介绍参看文章末尾参考资料的相关内容。

但此时，还是只能看而已，不能调试模拟器里的网站，这里需要dragonfly配合以实现调试，由于opera12后换了内核，不能安装dragonfly了，所有你需要一款opera12的浏览器，和dragonfly的离线包，配置好后具体如何连接请参看这里[http://www.opera.com/dragonfly/documentation/remote/](http://www.opera.com/dragonfly/documentation/remote/)

全部设置好后即可实现在电脑上调试手机网页，如下图所示：

![]({{ BLOG_IMG }}71.png)

opera12下载地址：[http://yanhaijing.7958.com/down_10918696.html](http://yanhaijing.7958.com/down_10918696.html)

dragonfly中文离线包下载地址：[http://yanhaijing.7958.com/down_10918700.html](http://yanhaijing.7958.com/down_10918700.html)

opera mobile emulator下载地址：[http://www.opera.com/zh-cn/developer/mobile-emulator](http://www.opera.com/zh-cn/developer/mobile-emulator)

## 模拟器\*

### 1.官方模拟器\*

做安卓开发的肯定都知道安卓模拟器，这是谷歌官方的提供的开发环境，能模拟安卓环境，还可切换各个版本，可下载配置好的环境，然后打开eclipes，直接打开AVDM，穿件一个AVD，然后start，如下图：

![]({{ BLOG_IMG }}72.png)

要等一大会时间，会打开模拟器，和安卓环境一样，打开里面的浏览器测试即可。但我的浏览器打不开不知道为什么，郁闷的很啊。

![]({{ BLOG_IMG }}73.png)


下载地址：[http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)

### 2.bluestacks

这也是一款模拟器，可自行搜索，本人安装后电脑就卡死了，可能我的电脑配置不行吧，看介绍还是不错的。

## 在线测试

在线只能测试界面的视觉效果，不能调试，但也是很不错的。

### 1.Mobile Emulator\*

非常不错，速度也很快，界面很简洁，支持多种平台。

[http://emulator.mobilewebsitesubmit.com/](http://emulator.mobilewebsitesubmit.com/screenResolution.php?url=http://yanhaijing.com)

![]({{ BLOG_IMG }}74.png)

### 2.opera mini simulator

需要java环境支持，单一平台，opera出品，速度很快。

[http://www.opera.com/zh-cn/developer/opera-mini-simulator](http://www.opera.com/zh-cn/developer/opera-mini-simulator)

### 3.webpage mobile

说实话弄了半天也没弄出来，大大的鄙视下吧，但是能测试的平台很全面。

[http://www.webpagetest.org/mobile](http://www.webpagetest.org/mobile)

## 总结

以上列出了多种方法，各有利弊，希望大家选择适合自己的方法，本人推荐chrome自带模拟器和opera mobile emulator + dragonfly的方法。因为这两种方法，接近真是手机环境，又能调试css和js。

当然文中没有提到的还有最好的方法就是你有一台手机，那就太好了，配合远程调试，是最最理想的办法。

## 参考资料

\*Chrome模拟手机浏览器（iOS/Android）的三种方法，亲测无误！：http://www.ihacksoft.com/chrome-simulate-ios-android-browse.html

 用谷歌浏览器来当手机模拟器：http://blog.s135.com/chrome_phone/

\*关于手机网站测试的问题：http://segmentfault.com/q/1010000000143811

如何firefox模拟手机访问手机网站：http://blog.sina.com.cn/s/blog_645813a30100qf68.html

\*Firefox OS 模拟器：https://developer.mozilla.org/zh-CN/docs/Tools-840092-dup/Firefox_OS_%E6%A8%A1%E6%8B%9F%E5%99%A8

\*Opera Mobile Emulator for desktop：http://dev.opera.com/articles/view/opera-mobile-emulator/

设置 Opera Dragonfly 为离线版或实验版的方法：http://opera.im/archives/running%EF%BC%8Ddragonfly-offline-or-experimental-version/

\*整理：手机端网页调试方案：http://blog.segmentfault.com/humphry/1190000000313211?page=1

\*移动终端开发必备知识：http://isux.tencent.com/mobile-development-essential-knowledge.html/zh-hans

 