import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Tabs} from 'antd-mobile';
import style from './Facilitator.css';
import goodImg from '../../assets/img/reward/good.jpg';
import userImg from '../../assets/img/timg.jpg';
import {asteroid} from '../../config/asteroid.config';
import { product } from '../../reducers/product.redux';
import { connect } from 'react-redux';
import { loadShopProductsByShopId } from '../../actions/products';

class Facilitator extends React.Component {
  constructor() {
    super();
    this.state = {
      shop: [],
      products: [],
    }
  };
  componentDidMount() {
    let id = this.props.match.params.shopId;
    let { dispatch } = this.props;
    console.log(dispatch);
    console.log(id);
    dispatch(loadShopProductsByShopId(id,1,10))
    asteroid.call('shops.findShopById',id)
            .then(result=> {
              this.setState({
                shop: result,
              })
            })
            .catch(error=> {

            })
  }

  render(){
    const tabs = [
      {title : '商品' },
      {title : '简介' },
    ];
    let { shop, products }  = this.state
    // console.log(this.props.products)
    let productsItem;
    if(this.props.products){
      productsItem = this.props.products.map((product)=>{
        return(
          <div key={product.id}>
            <Link to ={`/product/${product.id}`} >
            <Flex style = {{backgroundColor:'#fff',border:'1px solid #eee',borderRadius:'5px',margin:'10px',padding:'15px',paddingLeft:'20px'}}>
              <img src={product.fields
  .cover} style = {{width:'45px',height:'45px'}}/>
              <div style = {{marginLeft:'15px',marginTop:'10px',color:'#000'}}>{product.fields
  .name_zh}<br/>
              <div style = {{display:'flex',justifyContent:'around',padding:'5px'}}>
                <span style = {{color:'red',marginLeft:'25px'}}>价格:{product.fields
  .price}</span>
                <span style = {{color:'#fc65e4',marginLeft:'25px'}}>销量:18</span>
              </div>
            </div>
            </Flex>
            </Link>
        </div>
        )
      })
    }else{
      console.log(`加载失败`)
    }
    return (
      <div >
        <div className = { style['bg-img']}>
          <Flex justify = "center" align = "center" className = {style['user']}><img src={shop.cover}/></Flex>
          <Flex justify = "center" className = {style['distance']}>{shop.name}</Flex>
          <Flex justify = "center" className = {style['distance2']}>
            <img src = {require('../svg/location-white.svg')} style = {{width:'12px',height:'12px',color:'#fff',letterSpacing:'1px',padding:'0 5px'}}/>{shop.address}
            <img src = {require('../../assets/svg/phone-blue.svg')} style= {{backgroundColor:'#00b7ee',borderRadius:'14px',width:'16px',height:'16px',padding:'6px',alignSelf:'flex-end',marginLeft:'10px'}}/>
          </Flex>
        </div>
        <Tabs tabs = {tabs} >
          <div>
           { productsItem }
          </div>
          <div>
           <Flex justify = "start" align = "center" style = {{margin:'10px',padding:'15px 10px',fontSize:'14px',backgroundColor:'#fff'}}>
              {shop.description}
            </Flex>
          </div>
        </Tabs>
      </div>
    )
  }
}

function mapProducts(state){
  return {
    products: state.productShow.products
  }
}

export default connect(mapProducts)(Facilitator);
