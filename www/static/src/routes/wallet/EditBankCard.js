import React from 'react';
import { InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class EditBankCard extends React.Component {

  render(){
    const { getFieldProps } = this.props.form;
    return(
      <div style = {{backgroundColor:'#fff',marginTop:'50px',padding:'15px'}}>
        <h3 style = {{padding:'0 10px'}}>请务必认真填写，校验正确，否则不能到账</h3>
        <div style = {{border:'1px solid #f6f6f6'}}></div>
        <InputItem type = "text" placeholder = "开户户头姓名">姓名</InputItem>
         <InputItem
          {...getFieldProps('bankCard', {
            initialValue: '',
          })}
          type="bankCard"
          placeholder = "银行卡号"
        >银行卡</InputItem>
        <InputItem type = "text" placeholder = "银行开户行（具体到支行）">支行</InputItem>
        <Button  size = "small" style = {{backgroundColor:'#ffcf2d',color:'#fff',margin:'10px 35px'}}>提交</Button>

      </div>
    )
  }
}
const EditBankCardWrapper = createForm()(EditBankCard);
export default EditBankCardWrapper;
