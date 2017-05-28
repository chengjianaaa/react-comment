import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less';
class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref='wrapper'>
            	{
            		this.props.isLoadingMore?
            		<span>加载中</span>:
            		<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
            	}
            </div>
        )
    }
    loadMoreHandle() {
    	this.props.loadMoreFn();
    }
    componentDidMount() {
    	const loadMoreFn = this.props.loadMoreFn;
    	const wrapper = this.refs.wrapper;
    	function callback() {
    		let wrapperTop = wrapper.getBoundingClientRect().top,
    			windowHeight = window.screen.height;
    		if(wrapperTop && wrapperTop < windowHeight) {
    			loadMoreFn();
    		}
    	}
    	let timer ;
    	window.addEventListener('scroll',()=>{
    		if(this.props.isLoadingMore) return;
    		if(timer) {
    			clearTimeout(timer);
    		}
    		timer = setTimeout(callback,50);
    	},false);
    }
}

export default LoadMore