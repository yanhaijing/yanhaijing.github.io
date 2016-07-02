---
layout: post
title: 重拾编程乐趣——我的Python笔记
category : program
tagline: "原创"
tags : [program]
keywords: [python, note]
description: 本文是《父与子的编程之旅：与小卡特一起学Python》的读书笔记，同时也是对学习python的笔记。
---
{% include JB/setup %}

早就想学学python了，但是一直没有勇气，一个偶然的机会，感谢图灵教育送了我一本《父与子的编程之旅：与小卡特一起学Python》，让我有激情、有动力学下去。

而我也很争气，很神奇的读完了这本书，要知道我现在很少读web相关外的技术书籍的，我给这本书的评价是5星，很棒的一本入门书，浅显易懂，非常适合新手来阅读，而且这不是一本讲python的书，而是一本讲编程的书。

感谢这本书，感谢python让我重新找回了编程的乐趣，终于又有了那种刚刚学习C语言时候的感觉了，所以我决定写下这篇文章，算是我的读书笔记吧，也是给自己做个备忘，主要是对这本书和python的总结。

![]({{BLOG_IMG}}295.jpg)

正文从这里开始，下面的内容都会按照书的目录结构来进行记录。

## 出发吧

### 安装python
学习[python][1]的第一步是安装python，可以到python的[官网下载](https://www.python.org/downloads/)，这里有很多版本，选择合适的版本和平台下载即可

我选择是2.x，我下载时最新的版本是2.7.12，windows平台的安装就是一路下一步即可安装好。

### 交互模式
在开始菜单搜索或找到python安装目录，打开IDLE(Python GUI)，即进入了python的交互模式，

![]({{BLOG_IMG}}296.png)

交互模式的意思就是，你可以输入一行代码，然后按下回车，python会立马告诉你执行结果，这个特别好用。

    print "Hello World"

上面代码的执行结果就是打印出Hellow World，print是python的输出语句。

### 第一个程序
打开菜单->File->New File（ctrl + N），就可以进入文本编辑模式，这里可以输入多行代码，比如键入如下代码：

    print "Hello World";
    print 22 + 10;

然后保存到某个目录，名字为xxx.py，菜单->Run->Run Module（F5），即可执行上面的代码。

## 记住内存和变量
每个程序都是由下面三个部分组成：

- 输入（input）
- 处理输入（process）
- 输出（ouput）

### 名字
在python中声明变量像下面这样，python中的变量都类似于引用，也是没有类型的。

    num = 123;
    str = "123";

## 基本数学运算
python可以完成基本的数学运算，当初python设计出来就是为了完成数学运算。

### 四大基本运算
python可以完成四大基础运算，如下所示：

    print 3 + 2 # 4
    print 3 - 2 # 1
    print 3 * 2 # 6

    print 3 / 2 # 1
    print 3.0 / 2 # 1.5

在前面的`3 + 2`中，3 和 2称为操作数，+ 称为操作符。

python的运算顺序和数学中一样，乘除高于加减，如果要改变运算顺序，和数学中一样的，需要添加括号。

    print 3 + 1 * 2 # 6
    print (3 + 1) * 2 # 8 
    
### 指数和求余数
在python中指数可以像下面这样表示

    print 3 ** 5 # 3 * 3 * 3* 3* 3 = 243

求余数使用%，像下面这样，注意和除法区分开

    print 7 % 2 # 1
    print 7 / 2 # 3

### 自增和自减
python中没有想c++中的自增和自减（i++），要实现一个数的自增的像下面这样

    num = 2
    num += 1 # 3
    num -= 1 # 2

上面的代码和下面的代码效果是一样的

    num = 2
    num = num + 1 # 3
    num = num - 1 # 2

## 数据的类型
python中的变量虽然没有类型，但是值是有类型的。

### 改变类型
可以通过下面的函数来改变数据类型

- float() 从一个字符串或整数创建浮点数
- int() 从一个字符串或浮点数创建一个新的整数
- str() 从一个书或其他任何类型创建一个新的字符串

三个函数都会返回一个新的值，而不会改变原来的值，因为值是不可变的

    a = 24
    b = float(a) # 24.0

    c = 38.0
    d = int(c) # 38

### 类型检查
python中的变量是没有类型，那么如何检查一个变量当前的值是什么类型的呢？答案就是type函数。

    a = 24
    type(a) # <type 'int'>

    b = 24.0
    type(b) # <type 'float'>

    c = 'str'
    type(c) # <type 'str'>

## 输入
对一个程序来说最重要的一点就是输入了，如果电脑不能响应输入，那么就一点用处都没有了。

### raw_input
raw_input函数可以从用户哪里得到一个字符串
    
    print "请输入："
    some = raw_input();
    print "你的输入是：", some

上面的程序会输出你输入的任何字符

raw_input还可以接受一个参数，这个参数会被作为输出，上面的程序可以简化为下面这样

    some = raw_input("请输入：")
    print "你的输入是：", some

### print
print用来给打印输出，简单点说就是向控制台打印一些东西

    print "yan"
    print "yan"
    print "yan"

上面的三条语句会得到下面的输出

    yan
    yan
    yan

如果想在同一行打印的话可以在结尾加上逗号

    print "yan",
    print "yan",
    print "yan"

上面的语句会得到下面的输出

    yan yan yan

中间会有一个空格，print还支持多个参数，中间用逗号分隔

    print "yan", "yan", "yan"

上面的语句会得到下面的输出，中间也有一个空格

    yan yan yan

### 来自互联网的输入
可以python的内置库，可以获得从互联网的而输入，下面的代码可以输出我的博客内容

    import urllib2
    file = urllib2.urlopen("http://yanhaijing.com")
    msg = file.read()
    print msg

## 判断在判断
每次程序执行都输出一样的东西没什么意思，需要有判断分支才有意思。

### 测试，测试
人之所以有智能是因为人能够思考，面对选择是能做出选择，那么如何让计算机也能够做出选择呢？那就是测试，我们需要做一些测试，然后决定接下来做什么。这些测试可能包括如下问题：

- 这两个东西相等吗？
- 其中一个是不是小于另一个？
- 其中一个是不是大于另一个？

完成测试并更根据结果做出测试称之为分支，在python中使用if来进行测试：

    if a == 1

python中的代码块比较奇葩，不是靠大括号而是缩进来确定范围的，声明一个代码块时就加一个冒号，就像下面这样：

    if a == 1:
        print "a等于1"
        print "代码块"
    print "这里不是代码块了"

python中的elseif和else像下面这样：

    if a == 1:
        print "a等于1"
    elif a == 2:
        print "a等于2"
    else:
        print "a等于其他值"

### 比较操作符
python中的比较操作符不只有等于还有其他，比如大于小于等，完整的列表如下

- == （等于）
- < （小于）
- > （大于）
- <= （小于等于）
- >= （大于等于）
- != （不等于）

### 逻辑运算符
python中也可以表达逻辑演算中的与 或 非，分别用下面的符号表示

- and
- or
- not

逻辑运算符的用例如下

    if a != 1 and a != 2:
        print "a不等于1和2"

## 转圈圈

## 全是为了你——注释

## 嵌套与可变循环

## 收集起来——列表和字典

## 函数

## 对象

## 模块

## 打印格式化与字符串

## 文件输入与输出

## 总结

[1]: https://www.python.org/