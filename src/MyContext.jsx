import { createContext, useState } from "react";
import React from "react";

export const Grid = createContext(null);
const STARTNODE_Row = null;
const STARTNODE_Col = null;
const FINISHNODE_Row = null;
const FINISHNODE_Col = null;



const getDefaultGrid = () => {
    const grid = [];
    for (let row = 0; row < 22; row++) {
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
    const [startNode, setStartNode] = useState({ row: STARTNODE_Row, col: STARTNODE_Col });
    const [finishNode, setFinishNode] = useState({ row: FINISHNODE_Row, col: FINISHNODE_Col });
    const contextValue = {grid,setGrid, startNode,setStartNode,finishNode,setFinishNode}
    return(<Grid.Provider value={contextValue}>{props.children}</Grid.Provider>)
}
