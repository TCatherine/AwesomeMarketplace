
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
        var first_second_name = this.state.first_name + ' ' + this.state.second_name;
        return (
        <div>
            <input type='text' className='first-second-names' placeholder={first_second_name}/>
            <input type='text' className='user-name' placeholder={this.state.username}/>
            <input type='text' className='user-email' placeholder={this.state.email}/>
            <div className='buttom-change-profile' >change</div>
        </div>    );
    }
}