import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
// Import our new category pages
import Mainboard from "./pages/Mainboard";
import ChargingComponents from "./pages/ChargingComponents";
import Hubs from "./pages/Hubs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div className="flex flex-col">
      <Router>
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mainboard" element={<Mainboard />} />
            <Route path="/charging-components" element={<ChargingComponents />} />
            <Route path="/hubs" element={<Hubs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
        <div className="pb-[170px]"></div>
        <Footer />
        <ScrollToTop />
      </Router>
    </div>
  );
}

export default App;
