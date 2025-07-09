import React, { useContext, useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { baseUrl, btnLoader, setBtnLoader, setToken } =
    useContext(ContextStore);
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(`${baseUrl}/images/default.png`);
  const [selectedFile, setSelectedFile] = useState(null);

  function changeImage(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setImgUrl(imageUrl);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoader(true); // Set the loader state to true
    const formData = new FormData(e.target);
    try {
      const res = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        sessionStorage.setItem("token", data.token);
        setToken(data.token);
        e.target.reset(); // Reset the form
        setImgUrl(`${baseUrl}/images/default.png`); // Reset the image to default
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed, please try again.");
      }
    } catch (error) {
      toast.error("Somethin is wrong please try again");
    } finally {
      setBtnLoader(false); // Reset the loader state
    }
  };

  return (
    <form
      className="mt-20 max-w-2xl m-auto rounded-lg shadow-lg bg-white overflow-hidden mb-10 pb-10 "
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <div className="form-header w-full text-center p-5 bg-gradient-to-tl from-[var(--sea-green)] to-[var(--dartmouth-green)] ">
        <h1 className="text-3xl font-bold  text-white">Create an Account</h1>
        <p className="text-[var(--celadon)] mt-2 ">
          Join our community to report lost or found items
        </p>
      </div>

      <div className="profile-img text-center mt-10 ">
        <p className="text-sm">Profile Picture</p>
        <input
          type="file"
          hidden
          id="profile-pic"
          onChange={changeImage}
          accept="image/*" // Only accept image files
          name="profilePicture"
        />
        <label
          htmlFor="profile-pic"
          className="relative cursor-pointer w-36 h-36 inline-block bg-[var(--mint-2)] rounded-full overflow-hidden "
        >
          <img
            className="w-full h-full m-auto object-cover"
            src={imgUrl}
            alt="Profile Image"
          />

          <div className="flex justify-center items-center w-full h-full absolute top-0 right-0 opacity-0 hover:opacity-70 transition-all duration-200 bg-black/50 z-50">
            <IoCameraOutline className="w-20 h-20 text-white" />
          </div>
        </label>
      </div>

      <div className="px-5">
        <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col ">
          <FormInput
            type="text"
            placeholder="Full Name"
            label="Full Name"
            id="full-name"
            name="fullName"
            required={true}
          />

          <FormInput
            type="text"
            placeholder="User Nname"
            label="User Name"
            id="user-name"
            name="username"
            required={true}
          />
        </div>
        <FormInput
          type="email"
          placeholder="Enter Your Email"
          label="Email Address"
          id="email-address"
          name="email"
          required={true}
        />

        <FormInput
          type="text"
          placeholder="Enter Your Bio"
          label="Bio"
          id="bio"
          name="bio"
          isTextarea={true}
        />
        <FormInput
          type="password"
          placeholder="Enter Your Password"
          label="Password"
          id="passwor"
          name="password"
          required={true}
        />
        <button className="bg-[var(--dartmouth-green)] w-full mt-10 p-2 text-white rounded-sm ">
          {btnLoader ? (
            <span className="btn-loader"></span>
          ) : (
            <span className="text-lg font-semibold">Create Account</span>
          )}
        </button>
      </div>
      <div class="mt-6 text-center">
        <p class="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            class="text-[var(--mint-2)] hover:text-sea-green font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
