import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyImage from '../../assets/wheelz.png'
import toast from 'react-hot-toast';
import ProfilPic from '../../assets/profile.png'
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

    const fetchAdminProfile = async () => {
        try {
            const responce = await axiosInstance.get('/admin/profile', {
                withCredentials: true,
            })
            setProfile(responce?.data?.data);
        } catch (error) {
            toast.error("Please Login..!");
            console.log(error);
        };
    };
    useEffect(() => {
        fetchAdminProfile()
    }, [])


    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/admin/logout', {},
                { withCredentials: true });

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

    return (
        < div className="navbar border-b-2  bg-black text-center flex justify-between  items-center px-4 md:px-14 bg-cover h-20  " >

            <div className=" flex-1 md:flex-none sm:grid content-center	none: grid leading-relaxed ">
                <Link to="/" className="btn btn-ghost font-bold">
                    <img src={MyImage} alt="logo" className="h-8 md:h-12" />
                </Link>
            </div>
            <div className="relative text-right flex gap-4 ">

                <div className='flex'>
                    <button onClick={toggleDropdown} className="flex size-9 md:size-12 items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-blue-400 focus:outline-none">
                        <img src={ProfilPic} alt="logo" className="rounded-full" />


                    </button>


                </div>

                {isOpen && (
                    <div>
                        <div className="absolute p-3 right-0 top-16 lg:mt-2 lg:w-48 bg-white border rounded-lg shadow-lg size-28">
                            <Link to={'/admin/edit'}>
                                <h1 className=" text-emerald-900 font-semibold border-b-4"> Edit </h1>

                            </Link>
                            <button onClick={handleDelete} className=''>
                                <h1 className=" text-red-700 font-semibold border-b-4">Delete account </h1>
                            </button>

                            <button
                                onClick={() => {
                                    closeDropdown();
                                    handleLogout();
                                }}
                                className="w-full text-left px-4 py-2 text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )

}

export default AdminHeader
