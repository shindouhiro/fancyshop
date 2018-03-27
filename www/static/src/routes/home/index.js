/*
  Author @Simon xsqfeather@gmail.com
  这个文件处理消息盒子
*/
import React from 'react'
import { connect } from 'react-redux';
import { Flex, Carousel, WhiteSpace } from 'antd-mobile';
import ShopTagMenu from "./ShopTagMenu";
import RecommandProducts from "./RecommandProducts.js";
import GoodsList from "./GoodsList";
import {setAppTitle} from '../../actions/app.js';
import './index.css';
import { getRecommandProducts } from '../../actions/productsAction';
import {getHomeTags} from '../../actions/app.js'
import { getProducts } from '../../actions/productsAction'; 
import { Link } from 'react-router-dom';



class AppHome extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: ['','',''],
      good: [],
      shops: [],
    }

  }
  componentDidMount(){
    const { dispatch,products } = this.props;
    dispatch(getRecommandProducts(1,3))
    dispatch(getHomeTags());
    dispatch(setAppTitle(this.props.path));
    dispatch(getProducts(1, products.pagesize));
    setTimeout(() => {
     this.setState({
       data: ['banner1.jpeg', 'banner2.jpeg', 'banner3.jpeg'],
     });
   }, 100);
  }

  render(){
    return (
        <Flex  direction="column" className="flex-container ">
            <Carousel
              autoplay={false}
              infinite
              selectedIndex={1}
              beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
              afterChange={index => console.log('slide to', index)}
            >
              {this.state.data.map(ii => (
                <Link
                  key={ii}
                  to="/messages"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`http://wanchehui.oss-cn-qingdao.aliyuncs.com/static/${ii}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </Link>
              ))}
            </Carousel>
            <WhiteSpace/>

          <Flex  direction="row" align="center" justify="around" style={{width: "100%"}}>
            <Flex direction="row" justify="around" align="center" style={{background: "brown", color: "white",width: "50%",height: "100px"}} >万人车汇自营店</Flex>
            <Flex  direction="column"  align="center" style={{height: "100px", width: "50%"}}>
              <Flex justify="around" style={{height: "49px", background: "white", color: "grey", width: "100%"}}>收入排行</Flex>
              <Flex justify="around" style={{height: "49px", background: "grey", color: "white", width: "100%"}}>成为会员</Flex>
            </Flex>
          </Flex>

          <WhiteSpace />
          <WhiteSpace />
              <RecommandProducts />
          <WhiteSpace />
            <ShopTagMenu history={this.props.path} />
          <WhiteSpace />
          <GoodsList  />

        </Flex>
    )
  }
}
function indexHome(state){
  return {
    appInfo: state.AppInfo,
    recommandProducts: state.recommandProductsReducer,
    products: state.ProductsReducer
  }
}
export default connect(indexHome)(AppHome);
