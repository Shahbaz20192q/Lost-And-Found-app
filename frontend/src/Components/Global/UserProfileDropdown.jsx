import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore";

const UserProfileDropdown = () => {
  const { token, loggedIn, baseUrl, setToken } = useContext(ContextStore);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    setToken("");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        id="profile-toggle"
        className="flex items-center focus:outline-none cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-mint-2 border-2 border-white overflow-hidden">
          <img
            src={`${baseUrl}/images/profile/${loggedIn.profilePicture}`}
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          id="profile-dropdown"
          className="absolute right-0 top-9 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">
              {loggedIn.fullName}
            </p>
            <p className="text-xs text-gray-500 truncate">{loggedIn.email}</p>
          </div>
          <Link
            onClick={() => setIsOpen(!isOpen)}
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              My Profile
            </div>
          </Link>
          <div className="border-t border-gray-100 mt-1"></div>
          <Link
            onClick={logoutHandler}
            className="block px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Sign Out
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
