import { React, useContext, useState } from "react";
import "./Navbar.css";
import { changeClassName } from "../../helper/changeClassName";
//import About from "../../about/About";

import Auth from "../../utils/auth";

const Navbar = () => {
  const [classIcon, setIcon] = useState(false);
  const [closeNav, setCloseNav] = useState(false);

  const { setPopUp } = useContext(changeClassName);

  function popUpButton() {
    setPopUp((popUp) => !popUp);
  }

  function handleClick() {
    setIcon((classIcon) => !classIcon);
    setCloseNav((closeNav) => !closeNav);
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
          <h2 className="brand-heading">   bikes... </h2>
          
        
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
                <li>
                  <a href="/Content" className="nav-links">
                    {/* <i className="fa-solid fa-address-book"></i> */}
                    CONTENT
                  </a>
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
