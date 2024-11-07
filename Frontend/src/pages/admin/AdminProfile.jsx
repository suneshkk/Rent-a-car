import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";

function AdminProfile() {
    const [profile, setProfile] = useState([])
console.log(profile)
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
        <div className='h-screen'>
            <h1>{profile?.name}</h1>


        </div>
    )
}

export default AdminProfile
