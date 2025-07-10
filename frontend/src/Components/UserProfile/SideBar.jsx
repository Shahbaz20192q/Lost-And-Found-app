import React from "react";

const SideBar = ({ loggedIn }) => {
  return (
    <div className="md:w-1/3 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">About</h2>
        <p className="text-gray-600 mb-4">{loggedIn?.bio}</p>
        <div className="space-y-3">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            <span className="text-gray-600">{loggedIn?.email}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[var(--brunswick-green)]">Items Found</span>
            <div className="flex items-center">
              <span className="font-semibold text-[var(--sea-green)]">
                {loggedIn?.foundApplications?.length}
              </span>
              <svg
                className="w-4 h-4 text-[var(--mint-2)] ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="w-full bg-[var(--celadon)] rounded-full h-2">
            <div className="bg-[var(--sea-green)] w-[60%] h-2 rounded-full"></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[var(--brunswick-green)]">Items Lost</span>
            <div className="flex items-center">
              <span className="font-semibold text-[var(--sea-green)]">
                {loggedIn?.lostApplications?.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-[var(--celadon)] rounded-full h-2">
            <div className="bg-[var(--mint-2)] w-[23%] h-2 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Contact Options
        </h2>
        <div className="space-y-3">
          <a
            href={`mailto:${loggedIn?.email}`}
            className="w-full bg-white border border-[var(--celadon-2)] hover:bg-[var(--nyanza)] text-[var(--brunswick-green)] py-2 rounded-lg transition flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2 text-[var(--dartmouth-green)]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
