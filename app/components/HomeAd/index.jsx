import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less';
class HomeAd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
    	let data =  this.props.data;
    	
        return (
         	<div id='home-ad'>
         		<h2>超值优惠</h2>
         		<div className="ad-container clear-fix">
         			{
         				data.map((item,index)=>{
         					return <div key={index} className="ad-item float-left">
                            <a href='#' target="_blank">
                                <img src={item.img} alt={item.title}/>
                            </a>
                            </div>
         				})
         			}
         		</div>
         	</div>
        )
    }
}

// export default NotFound
module.exports = HomeAd