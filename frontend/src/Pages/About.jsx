import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div class="relative bg-gradient-to-r from-[var(--sea-green)] to-[var(--dartmouth-green)] overflow-hidden py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative z-10 py-22 max-sm:py-10 ">
            <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <div class="text-center ">
                <h1 class="text-4xl tracking-tight flex w-full font-extrabold text-[var(--celadon)] sm:text-5xl md:text-6xl">
                  <span class="-mt-12 flex items-center justify-center max-sm:absolute max-sm:w-[60px] max-sm:leading-8 max-sm:top-5 ">
                    About FindIt
                    <span class="absolute -z-20 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-44 w-44 text-[var(--brunswick-green)] max-sm:h-28 max-sm:w-28 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </span>
                  </span>
                  <span class=" mt-12 block text-5xl text-[var(--celadon)] max-sm:text-3xl ">
                    Reuniting People with Their Belongings
                  </span>
                </h1>
                <p class="mt-3 text-base text-[var(--nyanza)] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  We're on a mission to create a community where lost items find
                  their way back home.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base text-[var(--sea-green)] font-semibold tracking-wide uppercase">
              Our Purpose
            </h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[var(--brunswick-green)] sm:text-4xl">
              What We Do
            </p>
          </div>

          <div class="mt-10">
            <div class="prose prose-lg text-[var(--dartmouth-green)] mx-auto">
              <p>
                FindIt is a lost and found platform that connects people who
                have lost items with those who have found them. Our mission is
                to create a more connected and caring community by helping
                people recover their lost belongings and recognizing the honesty
                of those who find and return items.
              </p>

              <p class="mt-4">
                Founded in 2018 after our founder lost his wallet and had it
                returned by a kind stranger, we realized there was no
                centralized platform for lost and found items in our community.
                Today, we've helped reunite over 50,000 lost items with their
                owners across 25+ cities.
              </p>

              <p class="mt-4">
                Our simple yet effective process helps connect lost items with
                their owners:
              </p>

              <ul class="mt-4 space-y-2">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-[var(--sea-green)]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p class="ml-3">
                    <strong>Report:</strong> Whether you've lost or found an
                    item, submit a detailed report with photos and location
                    information.
                  </p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-[var(--sea-green)]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p class="ml-3">
                    <strong>Match:</strong> Our system automatically matches
                    lost and found reports based on descriptions, locations, and
                    timing.
                  </p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-[var(--sea-green)]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p class="ml-3">
                    <strong>Reunite:</strong> We facilitate secure communication
                    between finders and owners to arrange the return of lost
                    items.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="py-16 bg-[var(--celadon)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base text-[var(--sea-green)] font-semibold tracking-wide uppercase">
              Our Values
            </h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[var(--brunswick-green)] sm:text-4xl">
              What Drives Us
            </p>
          </div>

          <div class="mt-10">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[var(--sea-green)] text-white mx-auto">
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mt-4 text-lg font-medium text-[var(--brunswick-green)] text-center">
                  Trust
                </h3>
                <p class="mt-2 text-base text-[var(--dartmouth-green)] text-center">
                  We build trust through transparency and secure processes that
                  protect both finders and owners.
                </p>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[var(--sea-green)] text-white mx-auto">
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mt-4 text-lg font-medium text-[var(--brunswick-green)] text-center">
                  Community
                </h3>
                <p class="mt-2 text-base text-[var(--dartmouth-green)] text-center">
                  We believe in the power of community to help each other and
                  create positive connections.
                </p>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-[var(--sea-green)] text-white mx-auto">
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 class="mt-4 text-lg font-medium text-[var(--brunswick-green)] text-center">
                  Innovation
                </h3>
                <p class="mt-2 text-base text-[var(--dartmouth-green)] text-center">
                  We continuously improve our platform to make the lost and
                  found process easier and more effective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl font-extrabold tracking-tight text-[var(--brunswick-green)] sm:text-4xl">
            <span class="block">Ready to get started?</span>
            <span class="block text-[var(--sea-green)]">
              Report a lost or found item today.
            </span>
          </h2>
          <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <Link
                to="/register"
                class="btn-primary inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
