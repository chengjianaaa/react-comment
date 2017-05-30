import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './item';
class Test extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	username:'helios'
        }
        setInterval(()=>{
        	this.setState({
        		username:'syl'
        	})
        },3000)
    }
	    
    render() {
        return (
        	<h1> {this.state.username} </h1>
        )
    }
    componentWillUpdate(nextProps, nextState) {
    	console.log('sssssssssssssssss')
    }
}

export default Test