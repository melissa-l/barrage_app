import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Login from './content/login'

class Auth extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {show, showLoading}=this.props;
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children,
          {show, showLoading})
        || <Login show={show} showLoading={showLoading}/>}
      </div>
    )
  }

}
export default Auth;
