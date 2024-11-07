import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Profile() {
    const [profile, setProfile] = useState([]);
    const fetchUserProfile = async () => {
        console.log(profile, "data")

        try {
            const responce = await axiosInstance.get('/user/profile',
                {
                    withCredentials: true,
                    timeout: 10000

                });
            console.log(responce, "response")

            setProfile(responce?.data?.data);
            toast.success("welcome")

        } catch (error) {
            toast.error("something went wrong")
            console.log(error);

        };
    };
    useEffect(() => {
        fetchUserProfile()
    }, [])


    return (
        <div className="container mx-auto min-h-screen bg-gray-600">
            <div className="flex justify-center pt-20 ">
                <div className="bg-white border border-green-500 p-4 text-black rounded-lg max-w-md w-full">
                    <div className="border-b border-green-500 pb-4 mb-6">
                        <h1 className="text-center text-2xl font-semibold">Profile</h1>
                    </div>
                    <div>
                        <img
                            src={profile?.profilePic}
                            alt="profile-pic"
                            className="w-32 h-32 object-cover rounded-full mx-auto"
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
                        <Link to="/user/updateUser">
                            <button className="btn bg-sky-500">Edit</button>
                        </Link>

                    </div>

                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
