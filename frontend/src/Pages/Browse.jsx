import React from "react";
import ItemCard from "../Components/Home/LatestRepor/ItemCard";

const Browse = () => {
  return (
    <div class="max-w-7xl mx-auto my-10">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-[var(--brunswick-green)] mb-2">
          Browse Items
        </h1>
        <p class="text-lg text-[var(--dartmouth-green)]">
          Find lost items or help reunite others with their belongings
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-wrap gap-3 mb-6">
          <button
            class="filter-btn active px-6 py-2 rounded-full border-2 border-[var(--sea-green)] text-[var(--sea-green)] font-semibold transition-all hover:bg-[var(--sea-green)] hover:text-white"
            data-filter="all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            All Items (<span id="all-count">6</span>)
          </button>
          <button
            class="filter-btn px-6 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold transition-all hover:bg-red-500 hover:text-white"
            data-filter="lost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            Lost Items (<span id="lost-count">3</span>)
          </button>
          <button
            class="filter-btn px-6 py-2 rounded-full border-2 border-green-500 text-green-500 font-semibold transition-all hover:bg-green-500 hover:text-white"
            data-filter="found"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Found Items (<span id="found-count">3</span>)
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search-input"
                placeholder="Search items, descriptions, locations..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sea-green)] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <select
              id="category-filter"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sea-green)] focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing &amp; Accessories</option>
              <option value="bags">Bags &amp; Luggage</option>
              <option value="jewelry">Jewelry &amp; Watches</option>
              <option value="documents">Documents &amp; Cards</option>
              <option value="keys">Keys</option>
              <option value="sports">Sports Equipment</option>
              <option value="books">Books &amp; Stationery</option>
              <option value="toys">Toys &amp; Games</option>
              <option value="pets">Pets</option>
              <option value="vehicles">Vehicles</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <select
              id="sort-options"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sea-green)] focus:border-transparent"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="reward-desc">Highest Reward</option>
              <option value="reward-asc">Lowest Reward</option>
            </select>
          </div>
        </div>
      </div>

      <div
        id="items-container"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <ItemCard />
      </div>

      <div id="no-results" class="hidden text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
        <p class="text-gray-500">
          Try adjusting your search criteria or filters
        </p>
      </div>

      {/* <div class="flex justify-center">
        <nav class="flex items-center space-x-2">
          <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button class="px-3 py-2 text-sm font-medium text-white bg-[var(--sea-green)] border border-[var(--sea-green)] rounded-md">
            1
          </button>
          <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            2
          </button>
          <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            3
          </button>
          <button class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div> */}
    </div>
  );
};

export default Browse;
