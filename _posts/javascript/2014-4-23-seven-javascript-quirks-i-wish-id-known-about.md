---
layout: post
title: 我希望我知道的七个JavaScript技巧
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 如果你是一个JavaScript新手或仅仅最近才在你的开发工作中接触它，你可能感到沮丧。所有的语言都有自己的怪癖（quirks）——但从基于强类型的服务器端语言转移过来的开发人员可能会感到困惑。我就曾经这样，几年前，当我被推到了全职JavaScript开发者的时候，有很多事情我希望我一开始就知道。在这篇文章中，我将分享一些怪癖，希望我能分享给你一些曾经令我头痛不已的经验。这不是一个完整列表——仅仅是一部分——但希望它让你看清这门语言的强大之处，可能曾经被你认为是障碍的东西。
---
{% include JB/setup %}

如果你是一个JavaScript新手或仅仅最近才在你的开发工作中接触它，你可能感到沮丧。所有的语言都有自己的怪癖（quirks）——但从基于强类型的服务器端语言转移过来的开发人员可能会感到困惑。我就曾经这样，几年前，当我被推到了全职JavaScript开发者的时候，有很多事情我希望我一开始就知道。在这篇文章中，我将分享一些怪癖，希望我能分享给你一些曾经令我头痛不已的经验。这不是一个完整列表——仅仅是一部分——但希望它让你看清这门语言的强大之处，可能曾经被你认为是障碍的东西。

**我们将看下列技巧：**

- 相等
- 点号vs括号
- 函数上下文
- 函数声明vs函数表达式
- 命名vs匿名函数
- 立即执行函数表达式
- typeof vs Object.prototype.toString

##1.) 相等

C#出身的我非常熟悉==比较运算符。值类型（或字符串）当有相同值是是相等的。引用类型相等需要有相同的引用。（我们假设你没有重载==运算符，或实现你自己的等值运算和GetHashCode方法）我很惊讶为什么JavaScript有两个等值运算符：==和===。最初我的大部分代码都是用的==，所以我并不知道当我运行如下代码的时候JavaScript为我做了什么：

	var x = 1;
	
	if(x == "1") {
	    console.log("YAY! They're equal!");
	}

这是黑暗魔法吗？整数1是如何和字符串"1"相等的？

在JavaScript中，有相等（==）和严格相等（===）之说。相等运算符将强制转换两边的操作数为相同类型后执行严格相等比较。所以在上面的例子中，字符串"1"会被转换为整数1，这个过程在幕后进行，然后与变量x进行比较。

严格相等不进行类型转换。如果操作数类型不同（如整数和字符串），那么他们不全等（严格相等）。

	var x = 1;
	
	// 严格平等，类型必须相同
	if(x === "1") {
	    console.log("Sadly, I'll never write this to the console");
	}
	
	if(x === 1) {
	    console.log("YES! Strict Equality FTW.")
	}

你可能正在考虑可能发生强制类型转换而引起的各种恐怖问题——假设你的引用中发生了这种转换，可能导致你非常困难找到问题出在哪里。这并不奇怪，这也是为什么经验丰富的JavaScript开发者总是建议使用严格相等。

##2.) 点号 vs 括号

这取决于你来自其他什么语言，你可能见过或没见过这种方式（这就是废话）。

	// 获取person对象的firstName值
	var name = person.firstName;
	
	// 获取数组的第三个元素
	var theOneWeWant = myArray[2]; // remember, 0-based index不要忘了第一个元素的索引是0

然而，你知道它也可以使用括号引用对象的成员吗？比如说：

	var name = person["firstName"];

为什么会这样有用吗？而你会用点符号的大部分时间，有几个实例的括号使某些方法可能无法这样做。例如，我会经常重构大开关语句到一个调度表，所以这样的事情：

为什么可以这样用？你以前可能对使用点更熟悉，有几个特例只能用括号表示法。例如，我经常会将switch语句重构为查找表（速度更快），其实就像这样：

	var doSomething = function(doWhat) {
	    switch(doWhat) {
	        case "doThisThing":
	            // more code...
	        break;
	        case "doThatThing":
	            // more code...
	        break;
	        case "doThisOtherThing":
	            // more code....
	        break;
	        // additional cases here, etc.
	        default:
	            // default behavior
	        break;
	    }
	}

可以转化为像下面这样：

	var thingsWeCanDo = {
	    doThisThing      : function() { /* behavior */ },
	    doThatThing      : function() { /* behavior */ },
	    doThisOtherThing : function() { /* behavior */ },
	    default          : function() { /* behavior */ }
	};
	
	var doSomething = function(doWhat) {
	    var thingToDo = thingsWeCanDo.hasOwnProperty(doWhat) ? doWhat : "default"
	    thingsWeCanDo[thingToDo]();
	}

使用switch并没有错误（并且在许多情况下，如果被迭代多次并且非常关注性能，switch可能比查找表表现更好）。然而查找表提供了一个很好的方法来组织和扩展代码，并且括号允许你的属性延时求值。

##3.) 函数上下文

已经有一些伟大的博客发表了文章，正确理解了JavaScript中的this上下文（在文章的结尾我会给出一些不错的链接），但它确实应该加到“我希望我知道”的列表。它真的困难看懂代码并且自信的知道在任何位置this的值——你仅需要学习一组规则。不幸的是，我早起读到的许多解释只是增加了我的困惑。因此我试图简明扼要的做出解释。

###第一——首先考虑全局情况（Global）

默认情况下，直到某些原因改变了执行上下文，否则this的值都指向全局对象。在浏览器中，那将会是window对象（或在node.js中为global）。

###第二——方法中的this值

当你有一个对象，其有一个函数成员，冲父对象调用这方法，this的值将指向父对象。例如：

	var marty = {
	    firstName: "Marty",
	    lastName: "McFly",
	    timeTravel: function(year) {
	        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
	    }
	}
	
	marty.timeTravel(1955);
	// Marty McFly is time traveling to 1955

你可能已经知道你能引用marty对象的timeTravel方法并且创建一个其他对象的新引用。这实际上是JavaScript非常强大的特色——使我们能够在不同的实例上引用行为（调用函数）。

	var doc = {
	    firstName: "Emmett",
	    lastName: "Brown",
	}
	
	doc.timeTravel = marty.timeTravel;

所以——如果我们调用doc.timeTravel(1885)将会发生什么？

	doc.timeTravel(1885);
	// Emmett Brown is time traveling to 1885

再次——上演黑暗魔法。嗯，并不是真的。记住，当你调用一个方法的时候，this上下文是被调用函数父的父对象。

当我们保存marty.TimeTravel方法的引用然后调用我们保存的引用时发生了什么？让我们看看：

	var getBackInTime = marty.timeTravel;
	getBackInTime(2014);
	// undefined undefined is time traveling to 2014
	为什么是“undefined undefined”？！而不是“Matry McFly”？

让我们问一个关键的问题：当我们调用我们的getBackInTime函数时父对象/容器对象是什么？当getBackIntTime函数存在于window中时，我们调用它作为一个函数，而不是一个对象的方法。当我们像这样调用一个函数——没有容器对象——this上下文将是全局对象。[David Shariff](http://davidshariff.com/blog/javascript-this-keyword/)有一个伟大的描述关于这：

> 无论何时调用一个函数，我们必须立刻查看括号的左边。如果在括号的左边存在一个引用，那么被传递个调用函数的this值确定为引用所属的对象，否则是全绝对象。

由于getBackInTime的this上下文是window——没有firstName和lastName属性——这解释了为什么我们看见“undefined undefined”。

因此我们知道直接调用一个函数——没有容器对象——this上下文的结果是全局对象。然而我也说我早就知道我们的getBackInTime函数存在于window上。我是如何知道的？好的，不像上面我包裹getBackInTime在不同的上下文（我们探讨立即执行函数表达式的时候），我声明的任何变量都被添加的window。来自Chrome控制台的验证：

![]({{ BLOG_IMG }}125.png)

是时候讨论下this的主要用武之地之一了：订阅事件处理。

###第三（仅仅是#2的扩展）——异步调用方法中的this值

所以，让我们假装我们想调用我们的marty.timeTravel方法当有人点击一个按钮时：

	var flux = document.getElementById("flux-capacitor");
	flux.addEventListener("click", marty.timeTravel);

在上面的代码中，当用户点击按钮是，我们会看见“undefined undefined is time traveling to [object MouseEvent]”。什么？好——首先，非常明显的问题是我们没有给我们的timeTravel方法提供year参数。反而，我们直接订阅这方法作为事件处理程序，并且MouseEvent参数被作为第一个参数传递个事件处理程序。这是很容易修复的，但真正的问题是我们再次见到“undefined undefined”。不要无望——你已经知道为什么会发生这种情况（即使你还没意识到）。让我们修改我们的timeTravel函数，输出this，从而帮助我们搞清事实：

	marty.timeTravel = function(year) {
	    console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
	    console.log(this);
	};

现在——当我们点击这按钮，我们将类似下面的输出 在你的浏览器控制台：

![]({{ BLOG_IMG }}126.png)

当方法被调用时，第二个console.log输出出this上下文——它实际上是我们订阅事件的按钮元素。你感到吃惊吗？就像之前——当我们将marty.timeTravel赋值给getBackInTime变量时——对marty.timeTravel的引用被保存到事件处理程序，并被调用，但容器对象不再是marty对象。在这种情况下，它将在按钮实例的[点击事件](http://en.wikipedia.org/wiki/Event-driven_architecture)中异步调用。

所以——有可能将this设置为我们想要的结果吗？绝对可以！在这个例子里，解决方法非常简单。不在事件处理程序中直接订阅marty.timeTravel，而是使用匿名函数作为事件处理程序，并在匿名函数中调用marty.timeTravel。这也能修复year参数丢失的问题。

	flux.addEventListener("click", function(e) {
	    marty.timeTravel(someYearValue); 
	});

点击按钮将会在控制台输出类似下面的信息：

![]({{ BLOG_IMG }}127.png)

成功了！但为什么这样可以？思考我们是如何调用timeTravel方法的。在我们按钮点击的第一个例子中，我们在事件处理程序中订阅方法自身的引用，所以它没有从父对象marty上调用。在第二个例子中，通过this为按钮元素的匿名函数，并且当我们调用marty.timeTravel时，我们从其父对象marty上调用，所以this为marty。

###第四——构造函数中的this值

当你用构造函数创建对象实例时，函数内部的this值就是新创建的对象。例如：

	var TimeTraveler = function(fName, lName) {
	    this.firstName = fName;
	    this.lastName = lName;
	    // Constructor functions return the
	    // newly created object for us unless
	    // we specifically return something else
	};
	
	var marty = new TimeTraveler("Marty", "McFly");
	console.log(marty.firstName + " " + marty.lastName);
	// Marty McFly

###Call，Apply和BindCall

你可能开始疑惑，上面的例子中，没有语言级别的特性允许我们在运行时指定调用函数的this值吗？你是对的。存在于函数原型上的call和apply方法允许我们调用函数并传递this值。

call方法的第一个参数是this，后面是被调用函数的参数序列：

	someFn.call(this, arg1, arg2, arg3);

apply的第一个参数也是this，后面是其余参数组成的数组：

	someFn.apply(this, [arg1, arg2, arg3]);

我们的doc和marty实例他们自己能时间旅行，但einstein（[爱因斯坦](http://backtothefuture.wikia.com/wiki/Einstein)）需要他们的帮助才能完成时间旅行。所以让我们给我们的doc实例添加一个方法，以至于doc能帮助einstein完成时间旅行。

	doc.timeTravelFor = function(instance, year) {
	    this.timeTravel.call(instance, year);
	    // 如果你使用apply使用下面的语法
	    // this.timeTravel.apply(instance, [year]);
	};

现在它可以传送Einstein 了：

	var einstein = {
	    firstName: "Einstein", 
	    lastName: "(the dog)"
	};
	doc.timeTravelFor(einstein, 1985);
	// Einstein (the dog) is time traveling to 1985

我知道这个例子有些牵强，但它足以让你看到应用函数到其他对象的强大之处。

这种方法还有我们没有发现的另一种用处。让我们给我们的marty实例添加一个goHome方法，作为this.timeTravel(1985)的快捷方式。

	marty.goHome = function() {
	    this.timeTravel(1985);
	}

然而，我们知道如果我们订阅marty.goHome作为按钮的点击事件处理程序，this的值将是按钮——并且不幸的是按钮没有timeTravel方法。我们能用上面的方法解决——用个一匿名函数作为事件处理程序，并在其内部调用上述方法——但我们有另一个选择——bind函数：

	flux.addEventListener("click", marty.goHome.bind(marty));

bind函数实际上会返回一个新函数，新函数的this值根据你提供的参数设置。如果你需要支持低版本浏览器（例如：ie9以下版本），你可能需要bind函数的[shim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)（或者，如果你使用jQuery你可以用$.proxy代替，underscore和lodash都提供_.bind方法）。

> 记住重要一点，如果你直接使用原型上的bind方法，它将创建一个实例方法，这将绕过原型方法的优点。这不是错误，做到心里清楚就行了。我写了关于这个问题得更多信息在[这里](http://freshbrewedcode.com/jimcowart/2013/02/12/getting-into-context-binds/)。

##4.) 函数表达式vs函数声明

函数声明不需要var关键字。事实上，如Angus Croll所说：“把他们想象成变量声明的兄弟有助于理解”。例如：

	function timeTravel(year) {
	    console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
	}
上面例子里的函数名字timeTravel不仅在它声明的在作用域可见，同时在函数本身内部也是可见的（这对递归函数调用非常有用）。函数声明，本质上说其实就是命名函数。换句话说，上面函数的名称属性是timeTravel。

函数表达式定义一个函数并指派给一个变量。典型应用如下：

	var someFn = function() {
	    console.log("I like to express myself...");
	};
也可以对函数表达式命名——然而，不像函数声明，命名函数表达式的名字仅在它自身函数体内可访问：

	var someFn = function iHazName() {
	    console.log("I like to express myself...");
	    if(needsMoreExpressing) {
	        iHazName(); // 函数的名字在这里可以访问
	    }
	};
	
	// 你可以在这里调用someFn()，但不能调用iHazName()
	someFn();
	 

> 讨论函数表达式和函数声明不能不提“hoisting（提升）”——函数和变量声明被编译器移到作用域的顶部。在这里我们无法详细解释hoisting，但你可以读[Ben Cherry](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)和[Angus Croll](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)两个人的伟大解释。

##5.) 命名vs匿名函数

基于我们刚才的讨论，你可能一进猜到“匿名”函数其实就是一个没有名字的函数。大多数JavaScript开发者能迅速识别瞎买年第一个参数为匿名函数：

	someElement.addEventListener("click", function(e) {
	    // I'm anonymous!
	});

然而，同样的我们的marty.timeTravvel方法也是一个匿名函数：

	var marty = {
	    firstName: "Marty",
	    lastName: "McFly",
	    timeTravel: function(year) {
	        console.log(this.firstName + " " + this.lastName + " is time traveling to " + year);
	    }
	}

因为函数声明必须有一个唯一的名字，只有函数表达式可以没有名字。

##6.) 立即执行函数表达式

因为我们正在谈论函数表达式，有一个东西我希望我早知道：立即执行函数表达式（IIFE）。有很多关于IIFE的好文章（我将在文章结尾出列出），但用一句话来形容，函数表达式不是通过将函数表达式赋值给一个标量，稍后再执行，而是理解执行。可以在浏览器控制台看这一过程。

首先——让我们先敲入一个函数表达式——但不给它指派变量——看看会发什么：

![]({{ BLOG_IMG }}128.png)

语法错误——这被认为是函数声明，缺少函数名字。然而，为了使其变为表达式，我们仅需将其包裹在括号内：

![]({{ BLOG_IMG }}129.png)

让其变为表达式后控制台返回给我们一个匿名函数（记住，我们没有为其指派值，但表达式会有返回值）。所以——我们知道“函数表达式”是“立即调用函数表达式”的一部分。为了等到“立即执行”的特性，我们通过在表达式后面添加另一个括号来调用返回的表达式（就像我们调用其他函数一样）：

![]({{ BLOG_IMG }}130.png)

“但是等一下，Jim！(指作者)我想我以前见过这种调用方式”。 事实上你可能见过——这是合法的语法（众所周知的是Douglas Crockford的首选语法）

![]({{ BLOG_IMG }}131.png)

这两种方法都起作用，但是我强烈建议你读一读[这里](https://github.com/airbnb/javascript/issues/21#issuecomment-10203921)。

OK，非常棒——现在我们已经知道了IIFE是什么——以及为什么要用它？

它帮助我们控制作用域——任何JavaScript教程中非常重要的部分！前面我们看到的许多实例都创建在全局作用域。这意味着window（假设环境是浏览器）对象将有很多属性。如果我们全部按照这种方式写我们的JavaScript代码，我们会迅速在全局作用域积累一吨（夸张）变量声明，window代码会被污染。即使在最好的情况下，在全局变量暴漏许多细节是糟糕的建议，但当变量的名字和已经存在的window属性名字相同时会发生什么呢？window属性会被重写！

例如，如果你最喜欢的“Amelia Earhart”网站在全局作用域声明了一个navigator变量，下面是设置之前和之后的结果：

![]({{ BLOG_IMG }}132.png)

哎呀！

显而易见——全局变量被污染是糟糕的。JavaScript使用函数作用域（而不是块作用域，如果你来自C#或Java，这点非常重要！），所以保持我们的代码和全局作用域分离的办法是创建一个新作用域，我们可以使用IIFE来实现，因为它的内容在它自己的函数作用域内。在下面的例子中，我将在控制台向你显示window.navigator的值，然后我常见一个IIFE（立即执行函数表达式）去包裹Amelia Earhart的行为和数据。IIFE结束后返回一个作为我们的“程序命名空间”的对象。我在IIFE内声明的navigator变量将不会重写window.navigator的值。

![]({{ BLOG_IMG }}133.png)

作为额外好处，我们上面创建的IIFE是JavaScript中模块模式的启蒙。我将在结尾处包括一些我浏览的模块模式的链接。

##7.) 'typeof'操作符和'Object.prototype.toString'

最终，可能发现在某些情况下，你需要检查传递给函数参数的类型，或其他类似的东西。typeof运算符会是显而易见的选择，但是，这并不是万能的。例如，当我们对一个对象，数组，字符串或正则表达式，调用typeof运算符时会发生什么？

![]({{ BLOG_IMG }}134.png)

还好——至少我们可以将字符串和对象，数组，正则表达式区分开，对吗？幸运的是，我们可以得到更准确的类型信息，我们有其他不同的方法。我们将使用Object.prototype.toString方法，并且应用我们前面提到的call方法：

![]({{ BLOG_IMG }}135.png)

为什么我们要使用Object.prototype上的toString方法？因为第三方库或你自己的代码可能重写实例的toString方法。通过Object.prototype，我们可以强制实现实例原来的toString行为。

如果你知道typeof将会返回什么那么你不需要进行多余的检查（例如，你仅需要知道是或不是一个字符串），此时用typeof非常好。然而，如果你需要区分数组和对象，正则表达式和对象，等等，那么使用Object.prototype.toString吧。

##接下来呢

我已经从其他JavaScript开发者的见解中收益颇多，所以请看看下面的这些链接，并给这些人一些鼓励，他们给予了我们谆谆教诲。

- Axel Rauschmayer’s 非常棒的文章 [在JavaScript中什么时候使用==是正确的？](http://yanhaijing.com/javascript/2014/04/25/strict-equality-exemptions) (提示：从不)
- [Fixing the typeof Operator](http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/) by Angus Croll
- [Airbnb Github Issue comment](https://github.com/airbnb/javascript/issues/21#issuecomment-10203921) that’s the single best explanation on IIFE parens placement
- [Function Declarations vs. Function Expressions](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/) – by Angus Croll
- [Getting Into Context Binds](http://freshbrewedcode.com/jimcowart/2013/02/12/getting-into-context-binds/) by yours truly
- [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) by Ben Alman
- [Learning JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) by Addy Osmani
- [Understanding the “this” keyword in JavaScript](http://unschooled.org/2012/03/understanding-javascript-this/) by Nicholas Bergson-Shilcock
- [MDN – Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [MDN – Function.prototype.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [MDN – Function.prototype.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Named function expressions demystified](http://kangax.github.io/nfe/) by Juriy “kangax” Zaytsev
- [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) by Axel Rauschmayer
- [JavaScript Scoping and Hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html) by Ben Cherry
- [JavaScript’s ‘this’ Keyword](http://davidshariff.com/blog/javascript-this-keyword/) by David Shariff
- [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/) by David Shariff

##注

英文：http://developer.telerik.com/featured/seven-javascript-quirks-i-wish-id-known-about/
