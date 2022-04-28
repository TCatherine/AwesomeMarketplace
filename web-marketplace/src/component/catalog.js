import axios from 'axios';
import React, {Component} from 'react';
import { Link, Navigate } from 'react-router-dom';
import './css/catalog.css'
import './css/panel.css'


import App from '../App'
import lot from './svg/user-profile.png'

export default class Catalog extends Component {  
    handleSubmit = e => {
        e.preventDefault();
    }


    render() {
        return(
        <form onSubmit={this.handleSubmit}>
            
                <button className='page_number_1'>
                <Link to={'/catalog'}  className='link_page_1'>1</Link></button>

                <button className='page_number_2'>
                <Link to={'/catalog/2'}  className='link_page_2'>2</Link></button>
                
                <div className='products_topic'>
                <div className='topic'>Trending</div>
                </div>

                <div className='products'>
                <div className='topic'></div>
                </div>

  
                <button className='product_1'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name1</Link>
                <div className='price'>Price 100</div>
                
                </button>
                <button className='product_2'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name2</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_3'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name3</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_4'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name4</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_5'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name5</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_6'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name6</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_7'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name7</Link>
                <div className='price'>Price 100</div>
                </button>
                <button className='product_8'>
                <img src={lot} className="pic"/>
                <Link to={'/catalog/product_page'}  className='topic_prod'>Name: name8</Link>
                <div className='price'>Price 100</div>
                </button>

                
        </form>
        )
    }
}