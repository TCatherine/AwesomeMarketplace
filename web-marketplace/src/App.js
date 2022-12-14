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
import ImageAdditor from './component/add.js';
import WrappedProfileImage from './component/profile-img.js';
import Catalog from './component/catalog.js';
import WrappedImage from './component/image.js';

// remove this line
//axios.defaults.baseURL = "http://localhost:8000";

// new code
// if (window.location.origin === "http://localhost:3000") {
  // axios.defaults.baseURL = "http://127.0.0.1:8000";
// } 
if (window.location.origin.endsWith(":3000")) {
  const backendURL = window.location.origin.slice();
  axios.defaults.baseURL = backendURL.replace(":3000", ":8000");
}
else {
  axios.defaults.baseURL = window.location.origin;
}


export default class App extends Component {
  state= {};

  refreshJWTToken = () => {
    const data = {
      refresh: localStorage.getItem('access')
    };

    axios.post('auth/login/refresh/', data).then(
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
          this.refreshJWTToken();
          console.log(err);
        }
    )
  };

    setUser = user => {
      this.setState({user: user}, () => console.log(this.state));
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
        <Route path="/add" element={<ImageAdditor/>}/>
        <Route path="/editor/:Id" element={<WrappedProfileImage/>}/>
        <Route path="/image/:Id" element={<WrappedImage/>}/>
        <Route exact path="/catalog" element={<Catalog/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    );
  }
}

