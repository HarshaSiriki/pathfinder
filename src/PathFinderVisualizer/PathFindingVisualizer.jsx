import React,{ Component, useContext, useState } from "react";
import './PathFindingVisualizer.css';
import Node from "./Node/Node";
import {Grid, GridContextProvider} from "../MyContext";

export default function PathFindingVisualizer() {
    
    const { grid, setGrid } = useContext(Grid);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    console.log(Array.isArray(grid));
    console.log(typeof(grid));

    function handleMouseEnter(row, col){
        if(!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid,row,col);
        //setGrid({newGrid});
    }

    function handleMouseUp(){
        setMouseIsPressed(false);
    }

    // function mouseClick(row, col){
    //     const newGrid = getNewGridWithWallToggled(grid,row,col);   
    //     console.log("grid:",grid);     
    // }

    function handleMouseDown (row, col){
        console.log("before calling toggle func -> grid,row,col ->",grid,row,col);
        const newGrid = getNewGridWithWallToggled(grid,row,col);
        console.log("after calling toggle func -> newGrid,row,col ->",newGrid,row,col);
        //setGrid({newGrid});
        console.log("after setting grid using setGrid -> grid,row,col ->",grid,row,col);
        setMouseIsPressed(true);
        console.log("after setting mouseIsPressed: ",mouseIsPressed);

    }

    const getNewGridWithWallToggled = (grid,row,col) => {
        console.log("in toggle -> grid,row,col ->",grid,row,col);
        //const newGrid = grid.slice();
        const node = grid[row][col];
        const newNode = {
            ...node, type: node.type === "node"
            ? "wall" 
            : "wall"
            ? "node"
            : node.type
        };
        //grid[row][col] = newNode;
        const newGrid = [...grid];
        newGrid[row][col] = newNode;
        console.log("toggle method before return:",Array.isArray(grid));
        setGrid(newGrid);
        return grid;
    };

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
                                row={row}
                                col={col}
                                type={type}
                                // isWall = {node.isWall}
                                mouseIsPressed={mouseIsPressed}
                                //mouseClick={(row,col)=>mouseClick(row,col)}
                                onMouseDown={(row,col)=>handleMouseDown(row,col)}
                                onMouseEnter={(row, col) =>handleMouseEnter(row, col)}
                                onMouseUp={() => handleMouseUp()}
                                ></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
   
}