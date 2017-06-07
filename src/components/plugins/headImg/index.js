import React, {Component} from 'react';
import Img from '../../../images/usr.png';
import './index.styl';


class HeadImg extends Component{
  render(){
    return(
      <div className="img-wrapper">
        <img className="head-img" src={Img} alt="用户头像"/>
      </div>
    );
  }
}

  export default HeadImg;
