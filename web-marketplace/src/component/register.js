import axios from 'axios';
import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './css/register.css'
import './css/common.css'


export default class Register extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
        error_username : "",
        error_first_name : "",
        error_last_name : "",
        error_email : "",
        error_password : "",
        error_password2 : ""
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const register_data = {
            username: this.username,
            password: this.password,
            password2: this.confirm_password,        
            email: this.email,
            first_name: this.first_name,
            last_name: this.second_name
        }

        const login_data = {
            username: this.username,
            password: this.password,
        }

        axios.post('auth/register/', register_data).then(
            res => {

                console.log(res)
                axios.post('auth/get-code/', login_data).then(
                    res => {
                        console.log(res)
                        localStorage.setItem('token', res.data.token);
                        this.setState({loggedIn: true});
                    })
            })
            .catch((error) => {
                console.log(error.response);
                var check = (data) => {if (data) return data[0]; return ""};

                this.setState({
                    error_username : check(error.response.data.username),
                    error_first_name : check(error.response.data.first_name),
                    error_last_name : check(error.response.data.last_name),
                    error_email : check(error.response.data.email),
                    error_password : check(error.response.data.password),
                    error_password2 : check(error.response.data.password2)
                })
            }
        )
    }

    render() {
        if (this.state.loggedIn) {
            return <Navigate to={'/2fa'}/>;
        }
        return (
            <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <div className='welcome'>Welcome to Marketplace</div>
                <div className='username' align="left">
                    <label className='name'>Username</label>
                    <input type='text' className='form-control' placeholder='Username'
                    onChange={e => this.username = e.target.value}/>
                    <label className='error'>{this.state.error_username}</label>
                </div>
                <div className='first-name' align="left">
                    <label className='name'>First Name</label>
                    <input type='text' className='form-control' placeholder='First Name'
                    onChange={e => this.first_name = e.target.value}/>
                     <label className='error'>{this.state.error_first_name}</label>
                </div>
                <div className='second-name' align="left">
                    <label className='name'>Second Name</label>
                    <input type='text' className='form-control' placeholder='Second Name'
                    onChange={e => this.second_name = e.target.value}/>
                    <label className='error'>{this.state.error_last_name}</label>
                </div>
                <div className='email' align="left">
                    <label className='name'>Email</label>
                    <input type='text' className='form-control' placeholder='example@mail.com'
                    onChange={e => this.email = e.target.value}/>
                     <label className='error'>{this.state.error_email}</label>
                </div>
                <div className='password' align="left">
                    <label className='name'>Password</label>
                    <input type='text' className='form-control' placeholder='*** ***'
                    onChange={e => this.password = e.target.value}/>
                     <label className='error'>{this.state.error_password}</label>
                </div>
                <div className='reenter-password' align="left">
                    <label className='name'>Re-enter password</label>
                    <input type='text' className='form-control' placeholder='*** ***'
                    onChange={e => this.confirm_password = e.target.value}/>
                     <label className='error'>{this.state.error_password2}</label>
                </div>
                <button className='buttom'>
                    <div className='buttom-name'>SIGN UP</div>
                </button>
                <div className='to-sign-in'>
                Account already exists? <Link to={'/login'} className='link-sign-in'>Sign in</Link>
                </div>
            </div>
            </form>
        )
    }
}