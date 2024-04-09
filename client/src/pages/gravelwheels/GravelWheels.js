import{ React, useState } from "react";
//import Cart from "../../components/cart/Cart";

//import "./About.css";
//import About from "../about/About";

const GravelWheels = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
         <p>nice gravel wheels</p>
    </>
  );
};

export default GravelWheels;