import { useParams } from "react-router-dom"
import { axiosInstance } from "../config/axiosInstance";
import { useEffect, useState } from "react";

function Detailes() {
   const [carDetailes,setCarDetailes] = useState([]);
    const { id } = useParams();
    // console.log(id)
    const fetchCarDetailes = async () => {
        try {
            const response = await axiosInstance({
                method: 'Get',
                url: `/car/get-car/${id}`
            })
            setCarDetailes(response?.data?.data);
           console.log(response)
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [])


    return (
            <div className="artboard artboard-horizontal phone-6 min-h-max"> <h1>Car Detailes</h1>
            <div>
                <h1>{carDetailes?.availability }</h1>
                <h1>{carDetailes?.brand }</h1>
                <h1>{carDetailes?.carName }</h1>
                <h1>{carDetailes?.fuelType}</h1>
                <h1>{carDetailes?.location }</h1>
                <h1>{carDetailes?.price }</h1>
                <h1>{carDetailes?.transmission }</h1>
                <h1>{carDetailes?.type }</h1>
                <h1>{carDetailes?.year }</h1>
            </div>
            <div>
                <img src={carDetailes?.image} alt="car" />
            </div></div>
           
    )
}

export default Detailes
