import React, {Component} from 'react';
import {Link} from 'react-router';
import './index.styl';
import Nav from '../../../plguins/nav';
import shallowCompare from 'react-addons-shallow-compare';
const back = require('../../../../images/bulletScreen/back.png');
const headPic = require('../../../../images/headPicture.jpg');


const BOOM = {
  WALLTOKEN: 'WALLTOKEN',
  AUTHSUCC: 'AUTHSUCC',
  AUTHFAIL: 'AUTHFAIL',
  WALLMESSAGE: 'WALLMESSAGE'
};


class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallValue: '',
      List: [],
      isLong: true,
      backgroundColor: '#dcdcdc'
    };

    this.list = [];
    this._handleChange = this._handleChange.bind(this);
    this._handleSendWall = this._handleSendWall.bind(this);
    this._handleIsLong = this._handleIsLong.bind(this);
  }

  _handleChange(event) {
    this.setState({
      wallValue: event.target.value
    });
  }

  _handleIsLong() {
    if (this.state.wallValue.length === 0) {
      this.setState({
        isLong: true,
        backgroundColor: '#dcdcdc'
      });
    }
    else {
      this.setState({
        isLong: false,
        backgroundColor: '#55acee'
      });
    }
  }

  _handleSendWall() {
    this._handleIsLong();
    this.list.push(this.state.wallValue);
    this.setState({
      List: this.list,
      wallValue: '',
      isLong: true,
      backgroundColor: '#dcdcdc'
    });
    this.refs.myText.value = '';
    this.refs.myText.focus();
    const message = this.state.wallValue;
    socket.emit(BOOM.WALLMESSAGE, {content: message});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className="wall">
        <Nav to="选择"/>
        <div className="content">
          <ul>
            {
              this.state.List.map((List, index)=>
                <li key={index}><img src={headPic}/><span>{List}</span></li>
              )
            }
          </ul>
        </div>
        <div className="footer">
          <input type="text" placeholder="在这里输入上墙内容呦～" onKeyUp={this._handleIsLong} onChange={this._handleChange}
                 maxLength="30" ref="myText"/>
          <button className="btn" onClick={this._handleSendWall} style={{backgroundColor: this.state.backgroundColor}}
                  disabled={this.state.isLong} ref="btn">发送
          </button>
        </div>
      </div>
    )
  };
}

export default Wall;
