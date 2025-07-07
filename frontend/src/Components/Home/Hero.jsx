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
          {/* Outer circle */}
          <circle cx="100" cy="100" r="100" fill="#52b788" opacity="0.8" />

          {/* Inner circle */}
          <circle cx="100" cy="100" r="70" fill="#d8f3dc" opacity="0.9" />

          {/* Centered Search Icon */}
          {/* Magnifying glass circle */}
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#1b4332"
            strokeWidth="8"
          />

          {/* Magnifying glass handle */}
          <path
            d="M125 125 L150 150"
            stroke="#1b4332"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Optional: Plus sign inside search circle to represent found items */}
          <path
            d="M100 85 L100 115 M85 100 L115 100"
            stroke="#1b4332"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
