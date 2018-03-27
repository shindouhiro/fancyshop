import history from '../history';
import { getStore } from '../config/mUtils';
import { MClient } from '../config/asteroid.config.js';
export const RECEIVEORDERBYID = 'RECEIVEORDERBYID';
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_PAID_ORDERS = "GET_PAID_ORDERS";
export const GET_UNPAID_ORDERS = "GET_UNPAID_ORDERS";

export const GET_ALL_ORDERS_ERROR = "GET_ALL_ORDERS_ERROR";
export const GET_PAID_ORDERS_ERROR = "GET_PAID_ORDERS_ERROR";
export const GET_UNPAID_ORDERS_ERROR = "GET_UNPAID_ORDERS_ERROR";
export const GET_SHOP_NAME = "GET_SHOP_NAME";
export const GET_SINGLE_ORDER = "GET_SINGLE_ORDER";
export const GET_CANCEL_ORDERS = "GET_CANCEL_ORDERS";
export const GET_CANCEL_ORDERS_ERROR = "GET_CANCEL_ORDERS_ERROR";







//===============获取登录用户订单================================
export function expectLoginedUserOrders(status, page, pagesize){

}
export function loadLoginedUserOrders(status, page, pagesize){

}
export function loadLoginedUserOrdersError(status, page, pasesize){

}
//==========================================================
//================获取单个订单===================================
export function expectOneOrder(id){

}
export function loadOneOrder(id){

}
export function loadOneOrderError(id){

}
//==========================================================

export function getAllOrders(orders){
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}
export function getAllOrdersError(error){
  return {
    type: GET_ALL_ORDERS_ERROR,
    error
  }
}
export function getPaidOrders(orders){
  return {
    type: GET_PAID_ORDERS,
    orders
  }
}
export function getPaidOrdersError(error){
  return {
    type: GET_PAID_ORDERS_ERROR,
    error
  }
}
export function getUnPaidOrders(orders){
  return {
    type: GET_UNPAID_ORDERS,
    orders
  }
}
export function getUnPaidOrdersError(error){
  return {
    type: GET_UNPAID_ORDERS_ERROR,
    error
  }
}
export function getCancelOrders(orders){
  return {
    type: GET_CANCEL_ORDERS,
    orders
  }
}
export function getCancelOrdersError(error){
  return {
    type: GET_CANCEL_ORDERS_ERROR,
    error
  }
}
export function getShopName(shopName){
  return {
    type: GET_SHOP_NAME,
    shopName
  }
}
export function  gainAllOrders(userId){
  return dispatch => {
    console.log(`全部`)
    MClient.sub("get.allOrders", [userId]);
    MClient.connect();
    let methodId =  MClient.method("get.allOrders", [userId]);

    MClient.on("result", message=>{
      if(message.id===methodId && !message.error){
        console.log("所有订单")
        console.log(message.result)
        dispatch(getAllOrders(message.result));
      }
    })
  }
}

export function  gainPaidOrders(userId){
  return dispatch => {
    MClient.sub("get.paidOrders", [userId]);
    MClient.connect();
    let methodId = MClient.method("get.paidOrders", [userId]);
               
    MClient.on("result", message=>{
      if(message.id === methodId && !message.error){
        console.log("所有支付订单")
        console.log(message.result)
        dispatch(getUnPaidOrders(message.result));
      }else{
        dispatch(getUnPaidOrdersError(message.error));
      }
    })
  }
}

export function  gainUnPaidOrders(userId){
  return dispatch => {
    MClient.sub("get.unpaidOrders", [userId]);
    MClient.connect();
    let methodId = MClient.method("get.unpaidOrders", [userId]);
    
    MClient.on("result", message=>{
      if(message.id === methodId && !message.error){
        console.log("所有未支付订单")
        console.log(message.result)
        dispatch(getUnPaidOrders(message.result));
      }else{
        dispatch(getUnPaidOrdersError(message.error));
      }
    })
  }
}

export function  gainCancelOrders(userId){
  return dispatch => {
    MClient.sub("get.cancelOrders", [userId]);
    MClient.connect();
    let methodId = MClient.method("get.cancelOrders", [userId]);
    
    MClient.on("result", message=>{
      if(message.id === methodId && !message.error){
        console.log("所有取消订单")
        console.log(message.result)
        dispatch(getCancelOrders(message.result));
      }else{
        dispatch(getCancelOrdersError(message.error));
      }
    })
  }
}

function reviceOrderById(order) {
    return {
     type: RECEIVEORDERBYID,
     order
    }
}
function getSingleOrder(order){
  return {
    type: GET_SINGLE_ORDER,
    order
  }
}


export function loadOrderById(id) {
  return  dispatch => {
      MClient.method('app.order.getone',[id]);
      
      MClient.on('result', message => {
        if(message.result.formMethod === "app.order.getone"){
          console.log(message.result);
          dispatch(reviceOrderById(message.result))
        }else{
          console.error(message.error);
        }
      })
    }
}
export function getOrderByCode(code) {
  return  dispatch => {
      MClient.method('app.getOrderByCode',[code]);
      MClient.on('result', message => {
        if(message.result.formMethod ==="app.getOrderByCode"){
          console.log(message.result);
          dispatch(getSingleOrder(message.result))
        }else{
          console.error(message.error);
        }
      })
    }
}




export function createOrder(product) {
    return dispatch => {
    let methodId = MClient.method('app.orders.insert',[product])
    MClient.on('result', message=>{
      if(message.id === methodId && !message.error){
        if(message.result){
          history.push(`/firmorder${message.result}`)
        }else{
          console.log(message.error);
        }
      }
    })
    }
  }

  export function getShopNameById(shopId){
    return dispatch => {
      let token = getStore('stampedToken')
      let methodId = MClient.method("shops.findShopName",[shopId,token])
      MClient.on('result',message=>{
        if(message.id === methodId && !message.error && message.result.formMethod === 'shops.findShopName'){
          if(message.result){
            console.log("只调用一次")
            console.log("获得店铺信息")
            return message.result.shopName
            // dispatch(getShopName(message.result.shopName))
          }else{
            return "未知店铺"
          }
        }
      })
    }
  }


export function cancelOrder(code){
  return dispatch => {
    let token = getStore('stampedToken')
    let methodId = MClient.method("app.cancel.order",[code,token])
    MClient.on('result',message=>{
      if(message.id === methodId && !message.error && message.result.formMethod === 'app.cancel.order'){
        if(message.result){
        }else{
          return "取消订单失败"
        }
      }
    })
  }
}