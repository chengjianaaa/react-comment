import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibilityFilters,addTodo,completeTodo,setVisibilityFilter} from '../actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
class App extends Component {
	render() {
		const {dispatch,visibleTools,visibilityFilter} = this.props;
		
		console.log(visibleTools);
		return (
			<div>
				<AddTodo onAddClick={this.clickHandle.bind(this)} />
				<TodoList  todos={visibleTools} onTodoClick={this.onTodoClick.bind(this)} />
				<Footer filter={visibilityFilter} onFilterChange={this.onFilterChange.bind(this)} />
			</div>
			
		)
	}
	onTodoClick(index) {
		const dispatch = this.props.dispatch;
		dispatch(completeTodo(index));
	}
	clickHandle(text) {
		const dispatch = this.props.dispatch;
		dispatch(addTodo(text));

	}
	onFilterChange(nextFilter) {
		const dispatch = this.props.dispatch;
		dispatch(setVisibilityFilter(nextFilter));
	}

}

App.propTypes = {
	visibiltyTodos:PropTypes.arrayOf(PropTypes.shape({
		text:PropTypes.string.isRequired,
		completed:PropTypes.bool.isRequired
	}).isRequired).isRequired,
	visibilityFilter: PropTypes.oneOf([
		'SHOW_ALL',
		'SHOW_COMPLETED',
		'SHOW_ACTIVE'
	]).isRequired
}

function selectTodos(todos,filter) {
	switch(filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo=>todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo=>!todo.completed);
		default :
			return todos;
	}
}

function select(state) {
	console.log(state,'********');
	return {
		visibleTools:selectTodos(state.todos,state.visibilityFilters),
		visibilityFilter:state.visibilityFilters
	}
}

export default connect(select)(App);