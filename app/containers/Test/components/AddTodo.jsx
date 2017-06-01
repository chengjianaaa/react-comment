import React , {Component,PropTypes} from 'react';


export default class AddTodo extends Component {
	render() {
		return (
			<div>
				<input type='text' ref='input' />
				<button onClick={(e)=>this.clickHandle(e)}>ADD
				</button>
			</div>
		)	
	}
	clickHandle(e) {
		const node = this.refs.input;
		const text = node.value.trim();
		this.props.onAddClick(text);
		node.value = '';
	}
}