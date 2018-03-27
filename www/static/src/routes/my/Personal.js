import { Modal,List, Picker, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import React from 'react';
// import { district, provinceLite } from 'antd-mobile-demo-data';
import  options  from '../common/Options';
import {  getStore } from '../../config/mUtils.js';
import { getUserbyId,getUserbyName,updateNickname, updateDataAutograph,updateSex,updateArea,updateBirthday} from '../../actions/users'; 
// import MyActivityIndicator  from '../common/MyActivityIndicator';
var moment = require('moment');
const Item = List.Item;
const prompt = Modal.prompt;
const gender = [
  {
    label:'未知',
    value:'未知',
  },{
    label:'保密',
    value:'保密',
  },{
    label:'男',
    value:'男',
  },{
    label:'女',
    value:'女',
  },
] 
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class Personal extends React.Component {
   constructor() {
      super();
      this.state = {
        isFetching:true,
        date:now
      }
   }

   componentWillMount(){

     const {dispatch} = this.props
    //  const {appUser} = this.props
     console.log(this.props.appUser)
     let userId = getStore("userId");
     if (userId === undefined){
       let username = this.props.appUser.username 
       dispatch(getUserbyName(username))
     }
     console.log(userId)
     dispatch(getUserbyId(userId))
   }
   componentDidMount(){
     document.title = "个人资料"
     
   }
   updateNickname(value){
    const { dispatch } = this.props
    dispatch(updateNickname(value))
   }
   updateDataAutograph(value){
    const { dispatch } = this.props
    dispatch(updateDataAutograph(value))
   }
   updateSex(value){
    let sex = value[0]
    const { dispatch } = this.props
    dispatch(updateSex(sex))
   }
   updateArea(value){
    const { dispatch } = this.props
    dispatch(updateArea(value))
   }
   updateBirthday(value){
    const { dispatch } = this.props
    let data =moment(new Date(value)).format('L')
    dispatch(updateBirthday(data))
   }

  render() {
    const { getFieldProps } = this.props.form;
    // const { currentUser } =  this.props
    console.log(options);
    return(
        <List renderHeader={() => '个人信息'}>

          <Item 
          extra={this.props.currentUser.nickname?this.props.currentUser.nickname:"未设置花名"} arrow="horizontal" 
          onClick={() => prompt('花名', '修改花名', [
            { text: '取消' },
            { text: '确定', onPress: value => this.updateNickname(value)},
          ], 'default', this.props.currentUser.nickname?this.props.currentUser.nickname:"未设置花名")}
          >花名</Item>          
          <Item 
          extra={this.props.currentUser.dataAutograph?this.props.currentUser.dataAutograph:"未设置个性签名"} arrow="horizontal" 
          onClick={() => prompt('签名', '修改签名', [
            { text: '取消' },
            { text: '确定', onPress: value => this.updateDataAutograph(value) },
          ], 'default', this.props.currentUser.dataAutograph?this.props.currentUser.dataAutograph:"未设置个性签名")}
          >签名</Item>
          <Item extra={this.props.currentUser.profile.mobile}  onClick={() => {}}>手机号码</Item>
          <Picker data={gender} cols={1} 
          {...getFieldProps('district', {
            initialValue: [this.props.currentUser.sex],
          })}  onChange={value => this.updateSex(value)}
           className="forss">
          <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
        <Picker extra="请选择(可选)"
          data={options }
          title="请选择地区"
          {...getFieldProps('area', {
            // initialValue: this.props.currentUser.area?this.props.currentUser.area:['340000', '340800', '340822'],
          })}
          onOk={value => this.updateArea(value)}
        >
          <List.Item arrow="horizontal">地区</List.Item>
        </Picker>
        <DatePicker
             style = {{width:'100%'}}
             mode="date"
            //  {...getFieldProps('birthday', {
            //   initialValue: new Date(this.props.currentUser.birthday)?new Date(this.props.currentUser.birthday):"未设置生日",
            // })}
             title="请选择你的出生日期"
             value={new Date(this.props.currentUser.birthday)}
             onChange={value => this.updateBirthday(value)}
           >
             <List.Item arrow="horizontal">生日</List.Item>
           </DatePicker>
        </List>
      )
  }
}



const PersonalWrapper = createForm()(Personal)
function mapStateToProps(state) {
  return {
    currentUser: state.CurrentUser,
    user: state.user,
    appUser: state.AppUser,
  }
}

export default connect(mapStateToProps)(PersonalWrapper);