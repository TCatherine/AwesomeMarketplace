import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Back from './component/background';
import Home from './component/home.js';
import Panel from './component/panel.js';
import Register from './component/register.js';
import Login from './component/login.js';
import Authentication from './component/2fa.js';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {}

componentDidUpdate(prevProps, prevState) {
  console.log('update mounted!');
  const config = {
      headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
      }
  }
  axios.get('auth/user/', config).then(
      res => {
        this.setState({
          user: res.data
        })
          console.log(res);
      }
  )
} 

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Back/>
        <Panel/>

      <Routes>
        <Route exact path="/" element={ <Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/2fa" element={<Authentication/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    );
  }
}

