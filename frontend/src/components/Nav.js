import React from "react";
import './Nav.css';
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

function Nav(){
  return(
      <div className="Navbar">
        <img className="LogoImg" src={Logo} alt="logo"/>Challing
        <Link to="/alarm">
          <img className="Alarm" src={Logo} alt="logo"/>
        </Link>
      </div>
  );
};

export default Nav;