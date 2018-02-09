import React from 'react';
import { Flex } from 'antd-mobile';

class WaitPayBtn extends Reacr.Component {
  constructor() {
    super();
  }
  render(){
    return (
      <Flex justify = "end">
        <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
        <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
        <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>
      </Flex>
    )
  }
}
export WaitPayBtn;

class UntreatedBtn extends Reacr.Component {
  constructor() {
    super();
  }
  render(){
    return (
      <Flex justify = "end">
        <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
        <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>二維碼</button>
        <button type = "ghost" style = {{backgroundColor:'#fff',color:'#000',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>申请退款</button>
        {/* <div >{this.state.waitpay}</div>
        <div>{this.state.untreated}</div> */}
        {/* if(this.state.waitpay){
          <Flex justify = "end">
            <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
            <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
            <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>
          </Flex>
        }else if(this.state.untreated) {
          <Flex justify = "end">
            <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
            <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>二維碼</button>
            <button type = "ghost" style = {{backgroundColor:'#fff',color:'#000',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>申请退款</button>
          </Flex>
        }else {
          <Flex justify = "end">
            <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
            <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>删除订单</button>
            {/* <button type = "ghost" style = {{backgroundColor:'#fff',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>申请退款</button> *}
          </Flex>
        } */}
        {/* <Flex justify = "end">
          <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
          <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
          <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>

        </Flex> */}
        {/* switch () {
          case 1:
          <Flex justify = "end">
            <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
            <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
            <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>

          </Flex>
            break;
            case 2:
            <Flex justify = "end">
              <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
              <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
              <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>

            </Flex>
            break;
            case 6:
            <Flex justify = "end">
              <button style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>详情</button>
              <button type = "ghost" style = {{backgroundColor:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid #333',borderRadius:'8px'}}>取消订单</button>
              <button type = "ghost" style = {{backgroundColor:'red',color:'#fff',padding:'6px 15px',margin:'0 10px',border:'1px solid red',borderRadius:'8px'}}>支付</button>

            </Flex>

          default:
        } */}
      </Flex>
    )
  }
}
export UntreatedBtn;
