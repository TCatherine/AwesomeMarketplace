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

    handleSubmit = e => {
        e.preventDefault();
        
        const data = {
            username: this.username,
            password: this.password
        }

        // TODO: change to get_code
        axios.post('auth/login/', data).then(
            res => {
                console.log(res)
                localStorage.setItem('access', res.data.access);
                this.setState({loggedIn: true});
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


    render() {
        if (this.state.loggedIn) {
            return <Navigate to={'/2fa'}/>;
        }
        return (
            <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <div className='welcome'>Sign in to Marketplace</div>
            <div className='username-signup' align="left">
                <label className='name-signin'>Username</label>
                <input type='text' className='form-control-signup' placeholder='Username'
                onChange={e => this.username = e.target.value}/>
                <label className='error'>{this.state.error_username}</label>
            </div>
            <div className='password-signup' align="left">
                    <label className='name-signin'>Password</label>
                    <input type='text' className='form-control-signup' placeholder='*** ***'
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