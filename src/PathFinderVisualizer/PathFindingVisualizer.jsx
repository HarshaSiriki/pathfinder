import React,{ Component, useContext } from "react";
import './PathFindingVisualizer.css';
import Node from "./Node/Node";
import {Grid, GridContextProvider} from "../MyContext";

// export default class PathFindingVisualizer extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             nodes:[]
//         };
//     }
export default function PathFindingVisualizer() {
    const { grid, setGrid } = useContext(Grid);
    console.log(grid);

    // componentDidMount(){
    //     const {grid} = useContext(Grid);
    //     this.setGrid(grid);
    // }

    // render(){
    //     const {nodes} = this.state;
    //     const {grid} = useContext(Grid);
    //     console.log(nodes);

        return(
            <div className="grid">
                {grid.map((row,rowIdx)=>{
                    return(
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=>{
                                const {row,col,type} = node;
                                return(
                                    <Node
                                    key={nodeIdx}
                                    col={col}
                                    type={type}
                                    mouseIsPressed={false}
                                    onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                    onMouseEnter={(row, col) =>this.handleMouseEnter(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}
                                    ></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );

        // return(
        //     <div className="grid">
        //          {nodes.map((row,rowIdx) => {
        //             return(
        //                 <div key={rowIdx}>
        //                     {row.map((node, nodeIdx)=> {
        //                         const {isStart, isFinish} = node;
        //                         return (
        //                             <Node
        //                                 key = {nodeIdx}
        //                                 isStart={isStart}
        //                                 isFinish={isFinish}
        //                                 test={'foo'}
                                        
        //                             ></Node>
        //                         );
        //                     })}
        //                 </div>
        //             );
        //          })}
        //     </div>
        // );
    // }
   
}