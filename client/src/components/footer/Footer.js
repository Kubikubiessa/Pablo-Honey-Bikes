import React from "react";
import "./Footer.css";
//import About from "../about/About";

const Footer = () => {
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
            <a href="/Contact">Contact</a>
          </li>
          <li>
            <a href="/Contact">Services</a>
          </li>
          <li>
            <a href="/Contact">Terms</a>
          </li>
        </ul>
        <p className="copyright">Pablo Honey Bikes @ 2023</p>
      </footer>
    </>
  );
};

export default Footer;