import React, {Component} from 'react';
import './css/home.css'

export default class Home extends Component {
    render() {
        return (
        <div>
            <button className='buttom'>
                <div className='start-name'>Start</div>
            </button>
        <div className='slogan'>
             Free from censorship
        </div>
        </div>
        )
    }
}