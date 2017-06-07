import React, {Component} from 'react';
import Back from '../back';
import shallowCompare from 'react-addons-shallow-compare';
import './index.styl';

class OnWall extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    return (
      <div className="wall">
        <div className="w_nav">
          <Back/>
        </div>
        <div className="w_content">
          lalal
        </div>
        <div className="w_footer">
          <input type="text" onClick={this._handleAllState} className="w_input" placeholder="点击此处输入弹幕哟~"/>
          <button type="button" onClick={this._handlePush} className="w_push">发送</button>
        </div>
      </div>
    )
  }
}
export default OnWall;
