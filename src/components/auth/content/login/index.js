import React, {Component, addons} from 'react';
import 'react-dom';
import {Link} from "react-router";
import api from '../../../../api'
import goto from '../../../../until/goto';
import codeHandler from '../../../../until/codeHandler';
import shallowCompare from 'react-addons-shallow-compare';
import Regex from '../../../../until/regex';
import TopBar from '../../../plguins/nav';
import HeadImg from '../../../plguins/headImg';

import './index.styl';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this._handleChangeOnName = this._handleChangeOnName.bind(this);
    this._handleChangeOnPassword = this._handleChangeOnPassword.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._handleTips = this._handleTips.bind(this);
    this._handleEnterKeyPress=this._handleEnterKeyPress.bind(this);
    this._handleIsLeagle=this._handleIsLeagle.bind(this);
  }

  _handleChangeOnName(event) {
    this.setState({name: event.target.value});
  }

  _handleChangeOnPassword(event) {
    this.setState({password: event.target.value});
  }

  _handleTips(code, codeMsg) {
    this.props.show(codeMsg + code);
  }

  //fetch前的本地校验
  _handleIsLeagle(){
    if (!Regex.email.test(this.state.name)) {
      this.props.show('邮箱格式错误！');
      return false;
    } else if (!Regex.passwd.test(this.state.password)) {
      this.props.show('密码格式错误,应为6-22位字母数字或下划线！');
      return false;
    }else {
      return true;
    }
  }

  _handleLogin() {
    if(this._handleIsLeagle()){  //本地校验格式正确后，fetch
      this.props.showLoading(true);
      fetch(api.login, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          "email": this.state.name,
          "password": this.state.password
        })
      }).then((res) => {
        this.props.showLoading(false);
        return res.json();
      }).then((res)=> {
        if (res.code === 0) {
          console.log(res);
          this.props.show('登录成功！');
          window.localStorage.setItem("token", res.data.token.token);
          goto('/home/select');
        } else {
          codeHandler(res.code, this._handleTips);
        }
      })
    }
  }

  _handleEnterKeyPress(KeyboardEvent){
    if(KeyboardEvent.key === 'Enter'){
      this._handleLogin();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <TopBar to="" title="登录"/>
        <div className="login-page">
          <HeadImg/>
          <form className="login-form">
            <input id="input1" className="input1" type="text" placeholder="登录邮箱："
                   onChange={this._handleChangeOnName}/>
            <input id="input2" className="input2" type="password" placeholder="密码(6-22位):"
                   onChange={this._handleChangeOnPassword} onKeyPress={this._handleEnterKeyPress}/>
          </form>
          <button className="login-button" onClick={this._handleLogin}>登&nbsp;录</button>
          <Link className="forgetPassLink" to="/auth/forgetPass">忘记密码?</Link>
          <Link className="registerLink" to="/auth/register">注册账号</Link>
        </div>
      </div>
    )
  }
}

export default Login;
