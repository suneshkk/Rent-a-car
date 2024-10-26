import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.js';

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
            <img src={profile?.profilePic} alt="profil-pic" />
        </div>
    )
}

export default Profile
