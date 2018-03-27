import { MClient } from '../config/asteroid.config.js';


export const GET_RECOMMAND_PRODUCTS_SUCCESS = 'GET_RECOMMAND_PRODUCTS_SUCCESS';
export const GET_RECOMMAND_PRODUCTS_FAILD = 'GET_RECOMMAND_PRODUCTS_FAILD';
export const GET_PRODUCTS_SUCCESS= "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILD= "GET_PRODUCTS_FAILD";
;


function getRecommandProductsSuccess(products) {
    return {
        type: GET_RECOMMAND_PRODUCTS_SUCCESS,
        products,
    }
}


 function getProductsSuccess(products,page) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products,
    page
  }
}

export function getRecommandProducts(page, pagesize){
    return dispatch => {
      MClient.method('home.top.products', [page, pagesize]);
      MClient.on('result', message => {
        console.log(message);
        if(!message.result){
          return false;
        }
        if (message.result.formMethod === 'home.top.products') {
          dispatch(getRecommandProductsSuccess(message.result.list))
        }
      })
    }
  }


  export function getProducts(page,pagesize,data=[]) {
    return dispatch => {
      MClient.method('app.get.recommend.products',[page,pagesize]);
      MClient.on('result', message => {
        if(!message.result){
          return false;
        }
        if (message.result.formMethod === 'app.get.recommend.products'){
          dispatch(getProductsSuccess(data.concat(message.result.list),page))
        }
      })
    }
  }


 