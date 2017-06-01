## 对Redux的理解

通过做这个项目也加深了对`redux`的理解，在这里梳理一下redux的基本流程。

在这合理先给大家介绍几篇关于redux写的好的文章：
- [redex中文站](http://cn.redux.js.org)
- [React 设计思想](https://github.com/react-guide/react-basic)
- [怎么设计store](https://segmentfault.com/a/1190000009540007?from=timeline&isappinstalled=1)

### Redux介绍

对写js的同学一定不陌生一种设计模式就是发布订阅者模式也叫观察者模式，redex就是基于这种模式的。
- redux秉承的单向的数据流，*一个应用虽然可以创建多个store但是原则上只能创建一个store*，由这个唯一的`store`管理被存在`object tree`中的`state`
- `state`的改变的唯一方法就是出发`action`,`action`就是描述这个事件的对象
- 单纯的有`state`和`action`还是不行的，这就好像一块肉(state)放在哪里你(action)要怎么做处理(???)这块肉，怎么处理呢？这就要通过编写`reducer`来表示如何通过`action`来使得`state`变化的。

### 简约但不简单的例子

```javascript
// 1. 定义action处理state的规则，即 reducer
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

// 2. 生成 store
let store = createStore(counter)

// 3. subscribe负责监听state变化之后要做的事情，也就发布订阅者模式下的订阅者
    console.log('current state', store.getState())
})

// 触发数据变化，发布给监听这个事件的订阅者
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'DECREMENT'})
```

**请认真看这个例子，这个例子基本就涉及到了redux的所有步骤，下面还会提及到**

### 在介绍一下redux的组成

上面进行了基本的介绍，也知道`redux`是什么。其实`redux`就是由上面的三部分(state,reducer,action,)组成的，

#### store

这里我们主要说的是原生`redux`没有说`react-redux`。
</hr>

在说这个基本概念之前，我们要先假设一个场景，比如说在一个购物车的页面，我们出发了一个购买一个的action，这个action的结构是这样的`{type:BUY,data}`,因为这个应用是很庞大的，我们不会把所有的处理action的reducer放在一个reducer里面，所以我们就要对reducer进行分割，分割之后还要使用一个`store`进行统一的管理，那么我们就会用到`combineReducers()`这个函数进行reducer的合并。如下面这样

```javascript
const reducer = combineReducers({
     reducer1: doA,
     reducer2: doB,
     reducer3: doC
})
```


store可以由`creatStore()`进行创建。
`creatStore`第一参数传递的是`reducer`(可以使经过combineReducers合并的)，第二个参数传递的是state的初始值。

store还有下面的几个方法：

1. `dispatch`：用户`action`的分发,通过`reducer`进行处理改变`state`,当触发这个函数的时候会进行‘简约不简单’例子中第一步和第三步
2. `subscribe`：监听state的变化，作为订阅者角色
3. `subscribe(listener)` 返回的函数注销监听器。
4. `getState`：获取store中state

### action

action是一个对象，其中type属性是必须的，同时可以传入一些数据。**是store的唯一来源**

### reducer

通过传入的`state`和`action`进行相应的处理

#### redux的流程

1. 用户出发界面活动(比如更改城市)
2. 触发`dispatch(action)`
3. 通过上一个state和action返回下一个state
4. 通知订阅者(subscribe)能够通过`getState`等到当前的state
5. 如果需要展示在界面上更新界面

### react-redux

`react-redux`就是把`dispatch`,`getState`,`subscribe`进行了封装，不用显示去调用了，还提供了两个强有力的API`connect`和`Provider`

#### Provider

`Provider`就是一个组件，他接受store作为props，然后往下传，这样react中的任何组件都得到store。这也就以为这我们每个组件中可以利用`reducer(action)`改变state，并且用`subscribe`进行监听，但是这样是不好的。这样就违背了`react-redux`的初衷了，应该使用下面要介绍的`connect`方法，而且这个方法还是做了很多优化的。

#### connect

用法如下：
```javascript
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
```
1. 上面的`mapStateProps`就相当于原生的redux中的`subscribe`和`getState`,函数定义如下：

```javascript
function mapStateToProps(state) {
   return { todos: state.todos };
}
```
函数中返回的对象作为props的一部分传递到这个ui组件中。
2. `mapDispatchToProps`的方法就是负责分发action的。如下面的形式：
```javascript
// 定义action
let actions = {
	update(data) {
		return {
			type:'UPDATE',
			data
		}
	}
}

class APP extends Component{
	render() {
		return(
			<div>
				<input type="text" ref='input'>
				<button onClick={this.clickHandle.bind(this)}>click</button>
			<div>
		)
	}
	clickHandle() {
		let value = this.refs.input;
		const userInfoActions = this.props.userInfoActions;
		userInfoActions.update(value);  // 相当于dispatch(actions.update(value))
	}
}
// 出发action，并作为props的一部分传递到ui中
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions:bindActionCreators(actions,dispatch)
    }
}
```
在本项目中也有使用上面的方法，[查看请戳](https://github.com/helios741/react-comment/blob/master/app/containers/City/index.jsx)

目前为止无论是redux还是react-dedux都已经说完了，我自己也写了一个例子：[react-redux例子](https://github.com/helios741/react-comment/tree/master/app/containers/Test)。

项目启动之后，路由到test就可以了


