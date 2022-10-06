import React from "react";
import styles from "./Intro.module.css"
import logo from "../../img/logo-white.png";
import Carousel from "./Carousel";
import symbol from "../../img/symbol-dynamic.png";
import { Link } from 'react-router-dom';


function Intro(){
    return (
      <div className={styles.totalBox}>
        <img className={styles.logo} src={logo} alt="" />
        <Carousel></Carousel>
        <Link to="/">
          <div className={styles.btn}>
            <img src={symbol} alt="" />
            <p>챌링 시작하기</p>
            <div></div>
          </div>
        </Link>
      </div>
    );
}




export default Intro;

