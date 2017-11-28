---
layout: post
title: 一段代码详解JavaScript面向对象
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [javascript]
description: 
---
{% include JB/setup %}

不解释，ES3时代的经典做法

```javascript
(function() {
    // 私有静态成员
    var user = "";
    
    // 私有静态方法
    function privateStaticMethod(){
    }

    Box = function(value){
        // 私有成员
        var privateUser = value; 
        
        // 这个是私有方法
        function privateMethod(){
        }

        
        // 公有方法，因为能访问私有成员，也可以说是特权函数，也可以说是实例方法
        this.getUser = function(){
            return user;
        };
        
        // 公有成员
        this.user = 1;
    };
    
    // 公有共享方法
    Box.prototype.sharedMethod = function () {};
    
    // 公有共享属性
    Box.prototype.sharedProperty = 1;


    // 公有静态方法 
    Box.staticMethod = function(){};
    
    // 公有静态成员
    Box.staticProperty = 1; 
})();
```

时过境迁，下面来看看在ES6+中如何实现

```javascript
(function() {
    // 私有静态成员
    var user = "";
    
    // 私有静态方法
    function privateStaticMethod(){
    }

    class Box {
        // 私有成员，等同于 constructor内部，提案写法，stage-3
        #privateUser = 1;

        // 公有成员，等同于 constructor内部，提案写法，stage-3
        user1 = 1;

        constructor() {
            // 私有成员
            var privateUser = value;

            // 这个是私有方法
            function privateMethod(){
            }


            // 公有方法，因为能访问私有成员，也可以说是特权函数，也可以说是实例方法
            this.getUser = function(){
                return user;
            };

            // 公有成员
            this.user2 = 1;
        }

        // 公有共享属性
        sharedProperty: 1

        // 公有共享方法
        sharedMethod() {}
        
        // 公有静态方法
        static staticMethod1() {}
        
        // 公有静态成员，提案写法，stage-3
        static staticProperty1 = 1;
    }
    
    // 公有静态方法，和上面写法等同
    Box.sharedMethod2 = function() {};
    // 公有静态成员，和上面写法等同
    Box.staticProperty2 = 1;
})();
```

## 总结
更多js面向对象相关内容请看：

- [JavaScript对象继承一瞥](http://yanhaijing.com/javascript/2014/11/09/object-inherit-of-js/)
- [JavaScript原型之路](http://yanhaijing.com/javascript/2014/07/18/javascript-prototype/)
- [详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)
- [Javascript继承-原型的陷阱](http://yanhaijing.com/javascript/2013/08/23/javascript-inheritance-how-to-shoot-yourself-in-the-foot-with-prototypes/)
