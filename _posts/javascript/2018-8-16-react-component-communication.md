---
layout: post
title: 解密传统组件间通信与React组件间通信
category : javascript
tagline: "原创"
tags : [javascript]
keywords: [react, javascript]
description: 本文介绍传统组件间通信与React中的组件通信4种方式
---

{% include JB/setup %}

在React中最小的逻辑单元是组件，组件之间如果有耦合关系就会进行通信，本文将会介绍React中的组件通信的不同方式

通过归纳范，可以将任意组件间的通信归类为四种类型的组件间通信，分别是父子组件，爷孙组件，兄弟组件和任意组件，
需要注意的是前三个也可以算作任意组件的范畴，所以最后一个是万能方法

### 父子组件
父子组件间的通信分为父组件向子组件通信和子组件向父组件通信两种情况，下面先来介绍父组件向子组件通信，
传统做法分为两种情况，分别是初始化时的参数传递和实例阶段的方法调用，例子如下

```js
class Child {
    constructor(name) {
        // 获取dom引用
        this.$div = document.querySelector('#wp');

        // 初始化时传入name
        this.updateName(name);
    }
    updateName(name) {
        // 对外提供更新的api
        this.name = name;
    
        // 更新dom
        this.$div.innerHTML = name;
    }
}

class Parent {
    constructor() {
        // 初始化阶段
        this.child = new Child('yan');
        
        setTimeout(() => {
            // 实例化阶段
            this.child.updateName('hou');
        }, 2000);
    }
}
```

在React中将两个情况统一处理，全部通过属性来完成，之所以能够这样是因为React在属性更新时会自动重新渲染子组件，
下面的例子中，2秒后子组件会自动重新渲染，并获取新的属性值

```jsx
class Child extends Component {
    render() {
        return <div>{this.props.name}</div>
    }
}

class Parent extends Component {
    constructor() {
        // 初始化阶段
        this.state = {name: 'yan'};

        setTimeout(() => {
            // 实例化阶段
            this.setState({name: 'hou'})
        }, 2000);
    }
    render() {
        return <Child name={this.state.name} />
    }
}
```

下面来看一下子组件如何向父组件通信，传统做法有两种，一种是回调函数，另一种是为子组件部署消息接口

先来看回调函数的例子，回调函数的优点是非常简单，缺点就是必须在初始化的时候传入，并且不可撤回，并且只能传入一个函数

```js
class Child {
    constructor(cb) {
        // 调用父组件传入的回调函数，发送消息
        setTimeout(() => { cb() }, 2000);
    }
}

class Parent {
    constructor() {
        // 初始化阶段，传入回调函数
        this.child = new Child(function () {
            console.log('child update')
        });
    }
}

```

下面来看看消息接口方法，首先需要一个可以发布和订阅消息的基类，比如下面实现了一个简单的`EventEimtter`，实际生产中可以直接使用别人写好的类库，比如[@jsmini/event](https://github.com/jsmini/event)，子组件继承消息基类，就有了发布消息的能力，然后父组件订阅子组件的消息，即可实现子组件向父组件通信的功能

消息接口的优点就是可以随处订阅，并且可以多次订阅，还可以取消订阅，缺点是略显麻烦，需要引入消息基类

```js
// 消息接口，订阅发布模式，类似绑定事件，触发事件
class EventEimtter {
    constructor() {
        this.eventMap = {};
    }
    sub(name, cb) {
        const eventList = this.eventMap[name] = this.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (this.eventMap[name] || []).forEach(cb => cb(...data));
    }
}

class Child extends EventEimtter {
    constructor() {
        super();
        // 通过消息接口发布消息
        setTimeout(() => { this.pub('update') }, 2000);
    }
}

class Parent {
    constructor() {
        // 初始化阶段，传入回调函数
        this.child = new Child();
        
        // 订阅子组件的消息
        this.child.sub('update', function () {
            console.log('child update')
        });
    }
}

```

Backbone.js就同时支持回调函数和消息接口方式，但React中选择了比较简单的回调函数模式，下面来看一下React的例子

```jsx
class Child extends Component {
    constructor(props) {
        setTimeout(() => { this.props.cb() }, 2000);
    }
    render() {
        return <div></div>
    }
}

class Parent extends Component {
    render() {
        return <Child cb={() => {console.log('update')}} />
    }
}

```

### 爷孙组件
父子组件其实可以算是爷孙组件的一种特例，这里的爷孙组件不光指爷爷和孙子，而是泛指祖先与后代组件通信，可能隔着很多层级，我们已经解决了父子组件通信的问题，根据化归法，很容易得出爷孙组件的答案，那就是层层传递属性么，把爷孙组件通信分解为多个父子组件通信的问题

层层传递的优点是非常简单，用已有知识就能解决，问题是会浪费很多代码，非常繁琐，中间作为桥梁的组件会引入很多不属于自己的属性

在React中，通过context可以让祖先组件直接把属性传递到后代组件，有点类似星际旅行中的虫洞一样，通过context这个特殊的桥梁，可以跨越任意层次向后代组件传递消息

怎么在需要通信的组件之间开启这个虫洞呢？需要双向声明，也就是在祖先组件声明属性，并在后代组件上再次声明属性，然后在祖先组件上放上属性就可以了，就可以在后代组件读取属性了，下面看一个例子

```jsx
import PropTypes from 'prop-types';

class Child extends Component {
    // 后代组件声明需要读取context上的数据
    static contextTypes = {
        text: PropTypes.string
    }
    render() {
        // 通过this.context 读取context上的数据
        return <div>{this.context.text}</div>
    }
}


class Ancestor extends Component {
    // 祖先组件声明需要放入context上的数据
    static childContextTypes = {
        text: PropTypes.string
    }
    // 祖先组件往context放入数据
    getChildContext() {
        return {text: 'yanhaijing'}
    }
}
```

context的优点是可以省去层层传递的麻烦，并且通过双向声明控制了数据的可见性，对于层数很多时，不失为一种方案；但缺点也很明显，就像全局变量一样，如果不加节制很容易造成混乱，而且也容易出现重名覆盖的问题

个人的建议是对一些所有组件共享的只读信息可以采用context来传递，比如登录的用户信息等

*小贴士：React Router路由就是通过context来传递路由属性的*

### 兄弟组件
如果两个组件是兄弟关系，可以通过父组件作为桥梁，来让两个组件之间通信，这其实就是主模块模式

下面的例子中，两个子组件通过父组件来实现显示数字同步的功能

```jsx
class Parent extends Component {
    constructor() {
        this.onChange = function (num) {
            this.setState({num})
        }.bind(this);
    }
    render() {
        return (
            <div>
                <Child1 num={this.state.num} onChange={this.onChange}>
                <Child2 num={this.state.num} onChange={this.onChange}>
            </div>
        );
    }
}
```

主模块模式的优点就是解耦，把两个子组件之间的耦合关系，解耦成子组件和父组件之间的耦合，把分散的东西收集在一起好处非常明显，能带来更好的可维护性和可扩展性

### 任意组件
任意组件包括上面的三种关系组件，上面三种关系应该优先使用上面介绍的方法，对于任意的两个组件间通信，总共有三种办法，分别是共同祖先法，消息中间件和状态管理

基于我们上面介绍的爷孙组件和兄弟组件，只要找到两个组件的共同祖先，就可以将任意组件之间的通信，转化为任意组件和共同祖先之间的通信，这个方法的好处就是非常简单，已知知识就能搞定，缺点就是上面两种模式缺点的叠加，除了临时方案，不建议使用这种方法

另一种比较常用的方法是消息中间件，就是引入一个全局消息工具，两个组件通过这个全局工具进行通信，这样两个组件间的通信，就通过全局消息媒介完成了

还记得上面介绍的消息基类吗？下面的例子中，组件1和组件2通过全局event进行通信

```jsx
class EventEimtter {
    constructor() {
        this.eventMap = {};
    }
    sub(name, cb) {
        const eventList = this.eventMap[name] = this.eventMap[name] || {};
        eventList.push(cb);
    }
    pub(name, ...data) {
        (this.eventMap[name] || []).forEach(cb => cb(...data));
    }
}

// 全局消息工具
const event = new EventEimtter;

// 一个组件
class Element1 extends Component {
    constructor() {
        // 订阅消息
        event.sub('element2update', () => {console.log('element2 update')});
    }
}

// 另一个组件。
class Element2 extends Component {
    constructor() {
        // 发布消息
        setTimeout(function () { event.pub('element2update') }, 2000)
    }
}
```

消息中间件的模式非常简单，利用了观察者模式，将两个组件之间的耦合解耦成了组件和消息中心+消息名称的耦合，但为了解耦却引入全局消息中心和消息名称，消息中心对组件的侵入性很强，和第三方组件通信不能使用这种方式

小型项目比较适合使用这种方式，但随着项目规模的扩大，达到中等项目以后，消息名字爆炸式增长，消息名字的维护成了棘手的问题，重名概率极大，没有人敢随便删除消息信息，消息的发布者找不到消息订阅者的信息等

其实上面的问题也不是没有解决办法，重名的问题可以通过制定规范，消息命名空间等方式来极大降低冲突，其他问题可以通过把消息名字统一维护到一个文件，通过对消息的中心化管理，可以让很多问题都很容易解决

如果你的项目非常大，上面两种方案都不合适，那你可能需要一个状态管理工具，通过状态管理工具把组件之间的关系，和关系的处理逻辑从组建中抽象出来，并集中化到统一的地方来处理，Redux就是一个非常不错的状态管理工具

除了Redux，还有Mobx，Rematch，reselect等工具，本文不展开介绍，有机会后面单独成文，这些都是用来解决不同问题的，只要根据自己的场景选择合适的工具就好了

### 总结
组件间的关系千变万化，都可以用上面介绍的方法解决，对于不同规模的项目，应该选择适合自己的技术方案，上面介绍的不同方式解耦的程度是不一样的，关于不同耦合关系的好坏，可以看我之前的文章《[图解7种耦合关系](http://yanhaijing.com/program/2016/09/01/about-coupling/)》

本文节选自我的新书《React 状态管理与同构实战》，感兴趣的同学可以继续阅读本书，这本书由我和前端自身技术侯策合力打磨，凝结了我们在学习、实践 React 框架过程中的积累和心得。除了 React 框架使用介绍以外，着重剖析了状态管理以及服务端渲染同构应用方面的内容。同时吸取了社区大量优秀思想，进行归纳比对。

本书受到百度公司副总裁沈抖、百度高级前端工程师[董睿][dongrui]，以及知名JavaScript语言专家[阮一峰][ruanyf]、Node.js布道者[狼叔][langshu]、Flarum中文社区创始人 [justjavac][justjavac]、新浪移动前端技术专家[小爝][xiaojue]、知乎知名博主[顾轶灵][guyiling]等前端圈众多专家大咖的联合力荐。

有兴趣的读者可以点击下面的链接购买，再次感谢各位的支持与鼓励！恳请各位批评指正！

京东：<a href="https://item.jd.com/12403508.html" target="_blank">https://item.jd.com/12403508.html</a> 

当当：<a href="http://product.dangdang.com/25308679.html" target="_blank">http://product.dangdang.com/25308679.html</a>

[lucas]: https://www.zhihu.com/people/lucas-hc
[dongrui]: https://www.zhihu.com/people/dong-rui-24/activities
[langshu]: https://www.zhihu.com/people/i5ting/activities
[ruanyf]: http://www.ruanyifeng.com/home.html
[justjavac]: http://justjavac.com/
[guyiling]: https://www.zhihu.com/people/justineo/activities
[xiaojue]: https://www.zhihu.com/people/xiao-jue-83/activities
