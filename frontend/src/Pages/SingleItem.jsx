import React, { useContext, useEffect, useState } from "react";
import { ContextStore } from "../Context/ContextStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SingleItem = () => {
  const { baseUrl } = useContext(ContextStore);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchItem = async () => {
    try {
      const res = await fetch(`${baseUrl}/lostApplications/${id}`);
      const data = await res.json();
      if (data.success) {
        setItem(data.data);
        setCurrentImageIndex(0); // Reset index when new item is fetched
      } else {
        navigate("/browse");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethis wrong please try again.");
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="mb-4">
            {item?.type == "lost" ? (
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-800 inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                LOST ITEM
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-800 inline-flex items-center">
                FOUND ITEM
              </span>
            )}
          </div>

          <div className="relative mb-4 h-[400px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <img
              id="main-image"
              src={`${baseUrl}/images/${
                item?.type === "lost" ? "lost" : "found"
              }/${item?.images?.[currentImageIndex]}`}
              alt={item.title}
              className="main-image object-contain max-h-full max-w-full"
            />

            <button
              id="prev-image"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev > 0 ? prev - 1 : item.images.length - 1
                )
              }
              className="absolute left-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 focus:outline-none transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              id="next-image"
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev < item.images.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 focus:outline-none transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {item.images?.map((i, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`gallery-thumbnail min-w-[80px] h-20 rounded-md overflow-hidden border-2 ${
                  index === currentImageIndex
                    ? "border-[var(--brunswick-green)]"
                    : "border-transparent"
                } cursor-pointer`}
              >
                <img
                  src={`${baseUrl}/images/${
                    item?.type === "lost" ? "lost" : "found"
                  }/${i}`}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-[var(--brunswick-green)]">
              {item?.title}
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span>
                {new Date(
                  item?.type == "lost" ? item?.dateLost : item?.dateFound
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span>
                {item?.location?.state}, {item?.location?.city},
                {item?.location?.address}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              <span>Category: {item?.category}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--brunswick-green)] mb-2">
              Description
            </h2>
            <p className="text-gray-600">{item?.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[var(--brunswick-green)] mb-2">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {item?.tags?.map((t, index) => (
                <span
                  className="px-2 py-1 bg-[var(--celadon)] text-[var(--dartmouth-green)] text-xs rounded-full"
                  key={index}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-lg font-semibold text-[var(--brunswick-green)] mb-4">
              Contact Information
            </h2>
            <div className="flex gap-2">
              <a
                href={`tel:${item?.contact?.phone}`}
                className="flex-1 bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Call
              </a>
              <a
                href={`mailto:${item?.contact?.email}`}
                className="flex-1 bg-[var(--mint-2)] hover:bg-[var(--sea-green)] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
