import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ContextStore } from "../../Context/ContextStore";

const UserProfileDropdown = () => {
  const { token, setToken } = useContext(ContextStore);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken("");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative group">
      <CgProfile className="text-3xl cursor-pointer" />
      <div className="absolute -left-4 bg-[var(--mint)] invisible group-hover:visible">
        <button
          className="cursor-pointer border-b px-4 py-1 border-gray-400"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
