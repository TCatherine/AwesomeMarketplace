import React from 'react';
import './css/background.css';
import background from './svg/background.svg'

import reportWebVitals from '../reportWebVitals';

function Back(){
  return(
    <div className="background">
      <img src={background} className="back"/>
    </div>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default Back;