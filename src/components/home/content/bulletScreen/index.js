import React, {Component} from 'react';
import set from '../../../../images/set.png';
import Colors from '../../../plguins/color';
import Fontsize from '../../../plguins/fontsize';
import Nav from '../../../plguins/nav';
import BoomItem from '../../../plguins/boomItem';
import shallowCompare from 'react-addons-shallow-compare';
import './index.styl';

const BOOM={
  BOOMTOKEN:'BOOMTOKEN',
  AUTHSUCC:'AUTHSUCC',
  AUTHFAIL:'AUTHFAIL',
  WALLMESSAGE:'WALLMESSAGE',
  BOOMRECVMESSAGE:'BOOMRECVMESSAGE'
};
let colors = ['#FFFFF0', '#FFFF00','#FFA500',
  '#FF69B4','#B22222','#008000',
  '#4682B4','#00008B','#000000'];

let fontSize = ['20','16','12'];

class BulletScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLong:true,
      isShow:true,
      message:'',
      size:'',
      color:'',
      booms:[],
      boomStart:0,
      colorIndex:null,
      sizeIndex:null,
      backgroundColor:'#dcdcdc'
    };
    this._handleSetShow = this._handleSetShow.bind(this);
    this._handleAllState=this._handleAllState.bind(this);
    this._handlePush=this._handlePush.bind(this);
    this._handleIsLong=this._handleIsLong.bind(this);
    this._handleSelectSize=this._handleSelectSize.bind(this);
    this._handleSelectColor=this._handleSelectColor.bind(this);

  }


  _handleSelectColor(index){
    this.setState({
      colorIndex:index,
      color:colors[index]
    });
  };

  _handleSelectSize(index){
    this.setState({
      sizeIndex:index,
      size:fontSize[index]
    });
  };

  _handleSetShow() {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  _handleIsLong(){
    if(this.state.message.length===0){
      this.setState({
        isLong:true,
        backgroundColor:'#dcdcdc'
      });
    }
    else{
      this.setState({
        isLong:false,
        backgroundColor:'#55acee'
      });
    }
  }

  _handleAllState(event){
    const {colorIndex,sizeIndex}=this.state;

    this.setState({
      message: event.target.value,
      color:colors[colorIndex]||'#FFFFF0',
      size:fontSize[sizeIndex]||'14'
    });
  }

  _handlePush(){
    this._handleIsLong();
    this.setState({
      message:'',
      isLong:true,
      isShow:true,
      backgroundColor:'#dcdcdc'
    });
    this.refs.myText.value='';
    this.refs.myText.focus();
    const {message,color,size}=this.state;
    socket.emit(BOOM.BOOMRECVMESSAGE, {
      content: message,
      color:color,
      fontSize:size
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    let {booms,_handleRemoveBoom}=this.props;
    booms=booms.map((boom)=>{
      return (<BoomItem boom={boom} key={boom.id} _handleRemoveBoom={_handleRemoveBoom}/>)
    });
    return (
      <div className="bulletScreen">
        <Nav to="选择"/>
        <div className="content" ref="myContent">
          <ul>
            {booms}
          </ul>
        </div>
        <div className={this.state.isShow?"set-style-hidden":"set-style"}>
          <div className="set-color">
            <span >颜色</span>
            <Colors colorIndex={this.state.colorIndex} handleSelectColor={this._handleSelectColor} />
          </div>
          <div className="set-size">
            <span >字体</span>
            <Fontsize sizeIndex={this.state.sizeIndex} handleSelectSize={this._handleSelectSize} />
          </div>
        </div>
        <div className="footer">
          <input type="text" onChange={this._handleAllState} onFocus={this._handleFocus} onKeyUp={this._handleIsLong} placeholder="点击此处输入弹幕哟~" maxLength="30" ref="myText"/>
          <button type="button" onClick={this._handlePush} style={{backgroundColor:this.state.backgroundColor}} disabled={this.state.isLong} className="push" >发送</button>
          <div className="set">
            <img src={set} width="30" height="30" alt="设置" onClick={this._handleSetShow} />
          </div>
        </div>
      </div>
    )
  }
}

export default BulletScreen;
