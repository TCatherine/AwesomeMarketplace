import axios from 'axios';
import React, {Component} from 'react';
import {Link, Navigate} from 'react-router-dom';
import './css/home.css'

export default class Home extends Component {

   
    render() {
        return (
        <div>
            <Link className='start' to={'/catalog'}>Start</Link>
        <div className='slogan'>
             Free from censorship
        </div>
        </div>
        )
    }
}
