import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/panel.css'

export default class Home extends Component {
    render() {
        return (
            <nav className='panel'>
            <div >
              <Link to={'/'} className='title'>AwesomeWebMarketplace</Link>
              <a href='' className='catalog'>Marketplace</a>
              <div>
                <ul>
                  <li className='sign-in'>
                    <a href='' className='link'>sign in</a>
                  </li>
                  <li className='sign-up'>
                    <Link to={'/register'} className='link'>sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}