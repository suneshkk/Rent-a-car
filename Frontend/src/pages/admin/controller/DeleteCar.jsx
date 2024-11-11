import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosInstance.jsx';
import Loader from '../../../components/util/Loader';

export default function DeleteCar() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteCar = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.delete(`/car/delete-car/${id}`,
                { withCredentials: true });
            if (response?.data?.success) {
                toast.success("car Deleted successfully");
                navigate('/admin/car-list');
            };

        } catch (error) {
            toast.error("somthing went wrong");
            console.log(error)

            setLoading(false);
        };
    };
    return (
        <div className='flex justify-center items-center h-screen '>
            {loading ? (<Loader />) : (
                <div className=" card max-w-md mx-auto bg-blue-100 rounded-lg shadow-lg ">
                    <h1 className='card text-center  text-lg font-extrabold text-blue-700'>Delete Car</h1>
                    <div className="card-body p-6 text-center"> 
                        <h3 className="text-xl font-semibold mb-6">Are you sure you want to delete this car?</h3>
                        <div className="items-end">
                            <button
                                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                                onClick={handleDeleteCar}
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
