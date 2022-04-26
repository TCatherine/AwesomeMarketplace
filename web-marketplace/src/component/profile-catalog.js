import React, {Component} from 'react';
import './css/own-catalog.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user from './svg/1.png'

toast.configure();

export default class ProfileCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities : []
        }
    }

    componentDidMount = () => {
        axios.get('market/own-catalog/').then(
            res => {
                this.setState({
                    entities:  [...res.data.objects]
                  });
            },
            err => { 
                console.log(err);
            });
    }

    getComponent = (entity, idx) => {
        var func = (is_sale) => {if (is_sale) return "for sale"; return "not for sale"};
        let ent = this.state.entities[0];
        let data;
        let left_pos;
        let top_pos;
        var remainder = idx % 2;
        left_pos = 0 + 55*remainder + '%';

        let k = Math.floor(idx/2);
        top_pos = 100 + k*500+ '%';


        if (entity!==undefined){
            data = {
                name:entity.name ,
                price: entity.price,
                is_sale: func(entity.is_sale),
                public_path: entity.public_image,
                private_path: entity.private_image
            }
        }
        else {
            data = { }
        }
        return(
            <div className='catalog-entity' style={{top: top_pos, left: left_pos}}>
                <div className='entity-name'>Name: {data.name}</div>
                <div className='entity-price'>Price: {data.price}</div>
                <div className='entity-sale'>{data.is_sale}</div>
                <div className='entity-public'>
                    <img src={data.public_path} className='entity-public-img'/>
                    <div  className='entity-public-text'>public</div>
                </div>
                <div className='entity-private'>
                    <img src={data.private_path} className='entity-public-img'/>
                    <div  className='entity-public-text'>private</div>
                </div>
            </div>
        );
    }

    render() {
        let idx = 0;
        const listItems =  this.state.entities.map((ent) => this.getComponent(ent, idx++));

        return listItems;
    }
}