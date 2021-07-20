import './App.css';
import { Table } from './components/Table';
import { Container } from '@material-ui/core';
function App() {
  return (
    <div className="App">
      <h2>React - App</h2>
      <Container maxWidth="lg">
        <Table />
      </Container>
    </div>
  );
}

export default App;
