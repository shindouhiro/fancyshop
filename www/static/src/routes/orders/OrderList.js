import React from 'react';
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import OrderBtn from './OrderBtn';

class OrderList extends React.Component {

  render(){
    let { dataSource } = this.props;
    console.log(dataSource)
    return (
      <div style = {{backgroundColor:'#fff',marginTop:'50px',padding:'10px 10px'}}>
      {dataSource.length===0?
        "暂时没有任何订单哦"
        :
        (dataSource.map((v,index)=>{
          return( 
          <div key={index}>
             <Flex justify = "start">
               <img alt="" src = {v.shopCover?v.shopCover:"http://wanchehui.oss-cn-qingdao.aliyuncs.com/cover.png"} style = {{width:'38px',height:'38px',borderRadius:'19px',marginRight:'10px'}}/>
               <span style = {{color:'#333',fontSize:'16px',fontWeight:'600'}}>{v.shopName?v.shopName:"万人车汇自营店"}</span>
             </Flex>
             {v.products.map((n,index)=>{
               return (
                 <Flex justify = "start" style = {{backgroundColor:'#eee',padding:'10px',marginTop:'10px'}}>
                 <Flex style = {{width:'70px'}}>
                   <img alt="" src = {n.cover}/>
                 </Flex>
                 <Flex direction = "column" justify = "start" align = "start" style = {{width:'100%'}}>
                   <span style = {{color:'#333',fontSize:'16px',fontWeight:'600',width:'100%',paddingLeft:'10px'}}>{n.name}</span><br/>
                   <div style = {{display:'flex',justifyContent:'space-around',paddingLeft:'10px',color:'#666'}}>
                     <div>类型：{n.spec}</div>
                     <div style = {{paddingLeft:'3rem',paddingRight:'15px'}}>￥{n.price}元</div>
                     <div>×{ n.count }</div>
                   </div>
                 </Flex>
                 </Flex>
               )
             })}
             <OrderBtn status={v.status} history={this.props.history} orderCode={v.orderCode}/>
          </div>
          )
         }))
    }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.ordersInfo.orders,
    user: state.user
  }
}

export default connect(mapStateToProps)(OrderList);