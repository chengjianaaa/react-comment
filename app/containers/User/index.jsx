import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header';
import UserInfo from '../../components/UserInfo';
import OrderList from './subPage/OrderList';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const userinfo = this.props.userinfo;
        
        return (
            <div>
                <Header title='用户中西' routerBack='/' />
                <UserInfo username={userinfo.username} city={userinfo.cityName} />
                <OrderList username={userinfo.username}  />
            </div>
        )
    }
    componentDidMount() {
        const username = this.props.userinfo.username;
        if(!username) {
            hashHistory.push('/Login');
        }
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)