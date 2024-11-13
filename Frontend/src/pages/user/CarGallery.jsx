import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import CarList from '../../components/Cards.jsx';
import Loader from '../../components/util/Loader.jsx';

function CarGallery() {
    const [car, setcar] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchCar = async () => {
        setLoading(true);
        try {
            const responce = await axiosInstance.get('/car/car-list', {
                withCredentials: true,
            });
            setLoading(false);
            setcar(responce?.data?.data);
            // console.log(responce)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchCar();
    }, [])

    return (
        <div className="min-h-screen grid xl:grid lg:grid md:grid sm:grid ">

            {loading ?
                (<Loader />) : (
                    <div className="2xl:flex 2xl:flex-wrap xl:flex xl:flex-wrap lg:flex lg:flex-wrap md:flex md:flex-wrap  " >
                        {car.map((value) => (
                            <CarList car={value} key={value?._id} />
                        ))}
                    </div>
                )}
        </div>


    )
}

export default CarGallery
