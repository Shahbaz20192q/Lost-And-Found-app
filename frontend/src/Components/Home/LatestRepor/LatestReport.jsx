import React from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const LatestReport = ({ catText, mainText }) => {
  return (
    <div className="px-10 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center ">
        {" "}
        {mainText && " Latest Reports"}
      </h1>
      <div className="w-full flex items-center mt-10 justify-between">
        <h2 className="text-2xl text-[var(--brunswick-green)] font-semibold">
          {catText ? catText : "Lost Items"}
        </h2>
        <Link className="text-[var(--dartmouth-green)]" to="#">
          View All
        </Link>
      </div>
      <div className="mt-10 flex items-center justify-between flex-wrap gap-5">
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
        <ItemCard cat="lost" />
      </div>
    </div>
  );
};

export default LatestReport;
