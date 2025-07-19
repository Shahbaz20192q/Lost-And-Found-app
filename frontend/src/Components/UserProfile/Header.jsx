import React from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedIn, baseUrl }) => {
  return (
    <div className="profile-header w-full h-20 relative">
      <div className="container mx-auto px-4">
        <div className=" bg-gradient-to-r from-[var(--dartmouth-green)] to-[var(--sea-green)] flex justify-between items-center absolute bottom-0 left-0 w-full transform translate-y-1/2 p-4 md:px-8">
          <div className="flex items-end">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
              <img
                src={`${baseUrl}/images/profile/${loggedIn?.profilePicture}`}
                alt={loggedIn?.fullName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 mb-8 text-white ">
              <h1 className="text-xl md:text-2xl font-bold drop-shadow-md">
                {loggedIn?.fullName}
              </h1>
              <p className="text-sm md:text-base">
                @{loggedIn?.username}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              to="/profile/edit"
              className="bg-white text-[var(--dartmouth-green)] px-4 py-2 rounded-lg font-medium shadow-md hover:bg-[var(--celadon)] transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
