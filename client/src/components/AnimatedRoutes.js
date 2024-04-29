import { Routes, Route, useLocation } from "react-router-dom";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import CustomerLogin from "../pages/customerlogin/CustomerLogin";
import AdminLogin from "../pages/adminlogin/AdminLogin";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import MtbWheels from "../pages/mtbwheels/MtbWheels";
import RoadWheels from "../pages/roadwheels/RoadWheels";
import GravelWheels from "../pages/gravelwheels/GravelWheels";
import RentalBikes from "../pages/rentalbikes/RentalBikes";
import Checkout from "../pages/checkout/Checkout";
import AdminDash from "../pages/admindash/AdminDash";
import CustomerDash from "../pages/customerdash/CustomerDash";
import { AnimatePresence } from "framer-motion";
 
 

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customerlogin" element={<CustomerLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mtbwheels" element={<MtbWheels />} />
          <Route path="/roadwheels" element={<RoadWheels />} />
          <Route path="/gravelwheels" element={<GravelWheels />} />
          <Route path="/rentalbikes" element={<RentalBikes />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/customerdash" element={<CustomerDash />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
export default AnimatedRoutes;
