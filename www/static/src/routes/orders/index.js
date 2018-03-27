import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd-mobile';
import '../../service/data/datasource';
import { gainAllOrders, gainPaidOrders,gainUnPaidOrders,gainCancelOrders} from '../../actions/orders';
import OrderList from './OrderList';
import { getStore} from '../../config/mUtils.js';
import { getUserbyName} from '../../actions/users'; 
class Orders extends React.Component {
  constructor(props) {  
    super(props)
    this.state = {
      all: [],
      waitpay: [],
      untreated: [],
      finish: [],
    }
    this.switchTab = this.switchTab.bind(this);
  }
  switchTab(tab,index) {  
    const { dispatch } = this.props;
    let status = tab.status;
    let userId = getStore("userId");
    console.log(userId)
    switch(status){
      case  '全部':
        dispatch(gainAllOrders(userId));
        break;
      case '待付款':
        dispatch(gainUnPaidOrders(userId));
        break;
      case '未处理':
        dispatch(gainPaidOrders(userId));
        break;
      case '已完成':
        dispatch(gainPaidOrders(userId));
        break;
      case '无效':
      dispatch(gainCancelOrders(userId));
      break;
      default:
        console.log('无效');
    }
  }
  componentWillMount(){
    const { dispatch } = this.props;
    // const {appUser} = this.props
    let userId = getStore("userId");
    console.log(userId)
    if (userId === undefined){
      let username = this.props.appUser.username 
      dispatch(getUserbyName(username))
    }
    dispatch(gainAllOrders(userId));
    
  }


  render(){
    const tabs = [
      {title:'全部',status: '全部'},
      {title:'待付款', status: '待付款'},
      {title:'未处理', status: '未处理'},
      {title:'已完成', status: '已完成'},
      {title:'无效', status: '无效'},
    ]
   
    return(
    <div className = "all">
      <Tabs tabs = {tabs} initialPage = {0} animated = {false} useOnPan = {false} onChange={this.switchTab}>
        <div style = {{backgroundColor:'#fff',paddingBottom:'10px'}} key = "all">
        <OrderList dataSource={this.props.orders}  history={this.props.history}/>
        </div>
        <div className = "waitpay" style = {{backgroundColor:'#fff'}} key = "waitay">
          <OrderList dataSource={this.props.orders}  history={this.props.history}/>
        </div>
        <div style = {{backgroundColor:'#fff'}}>
          <OrderList dataSource={this.props.orders} history={this.props.history} />
        </div>
        <div className = "finish" style = {{backgroundColor:'#fff'}} key = "finish">
          <OrderList dataSource={this.props.orders}  history={this.props.history}/>
        </div>
        <div className = "invalid" style = {{backgroundColor:'#fff'}} key = "finish">
          <OrderList dataSource={this.props.orders}  history={this.props.history}/>
        </div>
      </Tabs>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.ordersInfo.orders,
    user: state.user
  }
}

export default connect(mapStateToProps)(Orders);