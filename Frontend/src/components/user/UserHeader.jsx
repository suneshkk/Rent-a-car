import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/logo.png'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';

function UserHeader() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate()
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);

    };
    const closeMen = () => {
        setIsMobileMenuOpen(false)
    };
    const handleLogout = async () => {

        try {
            const response = await axiosInstance.post('/user/logout/',
                {
                    Credentials: true
                });

            navigate('/')
            toast.success("logout-success")
        } catch (error) {
            console.log(error);
        };
    };



    return (
            <div className="navbar border-b-2  bg-transparent text-center flex justify-between items-center px-4 md:px-14 bg-cover h-20 " >
                <div className="flex-1 md:flex-none sm:grid content-center	none: grid leading-relaxed ">
                    <Link to="/" className="btn btn-ghost text-xl font-bold">
                        <img src={Logo} alt="logo" className='h-12 ' />

                        <span className='underline '>
                            <b className='lg:text-4xl  font-bold text-opacity- italic text-amber-700 sm:text-lg' >W</b><b className='-tracking-wide'>eelzn</b><b>ow</b>
                        </span>
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
                    <Link to="/aboutus" className="btn btn-ghost" onClick={closeMen}>
                        <h1 className="text-lg text-emerald-900 font-bold">About Us</h1>
                    </Link>
                    <Link to="/carGallery" className="btn btn-ghost" onClick={closeMen}>
                        <h1 className="text-lg text-emerald-900 font-bold">Car gallery</h1>
                    </Link>
                    <button onClick={handleLogout}>logout</button>

                </div>
            </div>
    );
}

export default UserHeader;

