
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "./AdminDash.css";
 
const AdminDash = () => {
    const [classIcon, setIcon] = useState(false);
    const [closeNav, setCloseNav] = useState(false);

    function handleClick() {
      setIcon((classIcon) => !classIcon);
      setCloseNav((closeNav) => !closeNav);
    }

    let toggleIcon = classIcon ? "fa-times" : "fa-bars";
    let toggleNav = closeNav ? "nav-menu active" : "nav-menu";
    
    return (
        <div className="admindash-container">
            <div className="admindash-header">
                <h1>Welcome to the Admin Dashboard!</h1>
                <h2>Here you can manage your products, categories, customers, and orders</h2>
            </div>
            <div className="admindash-menu-icons">
  <i className={`fas ${toggleIcon} admindash-menu-icon`} onClickCapture={handleClick}></i>
</div>

            <div className="admindash-links">
                <Link to="/admindash/products" className="admindash-link">Manage Products</Link>
                <Link to="/admindash/orders" className="admindash-link">Manage Orders</Link>
                <Link to="/admindash/categories" className="admindash-link">Manage Categories</Link>
                <Link to="/admindash/users" className="admindash-link">Manage Users</Link>
                <Link to="/admindash/" className="admindash-link">Home</Link>
            </div>
        </div>
    );
};
 
 

export default AdminDash;
