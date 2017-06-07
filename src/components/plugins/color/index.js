import React,{Component} from 'react';
import './index.styl';

let colors = ['#FFFFF0', '#FFFF00','#FFA500',
  '#FF69B4','#B22222','#008000',
  '#4682B4','#00008B','#000000'];

class Colors extends Component{
  constructor(props){
    super(props);
    this.state= {
      color:''
    };
  }

  render() {
    let {colorIndex,handleSelectColor}=this.props;
    colors = colors.map((color,index)=> {
      return (
          <li key={index}
              style={{background: color}}
              className={colorIndex===index && "active-color" }
              onClick={()=>{handleSelectColor(index)}}
          />
      )
    });
    return (
      <ul className="color-list">
        {colors}
      </ul>
    )
  }
}

export default Colors;
