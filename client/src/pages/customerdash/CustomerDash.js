import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./CustomerDash.css";

//import "./About.css";
//import About from "../about/About";

const CustomerDash = () => {
  const [classIcon, setIcon] = useState(false);
  const [closeNav, setCloseNav] = useState(false);

  function handleClick() {
    setIcon((classIcon) => !classIcon);
    setCloseNav((closeNav) => !closeNav);
  }

  let toggleIcon = classIcon ? "fa-times" : "fa-bars";
  let toggleNav = closeNav ? "nav-menu active" : "nav-menu";
  return (
    <div className="customerdash-container">
            <div className="customer-header">
                <h1>Welcome to the Customer Dashboard!</h1>
                <h2>Here you can manage your orders and your shopping cart</h2>
            </div>
            <div className="customerdash-menu-icons">
  <i className={`fas ${toggleIcon} customerdash-menu-icon`} onClickCapture={handleClick}></i>
</div>

            <div className="customerdash-links">
                <Link to="/shop" className="customerdash-link">Shop Products</Link>
                <Link to="customerdash/orders" className="customerdash-link">My Orders</Link>
            
                <Link to="/customerdash/profile" className="customerdash-link">My Profile</Link>
                <Link to="/customerdash/" className="customerdash-link">Home</Link>
            </div>
        </div>
  );
};

export default CustomerDash;