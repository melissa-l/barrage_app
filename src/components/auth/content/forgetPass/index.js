import React,{Component} from 'react';
import Nav from '../../../plguins/nav';
import HeadImg from '../../../plguins/headImg';

import regex from '../../../../until/regex';
import fetch from 'isomorphic-fetch';
import codeHandler from '../../../../until/codeHandler';
import api from '../../../../api';

import './index.styl';

class ForgetPass extends Component{
  constructor(props){
    super(props);
    this.state={
      email:''
    };
    this._handleChange=this._handleChange.bind(this);
    this._handleTips=this._handleTips.bind(this);
    this._handleClick=this._handleClick.bind(this);
  }

  _handleChange(e){
    e.preventDefault();
    let email=e.target.value;
    this.setState({
        email:email
    });
  }
  _handleTips(code,codeMsg){
    this.props.show(codeMsg+code);
  }
  _handleClick(e){
    e.preventDefault();
    if(this.state.email==""){
      this.props.show('邮箱不能为空');
    }
    else if(!regex.email.test(this.state.email)){
      this.props.show('邮箱格式错误');
    }
    else{
      this.props.showLoading(true);
      fetch(`${api.forgetPass}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:this.state.email
        })
      }).then(
        response=>{
          return response.json()
        })
        .then(
          json=> {
            this.props.showLoading(false);
            if(json.code===0){
              this.props.show('邮件发送成功，请到邮箱查看');
            }else{
              loaded();
              codeHandler(json.code,this._handleTips);
            }
          }
        )
    }
  }
  render(){
    return(
      <div className="forget-pass">
        <Nav to="登录" title="忘记密码"/>
        <div className="send-before">
          <HeadImg/>
          <form>
            <div className="form-item">
              <input placeholder="请输入邮箱" type="text" onChange={this._handleChange} ref="email"/>
            </div>
            <div className="form-item">
              <button onClick={this._handleClick}>发送重置密码邮件</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default  ForgetPass;
