---
layout: post
title: 在JavaScript中什么时候使用==是正确的？
category : javaScript
tagline: "译"
tags : [javascript]
keywords: [javascript]
description: 在JavaScript中什么情况下使用==是正确的？简而言之：没有。这篇文章来看五种情况下总是使用===，并且解释为什么不用==。
---
{% include JB/setup %}

在JavaScript中什么情况下使用==是正确的？简而言之：没有。这篇文章来看五种情况下总是使用===，并且解释为什么不用==。

JavaScript有两种操作符用来比较两个值是否相等 [1]：

- 严格相等 === 仅考虑相同类型的值是否相等。
- “正常”（或非严格）相等操作符 == 在比较之前，尝试为不同类型的值进行转换，然后类似严格相等。

给JavaScript初学者的建议是完全忘掉 == ，并且总是使用 ===。事实证明，后者是更符合常规的。有五种案例，表面看起来可以不遵从规则，但真的不是这样。从现在开始，我使用下面的规则：

> 意图清晰的代码胜过更简洁的代码。
记住：你的代码仅写一次，但被阅读很多次——尽可能保证对阅读者友好。

##例1：你清楚自己在比较什么

例如，使用typeof操作符[2],你能确保结果是字符串。然后可以放心使用 ==，因为我们确定不会在发生类型转换。

	if (typeof x == "function") {
	        ...
	}
然而，有两个反对这样做的原因：

- 一致性：使用==对一致性没有任何好处，那么为什么不避免使用呢？
- 简单和性能：一般来说，=== 是最简单的操作符，因为它不进行类型转换。JavaScript引擎的性能参差不齐[3]，但在大部分浏览器中 === 比 == 速度更快。
##例2：与undefined和null做比较

当使用 == 时，undefined和null在结果上等价——他们彼此相等，互相相等，但没有意义（包括JavaScript中的能被转换为false的值）：

    > null == null
    true
    > undefined == null
    true
    > false == null
    false
    > 0 == null
    false
因此，下面的if语句检测的是null或undefined。

    if (x == null) {
        ...
    }
然而，这是否出于简洁性考虑，意图并不清晰：如果你同时也检测undefined，那么你可以这样写。然而，如果JavaScript初学者读到你的代码，他们可能认为你仅仅检测null。如果高手读到你的代码，他们可能认为你写错了，并且应该写成 ===。

    if (x === undefined || x === null) {
        ...
    }
如果你有点懒的话，上面的代码能被精简为：

    if (!x) {
        ...
    }
和上面一样的警告：这条件成立，如果x有否定类型的值。

    undefined
    null
    false
    0
    ""
##例3：比较字符串和数字

场景：你正工作在用户界面代码或编码处理服务器端参数。你可能会把数字编码为字符串。如果x是一个字符串，你可以像下面这样比较：

    if (x == 123) {
        ...
    }
但问什么不告诉其他阅读你代码的人，如果x不是数字，它将被转换为数字？

    if (Number(x) === 123) {
        ...
    }
##例4：比较对象和原始值

使用 == 时你可以将一个原始值和其他原始值或包装类型 [4]实例做比较：

    > function isAbc(x) { return x == "abc" }
    > isAbc("abc")
    true
    > isAbc(new String("abc"))
    true
而使用 === 时，你不能这样做：

    > new String("abc") === "abc"
    false
左边是一个对象而右边是原始值。因为他们类型不同所以不严格相等。然而，你同样需要向阅读你代码的人解释清楚你的意图。下面是表达式：

	x == "abc"
你的目的是什么？

- 你真的想让一个包装字符串和右边的字符串作比较吗？这似乎不太可能，但如果确实是这样，你应该小心翼翼并给出文档记录。
- 你想将x转换为字符串？那应该写的更明确`String(x) === "abc"`
- 你想提取包装变量的原始值？那你应该考虑下面的写法`x.valueOf() === "abc"`

##例5：JavaScript是灵活的语言——我的代码也应该这样

理由是这样的：我想我的代码像JavaScript一样灵活。== 操作符帮我实现这一目的。例如JavaScript的灵活体现在它自动转换值类型：

    > "abc" + false
    'abcfalse'
    > 3 + true
    4
    > +"73"
    73
有几个理由反驳上述假说：

1.即使会自动转换但并不总是按你需要的方式转换。例如：

    > !"false"
    false
    > 7 + "3"
    '73'
    > Number("")
    0

2.非严格相等的转换规则非常复杂：

    > 2 == false
    false
    > 2 == true
    false
    > Boolean(2)
    true
3.显示转化加上严格相等的代码更具描述性。比较：灵活的非严格相等。

	function is123Implicit(x) {
        return x == 123;
    }
    > is123Implicit(123)
    true
    > is123Implicit(new Number(123))
    true
    > is123Implicit("123")
    true

  替代方案：灵活的显式转换和严格相等。

	function is123Explicit(x) {
        x = Number(x);
        return x === 123;
    }
    > is123Explicit(123)
    true
    > is123Explicit(new Number(123))
    true
    > is123Explicit("123")
    true
 

4.有人说您的代码缺少灵活性？可以说JavaScript的默认灵活性利大于弊（对于学习难度而言）。写防御型的代码更容易暴漏Bug。`is123Explicit()` 的防御型版本看起来像下面这样：

	function is123Defensive(x) {
        if (typeof x !== "number") {
            throw new TypeError("Not a number: "+x);
        }
        return x === 123;
    }
如果你想给函数传递任何非原始数字值，你必须先进行类型转换。
##结论

我希望我让你确信坚持简单的规则——”不用 ==“的意义，不只是对新手。在你的代码中魔法越少，通常意味着越容易理解。

##相关阅读

1. [Equality in JavaScript: === versus ==](http://www.2ality.com/2011/06/javascript-equality.html)
2. [Improving the JavaScript typeof operator](http://www.2ality.com/2011/11/improving-typeof.html)
3. [jsPerf: == versus ===](http://jsperf.com/equ-vs-strict-equ)
4. [JavaScript values: not everything is an object](http://www.2ality.com/2011/03/javascript-values-not-everything-is.html)
##注
英文：http://www.2ality.com/2011/12/strict-equality-exemptions.html