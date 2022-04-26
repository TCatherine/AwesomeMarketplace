// import axios from 'axios';
import React, {Component} from 'react';
// import { Link, Navigate } from 'react-router-dom';
import './css/profile.css'
import user from './svg/1.png'
import axios from 'axios';
import ProfilePassword from './profile-password';
import ProfileInfo from './profile-info';
import ProfileCatalog from './profile-catalog';

export default class Profile extends Component {
   
    componentDidMount = () => {
      axios.get('auth/user/').then(
          res => {
              this.setUser(res.data);
          },
          err => { console.log(err);}
      )
    };
  
    setUser = user => {
        this.setState({
          user: user
        });
      }


    render() {
        return (
            <div>
                <div className='info-user'>
                <img src={user} className='photo-user'/>
                    <ProfileInfo/>
                    <ProfilePassword/>
                </div>
                <div className='profile-entites'>
                    <div className='history'>HISTORY</div>
                    <div className='entites-line'/>
                    <div className='jawel'>
                    <div className='jawel-text'>JAWEL</div>
                    <ProfileCatalog/>
                    </div>
                </div>
            </div>
        )
    }
}