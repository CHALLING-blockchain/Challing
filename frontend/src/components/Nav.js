import React from "react";
import styles from'./Nav.module.css';
import Logo from "../img/logo-color.png";

function Nav(){
  return(
      <div className={styles.Navbar}>
        <img className={styles.LogoImg} src={Logo} alt="logo"/>
      </div>
  );
};

export default Nav;