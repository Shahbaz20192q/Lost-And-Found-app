import React, { useContext, useEffect, useState } from "react";
import { ContextStore } from "../../Context/ContextStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Enable the plugin
dayjs.extend(relativeTime);

const NotificationsDropdown = () => {
  const { baseUrl, token } = useContext(ContextStore);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const getNotifications = async () => {
    try {
      const res = await fetch(`${baseUrl}/notifications`, {
        method: "GET",
        headers: {
          token: token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [token]);

  const notificationHandler = async (notification) => {
    setIsOpen(!isOpen);
    setNotifications(
      notifications?.filter((n) => n?._id !== notification?._id)
    );
    try {
      const res = await fetch(
        `${baseUrl}/notifications/read/${notification._id}`
      );
      const data = await res.json();
      if (data.success) {
        navigate(
          `/browse/${
            notification.type == "lost"
              ? notification.lostApplication._id
              : notification.foundApplication._id
          }`
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative mr-4">
      <button
        id="notification-toggle"
        className="text-white hover:text-[var(--mint)] focus:outline-none transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          ></path>
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notifications?.filter((n) => n.read == false)?.length}
        </span>
      </button>

      {isOpen && (
        <div
          id="notification-dropdown"
          className="absolute -right-28 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[var(--brunswick-green)]">
                Notifications
              </h3>
              {/* <a
                href="#"
                className="text-xs text-[var(--sea-green)] hover:text-[var(--dartmouth-green)]"
              >
                Mark all as read
              </a> */}
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications?.map((notification) => (
              <div
                key={notification._id}
                onClick={() => notificationHandler(notification)}
                className={`block px-4 py-3 hover:bg-gray-50 border-l-4 cursor-pointer ${
                  notification.read ? "" : " border-[var(--sea-green)]"
                } `}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-[var(--celadon)] flex items-center justify-center text-[var(--sea-green)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    {notification.type == "found" ? (
                      <p className="text-sm font-medium text-gray-800">
                        Someone found a similar item to your lost{" "}
                        {notification?.foundApplication?.title}!
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-800">
                        Someone lost a similar item to your found{" "}
                        {notification?.lostApplication?.title}!
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {dayjs(notification?.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
