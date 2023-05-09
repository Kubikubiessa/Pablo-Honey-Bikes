import React from "react";
import "./Content.css";
import { Link } from "react-router-dom";

export default function Content() {
  return (
    <div className="home-categories">
      <p className="home-categories-title">EXPLORE OUR SERVICES</p>

      <div className="home-categories-windowWrap">
        <Link
          to="/shop/bikes"
          className="home-categories-window home-categories-window1"
        >
          <div className="home-categories-innerWindow"></div>
          <p className="home-categories-windowText">BIKES</p>
        </Link>
        <Link
          to="/shop/wheel"
          className="home-categories-window home-categories-window2"
        >
          <div className="home-categories-innerWindow"></div>
          <p className="home-categories-windowText">WHEELS</p>
        </Link>
        <Link
          to="shop/accessories"
          className="home-categories-window home-categories-window3"
        >
          <div className="home-categories-innerWindow"></div>
          <p className="home-categories-windowText">ACCESSORIES</p>
        </Link>
      </div>
    </div>
  );
}


// import React from "react";
 

// import img1 from '../../assets/1.png';
// import img2 from '../../assets/2.png';
// // import img6 from '../../assets/6.jpg';
// // import img8 from '../../assets/8.jpg';
// // import img9 from '../../assets/9.jpg';
// //import "./Content.css";


// const Content = () => {
//   // const history = MemoryRouter();
//   return (
//     <>
//     </>
//   );
// };

// export default Content;