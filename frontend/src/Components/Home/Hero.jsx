import React from "react";
import Button1 from "../Buttons/Button1";

const Hero = () => {
  return (
    <div className="hero bg-gradient-to-tl from-[var(--sea-green)] to-[var(--dartmouth-green)] w-full flex items-center justify-between px-4 md:px-10 py-8 flex-col lg:flex-row">
      <div className="hero-left w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <h1 className="hero-heading font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
          Lost Something? Found Something?
        </h1>
        <p className="my-6 md:my-10 text-white text-lg sm:text-xl md:text-2xl max-w-[600px]">
          Connect with our community to recover lost items or help others find
          theirs.
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <Button1
            text="Report Lost Item"
            href="#"
            className="text-[var(--dark-green)] w-full sm:w-auto"
          />
          <Button1
            text="Report Found Item"
            href="#"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
      <div className="hero-right w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="#52b788"
            opacity="0.8"
          ></circle>
          <path
            d="M100 50 C130 50, 150 70, 150 100 C150 130, 130 150, 100 150 C70 150, 50 130, 50 100 C50 70, 70 50, 100 50"
            fill="#d8f3dc"
            opacity="0.9"
          ></path>
          <circle cx="100" cy="100" r="30" fill="#1b4332"></circle>
          <path
            d="M100 80 L100 100 L120 100"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          ></path>
          <circle cx="100" cy="100" r="5" fill="white"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
