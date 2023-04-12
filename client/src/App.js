//import logo from './assets/1.png';
// import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Footer from "./components/footer/Footer";
import { changeClassName } from "./helper/changeClassName";
import { useState } from "react";

function App() {
  const [popUp, setPopUp] = useState(false);
  return (
    <changeClassName.Provider value={{ popUp, setPopUp }}>
      <div className="App">
        <Router>
          <Navbar />
          <Hero />
          <AnimatedRoutes />
          <Footer />
        </Router>
      </div>
    </changeClassName.Provider>
  );
}

export default App;
