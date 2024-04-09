import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../navbar/Navbar.css";
//This is a dropdown menu component that takes the props label and items. Items is an array of objects with the properties path and label that is used to create the links in the dropdown menu. the items will be hardcoded in the file where the dropdown menu is used.
const DropdownMenu = ({ label, items }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const hoveringRef = useRef(false);//using useRef: To handle the dropdown behavior effectively without relying on a global variable, use React's useRef hook. useRef provides a way to persist values across renders without triggering re-renders itself
 // Close dropdown when mouse leaves both the link and the dropdown menu
  const closeDropdown = () => {
    setTimeout(() => {
      if (!hoveringRef.current) {
        setShowDropdown(false);
      }
    }, 2000);
  };

  return (
    <li
      className="dropdown-item"
      onMouseEnter={() => {
        setShowDropdown(true);
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
        closeDropdown();
      }}
    >
      <Link to="#" className="nav-links">{label}</Link>
      {showDropdown && (
        <div
          className="dropdown-menu"
          onMouseEnter={() => { hoveringRef.current = true; }}
          onMouseLeave={() => {
            hoveringRef.current = false;
            closeDropdown();
          }}
        >
          {items.map((item, index) => (
            <Link key={index} to={item.path} className="dropdown-item">{item.label}</Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default DropdownMenu;


