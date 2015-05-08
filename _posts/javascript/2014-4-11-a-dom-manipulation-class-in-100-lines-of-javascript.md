---
layout: post
title: 仅100行的JavaScript DOM操作类库
category : javascript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 如果你构建过Web引用程序，你可能处理过很多DOM操作。访问和操作DOM元素几乎是每一个Web应用程序的通用需求。我们我们经常从不同的控件收集信息，我们需要设置value值，修改div或span标签的内容。当然有许多库能帮助处理这些行为，其中最流行的当属jQuery，已经成为事实上的标准。有事你并不需要jQuery提供每一样东西，所以在这篇文章中，我们将看看如何创建自己的类库来操作DOM元素。
---
{% include JB/setup %}

如果你构建过Web引用程序，你可能处理过很多DOM操作。访问和操作DOM元素几乎是每一个Web应用程序的通用需求。我们我们经常从不同的控件收集信息，我们需要设置value值，修改div或span标签的内容。当然有许多库能帮助处理这些行为，其中最流行的当属jQuery，已经成为事实上的标准。有事你并不需要jQuery提供每一样东西，所以在这篇文章中，我们将看看如何创建自己的类库来操作DOM元素。

##API

身为开发者的我们每天都要做决定。我相信在测试驱动开发中，我真的非常喜欢的一个事实是它迫使你在开始实际编码之前必须做出设计决定。沿着这些思路，我想我想要的DOM操作类库的API最终看起来可能像这样：

	//返回 DOM 元素
	dom('.selector').el
	//返回元素的值/内容
	dom('.selector').val() 
	//设置元素的值/内容
	dom('.selector').val('value') 

这应该包括了大多数可能用到的操作。然而如何我们可以一次操作多个对象会显得个更好。如果能生成一个JavaScript对象，那将是伟大之举。

	//生成包装DOM元素的对象
	dom({
	    structure: {
	        propA: '.selector',
	        propB: '.selector'
	    },
	    propC: '.selector'
	}) 

一旦我们将元素存下来，我们能很容易对它们执行val方法。

	//检索DOM元素的值
	dom({
	    structure: {
	        propA: '.selector',
	        propB: '.selector'
	    },
	    propC: '.selector'
	}).val()

这将是将数据直接从DOM转换为JavaScript对象的有效方法。

现在我们心理已经清楚我们的API看起来的样子，我们类库代码看起来像下面这样：

	var dom = function(el) {
	    var api = { el: null }
	    api.val = function(value) {
	        // ...
	    }
	    return api;
	}

##作用域

很明显，我们打算使用类似getElementById，querySelector或querySelectorAll这样的方法。通常情况下，你可以像下面这样访问DOM：

	var header = document.querySelector('.header');

querySeletor是非常有趣的，例如，它不仅仅是document对象的方法，同时也是其他DOM元素的方法。这意味着，我们可以在特定上下文中运行查询。比如：

	<header>
	    <p>Big</p>
	</header>
	<footer>
	    <p>Small</p>
	</footer>
	
	var header = document.querySelector('header');
	var footer = document.querySelector('footer');
	console.log(header.querySelector('p').textContent); // Big
	console.log(footer.querySelector('p').textContent); // Small

我们能在特定的DOM树上操作，并且我们的类库应该支持传递作用域。所以，如果它接受一个父元素选择符是非常棒的。

	var dom = function(el, parent) {
	    var api = { el: null }
	    api.val = function(value) {
	        // ...
	    }
	    return api;
	}
 

##查询DOM元素

按照我们上面所说的，我们将使用querySelector和querySelectorAll查询DOM元素。让我们为这些函数创建两个快捷方式。

	var qs = function(selector, parent) {
	    parent = parent || document;
	    return parent.querySelector(selector);
	};
	var qsa = function(selector, parent) {
	    parent = parent || document;
	    return parent.querySelectorAll(selector);
	};

在那之后我们应该传递el参数。通常情况下将是一个(选择符)字符串，但我们也应该支持：

- DOM元素——类库的val方法会非常方便，所以我们可能需要使用已经引用的元素；
- JavaScript对象——为了创建包含多个DOM元素的JavaScript对象。

下面的switch包括这两种情况：

	switch(typeof el) {
	    case 'string':
	        parent = parent && typeof parent === 'string' ? qs(parent) : parent;
	        api.el = qs(el, parent);
	    break;
	    case 'object': 
	        if(typeof el.nodeName != 'undefined') {
	            api.el = el;
	        } else {
	            var loop = function(value, obj) {
	                obj = obj || this;
	                for(var prop in obj) {
	                    if(typeof obj[prop].el != 'undefined') {
	                        obj[prop] = obj[prop].val(value);
	                    } else if(typeof obj[prop] == 'object') {
	                        obj[prop] = loop(value, obj[prop]);
	                    }
	                }
	                delete obj.val;
	                return obj;
	            }
	            var res = { val: loop };
	            for(var key in el) {
	                res[key] = dom.apply(this, [el[key], parent]);
	            }
	            return res;
	        }
	    break;
	}

如果开发者传递字符串将执行第一个case。我们转换parent并且调用querySelector的快捷方式。第二个case将会被执行如果我们传递一个DOM元素或JavaScript对象。我们检查对象是否有nodeName属性，如果有这个属性，我们直接将它的值作为api.el的值。如果没有，那么我们遍历对象的所有属性并且为每个属性初始化为类库实例。这里有一些测试用例：

	<p>text</p>
	<header>
	    <p>Big</p>
	</header>
	<footer>
	    <p>Small</p>
	</footer>

访问第一个段落：

	dom('p').el

访问header节点里的段落：

	dom('p', 'header').el

传递一个DOM元素：

	dom(document.querySelector('header')).el

传递一个JavaScript对象：

	var els = dom({
	    footer: 'footer',
	    paragraphs: {
	        header: 'header p',
	        footer: 'footer p'
	    }
	}))
	// 最后我们在此得到JavaScript对象。
	// 它的属性是实际的结果
	// 执行dom函数。例如，获取值
	// footer是paragraphs的属性
	els.paragraphs.footer.el

##获取或设置元素的值

表单元素的值如input或select可以被很容易的检索到——我们可以使用元素的value属性。我们我们已经有一个能访问的DOM元素了——存储在api.el。然而，当我们碰到单选框或复选框是有些棘手。对于其他HTML节点像div，section或span我们获取元素的值实际上是获取textContent属性。如果textContent是undefined那么可以用innerHTML代替（相似）。让我们写出另一个switch语句：

	api.val = function(value) {
	    if(!this.el) return null;
	    var set = !!value;
	    var useValueProperty = function(value) {
	        if(set) { this.el.value = value; return api; }
	        else { return this.el.value; }
	    }
	    switch(this.el.nodeName.toLowerCase()) {
	        case 'input':
	        break;
	        case 'textarea':
	        break;
	        case 'select':              
	        break;
	        default:
	    }
	    return set ? api : null;
	}

首先我们需要确保api.el属性存在。set是布尔类型变量告诉我们是获取还是设置元素的value属性。有.value属性的元素包括一个辅助方法。switch语句将包含方法的实际逻辑。最后我们返回api本身，为了保持链式操作。当然我们这样做仅当我们使用设置器函数时。

让我们看看如何处理不能同类型的元素。例如input节点：

	case 'input':
	    var type = this.el.getAttribute('type');
	    if(type == 'radio' || type == 'checkbox') {
	        var els = qsa('[name="' + this.el.getAttribute('name') + '"]', parent);
	        var values = [];
	        for(var i=0; i<els.length; i++) {
	            if(set && els[i].checked && els[i].value !== value) {
	                els[i].removeAttribute('checked');
	            } else if(set && els[i].value === value) {
	                els[i].setAttribute('checked', 'checked');
	                els[i].checked = 'checked';
	            } else if(els[i].checked) {
	                values.push(els[i].value);
	            }
	        }
	        if(!set) { return type == 'radio' ? values[0] : values; }
	    } else {
	        return useValueProperty.apply(this, [value]);
	    }
	break;

这可能是最有趣的例子了。有两种类型的元素需要不同的处理——单选框和复选框。这些元素实际上是一组，我们要牢记这点。这就是为什么我们使用querySelectorAll获取整组并找出哪个是被选择/选中的。更复杂的是，复选框可能不止被选中一个。上面的方法完美处理所有这些情况。
处理textarea元素非常简单，这要得益于我们上面写的辅助函数。

	case 'textarea': 
	    return useValueProperty.apply(this, [value]); 
	break;

下面看我们如何处理下拉列表（select）：

	case 'select':
	    if(set) {
	        var options = qsa('option', this.el);
	        for(var i=0; i<options.length; i++) {
	            if(options[i].getAttribute('value') === value) {
	                this.el.selectedIndex = i;
	            } else {
	                options[i].removeAttribute('selected');
	            }
	        }
	    } else {
	        return this.el.value;
	    }
	break;

最后是默认操作：

	default: 
	    if(set) {
	        this.el.innerHTML = value;
	    } else {
	        if(typeof this.el.textContent != 'undefined') {
	            return this.el.textContent;
	        } else if(typeof this.el.innerText != 'undefined') {
	            return typeof this.el.innerText;
	        } else {
	            return this.el.innerHTML;
	        }
	    }
	break;

上面这些代码我们完成了我们的val方法。这里有一个简单的HTML表单和相应的测试：

	<form>
	    <input type="text" value="sample text" />
	    <input type="radio" name="options" value="A">
	    <input type="radio" name="options" checked value="B">
	    <select>
	        <option value="10"></option>
	        <option value="20"></option>
	        <option value="30" selected></option>
	    </select>
	    <footer>version: 0.3</footer>
	</form>

如果我们写下面的：

	dom({
	    name: '[type="text"]',
	    data: {
	        options: '[type="radio"]',
	        count: 'select'
	    },
	    version: 'footer'
	}, 'form').val();

我们会得到：

	{
	    data: {
	        count: "30",
	        options: "B"
	    },
	    name: "sample text",
	    version: "version: 0.3"
	}

这方法对于把数据冲HTML导成JavaScript对象非常有帮助。这正是我们很多人每天都很常见的任务。

##最后结果

最后完成的类库代码仅有100行代码，但它仍然满足我们所需的访问 DOM元素并且获取和设置value值/内容。

	var dom = function(el, parent) {
	    var api = { el: null }
	    var qs = function(selector, parent) {
	        parent = parent || document;
	        return parent.querySelector(selector);
	    };
	    var qsa = function(selector, parent) {
	        parent = parent || document;
	        return parent.querySelectorAll(selector);
	    };
	    switch(typeof el) {
	        case 'string':
	            parent = parent && typeof parent === 'string' ? qs(parent) : parent;
	            api.el = qs(el, parent);
	        break;
	        case 'object': 
	            if(typeof el.nodeName != 'undefined') {
	                api.el = el;
	            } else {
	                var loop = function(value, obj) {
	                    obj = obj || this;
	                    for(var prop in obj) {
	                        if(typeof obj[prop].el != 'undefined') {
	                            obj[prop] = obj[prop].val(value);
	                        } else if(typeof obj[prop] == 'object') {
	                            obj[prop] = loop(value, obj[prop]);
	                        }
	                    }
	                    delete obj.val;
	                    return obj;
	                }
	                var res = { val: loop };
	                for(var key in el) {
	                    res[key] = dom.apply(this, [el[key], parent]);
	                }
	                return res;
	            }
	        break;
	    }
	    api.val = function(value) {
	        if(!this.el) return null;
	        var set = !!value;
	        var useValueProperty = function(value) {
	            if(set) { this.el.value = value; return api; }
	            else { return this.el.value; }
	        }
	        switch(this.el.nodeName.toLowerCase()) {
	            case 'input':
	                var type = this.el.getAttribute('type');
	                if(type == 'radio' || type == 'checkbox') {
	                    var els = qsa('[name="' + this.el.getAttribute('name') + '"]', parent);
	                    var values = [];
	                    for(var i=0; i<els.length; i++) {
	                        if(set && els[i].checked && els[i].value !== value) {
	                            els[i].removeAttribute('checked');
	                        } else if(set && els[i].value === value) {
	                            els[i].setAttribute('checked', 'checked');
	                            els[i].checked = 'checked';
	                        } else if(els[i].checked) {
	                            values.push(els[i].value);
	                        }
	                    }
	                    if(!set) { return type == 'radio' ? values[0] : values; }
	                } else {
	                    return useValueProperty.apply(this, [value]);
	                }
	            break;
	            case 'textarea': 
	                return useValueProperty.apply(this, [value]); 
	            break;
	            case 'select':
	                if(set) {
	                    var options = qsa('option', this.el);
	                    for(var i=0; i<options.length; i++) {
	                        if(options[i].getAttribute('value') === value) {
	                            this.el.selectedIndex = i;
	                        } else {
	                            options[i].removeAttribute('selected');
	                        }
	                    }
	                } else {
	                    return this.el.value;
	                }
	            break;
	            default: 
	                if(set) {
	                    this.el.innerHTML = value;
	                } else {
	                    if(typeof this.el.textContent != 'undefined') {
	                        return this.el.textContent;
	                    } else if(typeof this.el.innerText != 'undefined') {
	                        return typeof this.el.innerText;
	                    } else {
	                        return this.el.innerHTML;
	                    }
	                }
	            break;
	        }
	        return set ? api : null;
	    }
	    return api;
	}
 

我创建了一个[jsbin](http://jsbin.com/locap/5/embed?html,js,console)的例子，你可以看看类作品。

##总结

我上面讨论的类库是[AbsurdJS客户端组件](http://absurdjs.com/pages/client-side-components/)的一部分。该模块的完成文档可以在[这里](http://absurdjs.com/pages/api/build-in-components/#dom)找到。这代码的目的并非要取代jQuery或其他可以访问DOM的流行类库。函数的思想是自成一体，一个函数只做一件事并把它做好。这是[AbsurdJS](http://absurdjs.com/)背后的主要思想，它也是基于模块化建设的，如[router](http://absurdjs.com/pages/api/build-in-components/#router)或[Ajax](http://absurdjs.com/pages/api/build-in-components/#ajax)模块。

##注

原文 http://flippinawesome.org/2014/03/10/a-dom-manipulation-class-in-100-lines-of-javascript/