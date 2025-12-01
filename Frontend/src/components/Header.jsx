import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import MyImage from "../../src/assets/wheelz.png";
// import Theme from "./ui/Theme";
// import Theme from "./ui/Theme.jsx";
function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-transparent">
      {location.pathname == "/" && (
        <div className="rounded-t-lg bg-cover bg-red-500 md:h-6 flex justify-center items-center">
          <p className="text-xs font-medium lg:text-sm font-serif lg:font-bold">
            <b>Drive Your Way with Confidence.</b>
          </p>
        </div>
      )}
      <div className="navbar min-h-3 absolute  text-center flex justify-between items-center md:px-5 md:h-9 xl:h-14">
        <div className="hidden md:hidden"></div>

        <div className="flex-2 md:flex-none lg:content-center grid md:leading-relaxed">
          <Link to={"/"}>
            <h1 class="lg:text-2xl xl:text-3xl text-lg font-bold text-red-700  uppercase lg:tracking-widest">
              wheelz n<b className="font-bold text-slate-100">o</b>w
            </h1>
          </Link>
        </div>
        <div className="hidden md:hidden"> </div>

        {/* Mobile menu button */}
        {location.pathname == "/" && (
          <button
            className="text-2xl md:hidden size-4 text-slate-50"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Mobile Dropdown menu */}
        {isMobileMenuOpen && (
          <div className="bg-slate-600 absolute top-9  right-1 z-10 flex-col bottom-0  mt-1 w-32 h-40 bg-center rounded-lg shadow-lg py-2 ">
            <div className="p-5">
              {location.pathname == "/" && (
                <div className="py-2">
                  <Link to="/aboutus" onClick={closeMenu}>
                    {" "}
                    <p className="text-slate-100 font-medium">About Us</p>
                  </Link>
                  <hr />
                </div>
              )}

              <div className="py-2 flex">
                <Link to="/login" onClick={closeMenu}>
                  <p className="text-slate-100 font-medium">Login</p>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-slate-200 m-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
              <div className="py-2">
                <Link to="/sign-up" onClick={closeMenu}>
                  <p className="text-slate-100 font-medium">Register</p>
                </Link>
                <hr />
              </div>
            </div>
          </div>
        )}

        {/* Links - visible on larger screens */}
        <div
          className={`md:flex gap-6 hidden md:flex-row md:items-center md:static absolute top-full left-0 w-full md:bg-transparent md:w-auto z-10`}
        >
          {location.pathname == "/" && (
            <div className="flex gap-5 items-center ">
              <Link to="/aboutus">
                <h1 className=" hover:text-sky-600 xl:text-lg text-red-500 font-serif xl:font-bold capitalize md:font-bold hover:border-none">
                  About Us
                </h1>
              </Link>
              <Link to="/home-car-gallery">
              <h1 className=" hover:text-sky-600 xl:text-lg text-red-500 font-serif xl:font-bold capitalize md:font-bold hover:border-none">
              car gallery
                </h1>
              </Link>
            </div>
          )}
          {location.pathname == "/" && (
            <div className="flex">
              <Link to="/login">
              <h1 className=" hover:text-sky-600 xl:text-lg text-red-500 font-serif xl:font-bold capitalize md:font-bold hover:border-none">
              Login
                </h1>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-slate-200 m-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>

              <Link to="/sign-up" className="">
              <h1 className=" hover:text-sky-600 xl:text-lg text-red-500 font-serif xl:font-bold capitalize md:font-bold hover:border-none">
              Register
                </h1>
              </Link>
              {/* <Theme/> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
