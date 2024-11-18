import React, { useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import {useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/util/Loader.jsx';

function DeleteBooking() {
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDeleteBooking = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/rental/cancel-booking/${id}`,
                { withCredentials: true });

            toast.success("account deleted...");
            setLoading(false)
           navigate("/user/profile")


        } catch (error) {
            toast.error("something went wrong");
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen '>
            {loading ? (<Loader />) : (
                <div className=" card max-w-md mx-auto bg-blue-100 rounded-lg shadow-lg ">
                    <h1 className='card text-center  text-lg font-extrabold text-blue-700'>Delete Booking</h1>
                    <div className="card-body p-6 text-center">
                        <h3 className="text-xl font-semibold mb-6">Are you sure you want to delete Booking</h3>
                        <div className="items-end">
                            <button
                                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                onClick={handleDeleteBooking}
                            >
                                Yes, Delete it
                            </button>
                        </div>
                    </div>
                </div>


            )}

        </div>
    )
}

export default DeleteBooking
