import React, { useContext, useState } from "react";
import FormInput from "../Components/Register/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../Context/ContextStore";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { baseUrl } = useContext(ContextStore);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    try {
      const endPoin = `${baseUrl}/user/${
        isOtpSent ? "changePasswordOtp" : "generateOtp"
      }`;

      const res = await fetch(endPoin, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setIsOtpSent(true);
        isOtpSent && navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somthing is wrong try again");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full m-auto my-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--dartmouth-green)] to-[var(--sea-green)] px-6 py-8 text-white text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-[var(--mint)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </div>
          <h1 id="form-title" className="text-3xl font-bold mb-2">
            Forgot Password?
          </h1>
          <p id="form-subtitle" className="text-[var(--celadon)]">
            Enter your email to get started
          </p>
        </div>

        <div className="p-6">
          <div id="step1" className="step-transition">
            <div className="mb-6 p-4 bg-[var(--celadon)] rounded-lg">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--sea-green)] mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <div>
                  <p className="text-sm text-[var(--dartmouth-green)]">
                    We'll send a 6-digit verification code to your email address
                    to confirm your identity.
                  </p>
                </div>
              </div>
            </div>

            <form id="email-form" className="space-y-6" onSubmit={submitHandler}>
              <FormInput
                label="Email"
                placeholder="Enter Your Email"
                name="email"
                type="email"
                id="email"
                required={true}
              />

              {isOtpSent && (
                <>
                  <FormInput
                    label="OTP"
                    placeholder="Enter Your OTP"
                    name="otp"
                    type="text"
                    id="otp"
                    required={true}
                  />
                  <FormInput
                    label="New Password"
                    placeholder="Enter Your New Password"
                    name="newPassword"
                    type="password"
                    id="new-password"
                    required={true}
                  />
                </>
              )}

              <button
                type="submit"
                className="w-full bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
                {isOtpSent ? (
                  <span>Change Password</span>
                ) : (
                  <span>Send Verification Code</span>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-[var(--mint-2)] hover:text-[var(--sea-green)] font-medium transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
