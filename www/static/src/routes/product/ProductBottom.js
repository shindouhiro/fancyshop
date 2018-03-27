import React from 'react';
import s from './common.css';
import { MClient } from '../../config/asteroid.config.js';
import { connect } from 'react-redux';
import { openSpecModel } from '../../reducers/model.redux';
import { modelInfo } from '../../map_props';




class ProductBottom extends React.Component {
  constructor(props) {
    super(props);
    this.facilitator = this.facilitator.bind(this)
    this.firmorder = this.firmorder.bind(this)
    this.firmtest = this.firmtest.bind(this)
    this.AddCart = this.AddCart.bind(this)
  }

  componentDidMount() {
      console.log(this.props.shopId)
  }

  blockModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    console.log("弹出增加购物车");
     
    const {appUser} = this.props;
    if(appUser.status === "offline"){
      this.props.history.push("/tablogin")
    }
    this.props.dispatch(openSpecModel(true))
   //  this.setState({
   //    [key]: true,
   //  });
   }


  AddCart() {
    let product = Object.assign({},this.props.product,{user_id: 1},{count: 1})
    console.log(product);
    MClient.call('shop_carts.add_cart',product)
  }

  facilitator () {
    console.log(this.props.shopId)
    this.props.history.push(`/facilitator/${this.props.shopId}`)
  }
  firmorder() {
    this.props.dispatch(openSpecModel(true,'orders'))
  }
  firmtest() {
    this.props.history.push('/firmtest')
  }

  render(){
    return(
      <div>
       
        <div className = {s['container']}>
        
          <button style = {{display:'flex',flexGrow:'1',backgroundColor:'#fff',justifyContent:'center',alignItems: 'center',color:'#1b1b1b',borderRadius:'0',border:'none',borderTop:'1px solid #eee',height:'50px'}} onClick={this.facilitator}>
            <img alt="" src={require('../svg/shop.svg')} /><span>店铺</span>
          </button>
          <button style = {{flexGrow:'1',backgroundColor:'#00b7ee',justifyContent:'center',color:'#fff',borderRadius:'0',border:'none',height:'50px'}} onClick={this.blockModal('modal2')}>加入购物车</button>
          <button style = {{flexGrow:'1',backgroundColor:'#ffcf2d',justifyContent:'center',color:'#fff',borderRadius:'0',border:'none',height:'50px'}} onClick={this.firmorder}>立即购买</button>
        </div>
      
      </div>
    )
  }
}

export default connect(modelInfo)(ProductBottom);
