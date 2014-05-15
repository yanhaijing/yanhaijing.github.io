---
layout: post
title: 一段代码详解JavaScript面向对象
category : javaScript
tagline: "原创"
tags : [javascript]
keywords: [javascript]
description: 
---
{% include JB/setup %}

不解释

	(function(){
		//私有静态成员
		var user = "";
			 
		//私有静态方法
		function privateStaticMethod(){
		}
			 
		Box = function(value){
			//私有成员
			privateStaticUser = value;               
			 
			//这个是私有方法
			function privateMethod(){
			}
			 
			//公有方法，因为能访问私有成员，也可以说是特权函数
			this.getUser = function(){
				return user;
			};
			 
			//共有成员
			this.user = 1;
		};
		
		//公有静态方法 
		Box.staticMethod = function(){}
		//公有静态成员
		Box.staticProperty = 1; 
	})();
