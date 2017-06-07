import React, {Component} from 'react';
import back from '../../../../images/back.png';
import {Link} from 'react-router';
import './index.styl';

class Back extends Component {
  render() {
    return (
      <div className="w_nav">
        <div className="w_nav_item">
          <Link to={this.props.url}>
            <img src={back} width="40" height="40" alt="返回"/>
          </Link>
        </div>
        <span className="w_nav_return">返回</span>
      </div>
    )
  }

}
export default Back;
