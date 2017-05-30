import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

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
    
    componentWillReceiveProps(nextProps) {
    	console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate(nextProps, nextState) {
    	console.log('shouldComponentUpdate');
    	return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }
    componentDidUpdate(prevProps, prevState) {
    	console.log('componentDidUpdate');
    }
    componentWillUnmount() {
    	console.log('componentWillUnmount');
    }

}

export default Item