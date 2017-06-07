import React, {Component} from 'react';
import 'react-dom';
import regex from '../../../../until/regex';
import Nav from '../../../plguins/nav';
import fetch from 'isomorphic-fetch';
import codeHandler from '../../../../until/codeHandler';
import api from '../../../../api';
import HeadImg from '../../../plguins/headImg';
import './index.styl';

class RevisePass extends Component{
  constructor(props){
    super(props);
    this.state={
      oldPass:'',
      pass:'',
      rePass:''
    };
    this._handlePass=this._handlePass.bind(this);
    this._handleChange=this._handleChange.bind(this);
    this._handleCheck=this._handleCheck.bind(this);
    this._handleTips=this._handleTips.bind(this);
    this._handleClick=this._handleClick.bind(this);
  }
  _handlePass(e){
    e.preventDefault();
    let old=e.target.value;
    this.setState({oldPass:old});
  }

  _handleChange(e){
    e.preventDefault();
    let pass=e.target.value;
    this.setState({pass:pass});
  }

  _handleCheck(e) {
    e.preventDefault();
    let rePass = e.target.value;
    this.setState({rePass:rePass});
  }

  _handleTips(code,codeMsg){
    this.props.show(codeMsg+code);
  }

  _handleClick(e){
    e.preventDefault();
    if(this.state.oldPass==""){
      this.props.show('旧密码不能为空');
    }
    else if(!regex.passwd.test(this.state.oldPass)){
      this.props.show('旧密码格式错误');
    }
    else if(this.state.pass==""){
      this.props.show('新密码不能为空');
    }
    else if(!regex.passwd.test(this.state.pass)){
      this.props.show('新密码格式错误');
    }
    else if(this.state.pass!=this.state.rePass){
      this.props.show('两次输入的新密码不一致');
    }
    else{
      this.props.showLoading(true);
      let token=localStorage.getItem('token');
        fetch(`${api.password}`, {
          method: 'PUT',
          headers: {
            'Token':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldPassword:this.state.oldPass ,
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
                this.props.show('修改密码成功');
              }else{
                codeHandler(json.code,this._handleTips);
              }
            }
          );
    }
  }
  render(){
    return(
      <div className="revise-pass">
        <Nav to="选择" title="修改密码"/>
        <div className="content">
          <HeadImg/>
          <form>
            <div className="form-item">
              <input placeholder="请输入旧密码" type="password" onChange={this._handlePass}/>
            </div>
            <div className="form-item">
              <input placeholder="请输入新密码" type="password"  onChange={this._handleChange}/>
            </div>
            <div className="form-item">
              <input placeholder="确认密码" type="password" onChange={this._handleCheck}/>
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
export default RevisePass;
