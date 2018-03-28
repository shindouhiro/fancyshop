import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';



import MainLayout from '../layouts/MainLayout.js'
import MessageBox from './messages'
import AppHome from './home';
import My from './my';
import Register from './register/Register';
import {  connect } from 'react-redux';
import TabLogin from './login/TabLogin';
import Goods from './product/index';
import ShopCart from './shop_cart/index';
import WaitDetails from './orders/WaitDetails';
import Paid from './orders/Paid';
// import Refund from './orders/Refund';
import UntreatedDetail from './orders/UntreatedDetail';
import QrCode from './orders/QrCode';
import CartNull from './shop_cart/CartNull';
import ProductModal from './product/ProductModal';
import Facilitator from './product/Facilitator';
import FirmOrder from './product/FirmOrder';
import PaySuccess from './product/PaySuccess';
import Address from './product/Address';
import SearchBox from './search/ProductSearch';
import SearchResult from './search/SearchResult';
import Wallet from './wallet/index';
import Withdraw from './wallet/Withdraw';
import WithdrawSuccess from './wallet/WithdrawSuccess';
import WithdrawWait from './wallet/WithdrawWait';
import VipCard from './vipcard/index';
import Coupon from './coupon/index';
import MyBankCard from './wallet/MyBankCard';
import EditBankCard from './wallet/EditBankCard';
import ForgotPassword from './password/'
import ResetPassword from './password/ResetPassword'
import NoMatchPage from './no_match/'
import Shops from './shops/'
import Personal from './my/Personal';
import ProductListView from './productsListView'
import Orders from './orders/index';
import OrderList from './orders/OrderList';
import{ loadLoginedUserInfo } from '../actions/users';
import createHistory from 'history/createHashHistory';
import configureStore from "../stores/index";
import { getStore } from '../config/mUtils';
import  PrivateRoute  from './container/PrivateRoute';

const store = configureStore();
const history = createHistory();
const Home = ({ match }) => (
    <AppHome path={match.path} />
  )

const ShopsPage = ({ match }) => (
    <Shops path={match.path}  params={match.params}  />
  )

const Messages = ({match}) => (
  <MessageBox path={match.path} />
)

class App extends React.Component {


  componentDidMount(){
    store.dispatch(loadLoginedUserInfo());
    
  }
  render() {   
    let { appUser }  = this.props;
    let authenticated = appUser.loginStatus === 'logined' ? true : false
    return (
      <Router >
          <MainLayout history={history}>
          <Switch>
              <Route exact path="/" component={Home} authenticated={authenticated}/>
              <PrivateRoute path="/messages" component={Messages} authenticated={authenticated}/>
              <PrivateRoute path="/my" component={My} authenticated={authenticated}/>
              <PrivateRoute path="/shop_cart" component={ShopCart}  authenticated={authenticated}/>
              <Route path="/register" component={Register} />
              <Route path="/tablogin" component={TabLogin} />
              <Route path = "/product/:id" component={Goods}/>
              <PrivateRoute path="/order_details/:orderId" component={WaitDetails} authenticated={authenticated}/>
              <PrivateRoute path="/paid/:orderId" component={Paid} authenticated={authenticated}/>
              {/* <Route path = "/refund" component={Refund}/> */}
              <Route path = "/untreated" component={UntreatedDetail}/>
              <Route path = "/qrcode" component={QrCode}/>
              <Route path = "/nullcart" component={ CartNull }/>
              <Route path = "/facilitator/:shopId" component = { Facilitator }/>
              <Route path = "/productmodal" component={ ProductModal }/>
              <PrivateRoute path="/firmorder/:orderId" component={FirmOrder} authenticated={authenticated}/>
              {/* <Route path = "/firmtest" component = { FirmOrderTest }/> */}
              <Route path = "/paysuccess" component = {PaySuccess}/>
              <Route path="/forgotpassword" component={ForgotPassword}  />
              <Route path="/resetpassword" component={ResetPassword}  />
              <Route path="/address" component={Address}  />
              <Route path="/searchbar" component={SearchBox}  />
              <Route path="/searchresult" component={SearchResult}/>
              <Route path="/shops/:tagId" component={ShopsPage}/>
              <Route path="/wallet" component={Wallet}/>
              <Route path="/withdraw" component={Withdraw}/>
              <Route path="/withdrawsuccess" component={WithdrawSuccess}/>
              <Route path="/withdrawwait" component={WithdrawWait}/>
              <Route path="/vipcard" component={VipCard}/>
              <Route path="/coupon" component={Coupon}/>
              <Route path="/bankcard" component={MyBankCard}/>
              <Route path="/editbankcard" component={EditBankCard}/>
              <PrivateRoute path="/orderlist" component={OrderList} authenticated={authenticated}/>
              <PrivateRoute path = "/orders" component={Orders} authenticated={authenticated}/>
              <PrivateRoute path = "/personal" component={Personal} authenticated={authenticated}/>
              <Route path = "/productlist" component={ProductListView}/>
              <Route path="/produchtResult" component={SearchResult} />
              <Route component={NoMatchPage}/>
            </Switch>

          </MainLayout>
      </Router>
    )
  }
}



function mapStateToProps(state) {
  return {
    appUser: state.AppUser,
  }
}

export default connect(mapStateToProps)(App);
