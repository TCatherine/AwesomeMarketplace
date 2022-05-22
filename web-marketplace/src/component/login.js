import axios from 'axios';
import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './css/login.css'
import './css/common.css'



export default class Login extends Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
        error_username : "",
        error_password : "",
        error_sum: ""
        }    
    }

    handle2fa = (data) => {
        axios.post('auth/get-code/', data).then(
            res => {
                this.setState({is_2fa: true});
                localStorage.setItem('token', res.data.token);
                }
            )
            .catch((error) => {
                console.log(error.response);
                var check = (data) => {if (data && Array.isArray(data)) return data[0]; return data};

                this.setState({
                    error_username : check(error.response.data.username),
                    error_password : check(error.response.data.password),
                    error_sum: check(error.response.data.detail)
                })
            }
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = null;
        
        const data = {
            username: this.username,
            password: this.password
        }

        axios.post('auth/login/', data).then(
            res => {
                this.setState({loggedIn: true},()=> {console.log(true)});
                localStorage.setItem('access', res.data.access);
                console.log(res.data);
                console.log(localStorage.getItem('access'));
                }
            )
            .catch((error) => {
                console.log(error.response);
                if (error.response.data['2fa'])
                    this.handle2fa(data);
                var check = (data) => {if (data && Array.isArray(data)) return data[0]; return data};

                this.setState({
                    error_username : check(error.response.data.username),
                    error_password : check(error.response.data.password),
                    error_sum: check(error.response.data.detail)
                })
            }
            );
    }


    render() {
        if (this.state.loggedIn) {
            return <Navigate to={'/'}/>;
        }
        if (this.state.is_2fa) {
            return <Navigate to={'/2fa'}/>;
        }
        return (
            <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <div className='welcome'>Sign in to Marketplace</div>
            <div className='username-signup' align="left">
                <label className='name-signin'>Username</label>
                <input type='text' className='form-control-signup-login' placeholder='Username'
                onChange={e => this.username = e.target.value}/>
                <label className='error'>{this.state.error_username}</label>
            </div>
            <div className='password-signup' align="left">
                    <label className='name-signin'>Password</label>
                    <input type='password' className='form-control-signup-password' placeholder='*** ***'
                    onChange={e => this.password = e.target.value}/>
                     <label className='error'>{this.state.error_password}</label>
            </div>   
            <button className='buttom-signup'>
                <div className='buttom-name-signup'>SIGN UP</div>
            </button>
            <label className = 'error-total'>{this.state.error_sum}</label>
            <div className='to-sign-in'>
                New to Marketplace? <Link to={'/register'} className='link-sign-in'>Create an account </Link>
            </div>
            </div>
            </form>
        )
    }
}