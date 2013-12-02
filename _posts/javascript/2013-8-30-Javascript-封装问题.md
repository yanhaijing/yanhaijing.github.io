---
layout: post
category : javaScript
tagline: "原创"
tags : [javascript]
---
{% include JB/setup %}

为什么会用这样一个题目呢，这是要说封装的什么问题，本文并不讲高深的封装理论，只是解决一个小问题。

## 问题来源 ##

今天在百度知道上闲逛，遇到一个网友的问题，问题如下，问题的地址见[这里](http://zhidao.baidu.com/question/587036591.html?sort=6&old=1#here)：

![百度知道问题截图]({{ BLOG_IMG }}10.png)

下面先不看看其他网友给的答案：

![百度知道网友回答截图]({{ BLOG_IMG }}11.png)

网友大部分回答不能一起定义，那么我们来分析下为什么这样做是错的，然后给出相应的解决办法。

## 重现问题 ##

先来说说为什么调用出错，我在自己的浏览器里重现了问题，处于实验并未全部复原代码，并且用到了全局变量哦:

	function Dialog(){
	    
	    Dialog.prototype = {
	        init:function(){
	            console.log("ok");
	        }
	    }
	}
	
	var a = new Dialog();
	a.init();
下面是火狐提示的错误：

![火狐下提示错误]({{ BLOG_IMG }}12.png)

## 分析问题 ##

init不是一个方法，这是为什么呢，我们将调用代码修改下，出于演示，并未遵循JsLint代码规范：

	var a = new Dialog();
	typeof a.init;

![代码执行结果]({{ BLOG_IMG }}13.png)

结果显示为undefined，也就是init没有被定义，或者说在求值过程中未找到init标识符的值，这是因为在调用函数时函数里面的内容才会被解析执行，所以在调用new Dialog()，时其内部的代码尚未执行，所以设置Dialog的原型的语句尚未执行，通过这个例子可以看出绑定this的prototype的过程是在执行构造函数内部代码之前，可以用下面的代码来解释下：

	function Dialog(){
	    var that = Object.create(Object.getPrototypeOf(this));
	    
	    Dialog.prototype = {}         
	}

## “巧妙解决” ##

很明显获取原型时尚未设置原型，但当我们再次调用new 时情况将发生改变:

	var a = new Dialog();
	var b = new Dialog();
	typeof b.init;

![代码执行结果]({{ BLOG_IMG }}14.png)

在此调用时奇迹发生了，我们看到第二次调用时成功获取了值，只有第一次时值是未获去，那我们是不是可以改造下我们的dialog函数呢：

	function Dialog(){
	    
	    Dialog.prototype = {
	        init:function(){
	            console.log("ok");
	        }
	    }
	}
	new Dialog();
	
	
	var a = new Dialog();
	typeof a.init;

我们只需先调用下构造函数便解决了问题，如果你觉得上面的代码还是有悖于封装我们可以再做改变：

	var Dialog = (function(){
	    function Dialog(){
	    
	        Dialog.prototype = {
	            init:function(){
	                console.log("ok");
	            }
	        }
	    }
	    
	    new Dialog();
	    
	    return Dialog;
	}());

## 问题中的问题 ##

上面真的解决问题了吗，你难道没有疑问呢，如果你已经看出问题所在在了，那你也一定能想出解决办法，而且你应该是一个高手，那么让我们看看这样巧妙的解决办法有什么问题，为此我们来构造下面的代码：

	var a = new Dialog();
	typeof a instanceof Dialog;

也许你会问为什么会这样写，也许下面的结果更让你吃惊：

![代码执行结果]({{ BLOG_IMG }}15.png)

结果为false，为什么我的a不是Dialog的实例呢，我的a明明是Dialog创建的，要想搞清这个问题我们先得说清楚 instanceof关键字的工作原理，当我们调用类似a instanceof Dialog 这样的语句时，解释器是怎么判断a是Dialog创建的对象的呢，原来解释器是判断a的原型是否为Dialog的prototype属性所指向的对象也就是说如果a的原型和Dialog的prorotype属性指向同一个对象就认为a是Dialog的对象，当然在判断时并不是至判断a的的原型，而是判断原型链中的每个对象，例如：

	var a = [];
	
	a instanceof Array;
	a instanceof Object;

上面的两条语句都会返回true，因为a的原型链中包含这两个对象。

而上面我们的代码为什么结果为false呢，那是因为当我们每次调用Dialog构造函数时都会在内部重写Dialog的原型，而已经创建的对象的原型会指向原来的原型对象，解释器在判断两个对象是否相等时，要判断两个对象是否引用同一块地址，而不是两个对象是否有相同的属性和方法，所以上面出现false的原因就很清楚了，所以上面的解决办法就出现问题了，而且是很大的问题。显然这种方法行不通。

## 看清本质 ##

那我们有没有办法解决问题呢，让我们先来看看作者想要实现什么，作者想要实现的封装，也就是构造函数和构造函数的原型分开写的问题，作者想把他们写到一起，作者认为这才是封装，那么我们先来看下封装是什么，作者对封装的理解是否有误：



> 封装，1、在程序上，隐藏对象的属性和实现细节，仅对外公开接口，控制在程序中属性的读和修改的访问级别；将抽象得到的数据和行为（或功能）相结合，形成一个有机的整体，也就是将数据与操作数据的源代码进行有机的结合，形成“类”，其中数据和函数都是类的成员。

上面是对封装的解释，可以看出这跟作者描述的封装并不是一个意思，作者此处所想表达的实际上是更好的代码结构。

## 建议 ##

既然清楚了作者的意思，来看下解决办法，如何将构造函数的定义和原型的定义写到一起呢，看下我给出的解决办法：

	var Dialog = (function(){
	    function Dialog(){
	           
	    }
	    
	    Dialog.prototype = {
	        init:function(){
	            console.log("ok");
	        }
	    }
	    
	    return Dialog;
	}());
	
	
	var a = new Dialog();
	a instanceof Dialog;

![代码执行结果]({{ BLOG_IMG }}16.png)

好了问题解决了，结果正确了，而且我们也得到了比较清晰的代码结构。
 