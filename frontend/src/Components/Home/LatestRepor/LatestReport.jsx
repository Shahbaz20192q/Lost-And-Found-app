import React from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const LatestReport = ({ catText, mainText }) => {
  return (
    <div className="px-4 sm:px-6 md:px-10 mt-8 md:mt-10">
      {mainText && (
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Latest Reports
        </h1>
      )}
      <div className="w-full flex items-center mt-6 md:mt-10 justify-between">
        <h2 className="text-xl md:text-2xl text-[var(--brunswick-green)] font-semibold">
          {catText ? catText : "Lost Items"}
        </h2>
        <Link className="text-[var(--dartmouth-green)] hover:underline" to="#">
          View All
        </Link>
      </div>
      <div className="mt-6 md:mt-10 flex items-center justify-center sm:justify-start flex-wrap gap-4 md:gap-5">
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
      </div>
    </div>
  );
};

export default LatestReport;
