---
layout: post
title: 教你如何在windows上安装Java
category : java
tagline: "原创"
tags : [java]
keywords: [java]
description: 手把手教你如何在windows上安装java，并配置java环境。
---
{% include JB/setup %}

最近够倒霉的，电脑硬盘坏了，重新做了个系统，各种环境全都没了，/(ㄒoㄒ)/~~

然后我发现自己在重新安装各种环境的时候，有些东西竟然还需要去查，所以决定把这些环境的配置都写成博客记录下来。

今天就教大家如何在windows上安装java，和如何配置jdk环境。

## 下载java
首先需要下载java的安装包，点击[这里下载](http://www.oracle.com/technetwork/cn/java/javase/downloads/index.html)（链接可能过期，如果链接不对，可自行百度），在这个界面我们选择java这个。

![]({{BLOG_IMG}}405.png)

接下来选择对应的版本，我选择windows 32位版，然后勾上同意协议，点击下载链接

![]({{BLOG_IMG}}406.png)

## 安装java
找到下载的java安装包，我已经下载好了

![]({{BLOG_IMG}}407.png)

接下来就是windows程序的通用安装过程了，一路下一步，其中可以选择安装的路径

![]({{BLOG_IMG}}408.png)

整个过程分为安装安装jre（java运行时）和jdk（java开发者工具）两个过程，如果你更改了安装路径，需要注意把两个改成一样的

## 配置环境
安装好后，打开命令行，输入`java -version`，就可以看到下面的输出

![]({{BLOG_IMG}}409.png)

现在java会自动把jre的环境设置好，所以才能直接输入java命令

![]({{BLOG_IMG}}410.png)

我们下面来配置jdk环境，这里我配置到用户变量，第一步，配置`JAVA_HOME`，其值是jdk的安装目录，比如我的是`C:\Program Files (x86)\Java\jdk1.8.0_45`。

![]({{BLOG_IMG}}411.png)

第二步，将jdk加入到PATH中，在用户的PATH最前面加入下面的语句，`%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`

![]({{BLOG_IMG}}412.png)

我们可以键入`javac -version`来验证

![]({{BLOG_IMG}}414.png)

第三步，配置CLASSPATH，新建变量`CLASSPATH`，键入下面的语句`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`

![]({{BLOG_IMG}}413.png)

## 验证一下
下面来写一个小程序验证一下，新建一个Hello.java，键入下面的代码

    public class Hello {
        public static void main(String[] args) {
            System.out.println("Hello World!!!");
        }
    }

然后运行`javac Hello`编译，在用`java`执行

![]({{BLOG_IMG}}415.png)

## 总结
按照上面的步骤我们就将环境配置好了。

