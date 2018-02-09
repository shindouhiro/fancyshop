import React from 'react';
import { connect } from 'react-redux';
import { Flex, Tabs, Button } from 'antd-mobile';
// import { Goods, ShopName } from './OrdersCommon';
import ShopName from './ShopName';
import Goods from './Goods';
import Paid from './Paid';
import UnTreated from './UnTreated';
import WaitPay from './WaitPay';
import Finish from './Finish';
import Invalid from './Invalid';
import styles from './Common.css';
import '../../service/data/datasource';
import axios from 'axios';
import { gainAllOrders, gainPaidOrders,gainUnPaidOrders} from '../../actions/orders'

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
    let self = this;
    let userId = 'akDYXHWR7wcmzR9rz'
    switch(status){
      case  '全部':
        console.log(this.state.all)
        console.log("11111")
      dispatch(gainAllOrders(userId));
      console.log(this.props.orders)
        // axios.get('/orderlist')
        // .then(function(data){
        //   console.log();
        //   self.setState({
        //     all: data.data.list
        //   })
        // })
        break;
      case '待付款':
      console.log(111);
      dispatch(gainUnPaidOrders(userId));
        break;
      case '未处理':
      dispatch(gainUnPaidOrders(userId));
        break;
      case '已完成':
      dispatch(gainPaidOrders(userId));
      // console.log(3333);
        break;
      default:
        console.log('无效');
    }
    // console.log(`tab:${tab},index: ${index}`);



  }


  render(){
    const tabs = [
      {title:'全部',status: '全部'},
      {title:'待付款', status: '待付款'},
      {title:'未处理', status: '未处理'},
      {title:'已完成', status: '已完成'},
      {title:'无效', status: '无效'},
    ]
    console.log(this.state.waitpay)
    let {waitpay,all,untreated,finish}= this.state;
    console.log(111);
    console.log(this.state.waitpay)
    return(
    <div className = "all">
      <Tabs tabs = {tabs} initialPage = {5} animated = {false} useOnPan = {false} onChange={this.switchTab}>
        <div style = {{backgroundColor:'#fff',paddingBottom:'10px'}} key = "all">
          {/* <WaitPay waitpay={all}/>
          <UnTreated untreated={all}/>
          <Finish data={all}/>
          <Invalid/> 
          {this.state.all} */}

        </div>
        <div className = "waitpay" style = {{backgroundColor:'#fff'}} key = "waitay">
          <WaitPay waitpay={waitpay.list} shop={waitpay.shop_name} history = {this.props.history} />
        </div>
        <div style = {{backgroundColor:'#fff'}}>
          <UnTreated untreated={untreated} history = {this.props.history}/>
        </div>
        <div className = "finish" style = {{backgroundColor:'#fff'}} key = "finish">
          <Finish finish={finish} history = {this.props.history}/>
        </div>
      <div className = "invalid">
        <div style = {{backgroundColor:'#fff',paddingBottom:'15px'}} key = "invalid">
          {/* <Finish/> */}
          </div>
          <div style = {{backgroundColor:'#fff'}} >
          <ShopName/>
          <Goods/>
          <Flex justify = "end" style = {{marginRight:'10px'}}>
            合计：<span className = {styles['total']}> ￥500</span>
          </Flex>
          <Flex justify = "end" style = {{margin:'10px'}}>
            <button className = {styles['detail-btn']}>详情</button>
            <button className = {styles['revoke-btn']}>撤销退款</button>
          </Flex>
          </div>
      </div>
      </Tabs>
    </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    orders: state.ordersInfo.orders,
    user: state.user
  }
}

export default connect(mapStateToProps)(Orders);