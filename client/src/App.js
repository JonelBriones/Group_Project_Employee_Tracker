import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogReg from './view/LogReg';
import Home from './view/Home';
import ViewEmployee from './view/ViewEmployee';
import CreateTask from './components/CreateTask';
import CompleteTask from './view/CompleteTask';
import ViewTask from './components/ViewTask';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg/>} path="/login&registration" default/>
          <Route element={<Home/>} path ="/home"/>
          <Route element={<ViewEmployee/>} path ="/view/employee/:id"/>
          <Route element={<CreateTask/>} path ="/create_task"/>
          <Route element={<CompleteTask/>} path ="/completed_task"/>
          <Route element={<ViewTask/>} path="/view/task/:id" />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
