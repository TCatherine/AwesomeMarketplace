import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/panel.css'
import user from './svg/user-profile.png'

export default class Home extends Component {
    render() {
      let html_code;
      if (this.props.user)
        html_code = (
          <nav className='panel'>
          <div >
            <Link to={'/'} className='title'>AwesomeWebMarketplace</Link>
            <a href='' className='catalog'>Marketplace</a>
            <div>
              <ul>
                {/* <li className='sign-up'>
                  <Link onClick={()=> localStorage.clear()} className='link'>logout</Link>
                </li> */}
                <li className='user'>{this.props.user.username}</li>
                <img src={user} className="user-img"/>
              </ul>
            </div>
          </div>
        </nav>
        );
      else
        html_code = (
          <nav className='panel'>
          <div >
            <Link to={'/'} className='title'>AwesomeWebMarketplace</Link>
            <Link to={'/catalog'} className='catalog'>Marketplace</Link>
            <div>
              <ul>
                <li className='sign-in'>
                <Link to={'/login'} className='link'>sign in</Link>
                </li>
                <li className='sign-up'>
                  <Link to={'/register'} className='link'>sign up</Link>
                </li>
                <li className='user'>Unknown</li>
                <img src={user} className="user-img"/>
              </ul>
            </div>
          </div>
        </nav>
        );

        return html_code;
    }
}