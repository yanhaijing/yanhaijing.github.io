---
layout: post
title: JavaScript里的依赖注入
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 迟早你需要用到其他开发人员的抽象成果——即你依靠别人的代码。我喜欢依赖自由（无依赖）的模块，但那是难以实现的。甚至你创建的那些漂亮的黑盒子组件也或多或少会依赖一些东西。这正是依赖注入大显身手的之处。现在有效地管理依赖的能力是绝对必要的。本文总结了我对问题探索和一些的解决方案。
---
{% include JB/setup %}

我喜欢引用这句话，“程序是对复杂性的管理”。计算机世界是一个巨大的抽象建筑群。我们简单的包装一些东西然后发布新工具，周而复始。现在思考下，你所使用的语言包括的一些内建的抽象函数或是低级操作符。这在JavaScript里是一样的。

迟早你需要用到其他开发人员的抽象成果——即你依靠别人的代码。我喜欢依赖自由（无依赖）的模块，但那是难以实现的。甚至你创建的那些漂亮的黑盒子组件也或多或少会依赖一些东西。这正是依赖注入大显身手的之处。现在有效地管理依赖的能力是绝对必要的。本文总结了我对问题探索和一些的解决方案。

## 目标 ##

设想我们有两个模块。第一个是负责Ajax请求服务（`service`），第二个是路由（`router`）。

	var service = function() {
	    return { name: 'Service' };
	}
	var router = function() {
	    return { name: 'Router' };
	}
	我们有另一个函数需要用到这两个模块。
	
	var doSomething = function(other) {
	    var s = service();
	    var r = router();
	};
为使看起来更有趣，这函数接受一个参数。当然，我们完全可以使用上面的代码，但这显然不够灵活。如果我们想使用`ServiceXML`或`ServiceJSON`呢,或者如果我们需要一些测试模块呢。我们不能仅靠编辑函数体来解决问题。首先，我们可以通过函数的参数来解决依赖性。即：

	var doSomething = function(service, router, other) {
	    var s = service();
	    var r = router();
	};
我们通过传递额外的参数来实现我们想要的功能，然而，这会带来新的问题。想象如果我们的`doSomething` 方法散落在我们的代码中。如果我们需要更改依赖条件，我们不可能更改所有调用函数的文件。

我们需要一个能帮我们搞定这些的工具。这就是依赖注入尝试解决的问题。让我们写下一些我们的依赖注入解决办法应该达到的目标：

- 我们应该能够注册依赖关系
- 注入应该接受一个函数，并返回一个我们需要的函数
- 我们不能写太多东西——我们需要精简漂亮的语法
- 注入应该保持被传递函数的作用域
- 被传递的函数应该能够接受自定义参数，而不仅仅是依赖描述
- 堪称完美的清单，下面 让我们实现它。

## RequireJS / AMD的方法 ##

你可能对[RequireJS](http://requirejs.org/)早有耳闻，它是解决依赖注入不错的选择。

	define(['service', 'router'], function(service, router) {       
	    // ...
	});
这种想法是先描述需要的依赖，然后再写你的函数。这里参数的顺序很重要。如上所说，让我们写一个叫做`injector`的模块，能接受相同的语法。

	var doSomething = injector.resolve(['service', 'router'], function(service, router, other) {
	    expect(service().name).to.be('Service');
	    expect(router().name).to.be('Router');
	    expect(other).to.be('Other');
	});
	doSomething("Other");

> 再继续之前我应该解释清楚`doSomething`函数体内容，我使用[expect.js](https://github.com/LearnBoost/expect.js) （断言方面的库）仅是为了保证我写的代码的行为和我期望的是一样的，体现一点点TDD（测试驱动开发）方法。

下面开始我们的`injector`模块，这是非常棒的一个单例模式，所以它能在我们程序的不同部分工作的很好。

	var injector = {
	    dependencies: {},
	    register: function(key, value) {
	        this.dependencies[key] = value;
	    },
	    resolve: function(deps, func, scope) {
	
	    }
	}
这是一个非常简单的对象，有两个方法，一个用来存储的属性。我们要做的是检查`deps`数组并在`dependencies`变量中搜索答案。剩下的只是调用`.apply`方法并传递之前的`func`方法的参数。

	resolve: function(deps, func, scope) {
	    var args = [];
	    for(var i=0; i<deps.length, d=deps[i]; i++) {
	        if(this.dependencies[d]) {
	            args.push(this.dependencies[d]);
	        } else {
	            throw new Error('Can\'t resolve ' + d);
	        }
	    }
	    return function() {
	        func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
	    }        
	}
`scope`是可选的，`Array.prototype.slice.call(arguments, 0)`是必须的，用来将`arguments`变量转换为真正的数组。到目前为止还不错。我们的测试通过了。这种实现的问题是，我们需要写所需部件两次，并且我们不能混淆他们的顺序。附加的自定义参数总是位于依赖之后。

## 反射方法 ##

根据维基百科的定义反射是指一个程序在运行时检查和修改一个对象的结构和行为的能力。简单的说，在JavaScript的上下文里，这具体指读取和分析的对象或函数的源代码。让我们完成文章开头提到的`doSomething`函数。如果你在控制台输出`doSomething.tostring()`。你将得到如下的字符串：

	"function (service, router, other) {
	    var s = service();
	    var r = router();
	}"
通过此方法返回的字符串给我们遍历参数的能力，更重要的是，能够获取他们的名字。这其实是[Angular](http://angularjs.org/) 实现它的依赖注入的方法。我偷了一点懒，直接截取Angular代码中获取参数的正则表达式。

	/^function\s*[^\(]*\(\s*([^\)]*)\)/m
我们可以像下面这样修改`resolve` 的代码：

	resolve: function() {
	    var func, deps, scope, args = [], self = this;
	    func = arguments[0];
	    deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
	    scope = arguments[1] || {};
	    return function() {
	        var a = Array.prototype.slice.call(arguments, 0);
	        for(var i=0; i<deps.length; i++) {
	            var d = deps[i];
	            args.push(self.dependencies[d] && d != '' ? self.dependencies[d] : a.shift());
	        }
	        func.apply(scope || {}, args);
	    }        
	}
我们执行正则表达式的结果如下：

	["function (service, router, other)", "service, router, other"]
看起来，我们只需要第二项。一旦我们清楚空格并分割字符串就得到`deps`数组。只有一个大的改变：

	var a = Array.prototype.slice.call(arguments, 0);
	...
	args.push(self.dependencies[d] && d != '' ? self.dependencies[d] : a.shift());
我们循环遍历`dependencies`数组，如果发现缺失项则尝试从`arguments`对象中获取。谢天谢地，当数组为空时，`shift`方法只是返回`undefined`，而不是抛出一个错误（这得益于web的思想）。新版的`injector` 能像下面这样使用：

	var doSomething = injector.resolve(function(service, other, router) {
	    expect(service().name).to.be('Service');
	    expect(router().name).to.be('Router');
	    expect(other).to.be('Other');
	});
	doSomething("Other");
不必重写依赖并且他们的顺序可以打乱。它仍然有效，我们成功复制了Angular的魔法。

然而，这种做法并不完美，这就是反射类型注射一个非常大的问题。压缩会破坏我们的逻辑，因为它改变参数的名字，我们将无法保持正确的映射关系。例如，`doSometing()`压缩后可能看起来像这样：

	var doSomething=function(e,t,n){var r=e();var i=t()}
Angular团队提出的解决方案看起来像：

	var doSomething = injector.resolve(['service', 'router', function(service, router) {
	
	}]);
这看起来很像我们开始时的解决方案。我没能找到一个更好的解决方案，所以决定结合这两种方法。下面是`injector`的最终版本。

	var injector = {
	    dependencies: {},
	    register: function(key, value) {
	        this.dependencies[key] = value;
	    },
	    resolve: function() {
	        var func, deps, scope, args = [], self = this;
	        if(typeof arguments[0] === 'string') {
	            func = arguments[1];
	            deps = arguments[0].replace(/ /g, '').split(',');
	            scope = arguments[2] || {};
	        } else {
	            func = arguments[0];
	            deps = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].replace(/ /g, '').split(',');
	            scope = arguments[1] || {};
	        }
	        return function() {
	            var a = Array.prototype.slice.call(arguments, 0);
	            for(var i=0; i<deps.length; i++) {
	                var d = deps[i];
	                args.push(self.dependencies[d] && d != '' ? self.dependencies[d] : a.shift());
	            }
	            func.apply(scope || {}, args);
	        }        
	    }
	}
`resolve`访客接受两或三个参数，如果有两个参数它实际上和文章前面写的一样。然而，如果有三个参数，它会将第一个参数转换并填充`deps`数组，下面是一个测试例子：

	var doSomething = injector.resolve('router,,service', function(a, b, c) {
	    expect(a().name).to.be('Router');
	    expect(b).to.be('Other');
	    expect(c().name).to.be('Service');
	});
	doSomething("Other");
你可能注意到在第一个参数后面有两个逗号——注意这不是笔误。空值实际上代表“`Other`”参数（占位符）。这显示了我们是如何控制参数顺序的。

## 直接注入Scope ##

有时我会用到第三个注入变量，它涉及到操作函数的作用域（换句话说，就是`this`对象）。所以，很多时候不需要使用这个变量。

	var injector = {
	    dependencies: {},
	    register: function(key, value) {
	        this.dependencies[key] = value;
	    },
	    resolve: function(deps, func, scope) {
	        var args = [];
	        scope = scope || {};
	        for(var i=0; i<deps.length, d=deps[i]; i++) {
	            if(this.dependencies[d]) {
	                scope[d] = this.dependencies[d];
	            } else {
	                throw new Error('Can\'t resolve ' + d);
	            }
	        }
	        return function() {
	            func.apply(scope || {}, Array.prototype.slice.call(arguments, 0));
	        }        
	    }
	}
我们所做的一切其实就是将依赖添加到作用域。这样做的好处是，开发人员不用再写依赖性参数；它们已经是函数作用域的一部分。

	var doSomething = injector.resolve(['service', 'router'], function(other) {
	    expect(this.service().name).to.be('Service');
	    expect(this.router().name).to.be('Router');
	    expect(other).to.be('Other');
	});
	doSomething("Other");
## 结束语 ##

其实我们大部分人都用过依赖注入，只是我们没有意识到。即使你不知道这个术语，你可能在你的代码里用到它百万次了。希望这篇文章能加深你对它的了解。

在这篇文章中提到的例子都可以在[这里](https://github.com/krasimir/blog-posts/tree/master/JavaScriptDependencyInjection)找到。

## 译者注 ##

本文为译文，原文为“[Dependency Injection in JavaScript](http://flippinawesome.org/2014/01/20/dependency-injection-in-javascript/)”。

 