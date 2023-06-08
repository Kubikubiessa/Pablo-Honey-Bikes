import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { changeClassName } from "./helper/changeClassName";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Navbar from "./components/navbar/Navbar";
// import Hero from "./components/hero/Hero";
// import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

function App() {
  const [popUp, setPopUp] = useState(false);
  return (
    <changeClassName.Provider value={{ popUp, setPopUp }}>
      <div className="App">
        <Router>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </Router>
      </div>
    </changeClassName.Provider>
  );
}

export default App;
