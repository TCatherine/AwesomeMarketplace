
import React, {Component} from 'react';
import './css/image.css'
import user from './svg/1.png'
import axios from 'axios';


export default class ProfileImage extends Component {

    render() {
        return (
            <div>
                <div className='board-img'>
                    <div className='img-name'>NAME</div>
                    <div className='info-block'>
                        <div className='info-text'>INFORMATION</div>
                        <div className='name'>Name:
                            <input type='text' className='input-field' placeholder='unknown'/>
                        </div>
                        <div className='is_sale'>Not Sale</div>
                        <div className='owner'>Owner:
                            <input type='text' className='input-field' placeholder='unknown'/>
                        </div>
                        <div className='creation-date'>Cration Date:
                            <input type='text' className='input-field' placeholder='unknown'/>
                        </div>
                        <div className='update-date'>Update Date:
                        <input type='text' className='input-field' placeholder='unknown'/>
                        </div>
                    </div>
                    <button className='button-change'>change</button>
                    <button className='button-sale'>sell</button>
                    <div className='img-public'>
                        <div>public</div>
                        <img src={user}/>
                    </div>
                    <div className='img-private'>
                        <img src={user}/>
                        <div>private</div>
                    </div>
                </div>
            </div>
        )
    }
}