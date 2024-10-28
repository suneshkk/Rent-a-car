import React from 'react'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance.jsx';

function Details() {
    const [carDetails, setCarDetails] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log(id)
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

    const Booking = async () => {

        try {
            const responce = await axiosInstance({
                method: 'post',
                url: '/rental/for-booking',
                data: { carId: carDetails._id },
            });
            toast.success('added successfully')
            console.log("response", responce)
        } catch (error) {
            navigate('/login')
            toast.error('Please-login')
            console.log(error);
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [id])




    return (
        <div className="container flex flex-row mx-auto min-h-max ">
            <div>
                <button className="btn btn-active btn-primary" onClick={Booking}>Booking</button>
            </div>

            <div>
                <h1>{carDetails?.availability}</h1>
                <h1>{carDetails?.brand}</h1>
                <h1>{carDetails?.carName}</h1>
                <h1>{carDetails?.fuelType}</h1>
                <h1>{carDetails?.location}</h1>
                <h1>{carDetails?.price}</h1>
                <h1>{carDetails?.transmission}</h1>
                <h1>{carDetails?.type}</h1>
                <h1>{carDetails?.year}</h1>
            </div>
            <div>
                <img src={carDetails?.image} alt="car" />
            </div>
        </div>

    )
}

export default Details
