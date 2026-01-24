import React from "react";
import Navbar from "./components/Navbar.jsx";
import Path from "./routes/Path.jsx";
import { BrowserRouter } from "react-router-dom";
import Footer from "./pages/pages/Footer.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Path />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
