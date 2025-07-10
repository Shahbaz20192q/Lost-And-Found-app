import React from "react";

const InfoHeader = ({ loggedIn }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="stat-card bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-[var(--sea-green)]">
          {loggedIn?.lostApplications?.length +
            loggedIn?.foundApplications?.length}
        </p>
        <p className="text-[var(--brunswick-green)] text-sm">Total Items</p>
      </div>
      <div className="stat-card bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-[var(--dartmouth-green)]">83%</p>
        <p className="text-[var(--brunswick-green)] text-sm">Return Rate</p>
      </div>
      <div className="stat-card bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-2xl font-bold text-[var(--mint-2)]">4.8</p>
        <p className="text-[var(--brunswick-green)] text-sm">Rating</p>
      </div>
    </div>
  );
};

export default InfoHeader;
