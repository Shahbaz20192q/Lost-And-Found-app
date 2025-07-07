import React, { useState } from "react";
import Link from "./Link";
import Button1 from "../Buttons/Button1";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [navIsActive, setNavIsActive] = useState(false);
  const showNav = () => {
    setNavIsActive(!navIsActive);
  };
  return (
    <div className="bg-[var(--brunswick-green)] text-white w-full sticky top-0 z-50">
      <div className="px-10 py-2 flex items-center justify-between relative max-sm:px-4 ">
        <RouterLink to="/">
          <div className="flex items-center justify-start gap-1">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[var(--mint-2)]"
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
            </span>
            <span>
              <span className="font-bold text-3xl">FindIt</span>
            </span>
          </div>
        </RouterLink>

        <nav className="max-md:hidden">
          <ul className="flex items-center justify-start gap-4 mt-2">
            <li>
              <Link text="Home" href="/" />
            </li>
            <li>
              <Link text="About" href="/about" />
            </li>
            <li>
              <Link text="Contact" href="/contact" />
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-4 mt-2 max-sm:gap-2 ">
          <Button1 href="/login" text="Login" />
          <Button1 href="/register" text="Register" />

          <div className="md:hidden" onClick={showNav}>
            <RxHamburgerMenu className="text-3xl cursor-pointer" />
          </div>
        </div>
        {/* mobile view */}
        {navIsActive && (
          <div className="w-full absolute bg-[var(--brunswick-green)] top-15 left-0">
            <nav className="px-10 py-2 max-sm:px-5 ">
              <ul className="flex items-start flex-col justify-start gap-4 mt-2">
                <li onClick={showNav}>
                  <Link text="Home" href="/" />
                </li>
                <li onClick={showNav}>
                  <Link text="About" href="/about" />
                </li>
                <li onClick={showNav}>
                  <Link text="Contact" href="/contact" />
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
