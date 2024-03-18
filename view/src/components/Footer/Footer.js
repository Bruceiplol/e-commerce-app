import "./Footer.css";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="bottom-nav">
        <ul>
          <li className="bottom-nav-title">HELP</li>
          <li>Order</li>
          <li>Shipping and Delivery</li>
          <li>Returns</li>
        </ul>
        <ul>
          <li className="bottom-nav-title">COMPANY</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="bottom-subscribe">
        <div className="newsletter">
          <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
          <p>Be the first to get exclusive offers and the latest news</p>
          <input className="subs-input" type="email" placeholder="Enter Your Email" />
          <button className="subs-btn">Subscribe</button>
        </div>
        <div className="social-media">
          <FaFacebook className="sm-icon" />
          <FaInstagramSquare className="sm-icon" />
          <FaSquareXTwitter className="sm-icon" />
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-left">
          <FaGithub />
          <p className="github-link">github.com/Bruceiplol/e-commerce-app</p>
        </div>
        <p>&copy; 2024 SNEAKER B Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
