import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.data.loggedIn
        }
    }

    componentDidMount = () => {
    if (this.state.loggedIn) {
        window.location.reload();
        this.setState({loggedIn: false});
    }
  };
   
    render() {
        return (
        <div>
            <Link className='start' to={'/catalog'}>Start</Link>
        <div className='slogan'>
             Free from censorship
        </div>
        </div>
        )
    }
}
