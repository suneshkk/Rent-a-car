import { useParams } from "react-router-dom"
import { axiosInstance } from "../config/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Detailes() {
    const [carDetailes, setCarDetailes] = useState({});
    const { id } = useParams();
    const navigate =useNavigate();
    // console.log(id)
    const fetchCarDetailes = async () => {
        try {
            const response = await axiosInstance.get(`/car/get-car/${id}`, {
                withCredentials: true,
            })
            setCarDetailes(response?.data?.data);
            // console.log(response?.data?.data);
        } catch (error) {
            console.log(error);
        };
    };

    const Booking = async () => {

        try {
         const responce = await axiosInstance({
            method:'post',
            url:'/rental/for-booking',
            data:{carId:carDetailes._id},
         });
         toast.success('added successfully')
         console.log("response",responce)
        } catch (error) {
            navigate('/login')
            toast.error('An error occurred')
            console.log(error);
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [id])


    return (
        <div className="container flex flex-row mx-auto min-h-max ">
            <div>
                <button className="btn btn-active btn-primary"onClick={Booking}>Booking</button>
            </div>

            <div>
                <h1>{carDetailes?.availability}</h1>
                <h1>{carDetailes?.brand}</h1>
                <h1>{carDetailes?.carName}</h1>
                <h1>{carDetailes?.fuelType}</h1>
                <h1>{carDetailes?.location}</h1>
                <h1>{carDetailes?.price}</h1>
                <h1>{carDetailes?.transmission}</h1>
                <h1>{carDetailes?.type}</h1>
                <h1>{carDetailes?.year}</h1>
            </div>
            <div>
                <img src={carDetailes?.image} alt="car" />
            </div></div>

    )
}

export default Detailes
