## 对在做项目的时候使用的react的基本知识进行总结

### 1 定义组件和渲染组件

```javascript

import React from 'react';
import { render } from 'react-dom';
// 定义组件
class ComponentName extends React.Component{
	render(){
		return (
			<div>
			</div>
		)
	}
}
// 渲染组件

let root = document.getElementById('root');
render(<ComponentName />,root)

```

注意：

1. 组件名字必须是大写
2. 组件的标签闭合
3. render方法中只能出现一个父组件，不能出现同级的组件，下面的就是错误的示范
```javascript
class ComponentName extends React.Component{
	render(){
		return (
			<div></div>
			<div></div>
		)
	}
}
```

### 2. jsx的基础

jsx是javascript和XML的简称，也是由react退出的一个*'新'*的语法，这个语法的*作用*范围就是组件中的`render`方法中，作用不是指的只能在`render`方法中用，在整个文件都能进行生命，但是只能在渲染。
<hr />

我们根据jsx的全程很容易就能知道这个语法是怎么用的，起始就是XML的结构，但是要遵循下面的几条规则：
1. 标签必须闭合
2. 在上面也提到过，只能使用一个父组件进行嵌套

jsx在文件中是通过`{}`来进行解析的，就像其他的模板引擎是一样的，但是jsx只能解析简单表达式，例如：`三目运算`，`判断相等`，`使用map,some,filter等高阶函数代替循环`基本上就这么几个，不能使用`if`或者`for,while`这种复杂操作，基本的jsx语法如下：
1. 注释，`{/*知识内容*/}`
2. 添加样式选择器：不能使用class因为class在es6中是关键字，使用className定义样式 （ 真想使用class定义可以在webpack中添加插件
3. 添加内联样式：`<p style={{display:'none',paddingTop:'15px'}} />`，可能初次看会有一点别扭，但是转化为下面的方式就会好一些
```javascript
let initStyle = {display:'none',paddingTop:'15px'};
<p style={initStyle} />
// 因为{}解析的是initStyle这个对象
```
4. 事件：
```javascript
<p onClick={this.clickHandler.bind(this)}>hello world</p>
// 然后在class内部添加对应的方法
```
5. 循环：使用es5中的高阶函数map：
```javascript
class ComponentName extends React.Component{
	render(){
		let data = [1,2,3,4,5];
		return (
			<div>
			{
				data.map((item,index)=>{
					// jsx规定循环中的每一个都要有一个key
					return <p key={index}>{item.title}</p>
				})
			}
			</div>
		)
	}
}
```
5. 判断：使用三目
```javascript
class ComponentName extends React.Component{
	render(){
		let isShow = true;
		return (
			<div>
				{
					isShow?
					<div>show</div>:
					<div>hide</div>
				}
			</div>
		)
	}
}
```

### 3. 组件的生命周期

[点击移步](https://github.com/helios741/react-comment/blob/master/docs/react-life.md)


### 4. 父子组件之间传递数据

父组件
```javascript
import Header from '../compoents/Header';
class ComponentName extends React.Component{
	render(){
		return (
			<div>
				<Header clickFn={this.clickFn.bind(this)} title='用户界面' />
			</div>
		)
	}
	clickFn() {
		// TODO some
	}
}
```

子组件
```javascript
class Header extends React.Component{
	constructor(){
		super();
		this.state = {
			value:''
		}
	}
	// 通过state实现组件内的数据共享
	render(){
		return (
			<div>
				{/*子组件通过props得到父组件传的参数*/}
					<h2>{this.props.title} </h2>
				}

				<input onClick={this.clickHandle.bind(this)} 
						value={this.props.vlaue} 
						onChange={this.changeHandle.bind(this)} />
			</div>

		)
	}
	changeHandle(e) {
		this.setState({
			value:e.target.value
		});
	}
	clickHandle() {
		const clickFn = this.props.clickFn;
		clickFn(this.state.value); // 通过触发父组件传递的函数，就把子组件的数组发送回了父组件
	}
}
export default Header;
```