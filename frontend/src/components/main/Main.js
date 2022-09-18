import React from 'react';
import './Main.css';
import Nav from '../Nav';
import Banner_1 from "../../img/배너1.png";
import Banner_2 from "../../img/배너2.png";


function Main() {
    return (
        <div className='Main'>
          <Nav/>
          <img className='Banner1' src={Banner_1} alt="Banner1"/>
          <img className='Banner2' src={Banner_2} alt="Banner2"/>
        </div>
    );
};

export default Main;