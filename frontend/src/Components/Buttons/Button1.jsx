import React from "react";
import { Link } from "react-router-dom";

const Button1 = ({ href, text, className }) => {
  return (
    <Link
      to={href}
      className={`bg-[var(--mint)] font-semibold py-2 px-4 rounded-md hover:bg-[var(--celadon)] transition-colors max-sm:font-normal max-sm:px-2 max-sm:py-1 ${className}`}
    >
      {text}
    </Link>
  );
};

export default Button1;
