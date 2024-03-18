import "./Header.css"
import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../resources/logo2.png'
import SearchBar from '../SearchBar/SearchBar'
import { PiShoppingCart } from "react-icons/pi";
import { MdFavoriteBorder } from "react-icons/md";


const Header = () => {
  return (
    <header>
      <nav className="firstNav">
        <b>Help</b> |
        <Link to="auth/register">Register</Link> |
        <Link to="auth/login">Sign In</Link>
      </nav>
      <nav className="secNav">
        <div className="nav-left">
          <img src={logo} alt="logo"/>
          <h2>SNEAKER B Inc.</h2>
        </div>
        <div className="nav-center">
          <p>New Arrived</p>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>Accessories</p>
        </div>
        <div className="nav-right">
          <SearchBar />
          <button className="fav-btn">
            <MdFavoriteBorder />
          </button>
          <button className="cart-btn">
            <PiShoppingCart />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header;