---
layout: post
title: React最佳实践
category : javascript
tagline: "原创"
tags : [javascript, react]
keywords: [javascript]
description: 
---
{% include JB/setup %}

本文介绍React中一些问题的最佳解决办法，和一些常见的错误用法

## 组件
React的组件有好几种，对于一个组件该如何归类，应该遵守如下的顺序：

- Functional Component
- PureComponent
- Component

如果一个组件没有自身状态，应该使用Functional Component；

如果组件是纯组件（属性都是简单值），那么应该使用PureComponent；

否则应该使用Component；

Functional Component

```jsx
function Hello(props) {
    return <div>{props.name}</div>
}

Hello.propTypes = {
    name: React.PropTypes.string
};
Hello.defaultProps = {
    name: 'yan'
};
```

PureComponent

```jsx
class Demo1 extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { props, state} = this;
        
        function shallowCompare(a, b) {
            return a === b || Object.keys(a).every(k => a[k] === b[k]);
        }
        return shallowCompare(nextProps, props) && shallowCompare(nextState, state);
    }
}

class Demo2 extends PureComponent {}
```

## 属性与状态
不要把全部属性放到state！不要把全部属性放到state！

不要给属性赋值！不要给属性赋值！不要给属性赋值！

属性应该尽可能使用简单值，最好不要使用复杂数据结构

每个属性都应该有类型检测，PropType不可省略

属性应该提供默认值，对于必须传参的属性，应该添加isRequired

```jsx
class Hello extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        sex: React.PropTypes.number
    }
    static defaultProps = {
        sex: 1
    }
}
```
## 事件和回调
对于绑定的事件和传递给子组件的回调函数，统一使用onXXX前缀

```jsx
class User {
    // good
    onClick() {

    }
    
    // bad
    handleClick() {

    }
    
    // bad
    saveCallback() {

    }
}
```

事件和回调的this绑定应该在constructor中完成，可以提升新能

```jsx
class User {
    constructor() {
        // good
        this.onClick = this.onClick.bind(this);
    }
    onClick2 = () => {}
    onClick() {}
    
    render() {
        // bad
        return <div onClick={this.onClick.bind(this)}></div>
    }
}
```

如果在render中需要给回调函数绑定部分参数，那么应该把这个过程下放到子组件完成

```jsx
class User {
    render() {
        return (list.map(item => (
            // bad
            <UserDetail onCallback={() => this.onCallback(item.name)} />
        )))
    }
}

class User {
    render() {
        return (list.map(item => (
            // good
            <UserDetail name={item.name} onCallback={this.onCallback} />
        )))
    }
}
```

## 反模式

### key的问题
循环中的组件都要添加key，key不应该是每次生成的guid或index，应该是数据的id

如果没有id，初始化时可以填充guid

```jsx
render() {
    return (list.map(item => (
        // good
        <ListItem key={item.id}/>
    )))
}

render() {
    return (list.map((item, index) => (
        // bad
        <ListItem key={index}/>
    )))
}

render() {
    return (list.map(item => (
        // bad
        <ListItem />
    )))
}

// good
const list = list.map(x => ({...x, id: guid()}))
```

### 属性同步问题
不应该把属性拷贝到state，除非是默认值

## 总结
正确的使用React能够事半功倍，也能避免一些问题
