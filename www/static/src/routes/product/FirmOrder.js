import React from 'react';
import { Flex, TextareaItem, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom';
import styles from '../orders/WaitDetails.css';
import { MClient } from '../../config/asteroid.config.js'
// import MyActivityIndicator  from '../common/MyActivityIndicator';


class FirmOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      shop: {},
      isFetching: true,
    }
    this.paid = this.paid.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.orderId;
    MClient.method("app.order.getone", [id]);
    MClient.on("result", message => {
      console.log(message.result)
      if (message.result.formMethod === 'app.order.getone') {
        console.log(message.result)
        this.setState({
          order: message.result.orders,
          shop: message.result.shop,
          isFetching: false,
        })
      }
    })
  }

  paid() {
    let params = {
      remark: this.state.remark,
      id: this.state.order._id,
      shopName: this.state.shop.name,
    }
    console.log(params);
    const methodId = MClient.method("app.order.update", [params]);
    MClient.on("result", message => {
      if (message.id === methodId && !message.error) {
        this.props.history.push(`/paid/${this.state.order._id}`)
      }
    })
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render(){
    let { order } = this.state;
        return (
            <div style = {{marginTop:'50px',backgroundColor:'#fff'}}>
            {order.map((orderItem,index)=>{
              return(
                orderItem.products.map((product,prodcutIndex)=>{
                  return(
                    <div style={{ padding: '3px 5px', borderBottom: '15px solid #ddd' }}>
                      <span style={{ paddingLeft: '10px', paddingTop: '10px', fontWeight: '600', fontSize: '16px' }}>{orderItem.shopName}</span>
                      <div className={styles['goods-frame']} style={{ border: 'none', borderRadius: '0', borderBottom: '1px solid #ddd' }} >
                        <Flex justify="start" className={styles['good-item']}>
                          <div className={styles['img-border']} >
                            <img className={styles['goods-img']} src={product.cover} alt="图片未显示" />
                          </div>
                          <div >
                            {/* <Flex style={{ marginBottom: '10px' }}></Flex> */}
                            <span className={styles['type-color']}>{product.prodductSpec.spec_name} </span>
                            <span className={styles['price-pst']} style = {{display:'flex',justifyContent:'flex-end'}}>
                                <span className={styles['price-color']}>￥{product.prodductSpec.spec_value*product.count/100}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </span>
                            ×{product.count}</span>
                          </div>
                        </Flex>
                      </div>
                      <div className={styles['']} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                        <div>
                          <img alt="" src={require('../svg/send.svg')} className={styles['item-icon']} />配送方式：<span style={{ color: '#888' }}>到店自提</span>
                        </div>
                        <div>
                          <div style={{ color: '#333', padding: '10px 0' }}><img alt="" src={require('../svg/location.svg')} className={styles['item-icon']} />地址：<span style={{ color: '#888', backgroundColor: '#eee' }}>{orderItem.shopAddress}</span></div>
                            <div style={{ color: '#333' }}><img alt="" src={require('../svg/phone.svg')} className={styles['item-icon']} />电话：<span style={{ color: '#888', backgroundColor: '' }}>1782374899</span></div>
                        </div>
                      </div>
                      <div className={styles['']} style={{ borderBottom: '', paddingBottom: '10px', backgroundColor: '#fff',marginTop:'10px'}}>
                        <div>
                          <img alt="" src={require('../svg/notice.svg')} className={styles['item-icon']} />备注：<br />
                          <TextareaItem rows="2" className = {styles['am-textarea-control']} style={{ backgroundColor: 'fff', fontSize: '14px', width: '95%', padding: '3px 3px' }} placeholder="到店自提这是占位符占位符请不要介意如此粗糙的占位符哈哈哈哈" onChange={v => this.handleChange('remark', v)} />
                        </div>
                      </div>
                    </div>
                  )
                })
              )
            })
            }
               

        {/* <div style = {{marginTop:'20px'}}>
            <span style = {{paddingLeft:'10px',fontWeight:'600',fontSize:'16px'}}>这是店铺的名字</span>
            <div className = {styles['goods-frame']} style = {{border:'none',borderRadius:'0',borderBottom:'1px dashed red'}} >
                <Flex justify = "center" >
                    <div className = {styles['img-border']} >
                        <img  className = {styles['goods-img']} alt="图片未显示" src = { goodImg }/>
                    </div>
                    <div >
                        <Flex style = {{marginBottom:'10px'}}></Flex>
                        <span className = {styles['type-color']}>规格：4L自喜力 </span>  
                        <span className = {styles['price-pst']}>
                        <span className = {styles['price-color']}>￥26.88 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </span>×1</span>
                     </div>
                </Flex>
             </div>
            <div className = {styles['']} style = {{borderBottom:'1px solid #ccc',paddingBottom:'10px'}}>
                <div>
                    <img alt="" src={require('../svg/send.svg')} className = {styles['item-icon']}/>配送方式：<span style = {{color:'#888'}}>到店自提</span>
                </div>
                <div>
                    <Link to = "/address">
                        <div style = {{color:'#333',padding:'10px 0'}}><img alt="" src={require('../svg/location.svg')} className = {styles['item-icon']}/>地址：<span style = {{color:'#888',backgroundColor:'#eee'}}>16号公馆</span></div>
                        <div style = {{color:'#333'}}><img alt="" src={require('../svg/phone.svg')} className = {styles['item-icon']}/>电话：<span style = {{color:'#888',backgroundColor:'#eee'}}>1782374899</span></div>
                    </Link>
                </div>
            </div>
            <div className = {styles['']} style = {{borderBottom:'1px solid #ccc',paddingBottom:'10px'}}>
            <div>
                <img alt="" src={require('../svg/notice.svg')} className = {styles['item-icon']}/>备注：<br/>
                <TextareaItem rows = "2" style = {{backgroundColor:'#fff',fontSize:'12px',width:'95%',padding:'10px 3px'}} placeholder = "到店自提这是占位符占位符请不要介意如此粗糙的占位符哈哈哈哈" onChange={v=>this.handleChange('remark',v)}/>
                </div>
            </div>
        </div> */}
        <div style = {{padding:'10px 0'}}>
        <WingBlank>
            <Flex justify = "between" > 
                <span>商品金额</span>
                <span style = {{color:'red'}}>¥3333.00</span>
            </Flex>
            <WhiteSpace/>
            <Flex justify = "between" > 
                <span>运费</span>
                <span style = {{color:'red'}}>+¥0.00</span>
            </Flex>
            <WhiteSpace/>
            <Flex justify = "between" > 
                <span>优惠券</span>
                <span style = {{color:'red'}}>-¥0.00</span>
            </Flex>
        </WingBlank>
            <WhiteSpace/>
            <Flex justify = "end" style = {{borderTop:'2px solid #ddd',paddingTop:'10px'}} > 
            <WingBlank>
                <span style = {{fontSize:'16px'}}>实付金额：</span>
                <span style = {{color:'red'}}>¥3333.00</span>
            </WingBlank>
            </Flex>
        </div>
        <Button style = {{backgroundColor:'green',color:'#fff',width:'90%',margin:'10px auto'}}>微信支付</Button>
    </div>
        )
    }
}


export default FirmOrder