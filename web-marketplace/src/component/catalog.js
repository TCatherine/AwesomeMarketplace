import axios from 'axios';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './css/catalog.css'
import './css/panel.css'

export default class Catalog extends Component {  
    handleSubmit = e => {
        e.preventDefault();
    }

    constructor(props) {
        super(props);
        this.state = {
            entities : []
        }
    }

    componentDidMount = () => {
        const data = {
            batch_num: 0,
            number: 8
        }
        // axios.defaults.headers.common['Authorization'] = null;
        axios.post('market/images-catalog/', data, {headers:{ 'Authorization': null}}).then(
            res => {
                this.setState({
                    entities:  [...res.data.objects]
                  });
                  console.log(this.state.entities);
            },
            err => { 
                console.log(err);
            });
    }

    getComponent = (entity, idx) => {
        let data;
        let left_pos;
        let top_pos;
        var remainder = idx % 4;
        left_pos = 2 + 25*remainder + '%';

        let k = Math.floor(idx/4);
        top_pos = 10 + k*50+ '%';

        if (entity!==undefined){
            
            data = {
                id: entity.id,
                name:entity.name ,
                price: entity.price,
                public_path: entity.public_image,
                creation_date: entity.creation_date,
                last_updated: entity.last_updated,
                owner: entity.owner
            }
        }
        else {
            data = { }
        }
        return(
            <Link to={{pathname: "/image/"+idx}}  state={{data: data}} className='entity'  style={{top: top_pos, left: left_pos}}>
                 <img src={data.public_path} alt='public' className='product-public-img'/>
                <div className='product_name'>Name: {data.name}</div>
                <div className='product_price'>Price: {data.price}</div>
            </Link>
        );
    }


    render() {
        let idx = 0;
        const listItems =  this.state.entities.map((ent) => this.getComponent(ent, idx++));
        return(
            <div>
                <div className='products_topic'>
                <div className='topic'>Trending</div>
                </div>
                <div className='products'>
                {listItems}
                </div>
            </div>
        )
    }
}