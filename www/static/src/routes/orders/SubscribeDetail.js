import React from "react";
import { List, Icon, Flex, Button } from 'antd-mobile';
import goodImg from '../../assets/img/reward/good.jpg';
import styles from './WaitDetails.css';
import stylec from './Common.css';
import { connect } from 'react-redux';


class SubscribeDetail extends React.Component {
  constructor() {
    super();
  }

render(){
  const { order } = this.props.order
  return(
    <div style = {{marginTop:'60px'}}>
      <div className = {styles['item-info']}>
        <div><img src={require('../svg/send.svg')} className = {styles['item-icon']}/>配送方式：<span style = {{color:'#888'}}>到店自提</span></div>
        <div><img src={require('../svg/location.svg')} className = {styles['item-icon']}/>地址：<span style = {{color:'#888'}}>{order.address}</span></div>
        <div><img src={require('../svg/phone.svg')} className = {styles['item-icon']}/>电话：<span style = {{color:'#888'}}>123456789</span></div>
        <div><img src={require('../svg/subscribe.svg')} className = {styles['item-icon']}/>预约时间:<span style = {{color:'#888'}}>2018年1月4日&nbsp;15:00</span></div>
      </div>

      <div className = {styles['item-user']}>
        <div><img src={require('../svg/people.svg')} className = {styles['item-icon']}/>左婷——18324190947——川A777777
        </div>
      </div>

      <div className = {styles['item-notice']}>
        <div><img src={require('../svg/notice.svg')} className = {styles['item-icon']}/>备注：<br/>
        <div className = {styles['notice-text']}>到店自提这是占位符占位符请不要介意如此粗糙的占位符哈哈哈哈</div>
      </div>
      </div>
      <div className = {styles['goods-frame']}>
        <Flex justify = "center" className = {styles['goods-item']}>
          <div className = {styles['img-border']} >
            <img src = {goodImg} className = {styles['goods-img']}/>
          </div>
          <div >
            <Flex style = {{marginBottom:'10px'}}>我是商品的长名字占位符占位符占位符哈哈哈哈哈哈</Flex>
            <span className = {styles['type-color']}>类型：4L 自喜力 </span>    <span className = {styles['price-pst']}><span className = {styles['price-color']}>￥250 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </span>×1</span>
          </div>
        </Flex>
        <Flex justify = "end" style = {{marginRight:'10px'}}>
          应付款：<span style = {{color:'red'}}> ￥500</span>
        </Flex>
        <Flex justify = "end" style = {{margin:'10px'}}>
          <button className = {stylec['cancel-btn']} style = {{marginRight:'15px'}}>取消订单</button>
          <button  className = {stylec['pay-btn']}>支付</button>
        </Flex>
      </div>

      <div className = {styles['item-orders']}>
      订单号：12346578154<br/>
      下单时间： 2017/5/13 10：15
      </div>

    </div>
  )
}
}

function mapStateToProps(state) {
  return {
    order: state.ordersInfo.orders,
  }
}

export default connect(mapStateToProps)(SubscribeDetail);