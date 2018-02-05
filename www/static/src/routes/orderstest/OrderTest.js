import React from 'react';
import { Flex } from 'antd-mobile';
import shopImg from '../../assets/img/timg.jpg';
import goodImg from '../../assets/img/reward/good.jpg';

class OrderTest extends React.Component {
  constructor(props) {
    super(props)
  }

// let {name, price, spec,num} = this.props
  render(){
      let {name, price, spec,num} = this.props
    return (
      <div style = {{backgroundColor:'#fff',marginTop:'50px',padding:'10px 10px'}}>
        <Flex justify = "start">
          <img src = {shopImg} style = {{width:'38px',height:'38px',borderRadius:'19px',marginRight:'10px'}}/>
          <span style = {{color:'#333',fontSize:'16px',fontWeight:'600'}}>店铺名字</span>
        </Flex>
        <Flex justify = "start" style = {{backgroundColor:'#eee',padding:'10px',marginTop:'10px'}}>
          <Flex style = {{width:'70px'}}>
            <img src = {goodImg} style = {{width:'60px',height:'60px'}}/>
          </Flex>
          <Flex direction = "column" justify = "start" align = "start" style = {{width:'100%'}}>
            <span style = {{color:'#333',fontSize:'16px',fontWeight:'600',width:'100%',paddingLeft:'10px'}}>这是商品名称一般情况下可以占两行</span><br/>
            <div style = {{display:'flex',justifyContent:'space-around',paddingLeft:'10px',color:'#666'}}>
              <div>类型：1L 自喜力</div>
              <div style = {{paddingLeft:'3rem',paddingRight:'15px'}}>￥87元</div>
              <div>×83</div>
            </div>
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default OrderTest;
