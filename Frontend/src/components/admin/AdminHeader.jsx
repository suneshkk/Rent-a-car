import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyImage from '../../assets/wheelz.png'
import toast from 'react-hot-toast';
import ProfilPic from '../../assets/profile.png'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import DropDownBt from '../util/DropDownBt.jsx';

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
        < div className="navbar border-b-2 bg-black text-center flex justify-between  items-center px-4 md:px-14 bg-cover h-20  " >
            <div className="">
                <div className="drawer p-1">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle " />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer" className="btn drawer-button">Drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                        <div className="menu bg-cyan-700 text-base-content min-h-full w-80 p-4">
                            <div className="text-center m-3">
                                <h2 className=" font-bold text-xl text-amber-600">Dashboard</h2>
                                <hr />
                            </div>
                            <div>
                                <li className="content-start py-4">
                                    <DropDownBt></DropDownBt>
                                    <hr />

                                </li>
                            </div>
                            {/* <div>
                                <li className="content-start py-4">
                                    <DropDownUser></DropDownUser>
                                    <hr />
                                </li>

                            </div> */}

                        </div>

                    </div>
                </div>

            </div >
            <div className=" flex-2 md:flex-none sm:grid content-center	none: grid leading-relaxed ">
                <Link to="/" className="btn btn-ghost font-bold">
                    <img src={MyImage} alt="logo" className="h-8 md:h-12" />
                </Link>
            </div>
            <div className="relative text-right flex gap-4 ">

                <div className='flex'>
                    <button onClick={toggleDropdown} className="flex size-10 md:size-12 items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-blue-400 focus:outline-none">
                        <img src={ProfilPic} alt="logo" className="rounded-full" />


                    </button>


                </div>

                {isOpen && (
                    <div>
                        <div className="absolute h-44 md:h-72 md:p-3 right-0 top-16 md:mt-2 md:size-52 bg-white border rounded-lg size-36">
                            <div className='text-center '>
                                <h3 className='my-1 text-base font-semibold md:text-xl md:font-semibold'>{profile?.name}</h3>
                                <hr />
                            </div>
                            <Link to={'/admin/edit'}>
                                <h1 className=" text-emerald-900 text-sm my-1 mx-2 font-semibold lg:mt-3 lg:mb-2"> Edit </h1>
                            </Link>
                            <hr />
                            <button onClick={handleDelete} className=''>
                                <h1 className="font-medium mx-2 my-1 text-red-700 md:font-semibold lg:mt-2 lg:mb-2">Delete account </h1>
                            </button>
                            <hr />

                            <button
                                onClick={() => {
                                    closeDropdown();
                                    handleLogout();
                                }}
                                className="text-base font-medium my-1 mx-2 md:w-full md:text-left md:px-4 md:py-2 text-red-700 md:text-xl md:font-semibold"
                            >
                                Logout
                            </button>
                            <hr />
                            <div>
                                <h4 className='mx-1 font-semibold '>{profile?.role}</h4>
                                <h4 className='mx-1 font-semibold '>{profile?.phone}</h4>
                                <h4 className='mx-1 font-semibold '>{profile?.email}</h4>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )

}

export default AdminHeader
