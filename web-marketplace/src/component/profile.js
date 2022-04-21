// import axios from 'axios';
import React, {Component} from 'react';
// import { Link, Navigate } from 'react-router-dom';
import './css/profile.css'
import user from './svg/user-profile.png'
import axios from 'axios';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name : "unknown",
            second_name : "unknown",
            username: "unknown",
            email: "1@mail.ru"
        }
       
    }


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
                    <div className='img-user'>
                    <img src={user} className='photo-user'/>
                    </div>
                    <div className='first-second-names'>{this.state.first_name} {this.state.second_name}</div>
                    <div className='user-name'>{this.state.username}</div>
                    <div className='user-email'>{this.state.email}</div>
                </div>
            </div>
        )
    }
}