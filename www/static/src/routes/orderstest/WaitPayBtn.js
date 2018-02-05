import React from 'react';
import { Flex } from 'antd-mobile';
import s from './BtnStyle.css'


class WaitPayBtn extends React.Component {
  constructor() {
    super()
    this.paid = this.paid.bind(this)
  }
  paid(){
    this.props.history.push('/paid')
  }
  render(){
    return (
      <Flex justify = "end"  className = {s['btn-item']}>
        <button >详情</button>
        <button >取消订单</button>
        <button  className = {s['pay-btn']} style = {{backgroundColor:'red',border:'1px solid red'}} onClick = {this.paid}>支付</button>
      </Flex>
    )
  }
}

export default WaitPayBtn;
