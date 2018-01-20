import { asteroid } from '../config/asteroid.config.js'
import { Toast } from 'antd-mobile';
import {getStore, setStore,removeStore} from '../config/mUtils';
import axios from 'axios';
import '../service/data/datasource';


const INIT_PRODUCT = "INIT_PRODUCT";

const GET_PRODUCT = "GET_PRODUCT";



const initialState = {
}
export function product(state=initialState,action) {
  switch(action.type){
    case INIT_PRODUCT:
    console.log(action.payload)
    return Object.assign({},state,action.payload)
    case  GET_PRODUCT:
    return Object.assign({},state,action.payload)
      break;
    default:
      return state
  }
}

function initProductList(data) {
  return { type: INIT_PRODUCT, payload: data}
}

function  initProductGet(data) {
  return { type: GET_PRODUCT, payload: data}
}

//获取商品列表
export function productList() {
  return dispatch => {
    axios.get('/products')
         .then(result => {
           console.log(result.data.goods)
            dispatch(initProductList(result.data))
         })
         .catch(error => {
           console.log(error)
         })
  }
}

//获取商品详情
export function getProduct(id) {
  console.log('getProduct')
  console.log(id)
  return dispatch => {
    axios.get('/products')
         .then(result=> {
          let product = result.data.goods.find(x=>{ return x.id == id});
          console.log(product)
            dispatch(initProductGet({'good':product}))
         })
         .catch(error => {
            console.log(error);
         })
  }
}


