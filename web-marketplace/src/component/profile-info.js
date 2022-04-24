
import React, {Component} from 'react';
import './css/profile.css'
import axios from 'axios';

export default class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name : "unknown",
            second_name : "unknown",
            username: "unknown",
            email: "1@mail.ru"
        }
       
    }

    render() {
        return (
        <div>
            <div className='first-second-names'>{this.state.first_name} {this.state.second_name}</div>
            <div className='user-name'>{this.state.username}</div>
            <div className='user-email'>{this.state.email}</div>
            <div className='buttom-change-profile'>change</div>
        </div>    );
    }
}