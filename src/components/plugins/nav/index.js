import React, {Component} from 'react';
import back from '../../../images/back.png';
import goto from '../../../until/goto';
import './index.styl';

class Nav extends Component{
  constructor(props){
    super(props);
    this._handleClick=this._handleClick.bind(this);
  }
  _handleClick(){
    if(this.props.to==="登录"){
      goto('/auth/login');
    }else if(this.props.to==="主页"){
      goto("/home");
    }
    if(this.props.to==="选择"){
      goto("/home/select");
    }
  }
  render(){
    return(
      <nav>
        <div onClick={this._handleClick} className="top-left" style={{display:this.props.to?"block":"none"}}>
          <img src={back}/>
          <div className="arrow">返回</div>
        </div>
        <div className="top-name">{this.props.title}</div>
      </nav>
    );
  }
}

export default Nav;
