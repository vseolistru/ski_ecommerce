import React, {useState, useContext} from 'react';
import {State} from "../../Store";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg"
import {Link} from "react-router-dom";


const Header = () => {
    const value = useContext(State)
    return (
      <header>
          <div className="menu">
              <img src={Menu} alt ="" width="30"/>
          </div>
          <div className="logo">
              <h1>
                  <Link to={'/'}>Ski & Bike store</Link>
              </h1>
          </div>
          <div>
              <ul>
                  <li><Link to={'/'}>Products</Link></li>
                  <li><Link to={'/'}>Login * Register</Link></li>
                  <li><Link to={'/'}><img src={Close} alt='' width="30"/> </Link></li>

              </ul>
              <div className="cart-icon">
                  <span>0</span>
                  <Link to={'/'}>
                      <img src ={Cart} alt='' width='30'/>
                  </Link>
              </div>
          </div>
      </header>
    );
};

export default Header;