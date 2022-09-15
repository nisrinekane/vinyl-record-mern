import './App.css';
import { Routes, Route } from 'react-router-dom';
import Create from './components/Create';
import List from './components/List'
import Detail from './components/Detail';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Create />} path="/new" />
        <Route element={<List />} path="/"/>
        <Route element={<Detail />} path="/records/:id" />
        <Route element={<Update />} path="/records/edit/:id"/>
      </Routes>
    </div>
  );
}

export default App;
