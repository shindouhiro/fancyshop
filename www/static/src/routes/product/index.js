import React from 'react';
import { Flex, Carousel } from 'antd-mobile';

import ProductTabs from './ProductTabs';
import ProductShare from './ProductShare';
import ProductBottom from './ProductBottom';
import ProductModal from './ProductModal';
import style from './common.css'
import '../../service/data/datasource';
import { getProduct } from '../../actions/productAction';
import { connect } from 'react-redux';
import MyActivityIndicator  from '../common/MyActivityIndicator';
import { loadAccessForCurrentUser } from '../../actions/access';


class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2: false,
      val: 1,
      product: [],
      data: ['1', '2', '3'],
      imgHeight: 176,
      slideIndex: 0,
      tagMenuClick: [true]
    }
  }


componentDidMount() {
    let id = this.props.match.params.id;
    let { dispatch } = this.props;
    dispatch(loadAccessForCurrentUser(id));
    dispatch(getProduct(id))
 }

 componentWillReceiveProps(nextProps) {
  
   let tagMenuArr = [];
   let spec = nextProps.product.selected
   for(var i=0;i<spec.length;i++){
    tagMenuArr.push(spec[i].isThis)
   }
   this.setState({
    tagMenuClick: tagMenuArr
   })
 }

render(){
  let { product } = this.props
  return (
    <div className = {style['product-frame']}>
     <MyActivityIndicator isFetching={product.isFetching} />
      <div >
          <Carousel
            dots = {true}
            autoplay={false}
            infinite
            selectedIndex={0}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
          { product.product.images.map((img,index)=>{
          return(
              <div
                  key={index}
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`${img}`}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }} 
                    alt="图片未显示" 
                  />
                </div>
            )
          })
        }
        </Carousel>
      </div>

      <div  className = {style['describe']}>
      <Flex className = {style['describe-font']} dangerouslySetInnerHTML={{ __html: product.product.description}} ></Flex>
      <Flex style = {{marginBottom:'-10px'}}>
        <Flex.Item justify = "center" >
          <span className = {style['price-font']}>￥{product.product.endPrice/100}</span>
          <span className = {style['black-card']}>{product.product.name_zh}</span>
        </Flex.Item>
        <span align = "right" style = {{color:'#7b7b7b'}}>{product.product.address}</span>
      </Flex>
        <span style = {{ textDecoration:'line-through',color:'#aaa',paddingTop:'3px',lineHeight:'1.8em'}}>￥{product.product.price/100}</span>
      </div>
      <Flex justify = "between" className = {style['item']}>
        <Flex > <ProductShare/></Flex>
        <Flex>一级奖励:<span style= {{color:'#ffcf2d'}}>￥20</span></Flex>
        <Flex>二级奖励:<span style= {{color:'#ffcf2 d'}}>￥10</span><img src={require('../svg/no.svg')} style = {{paddingLeft:'10px',width:'14px'}}  alt="图片未显示" /></Flex>
      </Flex>
      <Flex justify = "between" className = {style['item-des']}>
        <Flex>配送方式:{product.deliver}</Flex>
        <Flex>库存:{product.inventory}</Flex>
        <Flex>销量: {product.sales} </Flex>
      </Flex>
      <Flex className = {style['item-type']}>
        <ProductModal spec={product.product.specifications} tagMenuClick={this.state.tagMenuClick} history={this.props.history}/>
      </Flex>
      <ProductTabs/>
      <ProductBottom history={this.props.history} shopId={product.product.shopId} />
    </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    product: state.productReducer,
    appUser: state.AppUser,
  }
}

export default connect(mapStateToProps)(Goods);
