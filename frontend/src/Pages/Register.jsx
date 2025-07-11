import React, { useContext, useEffect } from "react";
import RegisterForm from "../Components/Register/RegisterForm";
import { ContextStore } from "../Context/ContextStore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { token } = useContext(ContextStore);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("/edit") && token) {
      navigate("/");
      toast.info("You are already logged in");
    }
  }, []);

  return (
    <div>
      <RegisterForm pathname={pathname} />
    </div>
  );
};

export default Register;
