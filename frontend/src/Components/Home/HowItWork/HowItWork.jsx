import React from "react";

const HowItWork = () => {
  return (
    <div className="px-10 my-20">
      <h2 className="text-3xl font-bold text-center text-[var(--brunswick-green)] ">
        How It Works
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-8 mt-10">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-64 max-sm:w-full ">
          <div className="rounded-full bg-[var(--mint)] p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[var(--brunswick-green)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </div>
          <h3 className=" text-[var(--brunswick-green)] text-xl font-bold mb-4 ">
            1. Report
          </h3>
          <p>
            Report your lost item or something you've found with details and
            photos.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-64 max-sm:w-full">
          <div className="rounded-full bg-[var(--mint)] p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[var(--brunswick-green)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
          </div>
          <h3 className=" text-[var(--brunswick-green)] text-xl font-bold mb-4 ">
            2. Match
          </h3>
          <p>
            Our system matches lost and found items based on descriptions and
            locations.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-64 max-sm:w-full">
          <div className="rounded-full bg-[var(--mint)] p-4 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[var(--brunswick-green)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className=" text-[var(--brunswick-green)] text-xl font-bold mb-4 ">
            3. Reconnect
          </h3>
          <p>
            Get notified when there's a match and arrange to retrieve your
            belongings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
