import{ React, useState } from "react";
import Cart from "../../components/cart/Cart";

//import "./About.css";
//import About from "../about/About";

const Checkout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
       <Cart/>
    </>
  );
};

export default Checkout;