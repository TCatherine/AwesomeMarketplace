// import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './css/profile.css'
import user from './svg/1.png'
import axios from 'axios';
import ProfilePassword from './profile-password';
import ProfileInfo from './profile-info';
import ProfileCatalog from './profile-catalog';
import ProfileHistory from './profile-history';

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
                <img src={user} alt='User' className='photo-user'/>
                    <ProfileInfo/>
                    <ProfilePassword/>
                </div>
                <div className='profile-entites'>
                    <div className='history'>HISTORY</div>
                    <ProfileHistory/>
                    <div className='entites-line'/>
                    <div className='jawel'>
                        JAWEL
                        <Link to="/add" className='button-new'>new</Link>
                        <ProfileCatalog/>
                    </div>
                </div>
            </div>
        )
    }
}