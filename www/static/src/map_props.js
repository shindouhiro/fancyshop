export function appInfo(state){
  return {
    AppInfo: state.AppInfo,
    appUser: state.AppUser
   };
}

export function appUser(state){
  return {
    appUser: state.AppUser
  }
}


export function productinfo(state) {
  return {
    product: state.product
  }
}

export function modelInfo(state) {
  return {
    model: state.model,
    product: state.product,
    cart: state.cart,
    productShow: state.productShow,
    appUser: state.AppUser,
  }
}


export function cartInfo(state) {
  return {
    cart: state.cart
  }
}


export function orderInfo(state) {
  return {
    order: state.order
  }
}

