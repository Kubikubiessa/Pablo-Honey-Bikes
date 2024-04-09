import{ React, useState } from "react";
//import Cart from "../../components/cart/Cart";
// import ".MtbWheels.css";


//import "./About.css";
//import About from "../about/About";

const MtbWheels = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
     <p>nice mtb wheels</p> 
    </>
  );
};

export default MtbWheels;