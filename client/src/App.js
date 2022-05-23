import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogReg from './view/LogReg';
import Home from './view/Home';
import ViewEmployee from './view/ViewEmployee';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg/>} path="/login&registration" default/>
          <Route element={<Home/>} path ="/home"/>
          <Route element={<ViewEmployee/>} path ="/view/employee/:id"/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
