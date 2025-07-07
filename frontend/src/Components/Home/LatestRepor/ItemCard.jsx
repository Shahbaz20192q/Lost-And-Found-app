import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ cat }) => {
  return (
    <div className="w-[300px] shadow-lg rounded-lg bg-white">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFj_HODMU6HhtDEUk_8MTxK5_ys9gIvLs5w&s"
        alt="Alt text"
        className="max-w-full w-full bagkground-cover rounded-t-lg h-64 object-cover "
      />
      <div className="p-4">
        {cat == "lost" ? (
          <p className="p-1 text-sm my-2 bg-red-300 text-red-900 w-fit rounded-xl">
            Lost
          </p>
        ) : (
          <p className="p-1 text-sm my-2 bg-[var(--mint-2)] text-[var(--brunswick-green)] w-fit rounded-xl">
            found
          </p>
        )}
        <h3 className="font-semibold my-2">iphone 16 pro max</h3>
        <p>Lost at Central Park on June 15</p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-gray-400">2 hours ago</p>
          <Link to="#" className="text-[var(--dartmouth-green)]">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
