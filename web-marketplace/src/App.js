import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Back from './component/background';
import Home from './component/home.js';
import Panel from './component/panel.js';
import Register from './component/register.js';
import Login from './component/login.js';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Back/>
      <Panel/>

    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}



export default App;
