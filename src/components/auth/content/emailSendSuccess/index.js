import React,{Component} from 'react'
import Nav from '../../../plguins/nav';
import {Link} from 'react-router';
import success from '../../../../images/sendEmailSuccess.png';
import './index.styl';

class EmailSendSuccess extends Component{
  render(){
    return(
      <div className="send-success">
        <Nav to="登录" title="邮件发送成功"/>
        <div className="content">
          <div className="pic">
            <img src={success}/>
          </div>
          <br/>
          <p>
            一封带有确认链接的邮件已经发送至您的邮箱，请检查邮箱（包括垃圾邮箱），并点击该链接激活你的账户。
          </p>
          <Link to="/auth/reSendEmail">重新发送激活邮件</Link>
        </div>
      </div>
    );
  }
}
export default EmailSendSuccess;
