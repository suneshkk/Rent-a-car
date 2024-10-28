import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';

function Profile() {
    const [profile, setProfile] = useState({});
    const fetchUserProfile = async () => {

        try {
            const responce = await axiosInstance.get('/user/profile/',
                {
                    withCredentials: true

                });

            setProfile(responce?.data?.data);
            console.log(responce)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchUserProfile()
    }, [])
    return (
        <div className='container mx-auto min-h-screen'>
            <h1>user profile</h1>
            <h1>{profile?.name}</h1>
            <div className=''>
            <img src={profile?.profilePic} alt="profil-pic" className='w-32 h-32  object-cover' />

            </div>
            <button>edit profile</button>
        </div>
    )
}

export default Profile
