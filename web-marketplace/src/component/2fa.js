import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './css/2fa.css'
import './css/common.css'
import axios from 'axios';

export default class Authentication extends Component {
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
            code_token: localStorage.getItem('token'),
            code: this.code
        }

        localStorage.clear();
        axios.post('auth/login/', data).then(
            res => {
                this.setState({isCorrect: true}, () => console.log(this.state));
                localStorage.setItem('access', res.data.access);
                console.log(localStorage.getItem('access'));
            })
            .catch((error) => {
                console.log(error.response);
                var check = (data) => {if (data && Array.isArray(data)) return data[0]; return data};

                this.setState({
                    code : check(error.response.data.code),
                    error_sum: check(error.response.data.login)
                })
            }
        )

    }


    render() {
        if (this.state.isCorrect) {
            return <Navigate to={'/'}/>;
        }
        return (
            <form onSubmit={this.handleSubmit}>
            <div className='form'>
                <div className='welcome'> Two-factor authentication</div>
            <div className='code-2fa' align="left">
                <label className='name-signin'>Code</label>
                <input type='text' className='form-control-code' placeholder='*** - ***'
                onChange={e => this.code = e.target.value}/>
                {/* TODO: query again! */}
                <div className='try-again'>
                Сode is not received?  <Link to={'/register'} className='link-sign-in'>Try again </Link>
                </div>
            </div>  
            <button className='buttom-signup'>
                <div className='buttom-name-signup'>CONFIRM</div>
            </button>
            <label className = 'error-total'>{this.state.error_sum}</label>
            </div>
            </form>
        )
    }
}