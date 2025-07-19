import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Link = ({ text, href, className }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <RouterLink
      to={href}
      className={` hover:text-[var(--mint)] transition-colors ${
        isActive ? "font-semibold text-[var(--celadon)]" : ""
      } ${className}`}
    >
      {text}
    </RouterLink>
  );
};

export default Link;
