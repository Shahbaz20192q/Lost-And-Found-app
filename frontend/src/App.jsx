import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Global/Header";
import Footer from "./Components/Global/Footer/Footer";
import Register from "./Pages/Register";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
