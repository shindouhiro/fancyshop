import history from '../history';
import { asteroid } from '../config/asteroid.config.js';


export const EXCEPT_RECOMMAND_PRODUCTS = 'EXCEPT_RECOMMAND_PRODUCTS';
export const RECEIVE_RECOMMAND_PRODUCTS = 'RECEIVE_RECOMMAND_PRODUCTS';
export const RECEIVEPRODUCTBYID = 'RECEIVEPRODUCTBYID';
export const ADD_COUNT = "ADD_COUNT";
// export const RECOMMAND_PRODUCTS_LIST = "RECOMMAND_PRODUCTS_LIST"


function exceptRecommandProduct(){
  return {
    type: EXCEPT_RECOMMAND_PRODUCTS,
    text: '加载中',
  }
}

function receiveRecommandProduct(products){
  return {
    type: RECEIVE_RECOMMAND_PRODUCTS,
    products,
  }
}


export function loadRecommandProducts(page, pagesize){
  return dispatch => {
    dispatch(exceptRecommandProduct());
    asteroid.subscribe("home.top.products", page, pagesize);
    let products = [];
    asteroid.connect();
    asteroid.ddp.on("added", ({collection, id, fields}) => {
      if (collection === 'products') {
        if (products.length < pagesize) {
          products.push({fields, id});
          dispatch(receiveRecommandProduct(products));
        }
      }

    });
  }
}

function exceptProductById(id){

}

function receiveProductById(product){
  return {
    type: RECEIVEPRODUCTBYID,
    product,
  }

}
function receiveProductByIdError(error){

}


export function addCount(count) {
  return { 
    type: ADD_COUNT, 
    count: count
  }
}

export function loadProductById(id){
  return dispatch => {
    // dispatch(exceptProductById(id));
    asteroid.subscribe("get.product.id", id);
    let product = [];
    asteroid.connect();
    asteroid.call("get.oneproduct.id", id)
                  .then(result => {
                    dispatch(receiveProductById(result));
                  })
                  .catch(error => {
                    dispatch(receiveProductByIdError(error));

                  });
  }
}

export function loadProductList(){

}



export function createOrder(product) {
  return dispatch => {
    asteroid.call('app.orders.insert',product)
            .then(result => {
              console.log(`自爱崽子`)
              console.log(result)
                if(result){
                  history.push(`/firmorder/${result}`)
                }
            })
            .catch(error => {
                console.log(error);
            })
  }
}