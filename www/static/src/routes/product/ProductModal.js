import React from 'react';
import { Flex, Button, Modal, WhiteSpace, List, Stepper} from 'antd-mobile';
import goodImg from '../../assets/img/reward/good.jpg';
import style from './ProductBottom.css';
import { connect } from 'react-redux';
import { openSpecModel, closeSpecModel } from '../../reducers/model.redux';
// import { changeProduct } from '../../reducers/product.redux';
import { changeSpce } from '../../actions/productAction';
import {  createOrder } from '../../actions/products';
import { addProductCount } from '../../actions/productAction';
import { getCart } from '../../actions/cartAction';
// import { addCart, getCart, insertCart  } from '../../reducers/cart.redux';
// import { modelInfo } from '../../map_props';
import { addCart, insertCart } from '../../actions/cartAction';
import { getStore } from '../../config/mUtils';
import { getUserbyId } from '../../actions/users';


class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
      data: ['1', '2', '3'],
      imgHeight: 176,
      slideIndex: 0,
      tagMenuClick: [],
    }
  }


  componentDidMount() {
    let userId = getStore('userId');
    this.props.dispatch(getCart(userId))
    this.props.dispatch(getUserbyId(userId))
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagMenuClick: nextProps.tagMenuClick
    });
  }

  filterSpce(spec) {
    for(var i=0;i<spec.length;i++){
      if(spec[i].isThis===true){
        return spec[i]
      }
    }
  }

    showModal = key => (e) => {
     
     e.preventDefault(); // 修复 Android 上点击穿透
    
     this.props.dispatch(openSpecModel())
   }

   //加入购物车
   onClose = key => (e) => {
    e.preventDefault(); 
    console.log(123)
     let { cart, dispatch, product } = this.props;
    let userId = getStore('userId');
    let count = product.count;
    let selected = this.filterSpce(product.selected)
    // let spec = product.selected == 0 ?  '默认规格': product.selected;
    let userInfo = JSON.parse(getStore('userInfo'));
    console.log(`用户信息`);
    console.log(userInfo);
    if(this.props.model.way==="orders"){
      let params = {
        userId,
        status: 'unpaid',
        shop_id: product.product.shopId,
        username: userInfo.username,
        nickname: userInfo.nickname,
        mobile: userInfo.profile.mobile,
        shopAddress: product.product.shop_address,
        shopName: product.product.shop_name,
        shopCover: product.product.shop_cover,
        remark: '',
        products: [
          {
            price: product.product.endPrice,
            count,
            cover: product.product.cover,
            product_id: product.product._id,
            name: product.product.name_zh,
            prodductSpec: {
              ...selected
            }
          },
        ]
      };
      console.log(params);
      dispatch(createOrder(params));
      dispatch(closeSpecModel());
     }else{
     let count =product.count !== undefined ?product.count : 1
       let productId =product.product._id
      //  let shopId =product.product.shop_id
       let shopIds = [];
       let goodIds = [];
       let specIds = [];
  
   
      if (cart.list.userId === ''){
        console.log(`购物车不存在`)
        let params = {
          userId,
          shopsData: [
            {
              shop_name: product.product.shop_name,
              checked: false,
              shop_id: product.product.shopId,
              status: 'unpaid',
              address: "user.address.id",
              username: userInfo.username,
              nickname: userInfo.nickname,
              mobile: userInfo.profile.mobile,
                productsData: [
                  {
                    shop_id: product.product.shopId,
                    checked: false, 
                    name: product.product.name_zh,
                    count: count,
                    prodductSpec: selected,
                    cover: product.product.cover,
                    product_id: product.product._id
                  }
                ]
            }
          ]
        }
        dispatch(insertCart(params))
        dispatch(closeSpecModel())
    //     this.props.insertCart(params)
    //     this.props.closeSpecModel()
        return
      }
       for(var i = 0;i < cart.list.shopsData.length;i++){
          shopIds.push(cart.list.shopsData[i].shop_id);
          for(var j=0;j<cart.list.shopsData[i].productsData.length;j++){
            goodIds.push(cart.list.shopsData[i].productsData[j].product_id)
            specIds.push(cart.list.shopsData[i].productsData[j].prodductSpec.spec_name)
          }
       
       }
       console.log('shopIds:'+shopIds)
       console.log('goodIds:'+goodIds)
       console.log('specIds:'+specIds)
       if(goodIds.includes(product.product._id) && shopIds.includes(product.product.shopId)){
         console.log(`重复店铺重复商品`)
         for(var i = 0;i < cart.list.shopsData.length;i++){
          for(var j=0;j<cart.list.shopsData[i].productsData.length;j++){
            if(cart.list.shopsData[i].productsData[j].product_id===productId){
              // console.log(cart.list.shopsData[i].productsData[j].prodductSpec.spec_name);
              // console.log(selected.spec_name);
              if(specIds.includes(selected.spec_name)){
                console.log(`存在规格`)
                console.log(count)
                if(cart.list.shopsData[i].productsData[j].prodductSpec.spec_name===selected.spec_name){
                  cart.list.shopsData[i].productsData[j].count = cart.list.shopsData[i].productsData[j].count*1+count
                }
              }else{
                console.log(`生成新的规格商品`+i)
                console.log(cart.list.shopsData[i].productsData);
              cart.list.shopsData[i].productsData.push({
                  shop_id: product.product.shopId,
                  checked: false, 
                  name: product.product.name_zh,
                  status: 1,
                  count: count,
                  prodductSpec: selected,
                cover: product.product.cover,
                  product_id: product.product._id
                })
                dispatch(addCart(cart.list.shopsData))
                dispatch(closeSpecModel())
                return
              }
            }
          }
         }
       }else if(shopIds.includes(product.product.shopId)){
         console.log(`重复店铺`);
        for(var i = 0;i < cart.list.shopsData.length;i++){
            if(cart.list.shopsData[i].shop_id === product.product.shopId){
              cart.list.shopsData[i].productsData.push({
                shop_id: product.product.shopId,
                checked: false, 
                name: product.product.name_zh,
                status: 1,
                count: count,
                prodductSpec: selected,
                cover: product.product.cover,
                product_id: product.product._id
              })
            }
         }
       }else{
         console.log(`更新`)
         console.log(cart.list);
         console.log(`数量`)
         console.log(count);
          cart.list.shopsData.push({
              shop_name: product.product.shop_name,
              checked: false,
              shop_id: product.product.shopId,
              status: 'unpaid',
              address: "user.address.id",
              username: userInfo.username,
              nickname: userInfo.nickname,
              mobile: userInfo.profile.mobile,
                productsData: [
                  {
                    shop_id: product.product.shopId,
                    checked: false, 
                    name: product.product.name_zh,
                    status: 1,
                    count: count,
                    prodductSpec: selected,
                    cover: product.product.cover,
                    product_id: product.product._id
                  }
                ]
          })
       }
      //  this.props.addCart(cart.list.shopsData);
      console.log(cart.list.shopsData)
       dispatch(addCart(cart.list.shopsData))
       dispatch(closeSpecModel())
       console.log(`结束`)
      //  this.props.closeSpecModel()

    }
    
   
   }


    

   Close = key => (e) => {
    e.preventDefault();
    this.props.dispatch(closeSpecModel())
    // this.props.closeSpecModel()
   }

   onChange = (val) => {
     this.setState({ val },()=>{
       this.props.dispatch(addProductCount(this.state.val))
     });

   }

   handleSelectedSpec(i){
    let tagMenuClick = this.state.tagMenuClick;
       this.clearClickedStyle();
       tagMenuClick[i] = !tagMenuClick[i];
    this.setState({
      tagMenuClick,
    })
    this.props.dispatch(changeSpce(i))
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



   render(){
     let modelStatus = this.props.model.spec_model;
     let {product} = this.props
     let spec = product.selected
     let specArr = []
     let price = [];
     for(var i=0; i<spec.length; i++){
        specArr.push(
        <div className = {style['color-div']} style={{background: this.state.tagMenuClick[i] ? "#e85839" : "#e5e5e5"}} key={i} onClick={this.handleSelectedSpec.bind(this,i)}>
            {spec[i].spec_name}
        </div>
       )
       if(spec[i].isThis === true){
        price.push(`${spec[i].spec_value}`);
       }
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
              <img alt="" src = {goodImg} style = {{width:'60px',height:'60px',border:'6px solid #680000'}}/>
              <div style = {{paddingLeft:'10px'}}>
                <span style = {{color:'red',fontSize:'22px',paddingRight:'10px'}}>￥{price/100}</span><br/>
                <span style = {{color:'#666',fontSize:'14px'}}>请选择类型</span>
              </div>
              <img alt="" src = {require('../svg/close_black.svg')} style = {{position:'absolute',right:'15px',top:'10px',width:'25px',height:'25px',paddingBottom:'44px'}} onClick = {this.Close('modal2')}/><br/>
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

 function mapStateToProps(state) {
   return {
     currentUser: state.CurrentUser,
     product: state.productReducer,
     cart: state.cartReducer,
     model: state.model,
     appUser: state.AppUser,
   }
 }

export default connect(mapStateToProps)(ProductModal);
