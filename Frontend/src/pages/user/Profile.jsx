import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/util/Loader.jsx';
import DeleteButton from '../../components/util/DeleteButton.jsx';

function Profile() {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true)
    const fetchUserProfile = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get('/user/profile',
                {
                    withCredentials: true,
                    timeout: 10000

                });
            setLoading(false)

            setProfile(response?.data?.data);
            toast.success("welcome")
            console.log("res", response)

        } catch (error) {
            toast.error("something went wrong")
            console.log(error);
            setLoading(false)
        };
    };
    useEffect(() => {
        fetchUserProfile()
    }, [])



    return (
        <div className="min-h-screen lg:min-h-screen p-2 bg bg-cover bg-orange-100">
            {loading ? (<Loader />) : (

                <div className=" ">
                    <div className=''>
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">Drawer</label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                                <ul className="menu bg-cyan-700 text-base-content min-h-full w-80 p-4">
                                    {/* Sidebar content here */}
                                    <li className="content-center m-4">
                                        <h2 className=" font-bold text-xl text-amber-600">Dashboard</h2>
                                    </li>
                                    <hr />
                                    <li className="content-start py-4">
                                    <Link to="/aboutus" className="btn btn-ghost">
                                            <h1 className="text-lg text-emerald-900 font-bold">About Us</h1>
                                        </Link>
                                    </li>
                                    <hr />
                                    <br />
                                    <br />
                                    <li className="content-start py-4">
                                    </li>
                                    <div className={`md:flex gap-7 hidden md:flex-row md:items-center md:static absolute top-full left-0 w-full bg-base-100 md:bg-transparent md:w-auto z-10`}>
                                      
                                        <Link to="/user/car-Gallery" className="btn btn-ghost" >
                                            <h1 className="text-lg text-emerald-900 font-bold">Car Gallery</h1>
                                        </Link>

                                        <Link to="/sign-up" className="btn btn-ghost" >
                                            <h1 className="text-lg text-emerald-900 font-bold">Logout</h1>
                                        </Link>
                                    </div>


                                </ul>

                            </div>
                        </div >
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        <div className="car  size-72 car-body bg-orange-50  text-black rounded-lg max-w-md lg:size-80">
                            <div className="border-b border-cyan-400 pb-4 mb-6">
                                <h1 className=" text-center text-indigo-500 font-serif text-base font-semibold">Profile</h1>
                            </div>
                            <div>
                                <img
                                    src={profile?.profilePic}
                                    alt="profile-pic"
                                    className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                                />
                            </div>
                            <div className="mb-2 ml-2">
                                <span className="mr-3 text-base font-semibold">Name :</span>
                                <span className='font-serif font-semibold'>{profile?.name}</span>
                            </div>
                            <div className="mb-2 ml-2">
                                <span className=" text-black text-base font-semibold mr-3">Phone:</span>
                                <span className='font-serif font-semibold'>{profile?.phone}</span>
                            </div>
                            <div className="mb-2 ml-2">
                                <span className=" text-base font-semibold mr-3 text-black mr-3">Email:</span>
                                <span className='font-serif font-semibold'>{profile?.email}</span>
                            </div>
                            <div className='flex justify-evenly'>
                                <Link to={`/user/updateUser/${profile?._id}`}>
                                    <button className="btn btn-ghost w-3 text-blue-600">Edit</button>
                                </Link>
                                <Link to={`/user/delet-user/${profile?._id}`}>
                                    <button className="btn btn-ghost text-red-700">Delete</button>

                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
