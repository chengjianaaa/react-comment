import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getOrderListData, postComment  } from '../../../fetch/user/orderlist';
import OrderListComponent from '../../../components/OrderList';
import './style.less';
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data:[]
        }
    }
    render() {
        return (
            <div className="order-list-container">
            	<h2>您的订单	 </h2>
            	{
            		this.state.data.length?
            		<OrderListComponent data={this.state.data} 
                                        submitComment={this.submitComment.bind(this)}/>:
           			""
            	}
            </div>
        )
    }
    componentDidMount() {
    	const username = this.props.username;
    	
    	if(username) {
    		this.loadOrderList(username);
    	}
    }
    loadOrderList(username) {
    	const result = getOrderListData(username);
    	result.then(res=>res.json())
    	.then(json=>{
    		const data = json;
    		this.setState({
    			data
    		})
    	}).catch(ex => {
            if (__DEV__) {
                console.error('用户主页“订单列表”获取数据报错, ', ex.message)
            }
        })
    }
    submitComment(id,value,cb) {
        const result = postComment(id,value);
        result.then(res=>res.json())
            .then(json=>{
                if(json.errno ===0 ) {
                    cb();
                }
            })
    }
}

export default OrderList