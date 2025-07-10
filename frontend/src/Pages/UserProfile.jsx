import React, { useContext, useEffect, useState } from "react";
import { ContextStore } from "../Context/ContextStore";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/UserProfile/Header";
import SideBar from "../Components/UserProfile/SideBar";
import InfoHeader from "../Components/UserProfile/InfoHeader";
import ItemCart from "../Components/UserProfile/ItemCart";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { token, loggedIn, baseUrl, fetchLoggdIn } = useContext(ContextStore);
  const { pathname } = useLocation();
  const [filterType, setFilterType] = useState(loggedIn?.foundApplications);
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname == "/profile") {
      setFilterType(loggedIn?.foundApplications);
    } else {
      setFilterType(loggedIn?.lostApplications);
    }
  }, [pathname, loggedIn]);

  if (!token) {
    navigate("/login");
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header baseUrl={baseUrl} loggedIn={loggedIn} />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="md:flex gap-6">
          {/* side bar compnent */}
          <SideBar loggedIn={loggedIn} />

          <div className="md:w-2/3">
            <InfoHeader loggedIn={loggedIn} />
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px" aria-label="Tabs">
                  <button
                    className={`tab-btn py-4 px-6 hover:text-[var(--brunswick-green)] cursor-pointer ${
                      pathname == "/profile"
                        ? "text-[var(--dartmouth-green)] border-[var(--sea-green)] border-b-2 "
                        : "text-gray-500"
                    } font-medium text-sm`}
                    id="tab-found"
                    onClick={() => navigate("/profile")}
                  >
                    Found Items ({loggedIn?.foundApplications?.length})
                  </button>
                  <button
                    className={`tab-btn py-4 px-6 hover:text-[var(--brunswick-green)] cursor-pointer ${
                      pathname == "/profile/lost"
                        ? "text-[var(--dartmouth-green)] border-[var(--sea-green)] border-b-2 "
                        : "text-gray-500"
                    } font-medium text-sm`}
                    id="tab-lost"
                    onClick={() => navigate("/profile/lost")}
                  >
                    Lost Items ({loggedIn?.lostApplications?.length})
                  </button>
                </nav>
              </div>

              <div className="p-6 tab-content" id="content-found">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto max-h-[370px] ">
                  {filterType?.map((item) => (
                    <ItemCart
                      key={item._id}
                      item={item}
                      baseUrl={baseUrl}
                      navigate={navigate}
                      fetchLoggdIn={fetchLoggdIn}
                      token={token}
                      toast={toast}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-6 right-6">
        <button className="bg-[var(--sea-green)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--dartmouth-green)] transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
