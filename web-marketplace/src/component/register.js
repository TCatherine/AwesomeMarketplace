import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './css/register.css'

export default class Register extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password,
            password2: this.confirm_password,        
            email: this.email,
            first_name: this.first_name,
            second_name: this.second_name
        }
        const cors = require('cors');
        const corsOptions ={
            origin:'http://localhost:3000', 
            credentials:true,            //access-control-allow-credentials:true
            optionSuccessStatus:200
        }
        Register.use(cors(corsOptions));

        axios.post('http://localhost:8000/auth/register/', data).then(
            res => {
                console.log(res)
            }
        )
        console.log(data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <div className='welcome'>Welcome to Marketplace</div>
                <div className='username' align="left">
                    <label className='name'>Username</label>
                    <input type='text' className='form-control' placeholder='Username'
                    onChange={e => this.username = e.target.value}/>
                </div>
                <div className='first-name' align="left">
                    <label className='name'>First Name</label>
                    <input type='text' className='form-control' placeholder='First Name'
                    onChange={e => this.first_name = e.target.value}/>
                </div>
                <div className='second-name' align="left">
                    <label className='name'>Second Name</label>
                    <input type='text' className='form-control' placeholder='Second Name'
                    onChange={e => this.second_name = e.target.value}/>
                </div>
                <div className='email' align="left">
                    <label className='name'>Email</label>
                    <input type='text' className='form-control' placeholder='example@mail.com'
                    onChange={e => this.email = e.target.value}/>
                </div>
                <div className='password' align="left">
                    <label className='name'>Password</label>
                    <input type='text' className='form-control' placeholder='*** ***'
                    onChange={e => this.password = e.target.value}/>
                </div>
                <div className='reenter-password' align="left">
                    <label className='name'>Re-enter password</label>
                    <input type='text' className='form-control' placeholder='*** ***'
                    onChange={e => this.confirm_password = e.target.value}/>
                </div>
                <button className='buttom'>
                    <div className='buttom-name'>SIGN UP</div>
                </button>
                <div className='to-sign-in'>
                Account already exists? <Link to='' className='link-sign-in'>Sign in</Link>
                </div>
            </div>
            </form>
        )
    }
}