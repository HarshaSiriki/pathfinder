import React, { useContext, useState, useRef } from "react";
import "./Node.css";
import { Grid } from "../../MyContext";
import { useDrag, useDrop } from "react-dnd";

export default function Node(props) {
    const { col, type, onMouseDown, onMouseEnter, onMouseUp, row } = props;

    const {grid,setGrid,startNode, setStartNode, finishNode, setFinishNode} = useContext(Grid);

    const [{ isDragging }, drag] = useDrag((type) => ({
        type: "nodeDiv",
        item: { type: 'start-node' },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "nodeDiv",
        drop: (item) => {
            addStartNode(item.type, row,col);
        },
        collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(), 
        }),
    }));
        
    const addStartNode = (type, newRow, newCol) => {
        console.log(type, newRow, newCol);
        const newGrid = [...grid];
        if(type === 'start-node'){
            const oldRow = startNode.row;
            const oldCol = startNode.col;
            if(oldRow && oldCol ){
                const node = grid[oldRow][oldCol];
                if(node.type === type){
                    const oldStartNode = { ...node, type: "node", className: "node" };
                    newGrid[oldRow][oldCol] = oldStartNode;
                }
            }
            startNode.row = newRow;
            startNode.col = newCol;
        }
        else if (type === 'finish-node'){
            const oldRow = finishNode.row;
            const oldCol = finishNode.col;
            if(oldRow && oldCol ){
                const node = grid[oldRow][oldCol];
                if(node.type === type){
                    const oldStartNode = { ...node, type: "node", className: "node" };
                    newGrid[oldRow][oldCol] = oldStartNode;
                }
            }
            finishNode.row = newRow;
            finishNode.col = newCol;
        }
        
        console.log("before setting",startNode, finishNode);
        
        const newNode = grid[newRow][newCol];
        const newStartNode = { ...newNode, type: type, className: type };
        newGrid[newRow][newCol] = newStartNode;
        setGrid(newGrid);
        console.log("after setting",startNode,finishNode);
      };
    
    
    return (
        <div
            ref={drop}
            id={`node-${row}-${col}`}
            type={type}
            className={type}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
}