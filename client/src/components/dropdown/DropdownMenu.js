import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../navbar/Navbar.css";
//This is a dropdown menu component that takes the props label and items. Items is an array of objects with the properties path and label that is used to create the links in the dropdown menu. the items will be hardcoded in the file where the dropdown menu is used.

const DropdownMenu = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-item" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <span className="nav-links">{label}</span>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <Link key={index} to={item.path} className="dropdown-link">{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
};

 

 export default DropdownMenu;


