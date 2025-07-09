import React from "react";

const LAndFHeader = ({ location }) => {
  const { pathname } = location;

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--sea-green) ]rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-[var(--brunswick-green)] mb-2">
        Report {pathname == "/lost-report" ? "Lost" : "Found"} Item
      </h1>
      {pathname == "/lost-report" ? (
        <p className="text-lg text-[var(--dartmouth-green)]">
          Help us help you find your lost item by providing detailed information
        </p>
      ) : (
        <p className="text-lg text-[var(--dartmouth-green)]">
          Help us to return you find lost item by providing detailed information
        </p>
      )}
    </div>
  );
};

export default LAndFHeader;
