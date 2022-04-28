
import React, {Component, Checkbox} from 'react';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import './css/image.css'
import './css/add.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import upload_icon from './svg/upload-icon.png'


export default class ImageAdditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
          public_image: null,
          private_image: null
        };
    }

    onImageChange(event, is_public){
        console.log(is_public);
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          if (is_public)
            this.setState({
                public_image: URL.createObjectURL(img)
            });
            else
            this.setState({
                private_image: URL.createObjectURL(img)
            });
        }
      };

    //   onImagePublicChange(event) {
    //     if (event.target.files && event.target.files[0]) {
    //       let img = event.target.files[0];
    //       this.setState({
    //         public_image: URL.createObjectURL(img)
    //       });
    //     }
    //   };

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
                     <div className="button_upload_public_img">
                            <input name="public" type="file" id="public" className="input_file" onChange={event=>{this.onImageChange(event, true)}}/>
                            <label for="public" className="input_file-button">
                                <span className="input_file-icon-wrapper"><img className="input_file-icon" src={upload_icon}/></span>
                                <span className="input_file-button-text">public image</span>
                            </label>
                    </div>
                    <div className="button_upload_private_img">
                        <input name="private" type="file" id="private" className="input_file" onChange={event=>{this.onImageChange(event, false)}}/>
                        <label for="private" className="input_file-button">
                            <span className="input_file-icon-wrapper"><img className="input_file-icon" src={upload_icon}/></span>
                            <span className="input_file-button-text">private image</span>
                        </label>
                    </div>  
                     <div className='upload_public_img'>
                            <img src={this.state.public_image} height="100%"/>
                    </div>
                    <div className='upload_private_img'>
                            <img src={this.state.private_image} height="100%"/>
                    </div>
                 </div>
            </form>

        )
    }
}