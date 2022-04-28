import axios from 'axios';
import React, {Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import './css/home.css'

export default class Home extends Component {

   
    render() {
        return (
        <div>
            <button className='buttom'>
                <Link to={'/catalog'}  className='start-name'>Start</Link>
            </button>
        <div className='slogan'>
             Free from censorship
        </div>
        </div>
        )
    }
}
