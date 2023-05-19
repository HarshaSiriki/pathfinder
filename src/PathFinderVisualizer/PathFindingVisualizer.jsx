import React,{ Component, useContext, useState } from "react";
import './PathFindingVisualizer.css';
import Node from "./Node/Node";
import {Grid} from "../MyContext";
import { dijkstra, getNodesInShortestPath } from "../Algorithms/dijkstra";

const STARTNODE_Row = 10;
const STARTNODE_Col = 7;
const FINISHNODE_Row = 26;
const FINISHNODE_Col = 42;



export default function PathFindingVisualizer() {
    
    const { grid, setGrid } = useContext(Grid);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    console.log(Array.isArray(grid));
    console.log(typeof(grid));

    function handleMouseEnter(row, col){
        if(!mouseIsPressed) return;
        getNewGridWithWallToggled(grid,row,col);
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
        return ;
    };

    function visualizeDijkstra(){
        const startNode = grid[STARTNODE_Row][STARTNODE_Col];
        const finishNode = grid[FINISHNODE_Row][FINISHNODE_Col];
        console.log("grid from path:",grid);
        const visitedNodes = dijkstra(grid,startNode,finishNode);
        console.log('visited nodes:',visitedNodes);
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
                // document.getElementById(`node-${node.row}-${node.col}`).className = `${node.type} node-visited`;
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
                // document.getElementById(`node-${node.row}-${node.col}`).className = `${node.type} node-visited`;
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = `${node.type} node-shortest-path`;
                }
            }, 50*i);
        }
    }

    return(
        <div>
            <button onClick={() => visualizeDijkstra()}>
                Find path
            </button>
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
        </div>
        
    );
   
}