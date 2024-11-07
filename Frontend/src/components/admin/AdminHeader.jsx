import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyImage from '../../assets/logo.png'
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance.jsx';

function AdminHeader() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([])

    const [isOpen, setIsopen] = useState(false);


    const toggleDropdown = () => {
        setIsopen(!isOpen);
    }
    const closeDropdown = () => {
        setIsopen(false)
    }

    const handleLogout = async () => {
        try {
            const Response = await axiosInstance.post('/admin/logout',
                { Credential: true });
            navigate('/')
        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
        };
    };
    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete('/admin/delete',
                { withCredentials: true });
            toast.success("profile deleted successfully")
            navigate('/')

        } catch (error) {
            toast.error("something went wrong");
            console.log(error)
        };
    };
    const fetchAdminProfile = async () => {
        try {
            const responce = await axiosInstance.get('/admin/profile', {
                withCredentials: true,
            })

            setProfile(responce?.data?.data);
            console.log(responce)
        } catch (error) {
            toast.error("something went wrong");
            console.log(error);
        };
    };
    useEffect(() => {
        fetchAdminProfile()
    }, [])


    return (
        < div className="navbar border-b-2  bg-transparent text-center flex justify-between  items-center px-4 md:px-14 bg-cover h-20 " >

            <div className=" flex-1 md:flex-none sm:grid content-center	none: grid leading-relaxed ">
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    <img src={MyImage} alt="logo" className='h-12 ' />

                    <span className='underline '>
                        <b className='lg:text-4xl  font-bold text-opacity- italic text-amber-700 sm:text-lg' >W</b><b className='-tracking-wide'>eelzn</b><b>ow</b>
                    </span>
                </Link>
            </div>
            <div className="relative inline-block text-right ">
                <div className=''>
                    <button onClick={toggleDropdown} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-lime-400 focus:outline-none">
                        <img
                            className="w-14 h-7 rounded-full" />
                        <span>{profile?.name}</span>
                    </button>

                </div>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                        <button onClick={handleDelete}>
                            <h1 className="text-lg text-emerald-900 font-bold"> delete account</h1>


                        </button>

                        <button
                            onClick={() => {
                                closeDropdown();
                                handleLogout();
                            }}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div >
    )

}

export default AdminHeader
