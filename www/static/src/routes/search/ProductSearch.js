import React from 'react';
import { SearchBar, Flex, WhiteSpace, WingBlank } from 'antd-mobile';
// import { Link } from 'react-router-dom';
import s from './ProductSearch.css';
import { MClient } from '../../config/asteroid.config';
import goodImg from '../../assets/img/orders/good.jpg';
import userImg from '../../assets/img/timg.jpg';

class SearchBox extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        data: '',
      }
    }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEnterKey);
  }
  componentWillUmount() {
    document.removeEventListener("keydown", this.handleEenterKey);
  }
  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      let {data} = this.state;
      MClient.method('app.product.search',[data])
      MClient.on('result', message => {
        if (message.result.formMethod === 'app.product.search'){
          console.log(message.result);
        }
      })
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  render(){
    return(
      <div>
        {/* <Link to = "/searchresult"> */}
        <SearchBar placeholder="Search" maxLength={8} onChange={v => this.handleChange('data', v)}/>
        {/* </Link> */}
        <div className = {s['search-item']}>
          {/* <span className = {s['search-title']}>热门搜索</span><br/> */}
        {/* <Flex justify = "start" wrap="wrap">
          <div className = {s['search-text']}>嘉实多</div>
          <div className = {s['search-text']}>车载手机支架</div>
          <div className = {s['search-text']}>车载香水</div>
          <div className = {s['search-text']}>嘉实多</div>
          <div className = {s['search-text']}>嘉实多</div>
          <div className = {s['search-text']}>嘉实多</div>
          <div className = {s['search-text']}>嘉实多</div>
        </Flex> */}
        </div>

        <div className={s['item-top']}>
          <WhiteSpace />
          <Flex direction="column" justify="center" align="start" className={s['item']}>

            <Flex center="start" className={s['shop-item']}>
              <img alt="" src={userImg} className={s['shop-img']} />
              <Flex direction="column" className={s['shop-describe']}>
                <span className={s['shop-name-font']}>滴滴洗车行（沙湾店）</span>
                <WhiteSpace />
                <Flex>
                  <img alt="" src={require('../svg/location-gray.svg')} className={s['location-img']} />
                  <span className={s['location-describe']}>成都市金牛区沙湾路63号</span>
                </Flex>
              </Flex>
              <WingBlank />
              <Flex justify="end" align="end">
                <span className={s['distance']}>500m</span>
              </Flex>
            </Flex>

            <WhiteSpace />
            <Flex>
              <img alt="" src={goodImg} className={s['good-img']} />
              <Flex direction="column">
                <span className={s['good-name']}>我是商品的名字只能线上一排</span>
                <WhiteSpace />
                <Flex justify="around">

                  <span className={s['good-price']}>价格:183</span>
                  <WingBlank />
                  <span className={s['good-num']}>销量:18</span>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    )
  }
}

export default SearchBox;
