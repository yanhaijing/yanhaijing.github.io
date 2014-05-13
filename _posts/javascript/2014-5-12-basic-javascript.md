---
layout: post
title: JavaScript简易教程
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript, JavaScript教程, JavaScript简易教程, JavaScript基础教程, JavaScript入门教程]
description: 这是我所知道的最完整最简洁的JavaScript基础教程。
---
{% include JB/setup %}

这是我所知道的最完整最简洁的JavaScript基础教程。

这篇文章带你尽快走进JavaScript的世界——前提是你有一些编程经验的话。本文试图描述这门语言的最小子集。我给这个子集起名叫做“JavaScript简易教程”，并推荐准备深入阅读细节和高级技巧之前的新手阅读。心急吃不了热豆腐。文章的最后提出如何进一步学习。

**警告：**下面是我所描述的规则集和最佳实践。我喜欢整洁清晰（例如，你可以随时通过下面的目录快速导航）。规则是无懈可击的，但不可避免——每个人的理解不同。

##目录

1.	[本文约定](#sect_conventions)
2.	[语言的性质](#sect_nature)
3.	[语法](#sect_syntax)
4.	[变量和赋值](#sect_variables_assignment)
5.	[值](#sect_values)
6.	[布尔](#sect_booleans)
7.	[数字](#sect_numbers)
8.	[字符串](#sect_strings)
9.	[语句](#sect_statements)
10.	[函数](#sect_functions)
11.	[异常处理](#sect_exceptions)
12.	[严格模式](#sect_strict_mode)
13.	[变量作用域和闭包](#sect_var_scope_closures)
14.	[对象和继承](#sect_objects)
15.	[数组](#sect_arrays)
16.	[正则表达式](#sect_regexp)
17.	[数学](#sect_math)
18.	[标准库的其他功能](#sect_standard_library)
19.	[下一步学什么？](#sect_learn_next)


<h2 id="sect_conventions">本文约定（Conventions used in this blog post）</h2>

###命令行交互（Command line interaction）

每当我介绍一个新概念，我都会尝试通过JavaScript命令行进行演示。像下面这样：

	> 3 + 4
	  7

大于号后面的文本是用户输入内容。其他的都是JavaScript引擎的输出内容。此外，也可以使用console.log()来向控制台打印数据（这方法可以在大部分JavaScript引擎中工作，包括Node.js）.

###查找文档（Finding documentation）

有时你看到一些函数或方法有超链接，你应该清楚他们的工作原理。如果没有，可以在[Mozilla Developer Network](https://developer.mozilla.org/en-US/) (MDN)上查看细节，你也可以使用Google在MDN上查找文档。例如，下面是通过Google搜索数组的push()方法的例子：

[mdn array push](https://www.google.com/search?q=mdn+array+push)

<h2 id="sect_nature">语言的性质（The nature of the language）</h2>

本节对JavaScript的性质简要介绍，以帮助你理解一些疑问。

###JavaScript 和 ECMAScript（JavaScript versus ECMAScript）

编程语言称为JavaScript，语言标准称为ECMAScript。他们有不同名字的原因是因为“Java”已经被注册为商标（属于Oracle）。目前，只有Mozilla被正式允许使用“JavaScript”名称，因为很久以前他们等到一份许可。因此，开放的语言标准拥有不同的名字。当前的JavaScript版本是ECMAScript 5，ECMAScript 6当前是[开发版](http://www.2ality.com/2012/11/guide-esnext.html)。

###影响（Influences）

JavaScript之父，Brendan Eich 别无选择必须[迅速创建一门语言](http://yanhaijing.com/javascript/2013/06/22/javascript-designing-a-language-in-10-days)。（或者，更糟糕，Netscape将使用其他技术）。他借鉴了几门其他语言：

- JavaScript借鉴了Java的语法和如何区分[原始值和对象](#sect_prim_vs_obj)。
JavaScript的函数设计受Scheme和AWK的启发——他们（函数）都是第一类（first-class）对象，并且在语言中广泛使用。[闭包](#sect_closures)使他们变成强大的工具。
- Self影响了JavaScript独一无二的面向对象编程(OOP)风格。它的[核心思想](http://www.2ality.com/2011/06/prototypes-as-classes.html)（在这里我们没有提到）非常优雅，基于此创建的语言非常少。但一个[简单的模式](#sect_constructors)（见后面）照顾大部分用例。JavaScript面向对象编程的杀手级特性是你可以直接创建对象。不需要先创建类或其他类似的东西。
- Perl和Python[影响了](http://www.2ality.com/2013/02/javascript-influences.html)JavaScript字符串，数组和正则表达式的操作。

JavaScript直到ECMAScript 3才加入异常处理，这解释了为什么这门语言经常自动转换类型和经常静默失败：它最初不能抛出异常。

一方面，JavaScript有很多怪癖，并且确实很多功能（块级变量作用域（block-sciped variables），模块（modules）支持子类型（subtyping）等）。另一方面，它有几个非常强大的特性，允许你弥补上面的问题。在其他语言中，你要学习语言特性。在JavaScript中，你需要经常学习模式代替。

###深入阅读（Further reading）

- [JavaScript: how it all began](http://www.2ality.com/2011/03/javascript-how-it-all-began.html)
- [JavaScript: the glass is half full](http://www.2ality.com/2012/09/javascript-glass-half-full.html) [什么让JavaScript如此吸引人？]
- [ECMAScript: ES.next versus ES 6 versus ES Harmony](http://www.2ality.com/2011/06/ecmascript.html) [包括ECMAScript版本的一个简史]
- [Perl and Python influences in JavaScript](http://www.2ality.com/2013/02/javascript-influences.html)
- [Javascript:10天设计一门语言](http://yanhaijing.com/javascript/2013/06/22/javascript-designing-a-language-in-10-days)

<h2 id="sect_syntax">语法（Syntax）</h2>

这节介绍一些JavaScript的基本语法规则。

###语句和表达式（Statements versus expressions）

了解JavaScript的语法，这有助于了解（简而言之），它有两个主要的语法类型：语句和表达式。

- 语句通常“做某些事情”。程序是一组语句序列。举个例子，下面声明（创建）一个  变量 foo：
  var foo;
- 表达式产生值。他们通常位于赋值操作的邮编，函数参数，等。举个例子：
  3 * 7

语句和表达式之间的区别最好通过实例说明，JavaScript（像Java）有两种不同的方式实现if-then-else。一种是用语句：

	var x;
	if (y >= 0) {
	    x = y;
	} else {
	    x = -y;
	}
 

另一种是表达式：

	var x = y >= 0 ? y : -y;

你可以将后者作为函数参数（但前者不行）：

	myFunction(y >= 0 ? y : -y)
 

最后，每当JavaScript期待一个语句，你也可以用一个表达式代替。例如：

	foo(bar(7, 1));

`foo(...)；`是一个语句（也叫做表达式语句），`bar(7, 1)`是一个表达式。他们都实现函数调用。

###流程控制语句和语句块（Control flow statements and blocks）

流程控制语句，其语句体可以是单条语句。举两个例子：

	if (obj !== null) obj.foo();
	    while (x > 0) x--;

然而，任何语句总能被语句块代替，花括号包含零或多条语句。因此，你也可以这样写：

	if (obj !== null) {
	    obj.foo();
	}
	
	while (x > 0) {
	    x--;
	}

在本文中，我们只是用后一种方式。

###分号（Semicolons）

分号在JavaScript中是[可选的](http://www.2ality.com/2011/05/semicolon-insertion.html)。但省略他们可能带来意想不到的结果，所以我建议你不要那样做。

正如上面所看到的，分号作为语句的结尾，但语句块不需要。仅有一种情况下你将见到块后面有分号：函数表达式后面的函数体块。表达式作为语句的结尾，后面是分号：

	var x = 3 * 7;
	var f = function () { };
 

###注释（Comments）

JavaScript有两种注释方式：单行注释和多行注释。单行注释以//开头，以换行符结尾：

	x++; // 单行（single-line）注释
 

多行注释用/**/包裹

	/* 
	 这是多行注释
	 多行哦
	 */
 

###深入阅读

- [Expressions versus statements in JavaScript](http://www.2ality.com/2012/09/expressions-vs-statements.html)
- [Automatic semicolon insertion in JavaScript](http://www.2ality.com/2011/05/semicolon-insertion.html)

<h2 id="sect_variables_assignment">变量和赋值（Variables and assignment）</h2>

JavaScript中的变量在使用之前必须先声明：

	var foo;  // 声明变量“foo”
 

###赋值（Assignment）

你可以在生命变量的同时给它赋值：

	var foo = 6;

你也可以给已经存在的变量重新赋值：

	foo = 4;  // 更改变量的值
 

###复合赋值操作符（Compount assignment operators）

有很多符合赋值操作符，例如+=。下面的两个赋值操作等价：

	x += 1;
	x = x + 1;
 

<h3 id="identifiers">标识符和变量名（Identifiers and variable names）</h3>

标识符就是事物的名字，在JavaScript中他们扮演不同的语法角色。例如，变量的名称是一个标识符。

大体上，标识符的第一个字符可以是任何Unicode字符，美元标志符（$）或下划线（_）。后面的字符可以是任意字符和数字。因此，下面全是合法的标识符：

	arg0
	_tmp
	$elem
	π

一些标识符是“保留关键字”——他们是语法的一部分，不能用作变量名：


> arguments break case catch class const continue debugger default delete do else enum eval export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield

从技术上讲，下面三个标识符不是保留字，但也不应该作为变量名：

> Infinity NaN undefined


###深入阅读

- [Valid JavaScript variable names](http://mathiasbynens.be/notes/javascript-identifiers) [by Mathias Bynens]


<h2 id="sect_values">值（Values）</h2>

JavaScript有所有我们期待的编程语言值类型：布尔，数字，字符串，数组等。JavaScript中的所有值都有属性。每个属性有一个键（或名字）和一个值。考虑记录的域（fields of record）。你可以使用点（.）操作符读取属性：

	value.propKey

举个例子：字符串“abc”有属性lenght（长度）。

	 > var str = 'abc';
	 > str.length
	   3

上面的代码也可以写成下面这样：

	> 'abc'.length
	  3

点操作符也可以用来给属性赋值：

	 > var obj = {};  // 空对象
	 > obj.foo = 123; // 创建属性“foo”，设置它为123
	   123
	 > obj.foo
	   123

你也可以通过它（.）调用方法：

	> 'hello'.toUpperCase()
	  'HELLO'

上面，我们在值“hello”上面调用方法 toUpperCase()。

<h3 id="sect_prim_vs_obj">原始类型值和对象（Primitive values versus objects）</h3>

JavaScript定义了不同值之间的区别：

- 原始值包括：boolean，number，string，null和undefined，
- 所有其他的值都是对象。实际上对象被定义为——所有不为原始类型的值。

两者之间的主要区别在于他们是如何被比较的：每一个对象有一个独一无二的标志，并且仅和自己相等：

	> var obj1 = {};  // 一个空对象
	> var obj2 = {};  // 另一个空对象
	> obj1 === obj2
	  false
	> obj1 === obj1
	  true

相反，所有原始值只要编码值相同就被认为是相同的：

	> var prim1 = 123;
	> var prim2 = 123;
	> prim1 === prim2
	  true

接下来的两节介绍原始值和对象的更多细节。

###原始类型值（Primitive values）

下面的全是原始类型值（简称：原始值）：

- [布尔类型](#sect_booleans)：true，false
- [数字类型](#sect_numbers)：1736，1.351
- [字符串类型](#sect_strings): 'abc'，"abc"
- 两个“[无值（non-values）](#sect-non-values)”：undefined，null


原始值的特征：

- **值做比较时：**“内容”做比较。

	    > 3 === 3
		  true
		> 'abc' === 'abc'
		  true


- **无法更改：**值的属性无法更改，无法添加和移除属性。

		> var str = 'abc';
		> str.foo = 3; // try to create property `foo` ⇒ no effect
		> str.foo  // unknown property
		  undefined 

  (获取未知属性总返回undefined)
- **原始值的集合是固定的（fixed set of values）：**你不能自定义原始值。


###对象（Objects）

所有非原始值（non-primitive）的值都是对象。最常见的几种对象类型是：

- [简单对象](#sect_objects)（类型是Object）能通过对象字面量创建：


	{
	    firstName: 'Jane',
	    lastName: 'Doe'
	}


  上面的对象有两个属性：firstName属性的值是“Jane”，lastName属性的值是“Doe”。
- [数组](#sect_arrays)（类型是 Array）能通过数组字面量创建：


	[ 'apple', 'banana', 'cherry' ]


  上面的数组有三个元素，可以通过数字索引访问。例如“apple”的索引是0.
- [正则表达式对象](#sect_regexp)（类型是 RegExp）能通过正则表达式字面量创建。


	/^a+b+$/
 

对象的特征：

- **比较的是引用：**比较的是标识符，每个值有自己的标识符。

		> {} === {}  // 两个不同的空对象
		  false
		
		> var obj1 = {};
		> var obj2 = obj1;
		> obj1 === obj2
		  true
 

- **默认可以更改。**

		 > var obj = {};
		 > obj.foo = 123;
		 > obj.foo
		   123
 

-** 用户可扩展（user-extensible）：**你可以通过[构造函数](#sect_constructors)定义新的对象类型。


[数组](#sect_arrays)所有的数据结构（如）都是对象，但并不是所有的对象都是数据结构。例如：[正则表达式是对象](#sect_regexp)，但不是一个数据结构。

<h3 id="sect-non-values">undefined 和 null（undefined and null）</h3>

多少有些不必要，JavaScript有两个“无值（non-values）”：undefined 和 null。

- undefined的意思是“没有值（no value）”。为初始化的变量是undefined：

		> var foo;
		> foo
		undefined

  如果你读取不存在的属性，将返回undefined：

		> var obj = {}; // 空对象
		> obj.foo
		  undefined

  未传递的参数也是undefined：

		> function f(x) { return x }
		> f()
		  undefined
 

- null的意思是“没有对象（no object）”。它被用来表示对象的无值（参数，链上的对象等）。


通常情况下你应该把undefined和null看成是等价的，如果他们代表相同意义的无值的话。检查他们的一种方式是通过严格比较：

	if (x === undefined || x === null) {
	    ...
	}

另一种在实际中使用的方法是认为undefined 和 null 都是[false](#sect_truthy_falsy)：

	if (!x) {
	    ...
	}

**警告：**false，0，NaN 和 “” 都被当作false。

###包装类型（Wrapper types）

对象类型的实例Foo（包括内建类型，例如Array和其他自定义类型）从对象Foo.prototype上获取方法。你可以通过读这个方法但不调用它的方式验证这点：

	> [].push === Array.prototype.push
	  true

相反，原始类型是没有类型的，所以每个原始类型有一个关联类型，称之为包装类型：

- 布尔值的包装类型是 Boolean。布尔值从Boolean.prototype上获取方法：

		> true.toString === Boolean.prototype.toString
	  	true
 

  注意包装类型的名字首个字母是大写的B。如果在JavaScript中布尔值的类型可以访问，那么它可能会被成为布尔对象。
- 数字值的包装类型是Number。
- 字符串值的包装类型是String。


包装类型也有实例（他们的实例是对象），但不常用。相反，包装类型有其他用处：如果你将他们作为函数调用，他们可以将值转换为原始类型。

	> Number('123')
	  123
	> String(true)
	  'true'

###通过typeof 和 instanceof 将值分类（Categorizing values via typeof and instanceof）

有两个操作符可以用来将值分类：typeof 主要用来操作原始值，instanceof 主要用来造作对象。

**typeof** 使用方法如下：

	typeof «value»

它返回描述 value “类型”的一个字符串。例如：

	> typeof true
	  'boolean'
	> typeof 'abc'
	  'string'
	> typeof {} // 空对象字面量
	  'object'
	> typeof [] // 空数组字面量
	  'object'

下标列出了所有typeof的结果：
 
<table class="table">
<tbody>
<tr>
<td><strong>操作数</strong></td>
<td><strong>结果</strong></td>
</tr>
<tr>
<td><tt>undefined</tt></td>
<td><tt>'undefined'</tt></td>
</tr>
<tr>
<td><tt>null</tt></td>
<td><tt>'object'</tt></td>
</tr>
<tr>
<td>Boolean value</td>
<td><tt>'boolean'</tt></td>
</tr>
<tr>
<td>Number value</td>
<td><tt>'number'</tt></td>
</tr>
<tr>
<td>String value</td>
<td><tt>'string'</tt></td>
</tr>
<tr>
<td>Function</td>
<td><tt>'function'</tt></td>
</tr>
<tr>
<td>All other values</td>
<td><tt>'object'</tt></td>
</tr>
</tbody>
</table>

有两个东西和我们所说的原始值和对象是矛盾的：

- 函数的类型是“function”而不是“object”。鉴于函数（类型为“function”）是对象（类型是对象）的子类型，这不是一个错误。
- null的类型是“object”。这是一个bug，但从没被修复，因为修复后会破坏现有的代码。


**instanceof**使用方法如下：

	«value» instanceof «Constr»

如果 value 是一个对象，并且value 是由构造函数Constr创建的（考虑：类）。例如：

	> var b = new Bar();  // 通过构造函数Bar创建对象
	> b instanceof Bar
	  true
	> {} instanceof Object
	  true
	> [] instanceof Array
	  true
	> [] instanceof Object  // 数字是对象的子类型
	  true
 

###深入阅读

- [Categorizing values in JavaScript](http://www.2ality.com/2013/01/categorizing-values.html)
- [Improving the JavaScript typeof operator](http://www.2ality.com/2011/11/improving-typeof.html)
- [探索javascript中null和undefined的深渊](http://yanhaijing.com/javascript/2014/01/05/exploring-the-abyss-of-null-and-undefined-in-javascript)

<h2 id="sect_booleans">布尔（Booleans）</h2>

布尔类型原始值包括true和false。下面的操作符产生布尔值：

- 二元逻辑运算符：&&（与），||（或）
- 前缀逻辑运算符：!（非）
- 等值运算符：=== !== == !=
- 比较运算符（字符串或数字）：> >= < <=


<h3 id="sect_truthy_falsy">真值和假值（Truthy and falsy）</h3>

每当JavaScript希望一个布尔值时（例如：if语句的条件），可以使用任何值。它将被理解（转换）为true或false。下面的值被理解为false：

- undefined, null
- 布尔: false
- 数字: -0, NaN
- 字符串: ''

所有其他值被认为true。被理解为false的值成为假值（falsy），被理解为true的值成为真值（truthy）。可以使用Boolean作为函数测试值被理解为什么。

	> Boolean(undefined)
	  false
	> Boolean(0)
	  false
	> Boolean(3)
	  true

###二元逻辑运算符（Binary logical operators）

JavaScript中的二元逻辑运算符是短路运算——如果第一个操作数可以确定结果，第二个操作数将不被验证。例如，在下面的代码中，函数foo()不会被调用。

	false && foo()
	true  || foo()

此外，二元逻辑运算符返回操作数中的一个——可能是一个布尔值，也可能不是。一张真值表用来决定返回哪个值：

- 与：如果第一个操作数是假值，返回第一个。否则返回第二个操作数。

		> NaN && 'abc'
		  NaN
		> 123 && 'abc'
		  'abc'

- 或：如果第一个操作数是真值，返回第一个。否则，返回第二个操作数。

		> 'abc' || 123
		  'abc'
		> '' || 123
		  123
 

###等值运算符（Equality operators）

在JavaScript中检测相等，你可以使用严格相等（===）和严格不等（!==）。或者你也可以使用非严格相等（==）和非严格不等（!=）。经验规则：总是用严格运算符，假装非严格运算符不存在。严格相等更安全。

###深入阅读

- [Equality in JavaScript: === versus ==](http://www.2ality.com/2011/06/javascript-equality.html)
- [在JavaScript中什么时候使用==是正确的？](http://yanhaijing.com/javascript/2014/04/25/strict-equality-exemptions)

<h2 id="sect_numbers">数字（Numbers）</h2>

JavaScript中的所有数字都是浮点型（虽然大部分的JavaScript引擎内部也使用整数）。至于为什么这样设计，查看这里（[每一个JavaScript开发者应该了解的浮点知识](http://yanhaijing.com/javascript/2014/03/14/what-every-javascript-developer-should-know-about-floating-points)）。

	> 1 === 1.0
	  true
 

特殊数字：

- NaN (“不是一个数字 not a number”): 错误值。

		> Number('xyz')  // 'xyz' 不能被转换为数字
		  NaN

- Infinity：也是最大错误值（溢出）.

		> 3 / 0
		  Infinity
		> Math.pow(2, 1024)  // 数字太大了
		  Infinity

  Infinity 有时很有用，因为它比任何其他数字都大。同样，-Infinity 比其他任何数字都小。
- JavaScript有[两个零](http://www.2ality.com/2012/03/signedzero.html)，+0 和 -0。它通常不让你看到，并简单将两个零都显示为0：

		> +0
		  0
		> -0
		  0
 

  因此最好假装只有一个零（正如我们看到假值时所做的那样：-0 和 +0 都是假值）。

###运算符（Operators）

JavaScript中有下列[算数运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)：

- 加: number1 + number2
- 减: number1 - number2
- 乘: number1 * number2
- 除: number1 / number2
- 求模: number1 % number2
- 自增: ++variable, variable++
- 自减: --variable, variable--
- 负值: -value
- 转换为数字: +value


全局对象[Math](#sect_math)通过函数提供更多算数运算操作。

JavaScript中也有[位运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)（例如：位与 &）。

###深入阅读

在2ality有[一系列](http://www.2ality.com/search/label/numbers)博文介绍这些内容，例如：

- [How numbers are encoded in JavaScript](http://www.2ality.com/2012/04/number-encoding.html)
- [JavaScript’s two zeros](http://www.2ality.com/2012/03/signedzero.html)
- [Integers and shift operators in JavaScript](http://www.2ality.com/2012/02/js-integers.html)
- [NaN and Infinity in JavaScript](http://www.2ality.com/2012/02/nan-infinity.html)
- [Working with large integers in JavaScript](http://www.2ality.com/2012/07/large-integers.html)

<h2 id="sect_strings">字符串（Strings）</h2>

字符串可以直接通过字符串字面量创建。这些字面量被单引号或双引号包裹。反斜线（\\）转义字符并且产生一些控制字符。例如：

	'abc'
	"abc"
	
	'Did she say "Hello"?'
	"Did she say \"Hello\"?"
	
	'That\'s nice!'
	"That's nice!"
	
	'Line 1\nLine 2'  // 换行
	'Backlash: \\'

可以通过方括号访问单个字符：

	> var str = 'abc';
	> str[1]
	  'b'

length属性是字符串的字符数量。

	> 'abc'.length
	  3

**提醒：**字符串是不可变的，如果你想改变现有字符串，你需要创建一个行的字符串。

###字符串运算符（String operators）

字符串可以通过加号操作符（+）拼接，如果其中一个操作数为字符串，会将另一个操作数也转换为字符串。

	> var messageCount = 3;
	> 'You have '+messageCount+' messages'
	  'You have 3 messages'

连续执行拼接操作可以使用 += 操作符：

	> var str = '';
	> str += 'Multiple ';
	> str += 'pieces ';
	> str += 'are concatenated.';
	> str
	  'Multiple pieces are concatenated.'

###字符串方法（String methods）

 字符串有许多有用的[方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype)。例如：

	> 'abc'.slice(1)  // 复制子字符串
	  'bc'
	> 'abc'.slice(1, 2)
	  'b'
	
	> '\t xyz  '.trim()  // 移除空白字符
	  'xyz'
	
	> 'mjölnir'.toUpperCase()
	  'MJÖLNIR'
	
	> 'abc'.indexOf('b')  // 查找字符串
	  1
	> 'abc'.indexOf('x')
	  -1

###深入阅读

- [String concatenation in JavaScript](http://www.2ality.com/2011/10/string-concatenation.html)
- [JavaScript: single quotes or double quotes?](http://www.2ality.com/2012/09/javascript-quotes.html)

<h2 id="sect_statements">语句（Statements）</h2>

###条件（Conditionals）

if语句通过布尔条件决定执行那个分支：

    if (myvar === 0) {
        // then
    }

    if (myvar === 0) {
        // then
    } else {
        // else
    }

    if (myvar === 0) {
        // then
    } else if (myvar === 1) {
        // else-if
    } else if (myvar === 2) {
        // else-if
    } else {
        // else
    }
 

下面的switch语句，furit的值决定那个分支被执行。

    switch (fruit) {
        case 'banana':
            // ...
            break;
        case 'apple':
            // ...
            break;
        default:  // 所有其他情况
            // ...
    }
 

###循环（Loops）

for 循环的格式如下：

	for(初始化; 当条件成立时循环; 下一步操作)

例子：

    for (var i=0; i < arr.length; i++) {
        console.log(arr[i]);
    }

当条件成立时while循环继续循环它的循环体。

    // 和上面的for循环相等
    var i = 0;
    while (i < arr.length) {
        console.log(arr[i]);
        i++;
    }

当条件成立时，do-while循环继续循环。由于条件位于循环体之后，所以循环体总是被至少至少执行一次。

    do {
        // ...
    } while(条件);
 

**在所有的循环中：**

- break中断循环
- continue开始一个新的循环迭代

<h2 id="sect_functions">函数（Functions）</h2>

定义函数的一种方法是通过函数声明：

    function add(param1, param2) {
        return param1 + param2;
    }

上面的代码定义一个名称叫做add的函数，有两个参数param1和param2，并且返回参数的和。下面是你如何调用这个函数：

    > add(6, 1)
      7
    > add('a', 'b')
      'ab'

另一种定义add()函数的方法是通过函数表达式：

    var add = function (param1, param2) {
        return param1 + param2;
    };

函数表达式产生一个值，因此可以直接将函数作为参数传递给其他函数：

	someOtherFunction(function (p1, p2) { ... });

###函数声明提升（Function declarations are hoisted）

函数声明会被提升，他们全被移动到当前作用域开始之处。这允许你在函数声明之前调用它们：

    function foo() {
        bar();  // 没问题，bar被提升
        function bar() {
            ...
        }
    }

注意：虽然变量声明也会被[提升](#sect_var_scope_closures)，但赋值的过程不会被提升：

    function foo() {
        bar();  // 有问题，bar是undefined
        var bar = function () {
            // ...
        };
    }

###特殊变量arguments（The special variable arguments）

在JavaScript中你可以调用任意函数并传递任意数量的参数——语言绝不会抱怨。那可以工作，然而，使所有参数可访问需要通过特殊变量 arguments。arguments 看起来像数组，但它没有数组的方法。

    > function f() { return arguments }
    > var args = f('a', 'b', 'c');
    > args.length
    3
    > args[0]  // 获取索引为0的元素
    'a'

###太多或太少参数（Too many or too few arguments）

让我们通过下面的函数探索JavaScript中传递太多或太少参数时如何处理（函数 toArray在[后面提到](#sect_toarray)）

    function f(x, y) {
        console.log(x, y);
        console.log(toArray(arguments));
    }

多出的参数将被忽略（可以通过arguments访问）：

    > f('a', 'b', 'c')
    a b
    [ 'a', 'b', 'c' ]

缺少的参数将是undefined：

    > f('a')
    a undefined
    [ 'a' ]
    > f()
    undefined undefined
    []

###可选参数（Optional parameters）

下面是一个常见模式，给参数设置默认值：

    function pair(x, y) {
        x = x || 0;  // (*)
        y = y || 0;
        return [ x, y ];
    }

在（\*）这行，如果x是真值（除了：null，undefined 等），||操作符返回x。否则，它返回第二个操作数。

    > pair()
    [ 0, 0 ]
    > pair(3)
    [ 3, 0 ]
    > pair(3, 5)
    [ 3, 5 ] 

###强制数量（Enforcing an arity）

如果你想强制参数的数量，你可以检测arguments.length：

    function pair(x, y) {
        if (arguments.length !== 2) {
            throw new Error('Need exactly 2 arguments');
        }
        ...
    }

<h3 id="sect_toarray">将arguments 转换为数组（Converting arguments to an array）</h3>

arguments 不是一个数组，它仅仅是[类数组](http://www.2ality.com/2013/05/quirk-array-like-objects.html)（array-like）：它有一个length属性，并且你可以通过方括号索引方式访问它的元素。然而，你不能移除元素，或在它上面调用任何数组方法。因此，有时你需要将其转换为数组。这就是下面函数的作用。

    function toArray(arrayLikeObject) {
        return [].slice.call(arrayLikeObject);
    }
 
###深入阅读

- [JavaScript quirk 5: parameter handling](http://www.2ality.com/2013/05/quirk-parameters.html)

<h2 id="sect_exceptions">异常处理（Exception handling）</h2>

[异常处理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)最常见的方式像下面这样：

    function throwException() {
        throw new Error('Problem!');
    }

    try {
        throwException();
    } catch (e) {
        console.log(e);  // 错误：信息
        console.log(e.stack);  // 非标准，但大部分浏览器支持
    }

try分支包裹易出错的代码，如果try分支内部抛出异常，catch分支将会执行。

###深入阅读

- [Subtyping JavaScript builtins in ECMAScript 5 [especially relevant for errors]](http://www.2ality.com/2011/12/subtyping-builtins.html)

##严格模式（Strict mode）

[严格模式](http://www.2ality.com/2011/01/javascripts-strict-mode-summary.html)开启检测和一些其他措施，是JavaScript变成更整洁的语言。推荐使用严格模式。为了开启严格模式，只需在JavaScript文件或script标签第一行添加如下语句：

	'use strict';

你也可以在每个函数上选择性开启严格模式，只需将上面的代码放在函数的开头：

    function functionInStrictMode() {
        'use strict';
    }

下面的两小节看下严格模式的三大好处。

###明确错误（Explicit errors）

让我们看一个例子，严格模式给我们明确的错误，否则JavaScript总是静默失败：下面的函数 f() 执行一些非法操作，它试图更改所有字符串都有的只读属性——length：

    function f() {
        'abc'.length = 5;
    }

当你调用上面的函数，它静默失败，赋值操作被简单忽略。让我们将 f() 在严格模式下运行：

    function f_strict() {
        'use strict';
        'abc'.length = 5;
    }

现在浏览器报给我们一些错误：

    > f_strict()
    TypeError: Cannot assign to read only property 'length' of abc

###不是方法的函数中的this（this in non-method functions）

在严格模式下，不作为方法的函数中的this值是undefined：

    function f_strict() {
        'use strict';
        return this;
    }
    console.log(f_strict() === undefined);  // true

在非严格模式下，this的值是被称作全局对象（global object）（在浏览器里是window）：

    function f() {
        return this;
    }
    console.log(f() === window);  // true

###不再自动创建全局变量（No auto-created global variables）

在非严格模式下，如果你给不存在的变量赋值，JavaScript会自动创建一个全局变量：    

    > function f() { foo = 5 }
    > f()  // 不会报错
    > foo
    5

在严格模式下，这会产生一个错误：

    > function f_strict() { 'use strict'; foo2 = 4; }
    > f_strict()
    ReferenceError: foo2 is not defined

###深入阅读

- [JavaScript’s strict mode: a summary](http://www.2ality.com/2011/01/javascripts-strict-mode-summary.html)
- [揭秘javascript中谜一样的this](http://yanhaijing.com/javascript/2013/12/28/demystifying-this-in-javascript)
- [JavaScript中的this关键字](http://yanhaijing.com/javascript/2014/04/30/javascript-this-keyword)

<h2 id="sect_var_scope_closures">变量作用域和闭包（Variable scoping and closures）</h2>

在JavaScript中，你必须通过var声明变量，在你使用它们之前：

    > var x;
    > x = 3;
    > y = 4;
    ReferenceError: y is not defined

你可以用一条var语句声明和初始化多个变量：

	var x = 1, y = 2, z = 3;

但我建议每个变量使用一条语句。因此，我将上面的语句重写为：

    var x = 1;
    var y = 2;
    var z = 3;

由于提升（见下文），最好在函数顶部声明变量。

###变量和函数作用域（Variables are function-scoped）

变量的作用域总是整个函数（没有块级作用域）。例如：

    function foo() {
        var x = -3;
        if (x < 0) {  // (*)
            var tmp = -x;
            ...
        }
        console.log(tmp);  // 3
    }

我们可以看到tmp变量不仅在（\*）所在行的语句块，它在整个函数内都存在。

###变量提升（Variables are hoisted）

变量声明会被提升：声明会被移到函数的顶部，但赋值过程不会。举个例子，在下面的函数中（\*）行位置声明了一个变量。

    function foo() {
        console.log(tmp); // undefined
        if (false) {
            var tmp = 3;  // (*)
        }
    }

在内部，上面的函数被执行像下面这样：

    function foo() {
        var tmp;  // declaration is hoisted
        console.log(tmp);
        if (false) {
            tmp = 3;  // assignment stays put
        }
    }

<h3 id="sect_closures">闭包（Closures）</h3>

每个函数保持和函数体内部变量的连接，甚至离开创建它的作用域之后。例如：

    function createIncrementor(start) {
        return function () {  // (*)
            return start++;
        }
    }

在（\*）行开始的函数在它创建时保留上下文，并在内部保存一个start活动值：

    > var inc = createIncrementor(5);
    > inc()
    5
    > inc()
    6
    > inc()
    7

闭包是一个函数加上和其作用域链的链接。因此，createIncrementor() 返回的是一个闭包。

###IIFE：模拟块级作用域（IIFE: Simulating block scoping）

有时你想模拟一个块，例如你想将变量从全局作用域隔离。完成这个工作的模式叫做 IIFE(立即执行函数表达式(Immediately Invoked Function Expression))：

    (function () {  // 块开始
        var tmp = ...;  // 非全局变量
    }());  // 块结束

上面你会看到函数表达式被立即执行。外面的括号用来阻止它被解析成函数声明；只有函数表达式能被立即调用。函数体产生一个新的作用域并使 tmp 变为局部变量。

###闭包实现变量共享（Inadvertent sharing via closures）

下面是个经典问题，如果你不知道它那它会让你费尽思量。因此，先浏览下，先对问题有个大概的了解。

闭包保持和外部变量的连接，有时可能和你想像的行为不一致：

    var result = [];
    for (var i=0; i < 5; i++) {
        result.push(function () { return i });  // (*)
    }
    console.log(result[1]()); // 5 (不是 1)
    console.log(result[3]()); // 5 (不是 3)

(\*)行的返回值总是当前的i值，而不是当函数被创建时的i值。当循环结束后，i的值是5，这是为什么数组中的所有函数的返回值总是一样的。如果你想捕获当前变量的快照，你可以使用 IIFE：

    for (var i=0; i < 5; i++) {
        (function (i2) {
            result.push(function () { return i2 });
        }(i));  // 复制当前的i
    }

###深入阅读

- [Variable declarations: three rules you can break](http://www.2ality.com/2012/11/var-statement-rules.html)
- [JavaScript quirk 6: the scope of variables](http://www.2ality.com/2013/05/quirk-variable-scope.html)
- [JavaScript quirk 7: inadvertent sharing of variables via closures](http://www.2ality.com/2013/05/quirk-closures.html)
- [认识javascript中的作用域和上下文](http://yanhaijing.com/javascript/2013/08/30/understanding-scope-and-context-in-javascript)
- [JavaScript的作用域和提升机制](http://yanhaijing.com/javascript/2014/04/30/JavaScript-Scoping-and-Hoisting)
- [了解JavaScript的执行上下文](http://yanhaijing.com/javascript/2014/04/29/what-is-the-execution-context-in-javascript)

<h2 id="sect_objects">对象和继承（Objects and inheritance）</h2>

和所有的[值类型](#sect_values)一样，对象有属性。事实上，你可以将对象当作一组属性的集合，每个属性是一对（键和值）。键是字符串，值可以是任意JavaScript值。到目前为止，我们仅仅见过键是[标识符](#identifiers)的属性，因为点操作符处理的键必须为标识符。在这节，你讲见到另一种方法属性的方法，能将任意字符串作为键。

###单个对象（Single objects）

在JavaScript中，你可以直接创建对象，通过对象字面量：

    var jane = {
        name: 'Jane',

        describe: function () {
            'use strict';
            return 'Person named '+this.name;
        }
    };

上面的对象有两个属性：name 和 describe。你能读（“get”）和 写（“set”）属性：

    > jane.name  // get
    'Jane'
    > jane.name = 'John';  // set
    > jane.newProperty = 'abc';  // 自动创建

属性是函数如 describe 可以被当作方法调用。当调用他们时可以在它们内部通过this引用对象。

    > jane.describe()  // 调用方法
    'Person named John'
    > jane.name = 'Jane';
    > jane.describe()
    'Person named Jane'

in 操作符用来检测一个属性是否存在：

    > 'newProperty' in jane
    true
    > 'foo' in jane
    false

你若你读取一个不存在的属性，你将得到undefined值。因此上面的两个检查也可以像下面这样：

    > jane.newProperty !== undefined
    true
    > jane.foo !== undefined
    false

delete操作符用来删除一个属性：

    > delete jane.newProperty
    true
    > 'newProperty' in jane
    false

###任意键属性（Arbitrary property keys）

属性的键可以是任意字符串。到目前为止，我们看到的对象字面量中的和点操作符后的属性关键字。按这种方法你只能使用[标识符](#identifiers)。如果你想用其他任意字符串作为键名，你必须在对象字面量里加上引号，并使用方括号获取和设置属性。

    > var obj = { 'not an identifier': 123 };
    > obj['not an identifier']
    123
    > obj['not an identifier'] = 456;

方括号允许你动态计算属性关键字：

    > var x = 'name';
    > jane[x]
    'Jane'
    > jane['na'+'me']
    'Jane'

###引用方法（Extracting methods）

如果你引用一个方法，它将失去和对象的连接。就其本身而言，函数不是方法，其中的this值为undefined（严格模式下）。

    > var func = jane.describe;
    > func()
    TypeError: Cannot read property 'name' of undefined

解决办法是使用函数内置的bind()方法。它创建一个新函数，其this值固定为给定的值。

    > var func2 = jane.describe.bind(jane);
    > func2()
    'Person named Jane'

###方法内部的函数（Functions inside a method）

每个函数都有一个特殊变量this。如果你在方法内部嵌入函数是很不方便的，因为你不能从函数中访问方法的this。下面是一个例子，我们调用forEach循环一个数组：

    var jane = {
        name: 'Jane',
        friends: [ 'Tarzan', 'Cheeta' ],
        logHiToFriends: function () {
            'use strict';
            this.friends.forEach(function (friend) {
                // 这里的“this”是undefined
                console.log(this.name+' says hi to '+friend);
            });
        }
    }

调用 logHiToFriends 会产生错误：

    > jane.logHiToFriends()
    TypeError: Cannot read property 'name' of undefined

有两种方法修复这问题。

\#1：将this存储在不同的变量。

    logHiToFriends: function () {
        'use strict';
        var that = this;
        this.friends.forEach(function (friend) {
            console.log(that.name+' says hi to '+friend);
        });
    }

\#2：forEach的第二个参数允许提供this值。

    logHiToFriends: function () {
        'use strict';
        this.friends.forEach(function (friend) {
            console.log(this.name+' says hi to '+friend);
        }, this);
    }

在JavaScript中函数表达式经常被用作函数参数。时刻小心函数表达式中的this。

<h3 id="sect_constructors">构造函数：对象工厂（Constructors: factories for objects）</h3>

目前为止，你可能认为JavaScript的对象仅是键值的映射，通过JavaScript对象字面量可以得出这个观点，看起来很像其他语言中的地图/字典（map/dictionary）。然而，JavaScript对象也支持真正意义上的面向对象特性：继承（inheritance）。本节会完全讲解JavaScript中继承的工作原理，但会给你以此为开始的简单模式。如果你想得到更多知识，请查阅这篇文章“[JavaScript inheritance by example](http://www.2ality.com/2012/01/js-inheritance-by-example.html)”。

除了作为“真正”的函数和方法，函数还在JavaScript中扮演第三种角色：如果通过new操作符调用，他们会变为构造函数，对象的工厂。构造函数是对其他语言中的类的粗略模拟。约定俗称，构造函数的第一个字母大写。例如：

    // 设置实例数据
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    // 方法
    Point.prototype.dist = function () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };

我们看到构造函数分为两部分：首先，Point函数设置实例数据。其次，Point.prototype属性包含对象的方法。前者的数据是每个实例私有的，后面的数据是所有实例共享的。

我们通过new操作符调用Point：

    > var p = new Point(3, 5);
    > p.x
    3
    > p.dist()
    5.830951894845301

p是Point的一个实例：

    > p instanceof Point
    true
    > typeof p
    'object'

###深入阅读

- [The pitfalls of using objects as maps in JavaScript](http://www.2ality.com/2012/01/objects-as-maps.html) [important, read soon]
- [JavaScript inheritance by example](http://www.2ality.com/2012/01/js-inheritance-by-example.html)
- [Object properties in JavaScript](http://www.2ality.com/2012/10/javascript-properties.html) [advanced: each property has attributes that determine whether it is writable, etc.]
- [Private data for objects in JavaScript](http://www.2ality.com/2012/03/private-data.html)
- [Javascript继承 原型的陷阱](http://yanhaijing.com/javascript/2013/08/23/javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes)
- [Javascript 封装问题](http://yanhaijing.com/javascript/2013/08/30/encapsulation-of-javascript)

<h2 id="sect_arrays">数组（Arrays）</h2>

数组是数组元素的序列，能通过整数索引方法数组元素，数组索引从0开始。

###数组字面量（Array literals）

数组字面量创建数组很方便：

	> var arr = [ 'a', 'b', 'c' ];

上面的数组有三个元素：分别是字符串“a”，“b”， “c”。你可以通过整数索引访问它们：

    > arr[0]
    'a'
    > arr[0] = 'x';
    > arr
    [ 'x', 'b', 'c' ]

length属性总表示一个数组有多少项元素。

    > arr.length
    3

除此之外它也可以用来从数组上移除尾部元素：

    > arr.length = 2;
    > arr
    [ 'x', 'b' ]

in操作符也可以在数组上工作。

    > 1 in arr // arr在索引为1处是否有元素？
    true
    > 5 in arr // arr在索引为5处是否有元素？
    false

值得注意的是数组是对象，因此可以有对象属性：

    > arr.foo = 123;
    > arr.foo
    123

###数组方法（Array methods）

数组有许多[方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)。举些例子：

    > var arr = [ 'a', 'b', 'c' ];

    > arr.slice(1, 2)  // 复制元素
    [ 'b' ]
    > arr.slice(1)
    [ 'b', 'c' ]

    > arr.push('x')  // 在末尾添加一个元素
    4
    > arr
    [ 'a', 'b', 'c', 'x' ]

    > arr.pop()  // 移除最后一个元素
    'x'
    > arr
    [ 'a', 'b', 'c' ]

    > arr.shift()  // 移除第一个元素
    'a'
    > arr
    [ 'b', 'c' ]

    > arr.unshift('x')  // 在前面添加一个元素
    3
    > arr
    [ 'x', 'b', 'c' ]

    > arr.indexOf('b')  // 查找给定项在数组中的索引，若不存在返回-1
    1
    > arr.indexOf('y') 
    -1

    > arr.join('-')  // 将元素拼接为一个字符串
    'x-b-c'
    > arr.join('')
    'xbc'
    > arr.join()
    'x,b,c'

###遍历数组（Iterating over arrays）

有几种方法可以遍历数组元素。其中两个最重要的是 forEach 和 map。

forEach遍历整个数组，并将当前元素和它的索引传递给一个函数：

    [ 'a', 'b', 'c' ].forEach(
        function (elem, index) {  // (*)
            console.log(index + '. ' + elem);
        });

上面代码的输出

    0. a
    1. b
    2. c

注意（\*）行的函数参数是可省略的。例如：它可以只有一个参数 elem。

map创建一个新数组，通过给每个存在数组元素应用一个函数：

    > [1,2,3].map(function (x) { return x*x })
    [ 1, 4, 9 ]

###深入阅读

- [Arrays in JavaScript](http://www.2ality.com/2012/12/arrays.html)
- [JavaScript quirk 8: array-like objects](http://www.2ality.com/2013/05/quirk-array-like-objects.html)
- [有趣的javascript原生数组函数](http://yanhaijing.com/javascript/2014/01/17/fun-with-javascript-native-array-functions)

<h2 id="sect_regexp">正则表达式（Regular expressions）</h2>

JavaScript内建支持正则表达式。他们被双斜线分隔：

    /^abc$/
    /[A-Za-z0-9]+/

###方法 test()：测试是否匹配（Method test(): is there a match?）

    > /^a+b+$/.test('aaab')
    true
    > /^a+b+$/.test('aaa')
    false

###方法 exec()：匹配和捕获组（Method exec(): match and capture groups）

    > /a(b+)a/.exec('_abbba_aba_')
    [ 'abbba', 'bbb' ]

返回的数组第一项（索引为0）是完整匹配，捕获的第一个分组在第二项（索引为1），等。[有一种方法](http://www.2ality.com/2011/04/javascript-overview-of-regular.html)可以反复调用获取所有匹配。

###方法 replace()：搜索并替换（Method replace(): search and replace）

    > '<a> <bbb>'.replace(/<(.*?)>/g, '[$1]')
    '[a] [bbb]'

replace的第一个参数必须是正则表达式，并且开启全局搜索（/g 标记），否则仅第一个匹配项会被替换。有[一种方法](http://www.2ality.com/2011/04/javascript-overview-of-regular.html)使用一个函数来计算替换项。

###深入阅读

- [JavaScript: an overview of the regular expression API](http://www.2ality.com/2011/04/javascript-overview-of-regular.html)
- [JavaScript Regular Expression Enlightenment](http://tech.pro/tutorial/1214/javascript-regular-expression-enlightenment) [by Cody Lindley]

<h2 id="sect_math">数学（Math）</h2>

[Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)是一个有算数功能的对象。例如：

    > Math.abs(-2)
    2

    > Math.pow(3, 2)  // 3^2
    9

    > Math.max(2, -1, 5)
    5

    > Math.round(1.9)
    2

    > Math.cos(Math.PI)  // 预定义常量π
    -1

<h2 id="sect_standard_library">标准库的其他功能（Other functionality of the standard library）</h2>

JavaScript标准库相对简单，但有很多其他东西你可以使用：

- [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)：日期构造函数，主要功能有转换和创建日期字符串，访问日期组成部分（年，小时等）。
- [JSON](http://www.2ality.com/2011/08/json-api.html)：一个对象，功能是转换和生成JSON数据。
- [console.*](https://developer.mozilla.org/en-US/docs/Web/API/console) 方法：浏览器的具体方法，不是语言成分的部分，但他们也可以在[Node.js](http://nodejs.org/api/stdio.html)中工作。

<h2 id="sect_learn_next">下一步学什么？</h2>

在你学会了这篇文章的基础教程后，你可以转到大部分章节末尾提到的高级教程。此外，我建议你看下面的资源：

- Style guides: I have written a [guide to style guides](http://www.2ality.com/2013/07/meta-style-guide.html).
- [Underscore.js](http://underscorejs.org/): 一个弥补JavaScript标准库缺少的功能的库
- [JSbooks – free JavaScript books](http://jsbooks.revolunet.com/)
- [Frontend rescue: how to keep up to date on frontend technologies](http://uptodate.frontendrescue.org/)
- [http://yanhaijing.com](http://yanhaijing.com/) 当然还有我的博客也非常不错哦
- [http://yanhaijing.com/es5 ](http://yanhaijing.com/es5)如果你想成为高手，我建议阅读ecmascript 规范
- [给javascript初学者的24条最佳实践](http://yanhaijing.com/javascript/2013/12/11/24-JavaScript-best-practices-for-beginners)
- [我希望我知道的七个JavaScript技巧](http://yanhaijing.com/javascript/2014/04/23/seven-javascript-quirks-i-wish-id-known-about)

##欢迎反馈

我尝试找到JavaScript的一个最理想子集。我成功了吗？需要增删一些东西吗？如果你是一个JavaScript新手，我特别想听听你的意见：当读这篇文章的时候是非常容易理解吗？或是你在某些地方卡住？

##注

原文：http://www.2ality.com/2013/06/basic-javascript.html
