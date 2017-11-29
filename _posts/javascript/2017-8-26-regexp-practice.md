---
layout: post
title: 正则表达式教程——实践篇
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [正则表达式, regexp, javascript]
description: 本文主要介绍在JavaScript如何使用正则表达式
---
{% include JB/setup %}

[上一篇文章](http://yanhaijing.com/javascript/2017/08/06/regexp-syntax/)介绍了正则的语法，本文来介绍下在js中如何使用正则

在js中创建正则有两种办法，字面量和new，和创建其他类型变量一样

    var reg = /abc/g // 字面量
    var reg = new RegExp('abc', 'g') // new方式，意思和上面一样

js中用到正则的地方有两个入口，正则的api和字符串的api，`RegExp#test`等于`RegExp.prototype.test`

- RegExp#test
- RegExp#exec
- String#search
- String#match
- String#split
- String#replace

## RegExp#test
每个正则实例都有test方法，test的参数是字符串，返回值是布尔值，表示当前正则是否能匹配指定的字符串

    /abc/.test('abc') // true
    /abc/.test('abd') // false

## RegExp#exec
exec使用方法和test一样，只是返回值并不是布尔值，而是返回匹配的结果

匹配成功返回一个数组，数组第一项是匹配结果，后面一次是捕获的分组

    /abc(d)/.exec('abcd') // ["abcd", "d", index: 0, input: "abcd"]

此数组还有另外两个参数，input是输入的字符串，index表示匹配成功的序列在输入字符串中的索引位置

如果有全局参数(g)，第二次匹配时将从上次匹配结束时继续

    var r1 = /ab/
    r1.exec('ababab') // ['ab', index: 0]
    r1.exec('ababab') // ['ab', index: 0]

    var r2 = /ab/g
    r2.exec('ababab') // ['ab', index: 0]
    r2.exec('ababab') // ['ab', index: 2]
    r2.exec('ababab') // ['ab', index: 4]

这一特性可以被用于循环匹配，比如统计字符串中abc的次数

    var reg = /abc/g
    var str = 'abcabcabcabcabc'
    var num = 0;
    var match = null;
    while((match = reg.exec(str)) !== null) {
        num++
    }
    console.log(num) // 5

如果匹配失败则返回null

    /abc(d)/.exec('abc') // null

## String#search
search方法返回匹配成功位置的索引，参数是字符串或正则，结果是索引

    'abc'.search(/abc/) // 0
    'abc'.search(/c/) // 2

如果匹配失败则返回-1
    
    'abc'.search(/d/) // -1

    'abc'.search(/d/) !== -1 // false 转换为布尔值

## String#match
match方法也会返回匹配的结果，匹配结果和exec类似

    'abc'.match(/abc/) // ['abc', index: 0, input: abc]
    'abc'.match(/abd/) // null

如果有全局参数(g)，match会返回所有的结果，并且没有index和input属性

    'abcabcabc'.match(/abc/g) // ['abc', 'abc', 'abc']

## String#split
字符串的split方法，可以用指定符号分隔字符串，并返回数据

    'a,b,c'.split(',') // [a, b, c]

其参数也可以使一个正则，如果分隔符有多个时，就必须使用正则

    'a,b.c'.split(/,|\./) // [a, b, c]

## String#replace
字符串的replace方法，可以将字符串的匹配字符，替换成另外的指定字符

    'abc'.replace('a', 'b') // 'bbc'

其第一个参数可以是正则表达式，如果想全局替换需添加全局参数

    'abc'.replace(/[abc]/, 'y') // ybc
    'abc'.replace(/[abc]/g, 'y') // yyy 全局替换

在第二个参数中，也可以引用前面匹配的结果

    'abc'.replace(/a/, '$&b') // abbc $& 引用前面的匹配字符
    'abc'.replace(/(a)b/, '$1a') // aac &n 引用前面匹配字符的分组
    'abc'.replace(/b/, '$\'') // aac $` 引用匹配字符前面的字符
    'abc'.replace(/b/, "$'") // acc $' 引用匹配字符后面的字符

replace的第二个参数也可以是函数，其第一个参数是匹配内容，后面的参数是匹配的分组

    'abc'.replace(/\w/g, function (match, $1, $2) {
        return match + '-'
    })
    // a-b-c-

## RegExp
RegExp是一个全局函数，可以用来创建动态正则，其自身也有一些属性

- $_
- $n
- input
- length
- lastMatch

来个例子

    /a(b)/.exec('abc') // ["ab", "b", index: 0, input: "abc"]

    RegExp.$_ // abc 上一次匹配的字符串
    RegExp.$1 // b 上一次匹配的捕获分组
    RegExp.input // abc 上一次匹配的字符串
    RegExp.lastMatch // ab 上一次匹配成功的字符
    RegExp.length // 2 上一次匹配的数组长度

## 实例属性
正则表达式的实例上也有一些属性

- flags
- ignoreCase
- global
- multiline
- source
- lastIndex

还是看例子

    var r = /abc/igm;

    r.flags // igm
    r.ignoreCase // true
    r.global // true
    r.multiline // true
    r.source // abc

lastIndex比较有意思，表示上次匹配成功的是的索引

    var r = /abc/igm;
    r.exec('abcabcabc')
    r.lastIndex // 3

    r.exec('abcabcabc')
    r.lastIndex // 6

可以更改lastIndex让其重新开始

    var r = /abc/igm;
    r.exec('abcabcabc') // ["abc", index: 0]

    r.exec('abcabcabc') // ["abc", index: 3]
    r.lastIndex = 0
    r.exec('abcabcabc') // ["abc", index: 0]

## 实战实例
来几个常用的例子
        
    /(?:0\d{2-3}-)?\d{7}/ // 电话号 010-xxx xxx

    /^1[378]\d{9}$/ // 手机号 13xxx 17xxx 18xxx

    /^[0-9a-zA-Z_]+@[0-9a-zA-Z]+\.[z-z]+$/ // 邮箱

去除字符串前后空白

    str = str.replace(/^\s*|\s*$/g, '')

## 总结
到这里你已经学会了正则的语法，并且学会了在js中使用正则的方法，接下来快去实战吧，要想学会正则必须多加练习，正所谓拳不离手曲不离口吗

在[下一篇文章](http://yanhaijing.com/javascript/2017/11/29/regexp-principle/)中，准备讲一讲正则的实现原理，难度略大o(╯□╰)o

本文灵感来源于《[JavaScript忍者秘籍](https://www.amazon.cn/gp/product/B016DWSEWO/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=536&creative=3200&creativeASIN=B016DWSEWO&linkCode=as2&tag=yanhaijing-23)》这本书，如果你想成为高手的话，我也非常推荐看下这本书
