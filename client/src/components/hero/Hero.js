import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import image1 from "./heroImages/DSC_0009.jpg"
import image2 from "./heroImages/DSC_0008.jpg"
 

// Register the custom ease
 

const Images = [
   
   { image:  "images/DSC_0019.jpg", className: "fade" },
   { image:  "images/DSC_0073.jpg",className: "" },
  { image:  "images/DSC_0009.jpg", },
  { image:  "images/DSC_0008.jpg", },
  { image:  "images/DSC_0074.jpg" },
  { image:  "images/DSC_0088.jpg" },
  { image:  "images/DSC_0144.jpg" },
  { image:  "images/IMG_5659.JPG" },
  { image:  "images/MG_6443.jpeg" },
   
  // { image:  "../../../public/images/DSC_0019.jpg"},
  { image: image1},
  { image: image2 },
 
   { image: "url(/images/DSC_0088.jpg)" },
  // { image: "url(images/DSC_0144.jpg)" },
];

 

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % Images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="hero">
      <motion.div
         className={`hero-content ${Images.className}`}
        style={{ backgroundImage: `url(${Images[imageIndex].image})` }}
        initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1,  }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        // ease: [0.42, 0, 0.58, 1]
        animation: "fade-in",
        ease: [0.5, 1.3, 1, 1.0]
      }}
        // animate={{ opacity: 1 }}
        // //  animate={{ y: ["-5px", "5px", "-5px"] }}
        // transition={{ duration: 4, ease: "easeIn", repeat: Infinity }}

        // transition={{  duration: 3, repeat: Infinity, opacity: { duration: 1, delay: 1.5, ease: "circIn" } }}
      >
        {/* <h1></h1> */}
        {/* <h2> </h2> */}
        {/* <button className="cta-button">Get Started</button> */}
      </motion.div>
    </section>
  );
};

export default Hero;
