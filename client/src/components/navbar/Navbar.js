import { React, useContext, useState } from "react";
import "./Navbar.css";
import { changeClassName } from "../../helper/changeClassName";

//import About from "../../about/About";

import Auth from "../../utils/auth";

const Navbar = () => {
  const [classIcon, setIcon] = useState(false);
  const [closeNav, setCloseNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { setPopUp } = useContext(changeClassName);

  function popUpButton() {
    setPopUp((popUp) => !popUp);
  }

  function handleClick() {
    setIcon((classIcon) => !classIcon);
    setCloseNav((closeNav) => !closeNav);
  }

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  let toogleIcon = classIcon ? "fa-times" : "fa-bars";
  let toogleNav = closeNav ? "nav-menu active" : "nav-menu";

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
        <i className={`fas ${toogleIcon}`} onClickCapture={handleClick}></i>
      </div>

      <ul className={toogleNav}>
        {/* <ul className="nav-menu active"> */}
        {Auth.loggedIn() ? (
          <>
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
              <a href="/" className="nav-links">
                {/* <i className="fa-solid fa-house-user"></i> */}
                HOME
              </a>
            </li>

            <li>
              <a href="/About" className="nav-links">
                {/* <i className=" fa-solid fa-users-gear"></i> */}
                ABOUT
              </a>
            </li>
            <li
              className="dropdown-item"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <a href="/Shop" className="nav-links">
                SHOP
              </a>
              {showDropdown && (
                <div className="dropdown-menu">
                  <a href="/mtbwheels" className="dropdown-item xyz" >
                    Mountain Bike Wheels
                  </a>
                  <a href="/roadwheels" className="dropdown-item">
                    Road Bike Wheels
                  </a>
                  <a href="/gravelwheels" className="dropdown-item">
                    Gravel bike Wheels
                  </a>
                  {/* Add more dropdown options as needed */}
                </div>
              )}
            </li>
            <li>
              <span
                className="nav-links btnLogin "
                onClickCapture={popUpButton}
              >
                Login
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
