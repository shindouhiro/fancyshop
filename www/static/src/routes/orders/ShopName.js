import React from 'react';
import { Flex } from 'antd-mobile';
import userImg from '../../assets/img/timg.jpg';


class ShopName extends React.Component {
  constructor() {
    super()
  }

  render(){
    return (
      <Flex style = {{padding:'15px 15px 0px 15px'}}>
        <img style = {{height:'30px',width:'30px',border:'1px solid #111',borderRadius:'15px',backgroundColor:'#111',marginRight:'10px'}}/>
        <span>{this.props.shop}</span>
      </Flex>
    )
  }
}
 export default ShopName;
