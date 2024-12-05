import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';


function DeleteAccount() {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            const responce = await axiosInstance.delete(`/admin/delete/${id}`, { withCredentials: true });
            console.log("responce", responce)
            toast.success("Deleted")
            navigate("/")


        } catch (error) {
            // setTimeout(() =>{
            console.log(error);
            toast.error("sothing went wrong")
            navigate("/admin/admin-home")

            // },[3000])
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className=" card max-w-md mx-auto bg-blue-100 rounded-lg shadow-lg ">
                <h1 className='card text-center  text-lg font-extrabold text-blue-700'>Delete account</h1>
                <div className="card-body p-6 text-center">
                    <h3 className="text-xl font-semibold mb-6">Are you sure you want to delete your account?</h3>
                    <div className="items-end">
                        <button
                            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                            onClick={handleDelete}
                        >
                            Yes, Delete it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount
