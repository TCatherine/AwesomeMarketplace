import React, {Component} from 'react';
import './css/own-catalog.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class ProfileCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities : []
        }
    }
    
      setUser = user => {
          this.setState({
            user: user
          });
        }

    componentDidMount = () => {
        axios.get('auth/user/').then(
            res => {
                this.setUser(res.data);
            },
            err => { console.log(err);}
        )

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
        let data;
        let left_pos;
        let top_pos;
        var remainder = idx % 2;
        left_pos = 0 + 55*remainder + '%';

        let k = Math.floor(idx/2);
        top_pos = k*50+ '%';


        if (entity!==undefined){
            
            data = {
                id: entity.id,
                name:entity.name ,
                price: entity.price,
                is_sale_str: func(entity.is_sale),
                is_sale: entity.is_sale,
                public_path: entity.public_image,
                private_path: entity.private_image,
                creation_date: entity.creation_date,
                last_updated: entity.last_updated,
                owner: this.state.user
            }
        }
        else {
            data = { }
        }
        return(
            <Link to={{pathname: "/editor/"+idx}}  state={{data: data}} className='catalog-entity' style={{top: top_pos, left: left_pos}}>
                <div className='entity-name'>Name: {data.name}</div>
                <div className='entity-price'>Price: {data.price}</div>
                <div className='entity-sale'>{data.is_sale_str}</div>
                <div className='entity-public'>
                    <img src={data.public_path} alt='private' className='entity-public-img'/>
                    <div  className='entity-public-text'>public</div>
                </div>
                <div className='entity-private'>
                    <img src={data.private_path} alt='public' className='entity-public-img'/>
                    <div  className='entity-public-text'>private</div>
                </div>
            </Link>
        );
    }

    render() {
        let idx = 0;
        const listItems =  this.state.entities.map((ent) => this.getComponent(ent, idx++));

        return <div id='catalog-list'>{listItems}</div>;
    }
}