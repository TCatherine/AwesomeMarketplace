
import React, {Component} from 'react';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import './css/image.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom'


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            name: this.props.data.name,
            price: this.props.data.price,
            is_sale_str: this.props.data.is_sale_str,
            is_sale: this.props.data.is_sale,
            owner: this.props.data.owner,
            creation_date: this.props.data.creation_date,
            last_updated: this.props.data.last_updated,
            public_path: this.props.data.public_path,
            private_path: this.props.data.private_path,
            sale_button_name:  this.change_button_name(this.props.data.is_sale)
        }
    }

    change_button_name(is_sale) {
        if (is_sale) {
            return "not for sell";
        }
        else {
            return "sell";
        }
    }

    changeInfo = e => {
        e.preventDefault();
        const data = {
            'name': this.state.name,
            'price': this.state.price
        }

        const url = 'market/imageobject/' + this.state.id + '/change_info/';
        axios.put(url, data).then (
            res => {
                toast.success('Successfully change!', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });
                this.setState({
                    name: res.data.name,
                    price: res.data.price,
                    last_updated: res.data.last_updated
                }, ()=> {console.log(res.data);});
            },
            error => {
                console.log(error.response);
                toast.error('Something went wrong', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });
            }
        )

    }

    handleSubmit = e => {
        e.preventDefault();
        var func = (is_sale) => {if (is_sale) return "for sale"; return "not for sale"};
        let url = 'market/imageobject/' + this.state.id + '/change_status/';

        axios.put(url).then(
            res => {
                    this.setState({
                        is_sale: res.data.is_sale,
                        is_sale_str: func(res.data.is_sale),
                        sale_button_name:  this.change_button_name(res.data.is_sale)
                    }, () => console.log(this.state));
                toast.success('Successfully change!', {
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

    render() {
        return (
            // <form onSubmit={this.changeInfo}>
                <div className='board-img'>
                    <div className='img-name'>{this.state.name}</div>
                    <div className='info-block'>
                        <div className='info-text'>INFORMATION</div>
                        <div className='name'>Name:
                            <input type='text' className='input-field' placeholder={this.state.name}
                             onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className='price'>Price:
                            <input type='text' className='input-field' placeholder={this.state.price}
                             onChange={e => this.setState({price: e.target.value})}/>
                        </div>
                        <div className='is_sale'>{this.state.is_sale_str}</div>
                        <div className='owner'>Owner: {this.state.owner.username}
                        </div>
                        <div className='creation-date'>Cration Date: {this.state.creation_date}
                        </div>
                        <div className='update-date'>Update Date: {this.state.last_updated}
                        </div>
                    </div>
                    <button className='button-change' onClick={this.changeInfo}>change</button>
                    <button className='button-sale' onClick={this.handleSubmit}>{this.state.sale_button_name}</button>
                    <div className='img-public'>
                        <div>public</div>
                        <img src={this.state.public_path}  className='public-img'/>
                    </div>
                    <div className='img-private'>
                        <img src={this.state.private_path}  className='private-img'/>
                        <div>private</div>
                    </div>
                </div>
            // </form>
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