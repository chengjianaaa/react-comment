import { combineReducers } from 'redux';

import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,VisibilityFilters,addTodo,completeTodo,setVisibilityFilter} from '../actions';

const { SHOW_ALL } = VisibilityFilters;
 
function visibilityFilters(state=SHOW_ALL,action) {
	console.log(state,action);
	switch(action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

function todos(state=[],action) {
	
	switch(action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text:action.text,
					completed:false
				}
			];
		case COMPLETE_TODO:
			return [
				...state.slice(0,action.index),
				Object.assign({},state[action.index],{
					completed:true
				}),
				...state.slice(action.index+1)
			];
		default:
			return state;
	}

}

const todoApp = combineReducers({
	visibilityFilters,
	todos
});

export default todoApp;