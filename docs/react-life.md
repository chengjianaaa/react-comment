## react的生命周期

react的组件的整个生命周期中，会根据`props`或者`state` 发生改变的，首先我们先看一下react生命周期的流程图(来源网络，触及到利益必删)：

![](http://7rf34y.com2.z0.glb.qiniucdn.com/c/008581c5ca5cd9e344e8b92703e223ef)

React为每个组件提供了生命周期的钩子函数去相应不同的时刻，组件的生命周期分为三个部分：
1. 实例化
2. 存在期
3. 销毁

按照上面的三个周期分类流程图(来源网络)如下：

![](http://static.codeceo.com/images/2016/03/ajs-life.png)

### 通过state进行改变：

先看一下代码结构

```javascript
import React from 'react';

class Item extends React.Component {
	// 初始化阶段，可以定义一些state
    constructor(props, context) {
        super(props, context);
        this.state = {
			user:'helios'
    	}
        console.log('constructor');
        // 在3s之后修改state
        setTimeout(()=>{
			this.setState({
				user:'syl'
			})
        },3000);
    }
    // 在首次渲染(render)之前会被调用
    componentWillMount() {
    	console.log('componentWillMount');
    } 
    // 渲染并返回virtual DOM
    render() {
    	console.log('render');
        return (
            <h1> {this.props.username} </h1>
        )
    }
    // 在render之后触发
    componentDidMount() {
    	console.log('componentDidMount');
    }
}
// 打印结果如下:
constructor
componentWillMount
render
componentDidMount
render
```
这次我们就知道，当改变state的时候，只会重新执行render的过程，也就是进行真实的DOM tree和virtual DOM tree进行对比，如果改变了进行修改。

### 通过改变props

因为props要通过父组件传入的，所有我们这里的演示写了两个：

```javascript
// 父组件
import React from 'react'
import Item from './item';
class Test extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        	username:'helios'
        }
        setInterval(()=>{
        	this.setState({
        		username:'syl' + (Math.random()*1000)>>0
        	})
        },3000)
    }
    render() {
        return (
        	<Item user={this.state.username} />
        )
    }
}

```

```javascript
// 子组件
import React from 'react';

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log('constructor');
    }
    render() {
    	console.log('render');
        return (
            <h1> {this.props.username} </h1>
        )
    }
    componentWillMount() {
    	console.log('componentWillMount');
    }
    componentDidMount() {
    	console.log('componentDidMount');
    }
    // 更新阶段，父组件传入的props更改时修改
    componentWillReceiveProps(nextProps) {
    	console.log('componentWillReceiveProps');
    }
    // 是否需要更新，
    shouldComponentUpdate(nextProps, nextState) {
    	console.log('shouldComponentUpdate');
    	return true;
    }
    //将要更新阶段
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }
    // 完成更新阶段
    componentDidUpdate(prevProps, prevState) {
    	console.log('componentDidUpdate');
    }
    // 组件即将销毁阶段
    componentWillUnmount() {
    	console.log('componentWillUnmount');
    }
// 输出
constructor
componentWillMount
render
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate

}

```

其他的方法比较好理解，下面重点说一下有关更新的方法：
- 只针对props的
	1. componentWillReceiveProps： 只要父组件传入的props进行修改就会修改，就会触发这个函数，当然我们也可以在这个函数里面修改state
	2. shouldComponentUpdate ： 返回true表示更新，这个可以根据程序进行是否跟新，这个可以进行一个优化，我们后面说
- 针对props和state的
	1. componentWillMount 跟新组件之前要做的事情
	2. componentDidUpdate 更新之后要做的事情