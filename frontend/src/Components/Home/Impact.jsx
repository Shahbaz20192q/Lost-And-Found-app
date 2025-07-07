import React from "react";

const Impact = () => {
  return (
    <div className="px-10 bg-[var(--celadon)] py-10 mt-20">
      <h2 className="text-[var(--dark-green)] text-center text-4xl font-extrabold">
        Our Impact
      </h2>
      <div className="flex items-center justify-center mt-10 gap-10 flex-wrap text-center">
        <div className="bg-white px-10 py-7">
          <h3 className="text-5xl font-extrabold text-[var(--dartmouth-green)] ">
            1,234
          </h3>
          <p className="font-bold text-gray-600">Items Reported</p>
        </div>
        <div className="bg-white px-10 py-7">
          <h3 className="text-5xl font-extrabold text-[var(--dartmouth-green)] ">
            789
          </h3>
          <p className="font-bold text-gray-600">Items Returned</p>
        </div>
        <div className="bg-white px-10 py-7">
          <h3 className="text-5xl font-extrabold text-[var(--dartmouth-green)] ">
            95%
          </h3>
          <p className="font-bold text-gray-600">Happy Users</p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
