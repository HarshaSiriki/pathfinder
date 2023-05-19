import { createContext, useState } from "react";
import React from "react";

export const Grid = createContext(null);
const STARTNODE_Row = 10;
const STARTNODE_Col = 7;
const FINISHNODE_Row = 26;
const FINISHNODE_Col = 42;



const getDefaultGrid = () => {
    const grid = [];
    for (let row = 0; row < 30; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
}

const createNode = (col,row) => {
    return{
        col,
        row,
        type: row === STARTNODE_Row && col === STARTNODE_Col 
        ? 'start-node'
        : row === FINISHNODE_Row && col === FINISHNODE_Col
        ? 'finish-node'
        : 'node',
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        
    };
};

export const GridContextProvider = (props) => {
    const [grid, setGrid] = useState(getDefaultGrid());
    const [startNode, setStartNode] = useState(grid[STARTNODE_Row][STARTNODE_Col]);
    const [finishNode, setFinishNode] = useState(grid[FINISHNODE_Row][FINISHNODE_Col]);
    const contextValue = {grid,setGrid, startNode,setStartNode,finishNode,setFinishNode}
    console.log(contextValue);
    return(<Grid.Provider value={contextValue}>{props.children}</Grid.Provider>)
}
