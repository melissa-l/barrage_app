import React, {Component} from 'react';
import Nav from '../../../plguins/nav';
import HeadImg from '../../../plguins/headImg';

import regex from '../../../../until/regex';
import goto from '../../../../until/goto';
import fetch from 'isomorphic-fetch';
import codeHandler from '../../../../until/codeHandler';
import api from '../../../../api';

import './index.styl';

class ResetPass extends Component{
  constructor(props){
    super(props);
    this.state={
      pass:"",
      rePass:""
    };
    this._handleChange=this._handleChange.bind(this);
    this._handleCheck=this._handleCheck.bind(this);
    this._handleTips=this._handleTips.bind(this);
    this._handleClick=this._handleClick.bind(this);
  }

  _handleChange(e){
    e.preventDefault();
    let pass=e.target.value;
    if(!regex.passwd.test(pass)){
      this.props.show('密码格式错误');
    }
    else{
      this.setState({
        pass:pass
      });
    }
  }

  _handleCheck(e) {
    e.preventDefault();
    let rePass = e.target.value;
    if(this.state.pass!=rePass) {
     this.props.show('两次密码输入不一致');
    }
    else{
     this.setState({
     rePass:rePass
     });
   }
  }
  _handleTips(code,codeMsg){
    this.props.show(codeMsg+code);
  }
  _handleClick(e){
    e.preventDefault();
    if(this.state.pass==""){
      this.props.show("密码不能为空");
    }
    else{
      this.props.showLoading(true);
      let token=location.search.split("?token=")[1];
      fetch(`${api.resetPass}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Token':token
        },
        body: JSON.stringify({
          password: this.state.pass
        })
      }).then(
        response=>{
          return response.json()
        })
        .then(
          json=> {
            this.props.showLoading(false);
            if(json.code===0){
              this.props.show('重置密码成功');
              goto('/auth/login');
            }else{
              codeHandler(json.code,this._handleTips);
            }
          }
        );
    }
  }
  render(){
    return(
      <div className="reset-pass" ref="resetPass">
        <Nav to="登录" title="重置密码"/>
        <div className="content">
          <HeadImg/>
          <form>
            <div className="form-item">
              <input placeholder="请输入新密码" type="password"  onBlur={this._handleChange}/>
            </div>
            <div className="form-item">
              <input placeholder="确认密码" type="password" onBlur={this._handleCheck}/>
            </div>
            <div className="form-item">
              <button onClick={this._handleClick}>重置密码</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ResetPass;
