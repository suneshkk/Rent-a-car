import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { axiosInstance } from '../config/axiosInstance.jsx';
import Loader from '../components/util/Loader.jsx';

function Details() {
    const [carDetails, setCarDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const [ratting, setRatting] = useState("");
    const { id } = useParams();
    const fetchCarDetailes = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/car/get-car/${id}`, {
                withCredentials: true,
            });
            setLoading(false);
            setCarDetails(response?.data?.data);
            console.log(response);
        } catch (error) {
            console.log(error);
            setLoading(false);
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [id])

    const addReview = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("ratting", ratting);

        try {
            const response = await axiosInstance.post('/review/add-review',
                { withCredentials: true });
                  console.log("responce data==",response)
            if (response.data.success) {
                toast.success("Car Created successfully");
                setLoading(false)
            }


        } catch (error) {
            console.log(error);
            setLoading(false);
        };
    }


    return (
        <div className="container min-h-screen flex items-center justify-evenly bg-gray-100">
            <form onSubmit={addReview} className='card card-body'>
                <div className="flex items-center space-x-4">
                    <label className="form-label text-gray-600 w-1/3">Add A Comment:</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="form-label text-gray-600 w-1/3">Rating:</label>
                    <input
                        type="number"
                        value={ratting}
                        onChange={(e) => setRatting(e.target.value)}
                        className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>
                <div className="text-center mt-6 flex-none">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition ease-in-out duration-300"
                    >
                        Submit
                    </button>

                </div>


            </form>
            {loading ? (<Loader />) : (
                <div className="card bg-white shadow-2xl rounded-lg px-10 py-8 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/5">


                    <div className="flex justify-center md:justify-start">
                        <img src={carDetails?.image} alt="car" className="w-full max-w-sm rounded-lg shadow-lg" />
                    </div>
                    <form className="card card-body space-y-4">
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Car Name :</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.carName}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Car Brand :</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.brand}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Fuel Type :</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.fuelType}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Transmission:</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.transmission}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Car Type:</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.carType}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Year:</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.year}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Rent Price:</label>
                            <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            >{carDetails?.price}</span>
                        </div>

                        <div className="mb-4 text-center md:text-left">
                            <Link to={`/user/booking-car/`}>
                                <button className="btn btn-active btn-primary w-full md:w-auto">Booking</button>
                            </Link>
                        </div>
                    </form>
                </div>
            )}
            <form ></form>
        </div>
    )
}

export default Details

