
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
          preview_public_image: null,
          preview_private_image: null,
          public_image: null,
          private_image: null,
          name: 'unknown',
          price: 0,
          is_sale: false
        }; 
    }

    onImageChange(event, is_public){
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          if (is_public) {
                this.setState({
                    preview_public_image: URL.createObjectURL(img),
                    public_image: img
                }, ()=> {});
        }
        else {
            this.setState({
                preview_private_image: URL.createObjectURL(img),
                private_image: img
            }, ()=> {});
        }
    }
      };

    setStatus = event => {
        var checkBox = document.getElementById("is_sale");
        this.setState({is_sale: checkBox.checked});
    }

    addProduct = event => {
        var public_img = new FormData();
        var private_img = new FormData();
        public_img.append('image', this.state.public_image);
        private_img.append('image', this.state.private_image);
        const data = {
            public_image: public_img,
            private_image: private_img,
            name: this.state.name,
            price: this.state.price,
            is_sale: this.state.is_sale
        }
        axios.post('market/imageobject/add/', data).then(
           res  => {
                console.log(res.request);
                toast.success('Image is added', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                    });
            },
            err => {
                toast.error('Something went wrong', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });
            }
        )
        console.log(data);
    }

    render() {
        return (
                 <div className='board-img'>
                     <div className='img-name'>Masterpiece will be safe here</div>
                     <button className='button-add' onClick={this.addProduct}>add</button>
                     <div className='information'>
                         <div className='info-text'>INFORMATION</div>
                         <div className='enter-name'>Name:
                             <input type='text' className='input-field' placeholder={this.state.name}
                             onChange={e => this.setState({name: e.target.value})}/>
                         </div>
                         <div className='enter-price'>Price:
                             <input type='text' className='input-field' placeholder={this.state.price}
                             onChange={e => this.setState({price: e.target.value})}/>
                         </div>
                         <div className='enter-sale'>is sale:
                         <label><input type="checkbox" id="is_sale" onChange={this.setStatus}/></label>
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
                            <img src={this.state.preview_public_image} max-height="100%" max-width="100%"/>
                    </div>
                    <div className='upload_private_img'>
                            <img src={this.state.preview_private_image} max-height="100%" max-width="100%"/>
                    </div>
                 </div>
        )
    }
}