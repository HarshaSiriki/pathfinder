import React,{ useContext, useState } from "react";
import './PathFindingVisualizer.css';
import Node from "./Node/Node";
import {Grid} from "../MyContext";
import { dijkstra, getNodesInShortestPath } from "../Algorithms/dijkstra";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import DragDrop from "./DragDrop";
import {useDrag,useDrop } from "react-dnd";




export default function PathFindingVisualizer() {
    
    const { grid, setGrid, startNode,setStartNode,finishNode,setFinishNode } = useContext(Grid);
    const [mouseIsPressed, setMouseIsPressed ] = useState(false);
    const STARTNODE_Row = startNode.row;
    const STARTNODE_Col = startNode.col;
    const FINISHNODE_Row = finishNode.row;
    const FINISHNODE_Col = finishNode.col;

    function handleMouseEnter(row, col){
        if(mouseIsPressed){
            getNewGridWithWallToggled(grid,row,col);
            console.log("Mouse Enter:",mouseIsPressed);    
        }
    }

    function handleMouseUp(){ 
        console.log("Mouse Up before:",mouseIsPressed);
        setMouseIsPressed(false);
        console.log("Mouse Up:",mouseIsPressed);
    }

    function handleMouseDown (row, col){
        if((row !== startNode.row && col !== startNode.col) && (row !== finishNode.row && col !== finishNode.col)){
            if(!mouseIsPressed){
                getNewGridWithWallToggled(grid,row,col);
                console.log("Mouse Down if loop:",mouseIsPressed);
                setMouseIsPressed(true);
                console.log("Mouse Down set in loop:",mouseIsPressed);
            }
        }
        console.log("Mouse Down:",mouseIsPressed);
    }

    const getNewGridWithWallToggled = (grid,row,col) => {
        const node = grid[row][col];
        if(grid[row][col].type !== 'start-node' && grid[row][col].type !=='finish-node'){
            const newNode = {
                ...node, type: node.type === "node"
                ? "wall" 
                : "wall"
                ? "node"
                : node.type
            };
           
            const newGrid = [...grid];
            newGrid[row][col] = newNode;
            setGrid(newGrid);
        }
        
        return ;
    };

    function visualizeDijkstra(){
        const startNode = grid[STARTNODE_Row][STARTNODE_Col];
        const finishNode = grid[FINISHNODE_Row][FINISHNODE_Col];
        const visitedNodes = dijkstra(grid,startNode,finishNode);
        const nodesInShortestPath = getNodesInShortestPath(finishNode);
        animateDijkstra(visitedNodes,nodesInShortestPath);
        
    }

    function animateDijkstra(visitedNodes,nodesInShortestPath){
        for (let i=0;i<= visitedNodes.length;i++){
            if(i === visitedNodes.length){
                setTimeout(()=>{
                    animateShortestPath(nodesInShortestPath);
                },20*i);
                return;
            }
            setTimeout(()=>{
                const node = visitedNodes[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = `${node.type} node-visited`;
                }
            }, 20*i);
        }
    }

    function animateShortestPath(nodesInShortestPath){
        for (let i=0; i<nodesInShortestPath.length; i++){
            setTimeout(()=>{
                const node = nodesInShortestPath[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = `${node.type} node-shortest-path`;
                }
            }, 50*i);
        }
    }
    const [{ isStartDragging }, startDrag] = useDrag((type) => ({
        type: "nodeDiv",
        item: { type: 'start-node' },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

      const [{ isFinishDragging }, finishDrag] = useDrag((type) => ({
        type: "nodeDiv",
        item: { type: 'finish-node' },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
      
    return(
        <div className="displayContainer">
            <div className="topBar">
                <div
                ref={startDrag} 
                id="startDiv"
                type="start-node"
                style={{opacity:  isStartDragging ? 0.5 : 1,
                cursor: "grab", }}
                >
                </div>
                <div
                ref={finishDrag} 
                id="finishDiv"
                type="finish-node"
                style={{opacity:  isFinishDragging ? 0.5 : 1,
                cursor: "grab", }}
                ></div>
                <button onClick={() => visualizeDijkstra()}>
                    Find path
                </button>
            </div>
            <div className="grid" >
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
                                mouseIsPressed={mouseIsPressed}
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
        </div>
        
    );
   
}

