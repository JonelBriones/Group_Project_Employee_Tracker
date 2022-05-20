import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LogReg from './view/LogReg';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg/>} path="/login&registration" default/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
