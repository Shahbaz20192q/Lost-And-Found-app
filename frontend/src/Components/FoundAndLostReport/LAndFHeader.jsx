import React from "react";

const LAndFHeader = ({ location }) => {
  const { pathname } = location;

  return (
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-[var(--sea-green) ]rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold text-[var(--brunswick-green)] mb-2">
        Report {pathname == "/lost-report" ? "Lost" : "Found"} Item
      </h1>
      {pathname == "/lost-report" ? (
        <p class="text-lg text-[var(--dartmouth-green)]">
          Help us help you find your lost item by providing detailed information
        </p>
      ) : (
        <p class="text-lg text-[var(--dartmouth-green)]">
          Help us to return you find lost item by providing detailed information
        </p>
      )}
    </div>
  );
};

export default LAndFHeader;
