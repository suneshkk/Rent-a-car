import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance.jsx';

function Details() {
    const [carDetails, setCarDetails] = useState({});
    const { id } = useParams();
    const fetchCarDetailes = async () => {
        try {
            const response = await axiosInstance.get(`/car/get-car/${id}`, {
                withCredentials: true,
            })
            setCarDetails(response?.data?.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [id])


    return (
        <div className="container min-h-screen  ">
            <div className="md:flex flex-col " >


                <div className="flex justify-center md:justify-start">
                    <img src={carDetails?.image} alt="car" className="w-full max-w-sm rounded-lg shadow-lg" />
                </div>
                <div className="card w-full max-w-lg  md:mx-0">
                    <div className="card-body bg-slate-400 p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <span className="font-semibold">Car Name:</span>
                            <span className="ml-2">{carDetails?.carName}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Brand:</span>
                            <span className="ml-2">{carDetails?.brand}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Fuel Type:</span>
                            <span className="ml-2">{carDetails?.fuelType}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Transmission:</span>
                            <span className="ml-2">{carDetails?.transmission}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Type:</span>
                            <span className="ml-2">{carDetails?.type}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Manufacturing Year:</span>
                            <span className="ml-2">{carDetails?.year}</span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Price:</span>
                            <span className="ml-2">{carDetails?.price}</span>
                        </div>

                        <div className="mb-4 text-center md:text-left">
                            <Link to={`/user/booking-car/`}>
                                <button className="btn btn-active btn-primary w-full md:w-auto">Booking</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details

