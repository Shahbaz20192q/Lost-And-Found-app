import React, { useContext, useEffect } from "react";
import FormInput from "../Components/Register/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../Context/ContextStore";
import { toast } from "react-toastify";

const Login = () => {
  const { baseUrl, token, btnLoader, setBtnLoader, setToken } =
    useContext(ContextStore);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
      toast.info("You are already logged in");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoader(true); // Set the loader state to true
    const formData = new FormData(e.target);
    const useData = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(useData),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("token", data.token);
        setToken(data.token);
        e.target.reset(); // Reset the form
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message || "Login failed, please try again.");
      }
    } catch (error) {
      toast.error("Somethin is wrong please try again");
    } finally {
      setBtnLoader(false); // Reset the loader state
    }
  };

  return (
    <div className="max-w-md w-full m-auto my-10 ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
        <div className="bg-gradient-to-r from-[var(--dartmouth-green)] to-[var(--sea-green)] px-6 py-8 text-white text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-mint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-celadon">Sign in to your FindIt account</p>
        </div>

        <div className="p-6">
          <form id="login-form" className="space-y-6" onSubmit={submitHandler}>
            <FormInput
              label="Email or Username"
              placeholder="Email or Username"
              name="emailOrusername"
              type="text"
              id="email-username"
              required={true}
            />
            <FormInput
              label="Password"
              placeholder="Enter Your Password"
              name="password"
              type="password"
              id="password"
              required={true}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-mint-2 focus:ring-mint-2 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-[var(--mint-2)] hover:text-[var(--sea-green)] font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center"
              >
                {btnLoader ? (
                  <span className="btn-loader"></span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[var(--mint-2)] hover:text-sea-green font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
