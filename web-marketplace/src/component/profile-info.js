
import React, {Component} from 'react';
import './css/profile.css'
import './css/toggle.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import w_key from './svg/key.png'

toast.configure();

export default class ProfileInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            first_name : "unknown",
            second_name : "unknown",
            username: "unknown",
            email: "1@mail.ru",
            is_2fa_enabled: false
        }
    }

    updateProfile = () => {
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.second_name,
            email: this.state.email,
            username: this.state.username,
            is_2fa_enabled: this.state.is_2fa_enabled

        }

        var id = localStorage.getItem('id');
        var url = 'auth/update_profile/' + id + '/';
        axios.put(url, data).then(
            res => {
                console.log(data);
                this.setState({
                first_name : res.data.first_name,
                second_name : res.data.last_name,
                username: res.data.username,
                email: res.data.email,
                is_2fa_enabled: res.data.is_2fa_enabled
              });
              this.setState({
                first_second_name : this.state.first_name + ' ' + this.state.second_name
            });
            toast.success('User information changed', {
                position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });
            },
            error => {
                console.log(error.response);
                toast.error('Something went wrong', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.updateProfile();
    }

    triggerToggle = e => {
        this.setState({is_2fa_enabled: !this.state.is_2fa_enabled}, ()=>{this.updateProfile();});
    }

    componentDidMount = () => {
        axios.get('auth/user/').then(
            res => {
                this.setState({
                    first_name : res.data.first_name,
                    second_name : res.data.last_name,
                    username: res.data.username,
                    email: res.data.email,
                    balance: res.data.balance,
                    is_2fa_enabled: res.data.is_2fa_enabled
                  });
                  this.setState({
                    first_second_name : this.state.first_name + ' ' + this.state.second_name
                }, ()=>{console.log(res.data)});

            },
            err => { 
                console.log(err);
            });
    };

    ToggleButton = ({ label }) => {
        return (
            <div className={`wrg-toggle ${this.state.is_2fa_enabled ? 'wrg-toggle--checked' : ''}`}>
            <div className="wrg-toggle-container">
            <div className="wrg-toggle-check">
                <span style={{left: '50%'}}><img src={w_key} style={{height: '200%'}}/></span>
            </div>
            <div className="wrg-toggle-uncheck">
                <span>No</span>
            </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <div className='wrg-toggle-name'>Is 2fa enabled</div>
            <label><input type="checkbox" className="wrg-toggle-input" onChange={this.triggerToggle} aria-label="Toggle Button"/></label>
            </div>
        );
      };


    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <input type='text' className='profile-first-name' placeholder={this.state.first_name}
             onChange={e => this.setState({first_name: e.target.value})}/>
            <input type='text' className='profile-second-name' placeholder={this.state.second_name}
             onChange={e => this.setState({second_name: e.target.value})}/>
            <input type='text' className='profile-user-name' placeholder={this.state.username}
             onChange={e => this.setState({username: e.target.value})}/>
            <input type='text' className='profile-user-email' placeholder={this.state.email}
             onChange={e => this.setState({email: e.target.value})}/>
            <div className='balance'>Balance: {this.state.balance}</div>
            <this.ToggleButton/>
            <button className='buttom-change-profile'>change</button>
        </form>    );
    }
}