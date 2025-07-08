import React, { useContext, useEffect } from "react";
import RegisterForm from "../Components/Register/RegisterForm";
import { ContextStore } from "../Context/ContextStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { token } = useContext(ContextStore);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
      toast.info("You are already logged in");
    }
  }, []);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
