import React from 'react';
import { Flex, Button, Modal, WhiteSpace, List, Stepper, Carousel} from 'antd-mobile';
import goodImg from '../../assets/img/reward/good.jpg';
import style from './ProductBottom.css';
import s from './ProductModal.css';
import { connect } from 'react-redux';
import { openSpecModel, closeSpecModel } from '../../reducers/model.redux';
import { changeProduct } from '../../reducers/product.redux';
import {  addCount,createOrder } from '../../actions/products';
import { addCart, getCart, insertCart  } from '../../reducers/cart.redux';
import { modelInfo } from '../../map_props';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal2: false,
      val: 1,
      data: ['1', '2', '3'],
      imgHeight: 176,
      slideIndex: 0,
      tagMenuClick: [false,false],
    }
  }


  componentDidMount() {
    console.log(this.props)
    this.props.getCart(2)
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagMenuClick: nextProps.tagMenuClick
    });
  }

    showModal = key => (e) => {
     e.preventDefault(); // 修复 Android 上点击穿透
     this.props.openSpecModel()
   }

   loopSpecOrderItem(spec) {

   }

   //加入购物车
   onClose = key => (e) => {
    e.preventDefault(); 
    console.log(123)
    let {cart} = this.props;
    let product = this.props.productShow.product;
    let count = this.props.productShow.count
    // console.log(product)
    // console.log(cart)
    let spec = this.props.spec.length == 0 ?  '默认规格': product.specifications;
    if(this.props.model.way=="orders"){
      let params = {
        userId: 2,
        status: 'unpay',
        shopId: product.shopId,
        address: "user.address.id",
        username: "李逍遥",
        mobile: "13751124249",
        products: [
          {
            price: product.endPrice,
            count,
            cover: product.cover,
            id: product._id,
            name: product.name_zh,
            specifications: {
              name: spec
            }
          },
        ]
      };
      console.log(`提交订单`)
      this.props.createOrder(params);
      this.props.closeSpecModel()
     }
    // let selected =product.selected !== undefined ?product.selected :product.good.spec[0]
    //    let count =product.count !== undefined ?product.count : 1
    //    let productId =product.good.id
    //    let shopId =product.good.shop_id
    //    let shopIds = [];
    //    let goodIds = [];
    //    var ShopReplaceData;
    //    var ProductReplaceData;
    // if(this.props.model.way=="orders"){
    //  let params = {
    //    shop_id: product.good.shop_id,
    //    prodductSpec: selected,
    //    product_id: product.good.id,
    //    count: count,
    //  }
    //  console.log(params)
    // }else{
    //   if(cart.goods.user_id == ''){
    //     console.log(`购物车不存在`)
    //     let params = {
    //       user_id: 2,
    //       shopsData: [
    //         {
    //           shop_name: product.good.shop_name,
    //           checked: false,
    //           shop_id: product.good.shop_id,
    //             productsData: [
    //               {
    //                 shop_id: product.good.shop_id,
    //                 checked: false, 
    //                 name: product.good.name,
    //                 status: 1,
    //                 count: count,
    //                 prodductSpec: selected,
    //                 product_id: product.good.id
    //               }
    //             ]
    //         }
    //       ]
    //     }
    //     console.log(params)
    //     this.props.insertCart(params)
    //     this.props.closeSpecModel()
    //     return
    //   }
    //    for(var i = 0;i < cart.goods.shopsData.length;i++){
    //       shopIds.push(cart.goods.shopsData[i].shop_id);
    //       for(var j=0;j<cart.goods.shopsData[i].productsData.length;j++){
    //         goodIds.push(cart.goods.shopsData[i].productsData[j].product_id)
    //       }
       
    //    }
    //    if(goodIds.includes(product.good.id) && shopIds.includes(product.good.shop_id)){
    //      for(var i = 0;i < cart.goods.shopsData.length;i++){
    //       for(var j=0;j<cart.goods.shopsData[i].productsData.length;j++){
    //         if(cart.goods.shopsData[i].productsData[j].product_id==productId){
    //           if(cart.goods.shopsData[i].productsData[j].prodductSpec.name==selected.name){
    //             cart.goods.shopsData[i].productsData[j].count = cart.goods.shopsData[i].productsData[j].count*1+count
    //           }else{
    //             console.log(`生成新的规格商品`)
    //             cart.goods.shopsData[i].productsData.push({
    //               shop_id: product.good.shop_id,
    //               checked: false, 
    //               name:  product.good.name,
    //               status: 1,
    //               count: count,
    //               prodductSpec: selected,
    //               product_id: product.good.id
    //             })
    //           }
    //         }
    //       }
    //      }
    //    }else if(shopIds.includes(product.good.shop_id)){
    //     for(var i = 0;i < cart.goods.shopsData.length;i++){
    //         if(cart.goods.shopsData[i].shop_id == product.good.shop_id){
    //           cart.goods.shopsData[i].productsData.push({
    //             shop_id: product.good.shop_id,
    //             checked: false, 
    //             name:  product.good.name,
    //             status: 1,
    //             count: count,
    //             prodductSpec: selected,
    //             product_id: product.good.id
    //           })
    //         }
    //      }
    //    }else{
    //       cart.goods.shopsData.push({
    //           shop_name: product.good.shop_name,
    //           checked: false,
    //           shop_id: product.good.shop_id,
    //             productsData: [
    //               {
    //                 shop_id: product.good.shop_id,
    //                 checked: false, 
    //                 name: product.good.name,
    //                 status: 1,
    //                 count: count,
    //                 prodductSpec: selected,
    //                 product_id: product.good.id
    //               }
    //             ]
    //       })
    //    }
    //    this.props.addCart(cart.goods.shopsData);
    //    this.props.closeSpecModel()

    // }
      
   
   }

   Close = key => (e) => {
    e.preventDefault();
    this.props.closeSpecModel()
   }

   onChange = (val) => {
     this.setState({ val },()=>{
       this.props.addCount(this.state.val)
     });

   }

   handleSelectedSpec(i){
    let tagMenuClick = this.state.tagMenuClick;
       this.clearClickedStyle();
       tagMenuClick[i] = !tagMenuClick[i];
    this.setState({
      tagMenuClick,
    })
    // this.props.changeProduct(i)
   }



     handleTagMenuClick(num){
       let tagMenuClick = this.state.tagMenuClick;
       this.clearClickedStyle();
       tagMenuClick[num] = !tagMenuClick[num];
       this.setState({
         tagMenuClick,
       })
     }

     clearClickedStyle(){
       let tagMenuClick = this.state.tagMenuClick;
       for (var i = 0; i < tagMenuClick.length; i++) {
         tagMenuClick[i] = false;
       }
     }

     renderSpec() {

     }


   render(){
     let modelStatus = this.props.model.spec_model;
     let product = this.props.productShow.product;
     console.log(this.props.spec.length)
    //  let spec = this.props.spec
     let spec = this.props.spec.length == 0 ? [{name: '默认规格',price: product.endPrice,isThis: true}] : product.specifications;
     console.log(spec)
     console.log(spec.length)
     let specArr = []
     let price = [];
     for(var i=0; i<spec.length;i++){
       console.log(123);
      specArr.push(
      <div className = {style['color-div']} style={{background: this.state.tagMenuClick[i] ? "#e85839" : "#e5e5e5"}} key={i} onClick={this.handleSelectedSpec.bind(this,i)}>
          {spec[i].name}
      </div>
       )
       {spec[i].isThis===true ? price.push(`${spec[i].price}`) : null }
     }

     

     return(
       <div>
       <Flex.Item onClick={this.showModal('modal2')} style = {{color:'black',justify:'center'}}><span style = {{color:'#888'}}>选择类型</span></Flex.Item>
       <WhiteSpace />
       <Modal
        popup
        visible={modelStatus}
        maskClosable={false}
        animationType="slide-up"
       >
        <div style = {{margin:'10px'}}>
          <Flex>
              <img src = {goodImg} style = {{width:'60px',height:'60px',border:'6px solid #680000'}}/>
              <div style = {{paddingLeft:'10px'}}>
                <span style = {{color:'red',fontSize:'22px',paddingRight:'10px'}}>￥{price}</span><br/>
                <span style = {{color:'#666',fontSize:'14px'}}>请选择类型</span>
              </div>
              {/* <img src = {require('../svg/close_black.svg')} style = {{display:'flex',width:'25px',height:'25px',paddingLeft:'35%',paddingBottom:'44px',alignSelf:'flex-end'}} onClick = {this.Close('modal2')}/><br/> */}
              <img src = {require('../svg/close_black.svg')} style = {{position:'absolute',right:'15px',top:'10px',width:'25px',height:'25px',paddingBottom:'44px'}} onClick = {this.Close('modal2')}/><br/>
          </Flex>


            <Flex style = {{display:'flex',alignSelf:'flex-end'}}>

            </Flex>
            <WhiteSpace/>
            <Flex wrap = "wrap" justify = "start">
              {specArr}

            </Flex>
            <Flex className = {style['num-padding']}>
              购买数量：
              <Stepper
                style={{ width: '50%', minWidth: '80px'}}
                showNumber
                max={99}
                min={1}
                value={this.state.val}
                onChange={this.onChange}
              />
            </Flex>
           <List>
            <List.Item>
              <Button type = "warning" onClick = {this.onClose('modal2')}>确定</Button>
            </List.Item>
          </List>
        </div>
       </Modal>
     </div>
     )
   }
 }

   export default connect(modelInfo,{changeProduct,addCart,addCount,openSpecModel,closeSpecModel,getCart,insertCart,createOrder })(ProductModal);
