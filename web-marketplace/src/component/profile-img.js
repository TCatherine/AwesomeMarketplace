
import React, {Component} from 'react';
import {
    useParams,
  } from "react-router-dom";

import './css/image.css'
import user from './svg/1.png'
import axios from 'axios';
import { useLocation } from 'react-router-dom'


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <div className='board-img'>
                    <div className='img-name'>{this.props.data.name}</div>
                    <div className='info-block'>
                        <div className='info-text'>INFORMATION</div>
                        <div className='name'>Name:
                            <input type='text' className='input-field' placeholder={this.state.data.name}/>
                        </div>
                        <div className='price'>Price:
                            <input type='text' className='input-field' placeholder={this.state.data.price}/>
                        </div>
                        <div className='is_sale'>{this.state.data.is_sale}</div>
                        <div className='owner'>Owner: {this.state.data.owner.username}
                        </div>
                        <div className='creation-date'>Cration Date: {this.state.data.creation_date}
                        </div>
                        <div className='update-date'>Update Date: {this.state.data.last_updated}
                        </div>
                    </div>
                    <button className='button-change'>change</button>
                    <button className='button-sale'>sell</button>
                    <div className='img-public'>
                        <div>public</div>
                        <img src={this.state.data.public_path}  className='public-img'/>
                    </div>
                    <div className='img-private'>
                        <img src={this.state.data.private_path}  className='private-img'/>
                        <div>private</div>
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedProfileImage = props => {
    let { Id } = useParams();
    const location = useLocation();
    // console.log(Id);
    // console.log(location);
    return <ProfileImage data={location.state.data}/> 
}

export default WrappedProfileImage;