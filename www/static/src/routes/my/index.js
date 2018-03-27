/*
  Author @Simon xsqfeather@gmail.com
  这个文件处理消息盒子
*/
import React from 'react'
import { connect } from 'react-redux';
import { Flex } from 'antd-mobile';
import { 
  Button,
  WingBlank, Modal, 
  } from 'antd-mobile';
import { Link } from 'react-router-dom';
import MyItem from './MyItem';
import style from './common.css';
import userImg from '../../assets/img/timg.jpg';
import{ logout, memoryPathBeforeLogined, loadLoginedUserInfo } from '../../actions/users';
import { getStore} from '../../config/mUtils.js';
import { getUserbyId,getUserbyName} from '../../actions/users'; 
import options from '../common/Options';

const alert = Modal.alert;
const hostName = "139.198.12.188";
const hostPort = "5002";
const ipfs = window.IpfsApi({host: hostName, port: hostPort, protocol: 'http'});

let saveImageOnIpfs = (reader) => {
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    ipfs.add(buffer).then((response) => {
      console.log(response)
      resolve(response[0].hash);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

class AppMy extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userImg,
    }
    this.confirmWindow = this.confirmWindow.bind(this);
    this.userImgChange = this.userImgChange.bind(this);
    
    
  }

  confirmWindow() {
    const {dispatch} = this.props;
    alert('退出当前账号','您是否确认推出当前帐号?',[
      { text: '确定', onPress: () => {
          dispatch(logout());
      }},
      { text: '取消', onPress: () => console.log('取消了') },
    ])
  }


  componentWillMount(){
    document.title = '个人中心';
    const { dispatch } = this.props;
    dispatch(memoryPathBeforeLogined('/my'));
    dispatch(loadLoginedUserInfo());
    console.log(this.props.appUser)
    let userId = getStore("userId");
    if (userId === undefined){
      let username = this.props.appUser.username 
      dispatch(getUserbyName(username))
    }
    console.log(userId)
    dispatch(getUserbyId(userId))
   
  }

  componentWillReceiveProps(nextProps){

  }

  userImgChange(){
    let file =  this.refs.userImgInput.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file)
    reader.onloadend = (e) => {
      console.log(reader);
      // 上传数据到IPFS
      saveImageOnIpfs(reader).then((hash) => {
        this.setState({userImg: "http://"+hostName+":8630"+"/ipfs/" + hash})
      });
    }
  }


  render(){
    console.log(options)
    const { currentUser } =  this.props
    const {userImg} = this.state;
    return (
      <div >
        <div className = {style['back-color']}>
          <Flex justify = 'center' align = "center">
              <img alt="" src = {userImg} className = {style['user-img']}/>
              <input type='file' ref="userImgInput" onChange={this.userImgChange} style={{
                    opacity: 0,
                    position: "absolute",
                    left: "41%",
                    height: "59px"
              }}/>
          </Flex>
          <Flex justify = "end" className = {style['pencil-position']} >
            <Link to = "/personal">
              <img  alt="" src = {require('../svg/pencil.svg')} className = {style['pencil-svg']} />
            </Link>
           </Flex>
          <Flex justify = "center"  className = {style['nick-name-pos']}>
            <span>{currentUser.nickname}</span>
          </Flex>
          <Flex justify = "center">
            <span className = {style['user-name-span']}>{("(用户名:"+ currentUser.username +")")}</span>
          </Flex>
          <Flex justify = "center">
            <span className = {style['slogan-span']}>{currentUser.dataAutograph}</span>
          </Flex>
        </div>
        <div className = {style['item-position']} >

          <MyItem/>
          <WingBlank>
            <Button className = {style['sign-out-btn']} onClick={this.confirmWindow}>退出当前帐号</Button>
          </WingBlank>
        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.CurrentUser,
    user: state.user,
    appUser: state.AppUser,
  }
}

export default connect(mapStateToProps)(AppMy);

