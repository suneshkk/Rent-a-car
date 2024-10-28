import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // For icons (install with `npm install react-icons`)

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);

    };
    const closeMen = () => {
      setIsMobileMenuOpen(false)
    }


    return (
        <div className="navbar  bg-base-100 flex justify-between items-center px-4 md:px-14 bg-cover border-b-2 h-20">
            {/* Logo */}
            <div className="flex-1 md:flex-none sm:grid content-center	none: grid  ">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    Wheel Now
                </Link>
            </div>

            {/* Mobile menu button */}
            <button 
                className="text-2xl md:hidden" 
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Links - hidden on mobile by default */}
            <div className={`md:flex gap-7 ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center md:static absolute top-full left-0 w-full bg-base-100 md:bg-transparent md:w-auto z-10`}>
                <Link to="/aboutus" className="btn btn-ghost"onClick={closeMen}>
                    <h1 className="text-base text-black font-mono">About Us</h1>
                </Link>
                <Link to="/carGallery" className="btn btn-ghost"onClick={closeMen}>
                    <h1 className="text-base text-black font-mono">Book now</h1>
                </Link>
                <Link to="/login" className="btn btn-ghost"onClick={closeMen}>
                    <h1 className="text-base text-black font-mono">Login</h1>
                </Link>
                <Link to="/sign-up" className="btn btn-ghost"onClick={closeMen}>
                    <h1 className="text-base text-black font-mono">Sign Up</h1>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;

