import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";
import Auth from "../../utils/auth";
import DropdownMenu from "../dropdown/DropdownMenu";

const Navbar = () => {
  const [classIcon, setIcon] = useState(false);
  const [closeNav, setCloseNav] = useState(false);
   

  function handleClick() {
    setIcon((classIcon) => !classIcon);
    setCloseNav((closeNav) => !closeNav);
  }
 

  let toggleIcon = classIcon ? "fa-times" : "fa-bars";
  let toggleNav = closeNav ? "nav-menu active" : "nav-menu";
  
  const shopDropdownItems = [
    { label: "Mountain Bike Wheels", path: "/mtbwheels" },
    { label: "Road Bike Wheels", path: "/roadwheels" },
    { label: "Gravel bike Wheels", path: "/gravelwheels" },
    { label: "Rental Bikes", path: "/rentalbikes"}
    // Add more items as needed
  ];

  return (
    <nav className="navbar">
      <div className="fs">
        <img
          src={require("../../assets/2.png")}
          alt="logo of pablo honey bikes"
          className="logo"
        ></img>
        <h2 className="brand-heading"> custom wheels and bikes... </h2>
      </div>

      <div className="menu-icons">
        <i className={`fas ${toggleIcon}`} onClickCapture={handleClick}></i>
      </div>
      <div className="menu-and-login">
      <ul className={toggleNav}>
        {Auth.loggedIn() ? (
          <>
            <li>
              <Link to="/" className="nav-links">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-links">
                ABOUT
              </Link>
            </li>
           
            <DropdownMenu label="SHOP" items={shopDropdownItems} />
            <li>
              <Link to="/checkout" className="nav-links">
                CART
              </Link>
            </li>
            <li>
              <span
                style={{ fontSize: "15px" }}
                className="nav-links btnLogin"
                onClickCapture={Auth.logout}
              >
                LOGOUT
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="nav-links">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-links">
                ABOUT
              </Link>
            </li>
            <DropdownMenu label="SHOP" items={shopDropdownItems} />
            <li>
              <Link to="/customerlogin" className="nav-links btnLogin">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
