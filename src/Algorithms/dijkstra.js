export function dijkstra (grid,startNode, endNode){
    const visitedNodes = [];
    startNode.distance = 0;
    let unvisitedNodes = getAllNodes(grid);
    
    
    while(!!unvisitedNodes.length){
        //unvisitedNodes= sortNodesByDistance(unvisitedNodes);
        unvisitedNodes.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();
        console.log("closestNode:",closestNode);
        console.log("unvisitedNodes:",unvisitedNodes);
        // console.log("startNode: ",startNode);
        // console.log("endNode: ",endNode);
        
        if(closestNode.type === "wall") continue;

        if(closestNode.distance === Infinity) return visitedNodes;

        closestNode.isVisited = true;
        visitedNodes.push(closestNode);

        if(closestNode.type === "finish-node") return visitedNodes;
        const unvisitedNeighbours = updateUnvisitedNeighbours(closestNode,grid);
        console.log("unvisited neighbours:",unvisitedNeighbours);
        try{
            for(let i=0;i<unvisitedNeighbours.length;i++){
                console.log(`node[${unvisitedNeighbours[i].row}][${unvisitedNeighbours[i].col}]`);
                console.log(`unvisited nodes in loop: ${unvisitedNeighbours[i].row},${unvisitedNeighbours[i].col},${unvisitedNeighbours[i].distance}`);
                unvisitedNodes[unvisitedNeighbours[i].row][unvisitedNeighbours[i].col] = unvisitedNeighbours[i];
                console.log("unvisited nodes in loop: ",unvisitedNodes);
            }
        }catch(error){
            console.log(error);
        }
        console.log("unvisited nodes:",unvisitedNodes);
        console.log("visited nodes:",visitedNodes);

    }
    return visitedNodes;
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance);
    // for(let i =0; i<10;i++){
    //     console.log(temp);
    // }
    return unvisitedNodes;
}

function updateUnvisitedNeighbours(node, grid){
    const unvisitedNeighbours = getUnvisitedNeighbours(node,grid);
    for (const neighbour of unvisitedNeighbours){
        // console.log("before:",neighbour.distance);
        neighbour.distance = node.distance+1;
        neighbour.previousNode = node;
        // console.log("After:",neighbour.distance);
    }
    return unvisitedNeighbours;
}

function getUnvisitedNeighbours(node,grid){
    const neighbours = [];
    const {col,row} = node;
    if (row>0 && grid[row-1][col]) neighbours.push(grid[row-1][col]);
    if (row<grid.length-1 && grid[row+1][col]) neighbours.push(grid[row+1][col]);
    if (col>0 && grid[row][col-1]) neighbours.push(grid[row][col-1]);
    if (col<grid[0].length-1 && grid[row][col+1]) neighbours.push(grid[row][col+1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function getAllNodes(grid){
    const nodes = [];
    for (const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    console.log("nodes:",nodes);
    return nodes;
}

export function getNodesInShortestPath(finishNode){
    const nodesInShortestPath = [];
    let currentNode = finishNode;
    while(currentNode !== null){
        nodesInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPath;
}