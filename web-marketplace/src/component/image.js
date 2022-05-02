
import React, {Component} from 'react';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import './css/image.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom'


class Image extends Component {
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
            private_path: this.props.data.private_path
        }
        this.change_button_name();
    }

    change_button_name() {
        if (this.state.is_sale) {
            this.name_sale = "not for sell";
        }
        else {
            this.name_sale = "sell";
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        var func = (is_sale) => {if (is_sale) return "for sale"; return "not for sale"};
        let url = 'market/imageobject/' + this.state.id + '/change_status/';

        axios.put(url).then(
            res => {
                    console.log(res);
                    this.setState({
                        is_sale: res.data.is_sale,
                        is_sale_str: func(res.data.is_sale)
                    }, () => console.log(this.state));
                    this.change_button_name();
                toast.success('Successfully change!', {
                    position: "bottom-right", autoClose: 1000, hideProgressBar: false,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined,
                });

                console.log(this.name_sale);
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
        console.log(this.name_sale);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='board-img'>
                    <div className='img-name'>{this.state.name}</div>
                    <div className='info-block'>
                        <div className='info-text'>INFORMATION</div>
                        <div className='name'>Name: {this.state.name}</div>
                        <div className='price'>Price: {this.state.price}</div>
                        {/* <div className='owner'>Owner: {this.state.owner.username}</div> */}
                        <div className='creation-date'>Cration Date: {this.state.creation_date}
                        </div>
                        <div className='update-date'>Update Date: {this.state.last_updated}
                        </div>
                    </div>
                    <button className='button-change'>buy</button>
                    <img src={this.state.public_path}  className='img'/>
                </div>
            </form>
        )
    }
}

const WrappedImage = props => { 
    let { Id } = useParams();
    const location = useLocation();
    // console.log(Id);
    // console.log(location);
    return <Image data={location.state.data}/> 
}

export default WrappedImage;