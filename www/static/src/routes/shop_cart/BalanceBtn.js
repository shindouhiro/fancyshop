import React from 'react';
import { Flex,Checkbox } from 'antd-mobile';
import { connect } from 'react-redux';
import { shopCheckAll, cartCreatOrder } from '../../actions/cartAction';


const CheckboxItem = Checkbox.CheckboxItem;

class BalanceBtn extends React.Component {
  constructor() {
    super()
    this.firmorder = this.firmorder.bind(this)
  }

  firmorder(){
    let { cart, dispatch } = this.props;
    console.log(cart);
    
    dispatch(cartCreatOrder(cart.list))
  }
  CheckAll(e) {
    let { cart,dispatch } = this.props;
    let data = cart.list;
    for(var i=0;i<data.shopsData.length;i++){
      data.shopsData[i].checked = e.target.checked;
      for(var j=0;j<data.shopsData[i].productsData.length;j++){
        data.shopsData[i].productsData[j].checked = e.target.checked;
      }
    }
    dispatch(shopCheckAll(data))
  }

  render(){
    let { cart } = this.props;
    return (
      <div style = {{position:'fixed',bottom:'50px',marginTop:'20px',width:'100%'}}>
    <Flex>
      <CheckboxItem style = {{ flexGrow:'1',backgroundColor:'#333',color:'#fff',paddingLeft:'7px',height:'50px'}} onChange={(e)=>this.CheckAll(e)}>
        <span style = {{color:'white',lineHeight:'1.95em'}}>全选</span>
        <span style = {{float:'right',color:'#fff',lineHeight:'1.95em'}}>合计：
        <span style= {{color:'red',lineHeight:'1.95em'}}>￥{cart.total/100}</span></span>
      </CheckboxItem>
      <button style = {{display:'flex',flexGrow:'2',backgroundColor:'#ffcf2d',justifyContent:'center',color:'#fff',borderRadius:'0',border:'none',height:'50px',fontSize:'17px'}} onClick={this.firmorder}>
        <span style= {{textAlign:'center',color:'#fff',lineHeight:'1.95em'}}>结算</span>
      </button>
    </Flex>
       </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  }
}



export default connect(mapStateToProps)(BalanceBtn);
