import React from 'react';
import { Flex } from 'antd-mobile';
import s from './BtnStyle.css';

class UntreatedBtn extends React.Component {
  constructor() {
    super()
    // this.paid = this.paid.bind(this)
  }

  render(){
    return (
      <Flex justify = "end"  className = {s['btn-item']}>
        <button >详情</button>
        <button>二維碼</button>
        <button>申请退款</button>
      </Flex>
    )
  }
}

export default UntreatedBtn;
