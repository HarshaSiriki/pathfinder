import React,{ Component } from "react";
import './Node.css';
import { Grid } from "../../MyContext";

export default class Node extends Component{

    render(){
        const {col,
            type,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,} = this.props;
        //const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
        const extraClassName = `${type}`;
        return(
            <div 
            id={`node-${row}-${col}`}    
            className={`node ${extraClassName}`}
            //onMouseDown={()=>onMouseDown(row,col)}
            //onMouseEnter={()=>onMouseEnter(row,col)}
            //onMouseUp={()=>onMouseUp()}
            ></div>
        );
    }
   
}