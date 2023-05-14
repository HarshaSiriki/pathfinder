import React,{ Component, useContext } from "react";
import './Node.css';
import { Grid } from "../../MyContext";


export default class Node extends Component{


    render(){
        
        const {col,
            type,
            mouseClick,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,} = this.props;
        
        // const {col} = this.props.col;
        // const {row} = this.props.row;
        // const {type} = this.props.type;
        // const {mouseClick} = this.props.mouseClick;
        
            
        return(
            <div 
            id={`node-${row}-${col}`}  
            type = {type}  
            className={type}
            // onClick={() => mouseClick(row,col)}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseUp={()=>onMouseUp()}
            ></div>
        );
    }
   
}