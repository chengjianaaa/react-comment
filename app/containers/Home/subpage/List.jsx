import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getListData } from '../../../fetch/home/home';
import ListCompoent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';
import './style.less';
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	data:[],
        	hasMore:false,
            isLoadingMore:false,
            page:0
        };
    }
     render() {
        console.log(this.state.data.length);
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                
               {
                    this.state.data.length?
                    <ListCompoent data={this.state.data} />:
                    <div>loding...</div>
                }
                {
                    this.state.hasMore ?
                    <LoadMore isLoadingMore={this.state.isLoadingMore} 
                              loadMoreFn={this.loadMoreData.bind(this)} /> :
                    ''
                }
            </div>
        )
    }
   
   componentDidMount() {
    	this.loadFirstPageDate();
    }
    loadFirstPageDate() {
    	const cityName = this.props.cityName;
    	const result = getListData(cityName,0);
    	this.resultHandle(result);
    }
    loadMoreData() {
        this.setState({
            isLoadingMore:true
        });
        let cityName = this.props.cityName,
            page = this.state.page,
            result = getListData(cityName,page);

        this.resultHandle(result);
        this.setState({
            isLoadingMore:false,
            page:page+1
        });
    }
    resultHandle(result) {
    	result.then(res=>res.json())
    	.then(json=>{
    		this.setState({
    			hasMore:json.hasMore,
    			data:this.state.data.concat(json.data)
            });
    	}).catch(ex => {
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        })
    }
}

export default List