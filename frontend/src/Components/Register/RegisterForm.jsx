import React, { useContext, useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import FormInput from "./FormInput";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore";
import { toast } from "react-toastify";

const RegisterForm = ({ pathname }) => {
  const {
    baseUrl,
    btnLoader,
    setBtnLoader,
    token,
    setToken,
    loggedIn,
    fetchLoggdIn,
  } = useContext(ContextStore);
  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(`${baseUrl}/images/default.png`);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    password: "",
  });

  // Check if we're in edit mode
  const isEditMode = pathname.includes("/edit");

  // Initialize form data
  useEffect(() => {
    if (isEditMode && loggedIn) {
      setFormData({
        fullName: loggedIn.fullName || "",
        username: loggedIn.username || "",
        email: loggedIn.email || "",
        bio: loggedIn.bio || "",
        password: "",
      });
    } else {
      setFormData({
        fullName: "",
        username: "",
        email: "",
        bio: "",
        password: "",
      });
    }
  }, [isEditMode, loggedIn]);

  // Handle profile picture
  useEffect(() => {
    if (loggedIn.profilePicture) {
      setImgUrl(`${baseUrl}/images/profile/${loggedIn?.profilePicture}`);
    } else {
      setImgUrl(`${baseUrl}/images/default.png`);
    }
  }, [loggedIn, token]);

  // Redirect to login if not authenticated and in edit mode
  useEffect(() => {
    if (isEditMode && !token) {
      navigate("/login");
    }
  }, [isEditMode, token, navigate]);

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
    setBtnLoader(true);

    const formDataToSend = new FormData();

    // Add form fields
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("bio", formData.bio);

    // Add password only for registration
    if (!isEditMode) {
      formDataToSend.append("password", formData.password);
    }

    // Add profile picture if selected
    if (selectedFile) {
      formDataToSend.append("profilePicture", selectedFile);
    }

    try {
      const endpoint = isEditMode
        ? `${baseUrl}/user/updateProfile`
        : `${baseUrl}/user/register`;
      const method = isEditMode ? "PUT" : "POST";

      const headers = {};
      if (isEditMode && token) {
        headers.token = token;
      }

      const res = await fetch(endpoint, {
        method: method,
        headers: headers,
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          data.message ||
            `${
              isEditMode ? "Profile updated" : "Account created"
            } successfully!`
        );

        if (isEditMode) {
          // Update the logged-in user data
          fetchLoggdIn();
          // Navigate back or to profile page
          navigate("/profile");
        } else {
          // Registration successful
          sessionStorage.setItem("token", data.token);
          setToken(data.token);
          e.target.reset();
          setImgUrl(`${baseUrl}/images/default.png`);
          setFormData({
            fullName: "",
            username: "",
            email: "",
            bio: "",
            password: "",
          });
          navigate("/");
        }
      } else {
        toast.error(
          data.message ||
            `${
              isEditMode ? "Profile update" : "Registration"
            } failed, please try again.`
        );
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setBtnLoader(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="mt-20 max-w-2xl m-auto rounded-lg shadow-lg bg-white overflow-hidden mb-10 pb-10"
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <div className="form-header w-full text-center p-5 bg-gradient-to-tl from-[var(--sea-green)] to-[var(--dartmouth-green)]">
        <h1 className="text-3xl font-bold text-white">
          {isEditMode ? "Edit Profile" : "Create an Account"}
        </h1>
        <p className="text-[var(--celadon)] mt-2">
          {isEditMode
            ? "Update your profile information"
            : "Join our community to report lost or found items"}
        </p>
      </div>

      <div className="profile-img text-center mt-10">
        <p className="text-sm">Profile Picture</p>
        <input
          type="file"
          hidden
          id="profile-pic"
          onChange={changeImage}
          accept="image/*"
          name="profilePicture"
        />
        <label
          htmlFor="profile-pic"
          className="relative cursor-pointer w-36 h-36 inline-block bg-[var(--mint-2)] rounded-full overflow-hidden"
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
        <div className="flex justify-between items-center gap-5 w-full max-sm:flex-col">
          <FormInput
            type="text"
            placeholder="Full Name"
            label="Full Name"
            id="full-name"
            name="fullName"
            required={true}
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <FormInput
            type="text"
            placeholder="User Name"
            label="User Name"
            id="user-name"
            name="username"
            required={true}
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <FormInput
          type="email"
          placeholder="Enter Your Email"
          label="Email Address"
          id="email-address"
          name="email"
          required={true}
          value={formData.email}
          onChange={handleInputChange}
        />

        <FormInput
          type="text"
          placeholder="Enter Your Bio"
          label="Bio"
          id="bio"
          name="bio"
          isTextarea={true}
          value={formData.bio}
          onChange={handleInputChange}
        />

        {!isEditMode && (
          <FormInput
            type="password"
            placeholder="Enter Your Password"
            label="Password"
            id="password"
            name="password"
            required={true}
            value={formData.password}
            onChange={handleInputChange}
          />
        )}

        <div className="flex gap-4 mt-10">
          <button
            type="submit"
            disabled={btnLoader}
            className="bg-[var(--dartmouth-green)] flex-1 p-2 text-white rounded-sm disabled:opacity-50"
          >
            {btnLoader ? (
              <span className="btn-loader"></span>
            ) : (
              <span className="text-lg font-semibold">
                {isEditMode ? "Update Profile" : "Create Account"}
              </span>
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 px-6 py-2 text-white rounded-sm transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {!isEditMode && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--mint-2)] hover:text-sea-green font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
