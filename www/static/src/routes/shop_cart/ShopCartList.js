import React from 'react';

import { Flex, Checkbox,Button, Modal, WhiteSpace, List, Stepper} from 'antd-mobile';
import styles from './ShopCartList.css';
import style from '../product/ProductBottom.css';
import goodImg from '../../assets/img/reward/good.jpg';
import goodsImg from '../../assets/img/reward/good.jpg';
import userImg from '../../assets/img/timg.jpg';
// import { getCart,productCheckAll, prodoctSingelCheck,countProduct} from '../../reducers/cart.redux';
import { connect } from 'react-redux';
import { productCheckAll, prodoctSingelCheck, countProduct } from '../../actions/cartAction.js';
import MyActivityIndicator  from '../common/MyActivityIndicator';

const CheckboxItem = Checkbox.CheckboxItem;

class ShopCartList extends React.Component {
  constructor() {
    super()

    this.state = {
        val: 1,
        modal2: false,
        data: [],
        tagMenuClick: [false, false, false, false, false],
    }
  }

  componentDidMount(){
    // this.props.dispatch(getCart(2))
  }

  ShopCheckAll(e,shop_id,index) {
   let {cart,dispatch} = this.props;
   cart.list.shopsData[index].checked = e.target.checked
    for(let i=0; i <cart.list.shopsData[index].productsData.length; i++){
      if(this.props.cart.list.shopsData[index].productsData[i].shop_id===shop_id){
       cart.list.shopsData[index].productsData[i].checked= e.target.checked
      }
    }

    dispatch(productCheckAll(this.props.cart.list))
  }


  CheckItemProdcut(e,shop_index,product_index,shop_id) {
    let {cart,dispatch} = this.props;
    let data =cart.list
    let  prodcutCheckArr = []
    data.shopsData[shop_index].productsData[product_index].checked = e.target.checked
    for(var i=0;i< data.shopsData[shop_index].productsData.length;i++){
      if(data.shopsData[shop_index].productsData[i].checked === data.shopsData[shop_index].productsData[product_index].checked){
        prodcutCheckArr.push(data.shopsData[shop_index].productsData[i].checked)
      }
    }
    if(prodcutCheckArr.length===data.shopsData[shop_index].productsData.length){
      data.shopsData[shop_index].checked = prodcutCheckArr[0]
    }else if(prodcutCheckArr[0] === false){
      data.shopsData[shop_index].checked = prodcutCheckArr[0]
    }
    dispatch(prodoctSingelCheck(data))
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

  onChange (val,shop_index,product_index){
    let {cart} = this.props;
    let data =cart.list;
    data.shopsData[shop_index].productsData[product_index].count = val;
    this.props.dispatch(countProduct(data));
  }



  handleCount = (val) => {
      console.log(val);
  }

    showModal = key => (e) => {
     e.preventDefault(); // 修复 Android 上点击穿透
     this.setState({
       [key]: true,
     });
   }
   onClose = key => () => {
     this.setState({
       [key]: false,
     });
   }

  render(){
    let { cart } = this.props;
    var shopList = ""
       shopList = cart.list.shopsData.map((v,shop_index)=>{
        return(
          <div key={shop_index}>
            <CheckboxItem  className = {styles['am-list-thumb']} style = {{borderTop:'10px solid #eee'}}  onChange={(e) => this.ShopCheckAll(e,v.shop_id,shop_index)} checked={v.checked}>
              <Flex>
                <img alt="" src = {userImg} style = {{height:'30px',width:'30px',borderRadius:'15px',backgroundColor:'#111',marginRight:'10px'}}/>
                <span>{v.shop_name}</span>
              </Flex>
            </CheckboxItem>
            {v.productsData.map((product,product_index)=>{
              return(
                <CheckboxItem  className = {styles['am-list-thumb']}  checked={product.checked} onChange={(e)=>this.CheckItemProdcut(e,shop_index,product_index,product.shop_id)} key={product_index}>
                <Flex>

                  <Flex className = {styles['good-item']} style = {{width:'100%'}}>
                    <img alt="" src = { goodsImg } className = {styles['good-img']} style = {{width:'60px',height:'70px'}}/>
                    <Flex.Item classnam = {styles['decribe-frame']} style = {{width:'100%',fontSize:'14px',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                      <span style = {{width:'100%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis',fontWeight:'600',fontSize:'16px'}}>{product.name}</span><br/>
                      <div style = {{border:'1px solid #ccc',fontSize:'16px',lineHeight:'2em',paddingLeft:'8px',borderRadius:'3px'}} onClick={this.showModal('modal2')}>{product.productSpec.spec_name}
                        <img alt="" src={require('../svg/arrowdown.svg')} style = {{float:'right',width:'15px',height:'15px',margin:'6px 3px 0 0'}}/>
                      </div>
                      <WhiteSpace />
                      <Modal
                       popup
                       visible={this.state.modal2}
                       maskClosable={false}
                       animationType="slide-up"
                      >
                       <div>
                         <Flex style = {{margin:'10px'}}>
                           <img alt="" src = {goodImg} style = {{width:'60px',height:'60px',border:'8px solid #680000'}}/>
                           <div style = {{paddingLeft:'10px'}}>
                             <span style = {{color:'red',fontSize:'16px'}}>￥{product.productSpec.spec_value/100
}/100</span>
                             <img alt="" src = {require('../svg/close_black.svg')} style = {{position:'absolute',right:'15px',top:'10px',width:'25px',height:'25px',paddingBottom:'44px'}} onClick = {this.onClose('modal2')}/><br/>
                             <span style = {{color:'#aaa'}}>请选择类型</span>
                           </div>
                         </Flex>
                         <Flex wrap = "wrap" justify = "start">
                           <div className = {style['color-div']}  style={{background: this.state.tagMenuClick[0] ? "#e85839" : "#e5e5e5"}} onClick={()=>{this.handleTagMenuClick(0)}}>绿色</div>

                         </Flex>
                           <Flex className = {style['num-padding']}>
                             购买数量：
                             <Stepper
                               style={{ width: '50%', minWidth: '80px'}}
                               showNumber
                               max={99}
                               min={1}
                               value={product.count}
                               onChange={(val)=>this.onChange(val,shop_index,product_index)}
                             />
                           </Flex>
                          <List>
                           <List.Item>
                             <Button type = "warning" onClick = {this.onClose('modal2')}>确定</Button>
                           </List.Item>
                         </List>
                       </div>
                      </Modal>
                      <span align = "left" className = {styles['good-price']}>￥{product.productSpec.spec_value/100
}</span>
                      <Stepper className = {styles['am-stepper-handler-down']}
                        style={{ width: '50%', minWidth: '100px',marginLeft:'22px',float:'right'}}
                        showNumber
                        max={99}
                        min={1}
                        value={product.count}
                        onChange={(val)=>this.onChange(val,shop_index,product_index)}
                      />
                    </Flex.Item>
                  </Flex>
                </Flex>
              </CheckboxItem>
              )
            })}
          </div>
        )
      })

    return (
      < div>
      <MyActivityIndicator  isFetching={cart.isFetching} />
        {shopList}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  }
}

export default connect(mapStateToProps)(ShopCartList);
