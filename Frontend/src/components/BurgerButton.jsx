import React, { useState } from "react";
import { Link } from "react-router-dom"

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative">
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className=" text-white focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute flex-col bottom-0 top-11  mt-1 w-32 h-40 bg-info-content rounded-lg shadow-lg py-2">
          <div className="p-4">
            <div className="py-2">
              <Link to="/" onClick={closeMenu}>Home</Link>
            </div>
            <div className="py-2">
              <Link to="/aboutus" onClick={closeMenu}> AboutUs</Link>
            </div>
            <div className="py-2">
              <Link to="/carGallery" onClick={closeMenu}>CarGallery </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerButton;
