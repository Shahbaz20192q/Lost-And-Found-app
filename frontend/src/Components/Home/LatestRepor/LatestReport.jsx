import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { ContextStore } from "../../../Context/ContextStore";

const LatestReport = () => {
  const { items, baseUrl } = useContext(ContextStore);
  return (
    <div className="px-4 sm:px-6 md:px-10 mt-8 md:mt-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Latest Reports
      </h1>

      <div className="w-full flex items-center mt-6 md:mt-10 justify-between">
        <h2 className="text-xl md:text-2xl text-[var(--brunswick-green)] font-semibold">
          Latest
        </h2>
        <Link
          className="text-[var(--dartmouth-green)] hover:underline"
          to="/browse"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.slice(0, 6).map((item) => (
          <ItemCard item={item} key={item._id} baseUrl={baseUrl} />
        ))}
      </div>
    </div>
  );
};

export default LatestReport;
