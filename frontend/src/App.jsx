import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Global/Header";
import Footer from "./Components/Global/Footer/Footer";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import FoundAndLostReport from "./Pages/FoundAndLostReport";
import Browse from "./Pages/Browse";
import SingleItem from "./Pages/SingleItem";
import UserProfile from "./Pages/UserProfile";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/lost-report" element={<FoundAndLostReport />} />
        <Route path="/found-report" element={<FoundAndLostReport />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:id" element={<SingleItem />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<Register />} />
        <Route path="/profile/lost" element={<UserProfile />} />
        <Route
          path="/item/lost-report/edit/:id"
          element={<FoundAndLostReport />}
        />
        <Route
          path="/item/found-report/edit/:id"
          element={<FoundAndLostReport />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
