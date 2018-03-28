import React from 'react';
import goodImg from '../../assets/img/reward/good.jpg';
import { Flex } from 'antd-mobile';

class Goods extends React.Component {

  render(){
   
    let {name, price, spec,num} = this.props
    return(
      <div>
        {this.props.goods}
          <Flex justify = "start" style = {{backgroundColor:'#f8f8f8',padding:'15px',height:'auto',margin:'5px 10px 15px 10px'}}>
            <img alt="图片未显示" src = { goodImg } style = {{height:'50px',width:'70px'}}/>
          <div style = {{paddingLeft:'8px'}}>
            <Flex style = {{marginBottom:'10px'}}>
              <span style = {{fontSize:'16px',color:'#1b1b1b'}}>{name}</span>
            </Flex>

            <span style = {{color:'#888',fontSize:'14px'}}>类型：{spec}</span>
             &nbsp;&nbsp; &nbsp;&nbsp;
            <span  style = {{color:'#888',fontSize:'14px'}}>￥{price} &nbsp;&nbsp; ×{num}</span>

          </div>
        </Flex>


      </div>
    )
  }
}
export default Goods;
