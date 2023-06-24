import "./App.css";
import PathFindingVisualizer from "./PathFinderVisualizer/PathFindingVisualizer";
import { GridContextProvider } from "./MyContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend} className="App">
      <GridContextProvider>
        <PathFindingVisualizer></PathFindingVisualizer>
      </GridContextProvider>
    </DndProvider>
  );
}

export default App;
