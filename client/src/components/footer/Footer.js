import React from "react";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"; 
import "./Footer.css";
import Auth from "../../utils/auth";
//import About from "../about/About";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminClick = (e) => {
 

    e.preventDefault();
    //   check if the user is an admin
    if (Auth.loggedIn() && Auth.isAdmin()) {
      
      navigate('/admindash'); // Redirect to admin dashboard if user is an admin
    } else {
      navigate('/adminlogin'); // Otherwise, go to the admin login page
    }
  };
//   console.log("Logged In:", Auth.loggedIn());
// console.log("Is Admin:", Auth.isAdmin());

  return (
    <>
      <footer className="footer">
        <div className="social">
          <a
            href="https://www.instagram.com/pablohoneybikes/?igshid=YmMyMTA2M2Y%3D"
            target="_blank"
            rel="noreferrer"
          >
          <img
						src={require("../../assets/Instagram_logo_2016.svg.png")}
						alt="Instagram logo"
						className="instagram"
					></img>
          </a>
          
        </div>
        <ul className="list">
          {/* <li>
            <a href="#/" onClick={About}>
              About
            </a>
          </li> */}
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
          <li>
            <Link to="/Contact">Services</Link>
          </li>
          <li>
            <Link to="/Contact">Terms</Link>
          </li>
          <li>
            <Link to="/adminlogin"onClick={handleAdminClick} >Administration</Link>
          </li>
        </ul>
        <p className="copyright">Pablo Honey Bikes @ 2023</p>
      </footer>
    </>
  );
};

export default Footer;