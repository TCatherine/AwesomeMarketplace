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
import Profile from './component/profile.js';

export default class App extends Component {
  state= {};

  refreshJWTTolen = () => {
    const data = {
      refresh: localStorage.getItem('access')
    };

    axios.post('auth/login/refresh/').then(
      res => {
          localStorage.setItem('access', res.data.access);
      },
      err => { 
        
        console.log(err);
      });
  }

  componentDidMount = () => {
    axios.get('auth/user/').then(
        res => {
            this.setUser(res.data);
            localStorage.setItem('id', res.data.id);
        },
        err => { 
          
          console.log(err);
        }
    )
  };

    setUser = user => {
      this.setState({
        user: user
      });
    }

  render() {

    return (
      <BrowserRouter>
      <div className="App">
        <Back/>
        <Panel user={this.state.user}/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/2fa" element={<Authentication/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    );
  }
}

