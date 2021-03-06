import {EXCEPT_RECOMMAND_PRODUCTS, RECEIVE_RECOMMAND_PRODUCTS} from '../actions/products.js'
export function recommandProducts(state={
  status: "ready",
  loadingText: "开始加载",
  products: null,
}, action){
  switch (action.type) {
    case EXCEPT_RECOMMAND_PRODUCTS:
    if (state.products === null) {
      return Object.assign({}, state, {
        status: "loading",
        loadingText: action.text,
        products: []
      })
    }else{
      return state;
    }

    case RECEIVE_RECOMMAND_PRODUCTS:
    return Object.assign({}, state, {
      status: "loaded",
      loadingText: "加载完毕",
      products: action.products
    })
   
    default:
    return state;

  }
}
