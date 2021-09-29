import './App.css';
import { Table } from './components/Table';
import { Container } from '@material-ui/core';
function App() {
  return (
    <div className="App">
      <h2>My yugioh cards list</h2>
      <div id="table-own-cards">
        <Table />
      </div>
    </div>
  );
}

export default App;
