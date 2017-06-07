import React,{Component} from 'react';
import './index.styl';


class Fontsize extends Component{
  constructor(props){
    super(props);
    this.state = {
      size:''
    };
  }



  render() {
    let {sizeIndex,handleSelectSize}=this.props;
    let sizes = ['超大啦啦啦','中等啦啦啦','超小啦啦啦'];

    sizes = sizes.map((size,index)=> {
      return (
        <li key={index}
            className={sizeIndex===index && "active-size"}
            onClick={()=>{handleSelectSize(index)}}>
          {size}
        </li>
      )
    });
    return (
      <ul className="font-list">
        {sizes}
      </ul>
    )
  }
}

export default Fontsize;
