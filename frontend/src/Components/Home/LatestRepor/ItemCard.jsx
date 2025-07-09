import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ cat }) => {
  return (
    <div class="item-card bg-white rounded-lg shadow-md overflow-hidden">
      <div class="relative">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+aVBob25lPC90ZXh0Pjwvc3ZnPg=="
          alt="iPhone 13 Pro - Black"
          class="w-full h-48 object-cover"
        />
        <div class="absolute top-3 left-3">
          {cat == "lost" ? (
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
              🔍 LOST
            </span>
          ) : (
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              ✅ FOUND
            </span>
          )}
        </div>
      </div>

      <div class="p-6">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-[var(--brunswick-green)]">
            iPhone 13 Pro - Black
          </h3>
          <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Electronics
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
          Lost my black iPhone 13 Pro with a clear case. Has a small crack on
          the bottom right corner. Contains important work contacts and family
          photos.
        </p>

        <div class="flex items-center text-sm text-gray-500 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>Los Angeles, California</span>
        </div>

        <div class="flex items-center text-sm text-gray-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>Lost on Dec 15, 2023</span>
        </div>

        <div class="flex flex-wrap gap-1 mb-4">
          <span class="px-2 py-1 bg-[var(--celadon)] text-[var(--dartmouth-green)] text-xs rounded-full">
            iphone
          </span>

          <span class="px-2 py-1 bg-[var(--celadon)] text-[var(--dartmouth-green)] text-xs rounded-full">
            black
          </span>

          <span class="px-2 py-1 bg-[var(--celadon)] text-[var(--dartmouth-green)] text-xs rounded-full">
            cracked
          </span>

          <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +1 more
          </span>
        </div>

        <div class="flex gap-2">
          <button
            onclick="contactViaPhone('(555) 123-4567')"
            class="flex-1 bg-[var(--sea-green)] hover:bg-[var(--dartmouth-green)] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            Call
          </button>
          <button
            onclick="contactViaEmail('john.doe@email.com', 'iPhone 13 Pro - Black')"
            class="flex-1 bg-[var(--mint-2)] hover:bg-[var(--sea-green)] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
