import { MClient } from '../config/asteroid.config.js';
import { addProductCount } from './productAction';
// import { Toast } from 'antd-design-mobile';
import { getStore } from '../config/mUtils';
import history from '../history';
export const ADD_CART_SUCCESS = "ADD_CAR_SUCCESS";
export const ADD_CART_FAILD = "ADD_CAR_FAILD";
export const INSERT_CART_SUCCESS = "INSERT_CART_SUCCESS";
export const INSERT_CART_FAILD = "INSERT_CART_FAILD";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILD = "GET_CART_FAILD";
export const REMOVE_CART_SUCCESS = "REMOVE_CART_SUCCESS";
export const REMOVE_CART_FAILD = "REMOVE_CART_FAILD";


export const DELETE_SHOP_CART = "DELETE_SHOP_CART";
export const SHOP_CHECK_ALL = "SHOP_CHECK_ALL";
export const ADD_SHOP = "ADD_SHOP";
export const ADD_PRODUCT= "ADD_PRODUCT";
export const PRODCUT_CHECK_ALL = "PRODCUT_CHECK_ALL";
export const COUNT_PRODUCT = "COUNT_PRODUCT";
export const REMOVE_CART = "REMOVE_CART";


function addCartSuccess(payload) {
  return {
    type: ADD_CART_SUCCESS,
    payload
  }
}

function insertCartSuccess(payload) {
  return {
    type: INSERT_CART_SUCCESS,
    payload
  }
}

function getCartSuccess(payload) {
  return {
    type: GET_CART_SUCCESS ,
    payload
  }
}
function removeCartSuccess(payload){
  return { 
    type:REMOVE_CART_SUCCESS, 
    payload
  }
}
//计算选中总价格
function ProdcutTotal(data) {
  console.log(data);
  let shopsData = data.shopsData;
  var total = 0;
  for(var i=0;i< shopsData.length; i++){
    for(var j=0;j< shopsData[i].productsData.length; j++){
      if(shopsData[i].productsData[j].checked === true){
        total += shopsData[i].productsData[j].prodductSpec.spec_value*1 * shopsData[i].productsData[j].count
      }
    }
  }
  return total;
}

//删除购物车
function deleteShopCart(data) {
    let shopsData = data.shopsData;
    let shopDeletData = shopsData.filter(filterByItem);
      for(var i=0;i<shopDeletData.length;i++){
        shopDeletData[i].productsData =shopDeletData[i].productsData.filter(filterByItem)
      }
     return shopDeletData
}
//结算购物车
function notDeleteShopCart(data) {
  let shopsData = data.shopsData;
  let shopDeletData = shopsData
  // .filter(notFilterByItem);
  // .filter(notFilterByItem);
  console.log(`checked`)
  console.log(shopDeletData);
  shopDeletData = loop(shopDeletData)
  // for (var i = 0; i < shopDeletData.length; i++) {
  //   shopDeletData[i].productsData = shopDeletData[i].productsData.filter(notFilterByItem)
  // }
  console.log(shopDeletData)
  return shopDeletData
}

//循环
function loop(shopDeletData) {
  for (var i = 0; i < shopDeletData.length; i++) {
    shopDeletData[i].productsData = shopDeletData[i].productsData.filter(notFilterByItem)
  }
  return shopDeletData
}

function filterByItem(item) {
  if (isCheck(item.checked)) {
    return true;
  }
  return false;
}

function notFilterByItem(item) {
  if (notisCheck(item.checked)) {
    return true;
  }
  return false;
}

function isCheck(obj) {
  return  obj!== true
}

function notisCheck(obj) {
  console.log(`obj`)
  console.log(obj)
  return obj !== false
}


export function deleteProduct(data){
  return { type: DELETE_SHOP_CART}
}
//添加店铺商品
export function addShop(shop,product) {
  return { type: ADD_SHOP,shop,product}
}

//添加商品
export function addProduct(product) {
  return { type: ADD_PRODUCT, product}
}

//选中店铺所有商品
export function productCheckAll(payload) {
  let total = ProdcutTotal(payload)
  console.log(total);
  return { 
    type: PRODCUT_CHECK_ALL,
    payload,
    total
   }
}

//选中所有店铺
export function shopCheckAll(payload){
  let total = ProdcutTotal(payload);
  return {
     type: SHOP_CHECK_ALL, 
     payload,
     total
    }
}

//选中单个商品
export function prodoctSingelCheck(payload) {
  let total = ProdcutTotal(payload);
  return { 
     type: SHOP_CHECK_ALL,
     payload,
     total
    }
}

//计算商品数量
export function countProduct(payload) {
  let total = ProdcutTotal(payload);
  return { 
    type: COUNT_PRODUCT, 
    payload,
    total
  }
}

export function addCart(product) {
  return dispatch => {
    let userId = getStore('userId')
    let methodId = MClient.method("shop_carts.add_cart", [product,userId]);
    MClient.on("result", message => {
      if (message.id === methodId && !message.error) {
        dispatch(addCartSuccess(message.result))
        dispatch(addProductCount(1))
        //   Toast.info('加入购物车成功',1)
      } else {
        // dispatch(receiveProductByIdError(message.error));
      }
    })
  }
}


export function insertCart(product) {
  return dispatch => {
    let methodId = MClient.method("shop_carts.insert_cart", [product]);
    MClient.on("result", message => {
      if (message.id === methodId && !message.error ) {
        
        dispatch(insertCartSuccess(message.result))
        dispatch(addProductCount(1))
        //   Toast.info('加入购物车成功',1)
      } else {
        // dispatch(receiveProductByIdError(message.error));
      }
    })
  }
}


export function getCart(id) {
  return dispatch => {
    MClient.method('shop_carts.get_cart',[id]);
    MClient.on("result", message =>　{
      console.log(message.result)
      if(!message.result){
        return ;
      }
      if ( message.result.formMethod==='shop_carts.get_cart') {
        console.log(message.result)
        dispatch(getCartSuccess(message.result))
      }else{
        console.log(`获取失败`)
      }
    })
  }
}

export function removeCart(product) {
  return dispatch => {
    let userId = getStore('userId')
    let deleteProducts = deleteShopCart(product)
    MClient.method('shop_carts.add_cart', [deleteProducts,userId]);
    MClient.on("result", message => {
      if (message.result.formMethod === 'shop_carts.add_cart') {
      //   console.log(`删除成功`);
      //   console.log(message.result);
        dispatch(removeCartSuccess(message.result))
      //   //   Toast.info('加入购物车成功',1)
      } else {
      //   // dispatch(receiveProductByIdError(message.error));
      }
    })
  }
}

export function cartCreatOrder(product) {
  return dispatch => {
    let userId = getStore('userId')
    let productJson = JSON.stringify(product)
    let productData = JSON.parse(productJson)
    console.log(JSON.stringify(notDeleteShopCart(product)))
    console.log(deleteShopCart(productData))
    MClient.method('app.shop_carts.orders',  [notDeleteShopCart(product), deleteShopCart(productData),userId]);
    MClient.on("result", message => {
      if (message.result.formMethod === 'app.shop_carts.orders'){
        history.push(`/firmorder/${message.result.orderCode}`)
      }
    })
  }
}