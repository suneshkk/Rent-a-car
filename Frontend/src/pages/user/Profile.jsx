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
        <div className="hero flex justify-center lg:min-h-screen p-10 bg bg-cover bg-orange-100">
            {loading ? (<Loader />) : (
                <div className=" ">
                    <div className="car car-body bg-orange-50 border p-3 text-black rounded-lg max-w-md w-full">
                        <div className="border-b border-cyan-400 pb-4 mb-6">
                            <h1 className="text-center text-indigo-500 font-serif text-base font-semibold">Profile</h1>
                        </div>
                        <div>
                            <img
                                src={profile?.profilePic}
                                alt="profile-pic"
                                className="w-20 h-20 object-cover rounded-full mx-auto"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="text-lg text-black mr-3">Name:</span>
                            <span>{profile?.name}</span>
                        </div>
                        <div className="mb-4">
                            <span className="text-lg text-black mr-3">Phone:</span>
                            <span>{profile?.phone}</span>
                        </div>
                        <div className="mb-4">
                            <span className="text-lg text-black mr-3">Email:</span>
                            <span>{profile?.email}</span>
                        </div>
                        <div>
                            <Link to={`/user/updateUser/${profile?._id}`}>
                                <button className="btn bg-sky-500">Edit</button>
                            </Link>
                         <Link to={`/user/delet-user/${profile?._id}`}>
                         <button className="btn bg-red-700">Delete</button>

                         </Link>
                        </div>

                    </div>
                    <div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
