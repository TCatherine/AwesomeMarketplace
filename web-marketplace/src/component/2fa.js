import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './css/2fa.css'
import './css/common.css'

export default class Authentication extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
        error_username : "",
        error_password : "",
        error_sum: ""
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        // const data = {
        //     code_token: localStorage.getItem['token'],
        //     code: this.code
        // }
        this.setState({isCorrect: true});

        // axios.post('http://localhost:8000/auth/login/', data).then(
        //     res => {
        //         console.log(res)
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //         var check = (data) => {if (data && Array.isArray(data)) return data[0]; return data};

        //         this.setState({
        //             code : check(error.response.data.code),

        //             error_sum: check(error.response.data.login)
        //         })
        //     }
        // )

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
                <input type='text' className='form-control-signup' placeholder='*** - ***'
                onChange={e => this.username = e.target.value}/>
                {/* TODO: query again! */}
                <div className='try-again'>
                Сode not received?  <Link to={'/register'} className='link-sign-in'>Try again </Link>
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