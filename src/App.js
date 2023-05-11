
import './App.css';
import PathFindingVisualizer from './PathFinderVisualizer/PathFindingVisualizer';
import { Grid, GridContextProvider } from './MyContext';

function App() {
  return (
    <div className="App">
      <GridContextProvider>
        <PathFindingVisualizer ></PathFindingVisualizer>
      </GridContextProvider>
      
    </div>
  );
}

export default App;
