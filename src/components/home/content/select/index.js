import React, {Component} from 'react';
import './index.styl';
import {Link} from 'react-router';
import Nav from '../../../plguins/nav';
const back=require('../../../../images/bulletScreen/back.png');

class Select extends Component {

  render() {
    return (
      <div className="select">
        <Nav to="登录" />
        <div className="content">
          <Link to="/home/bulletScreen">点击进入弹幕</Link>
          <Link to="/home/wall">点击进入上墙</Link>
          <Link to="/home/revisePass">点击修改密码</Link>
        </div>
      </div>
    )
  }
}

export default Select;
