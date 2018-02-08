/*
  Author @Simon xsqfeather@gmail.com
  这个文件处理消息盒子
*/
import React from 'react'
import { connect } from 'react-redux';

import { appInfo } from '../../map_props.js';

import { Flex, WhiteSpace, WingBlank,Tabs } from 'antd-mobile';

//redux actions
import {setAppTitle} from '../../actions/app.js';
import  AwardDetail  from './AwardDetail.js';
import AwardIncome from './AwardIncome.js';
import AwardHead from './AwardHead.js';
import { asteroid } from '../../config/asteroid.config';
import { gainBlance,gainGetBalanceIncomesTotal } from '../../actions/balance';

class MessageBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: [
        {name: 'Hiark'},
      ],
      balance: {
        
      },
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;
    let userId = "ZCFqbZeRpKZge3uGf"
    dispatch(gainBlance(userId))
    dispatch(gainGetBalanceIncomesTotal(userId))
  }

  render(){
    let {total,balance} = this.props.balance
    return (
    <div>
      <AwardHead balance={balance}/>
      <AwardIncome total={total}/>
      <AwardDetail/>
    </div>

    )
  }
}
function mapBalanceState(state) {
  return  {
    balance: state.balance
  }
}

export default connect(mapBalanceState)(MessageBox);
