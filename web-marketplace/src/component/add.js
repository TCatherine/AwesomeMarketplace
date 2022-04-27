
import React, {Component, Checkbox} from 'react';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import './css/image.css'
import './css/add.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom'


export default class ImageAdditor extends Component {
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                 <div className='board-img'>
                     <div className='img-name'>Masterpiece will be safe here</div>
                     <button className='button-add'>add</button>
                     <div className='information'>
                         <div className='info-text'>INFORMATION</div>
                         <div className='enter-name'>Name:
                             <input type='text' className='input-field' placeholder='example name'/>
                         </div>
                         <div className='enter-price'>Price:
                             <input type='text' className='input-field' placeholder='xx'/>
                         </div>
                         <div className='enter-sale'>is sale:
                         <label>
                             <input type="checkbox"/>
                         </label>
                         </div>
                     </div>
                 </div>
            </form>

        )
    }
}