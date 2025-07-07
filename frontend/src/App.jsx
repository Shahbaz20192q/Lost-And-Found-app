import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Global/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </>
  );
};

export default App;
