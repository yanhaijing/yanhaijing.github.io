---
layout: post
title: 如何使用PhoneGap打包Web App
category : mobile
tagline: "原创"
tags : [mobile, phonegap]
keywords: [phonegap]
description: 最近做了一款小游戏，定位是移动端访问，思来想去最后选择了jQuery mobile最为框架，制作差不多以后，是否可以打包成App，恰好以前对PhoneGap有耳闻，便想用这个来做打包，可以其中艰辛曲折多次让我想放弃的心情，官方提供的例子，对我这种没用过的人而言，真是无语的很，所已将配置环境和打包过程写下做个记录。
---
{% include JB/setup %}

最近做了一款小游戏，定位是移动端访问，思来想去最后选择了jQuery mobile最为框架，制作差不多以后，是否可以打包成App，恰好以前对PhoneGap有耳闻，便想用这个来做打包，可以其中艰辛曲折多次让我想放弃的心情，官方提供的例子，对我这种没用过的人而言，真是无语的很，所已将配置环境和打包过程写下做个记录。

因为我只弄了Andriod的环境，所以在此只以Andriod为例。

使用PhoneGap搭建Android开发的项目整体步骤如下：

1.  安装java环境。

2.  安装ant构建工具。

3.  安装android的开发环境并配置环境变量。

4.  安装Node.js环境并配置环境变量。

5.  安装git

6.  使用npm安装PhoneGap全局环境。

7.  使用PhoneGap命令创建PhoneGap项目。

8.  将PhoneGap编译为android项目。

9.  将上述项目导入ADT进行后续开发。

10.  安装.apk文件

其实官网给出的[安装过程](http://phonegap.com/install/)忽略了很多步骤（因为这里是Andriod环境，所以才会比官网的例子多出不少步骤），像我这种前端开发人员，电脑里可是连java都没装的，下面就详细讲解这些步骤，并最终生成apk文件。

## 安装Java环境

这点不用我讲，网上一搜一大堆，而且很多程序员电脑里面都是有java环境的，需要强调的是安装java的环境要和后面下载andriod开发环境一致，不然会报错，要保证都是32位或64位，笔者就装了个64位jdk然后，安卓环境是32位的，运行不成功。

**资源**

jdk 下载：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

配置java环境：http://jingyan.baidu.com/article/ed15cb1b2ed02a1be369818a.html

## 安装Ant构建工具

Adobe将PhoneGap已经放到Apache名下进行开源，并且还改了个名字，ant可以apache下的构建工具，所以……需要先安装ant才可以，安装过程其实非常简单，第一个就是[下载](http://ant.apache.org/bindownload.cgi)，选择适合自己的版本，因为我的环境是win7 所以下载zip格式的就可以了。

![](http://images.cnitblog.com/i/460220/201406/241743384553923.png)

然后将zip文件解压到任意目录，并添加环境变量，具体可以参看[这里](http://ant.apache.org/manual/index.html)

1.  将bin目录添加到path里面
2.  添加ANT_HOME变量为ant的根目录
3.  确保安装了jdk并配置好了JAVA_HOME

然后保存环境变量，打开命令行输入 `ant -version` 你应该看见类似下面的输出，那恭喜成功了，可以进行下一步了，如果未成功，可百度下错误原因：

![](http://images.cnitblog.com/i/460220/201406/241748446899380.png)

## 下载Andriod开发环境并配置环境变量

首先就是来[这里](http://developer.android.com/design/downloads/index.html)下载环境，然后是安装，其实就是解压到任意目录，可以看[这里](http://developer.android.com/index.html)，接下来需要添加环境变量，将sdk目录下的platform-tools 和 tools添加到path里。

![](http://images.cnitblog.com/i/460220/201406/241754276118178.png)

然后你还需要设置avd，打开AVD Manager，点击新建，然后设置一些参数即可，由于我也不是搞安卓的，所以吗你要想深入了解需自行研究。

![](http://images.cnitblog.com/i/460220/201406/241902083612827.png)

## 安装git

git是我非常喜欢的版本控制工具，我电脑上自带的是github for windows，只需将其git命令添加到path即可，如果你没有安装git我建议你安装mysygit，安装过程中记得勾上将git添加仅path选项。如果你安装的其他git工具，请确保将git命令加入path，因为安装phonegap过程会用到git命令。

来[这里](http://msysgit.github.io/)下载mysygit，注意下载过程非常缓慢（没办法了谁让我们在天朝呢，以前mysygit在google code上的时候速度更慢，下载迁移到github速度已经快很多了）。

如果你对git感兴趣，我建议你加入我的群一起交流，<span class="qname" title="GitHub家园②">GitHub家园②</span><span class="Apple-converted-space"> <span id="group_number" class="group_number">193091696，由于1群已满，群共享里也有mysygit的最新pre版，下载速度会是github上的几百倍吧！！！！</span></span>

## 安装Node.js环境并配置环境变量

来这里[下载](http://nodejs.org/download/)你需要的版本，windows建议下载.msi安装包，自带npm，无需配置环境变量，如果你下载.exe的话下载的知识node，还需要自行配置环境变量和安装npm。现在的node安装过程真的非常简单了。

## 使用npm安装PhoneGap全局环境

到这里就可以安装官网上的提供的教程来了，打开刚刚安装的node的命令行工具，然后输入 `npm install -g phonegap`，将会自动安装phonegap，需要注意的是安装过程非常缓慢，因为安装期间回到用到git命令去下载文件（不是git慢，而是外网慢）。安装完成后会提示安装成功，当然你也可以输入 `phonegap -v`，你将会看到如下输出，说明你安装成功了：`

![](http://images.cnitblog.com/i/460220/201406/241815094551502.png)

## 使用PhoneGap命令创建PhoneGap项目

接下来将路径切到任意目录，输入` <code>phonegap create my-app` 你将会看到如下画面：</code>

![](http://images.cnitblog.com/i/460220/201406/241818458611749.png)

## 将PhoneGap编译为android项目

接下来先切换到myapp1目录，然后运行`phonegap run andriod`

	cd myapp
	phonegap run android


会出现很多构建信息，成功后会自动启动adk模拟器

![](http://images.cnitblog.com/i/460220/201406/241822552363434.png)

![](http://images.cnitblog.com/i/460220/201406/241900059861008.png)

如果你不想运行安卓模拟器，而只想构将项目那么可以，你只需运行 `phonegap build android` 即可。

## 将上述项目导入ADT进行后续开发

启动ADT中的eclipse，然后选择File-New-Project,在打开的“New Project”向导中选择Android-&gt;Android Project from Existing Code，并选择Next

在下一步的导航页中Root Directory选择刚才创建的my-app/platforms/android文件夹，下方Projects会出现两个项目，都勾选，但是不要勾选Copy projects into workspace选项。

选择Finish完成上述导入

话说上面的导入过程是复制粘贴的，笔者导入的时候点击finished就是不起作用，不知为何，比较郁闷，不知你是否也会遇到同样的事情。

## 安装.apk文件

项目目录下的platforms\android\ant-build 里已经生成了对应的apk文件，将其导入手机即可安装。

![](http://images.cnitblog.com/i/460220/201406/241907545029142.png)

我也不知道这两个apk有什么区别，我讲第一个放到手机里试了试，挺完美的。

## 结论

至此完成了用phonegap构建web项目的过程，是不是灰常复杂，而且网上的其他文章的安装过程，笔者尝试绝大部分未能成功，在此将自己安装过程总结下来，希望能帮到大家。

## 注

参考文献：

- http://zhidao.baidu.com/link?url=TQDJTCYZqa-lG9AvhAvYjbj3DqbHwZLkIbGvBlFBMsomC73s0Ro-byUvAxu9fsByVPjpSicFFFGtS2dVrVqzpYcVU2NK8ljogH0dX8XXp1i
- http://zhaochaozcx.blog.163.com/blog/static/22000865201375102830684/
