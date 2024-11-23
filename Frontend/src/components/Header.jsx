import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import MyImage from '../../src/assets/wheelz.png'

function Navbar() {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div >
            {location.pathname == '/' && (
            <div className='bg-cover bg-orange-600 h-8 pt-1'>
             <p className='text-center text-black font-serif font-semibold'>Your Perfect Driving Partner</p>
            </div>
            )}
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
                <div className={`md:flex gap-6 hidden md:flex-row md:items-center md:static absolute top-full left-0 w-full bg-base-100 md:bg-transparent md:w-auto z-10`}>
                    <Link to="/aboutus" className="" onClick={closeMenu}>
                        <h1 className="text-bold font-serif text-slate-300 font-bold hover:text-sky-600">About Us</h1>
                    </Link>
                    <div className='flex border-b-2'>
                        <Link to="/login" className="" onClick={closeMenu}>
                            <h1 className="text-bold font-serif text-slate-300 font-bold hover:text-sky-600">Login</h1>
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

                        <Link to="/sign-up" className="" onClick={closeMenu}>
                            <h1 className="text-bold font-serif text-slate-300 font-bold hover:text-sky-500">Register</h1>
                        </Link>

                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export default Navbar;
