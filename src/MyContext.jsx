import { createContext, useState } from "react";
import React from "react";

export const Grid = createContext(null);

const getDefaultGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
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
        type: 'node',
        distance: Infinity,
        isVisited: false,
        previousNode: null,
        
    };
};

export const GridContextProvider = (props) => {
    const [grid, setGrid] = useState(getDefaultGrid());
    const contextValue = {grid,setGrid}
    console.log(contextValue);
    return(<Grid.Provider value={contextValue}>{props.children}</Grid.Provider>)
}
