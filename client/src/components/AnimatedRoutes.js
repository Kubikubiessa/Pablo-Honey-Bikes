import { Routes, Route, useLocation } from "react-router-dom";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import MtbWheels from "../pages/mtbwheels/MtbWheels";
import RoadWheels from "../pages/roadwheels/RoadWheels";
import GravelWheels from "../pages/gravelwheels/GravelWheels";

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
          <Route path="/shop" element={<Shop />} />
          <Route path="/mtbwheels" element={<MtbWheels />} />
          <Route path="/roadwheels" element={<RoadWheels />} />
          <Route path="/gravelwheels" element={<GravelWheels />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
export default AnimatedRoutes;
