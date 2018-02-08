import React from 'react';
import { Flex, Icon } from 'antd-mobile';
import styles from './AwardDetail.css';

class AwardIncome extends React.Component {
  constructor() {
    super()
  }

render(){
  let { total } = this.props
  return(
    <div className = {styles['Award-frame']}>
      <Flex align = "center">
          <img src={require('../../assets/svg/income.svg')} className = {styles['income-svg']}/>
          <span className = "svg-des">收益</span>
      </Flex>
      <Flex direction = "column" align = "around" className = {styles['income-item-border']} >
        <Flex justify = "around" className = {styles['income-time']}>
          <span>今日</span>
          <span>一周</span>
          <span>30天</span>
        </Flex>
        <Flex  justify = "around" className = {styles['income-money']}>
          <span className = {styles['income-money-border']}>{total.todayTotal}</span>
          <span className = {styles['income-money-border']}>{total.weekTotal}</span>
          <span>{total.monthTotal}</span>
        </Flex>
      </Flex>
      <br/>
    </div>
  )
 }
}
export default AwardIncome;
