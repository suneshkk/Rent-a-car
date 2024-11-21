import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import MyImage from '../../src/assets/wheelz.png'

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className=''>
        <div className="navbar bg-black bg-cover  text-center flex justify-between items-center px-4 md:px-14 h-20">
            <div className="flex-1 md:flex-none sm:grid content-center grid leading-relaxed">
                <Link to="/">
                    <img src={MyImage} alt="logo" className="h-12" />
                </Link>
            </div>

            {/* Mobile menu button */}
            <button
                className="text-2xl md:hidden"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Dropdown menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-20 right-1 z-10`}>
                <div className="relative">
                    <select
                        className="w-full text-lg text-emerald-900 font-bold bg-white border border-emerald-300 rounded-md p-3"
                        defaultValue="" 
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value) {
                                navigate(value); 
                                closeMenu();
                            }
                        }}
                    >
                        <option className='hidden'>Menu</option>
                        <option value="/aboutus">About Us</option>
                        <option value="/login">Login</option>
                        <option value="/sign-up">Sign Up</option>
                    </select>
                </div>
            </div>

            {/* Links - visible on larger screens */}
            <div className={`md:flex gap-14 hidden md:flex-row md:items-center md:static absolute top-full left-0 w-full bg-base-100 md:bg-transparent md:w-auto z-10`}>
                <Link to="/aboutus" className="" onClick={closeMenu}>
                    <h1 className="text-bold font-serif text-slate-300 font-bold">About Us</h1>
                </Link>
                <Link to="/login" className="" onClick={closeMenu}>
                    <h1 className="text-bold font-serif text-slate-300 font-bold">Login</h1>
                </Link>
                <Link to="/sign-up" className="" onClick={closeMenu}>
                
                    <h1 className="text-bold font-serif text-slate-300 font-bold">Register</h1>
                </Link>
            </div>
        </div>
        </div>
    );
}

export default Navbar;
