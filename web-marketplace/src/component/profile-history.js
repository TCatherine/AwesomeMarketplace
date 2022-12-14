import React, {Component} from 'react';

import axios from 'axios';
import "./css/profile-history.css";
import user from './svg/1.png'
 

export default class ProfileHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: []
        }
    }

    componentDidMount = () => {

        axios.get('auth/user/').then(
            res => {
                this.setState({user: res.data}, ()=> console.log(res.data));
                console.log(res.data);
                const url = 'market/user-transactions/' + res.data.id + '/';
                axios.get(url).then(
                    res => {
                        this.setState({
                            entities:  [...res.data.transactions]
                          }, ()=>console.log(res.data));
                    },
                    err => { 
                        console.log(err);
                });

            },
            err => { console.log(err);}
        )
    }

    getComponent = (entity, idx) => {
        const shift_top = (5+idx*40) + '%';
        return (
        <p key='{d.name}' className='transaction' style={{top: shift_top}}>    
            <div className='text-transaction'>{entity.item}: [buyer: {entity.buyer}] [owner: {entity.seller}] [price: {entity.amount}]</div>
            <img src={user} alt='demo'className='demo-img'/>
        </p>);
    }


    render(){
        let idx = 0;
        const listItems =  this.state.entities.map((ent) => this.getComponent(ent, idx++));

        return (<div id="content">{listItems}</div>);
    }
}