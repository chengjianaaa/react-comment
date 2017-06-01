import React, { Component, PropTypes } from 'react';
import Todo from './Todo';
export default class TodoList extends Component{
	render() {
		const todos = this.props.todos;
		return (
			<ul>
			{
				todos.map((todo,index)=>{
					return <Todo 
						{...todo}
						index={index} 
						key={index}
						onClickFn={this.onClickFn.bind(this)}/>
				})
			}
			</ul>
		)
	}
	onClickFn(index) {
		const onTodoClick = this.props.onTodoClick;
		console.log(index);
		onTodoClick(index);
	}

}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}