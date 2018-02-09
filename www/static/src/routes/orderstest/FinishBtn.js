import React from 'react';
import { Flex } from 'antd-mobile';
import s from './BtnStyle.css'

class FinishBtn extends React.Component {
  constructor() {
    super()
  }
  render(){
    return (
      <Flex justify = "end" className = {s['btn-item']}>
        <button >详情</button>
        <button >删除订单</button>
      </Flex>
    )
  }
}

export default FinishBtn;
