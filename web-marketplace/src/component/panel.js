import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/panel.css'
import user from './svg/user-profile.png'

export default class Panel extends Component {
  
    render() {
      let auth_code;
      if (this.props.user)
        auth_code = (
              <ul>
                <li className='sign-up'>
                <Link to={'/'} onClick={() => {localStorage.clear(); window.location.reload();}} className='link'>logout</Link>
                </li>
                <li className='user'>
                  <Link to={"/profile"} className='username'>{this.props.user.username}</Link>
                  <img src={user} alt='user'className="user-img"/>
                </li>
              </ul>
        );
      else
        auth_code = (
          <ul>
          <li className='sign-in'>
          <Link to={'/login'} className='link'>sign in</Link>
          </li>
          <li className='sign-up'>
            <Link to={'/register'} className='link'>sign up</Link>
          </li>
          <li className='user'>
            <div  className='username'>Unknown</div>
          <img src={user} alt='user' className="user-img"/>
          </li>
        </ul>
        );

        return (
          <nav className='panel'>
          <div >
            <Link to={'/'} className='title'>AwesomeWebMarketplace</Link>
            <Link to={'/catalog'} className='catalog'>Marketplace</Link>
            <div>
             {auth_code}
            </div>
          </div>
        </nav>
        );
    }
}