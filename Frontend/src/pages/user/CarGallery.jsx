import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import CarList from '../../components/Cards.jsx';

function CarGallery() {
    const [data, setData] = useState([]);

    const fetchCar = async () => {

        try {
            const responce = await axiosInstance.get('/car/car-list', {
                withCredentials: true,
            });

            setData(responce?.data?.data);
            // console.log(responce)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchCar();
    }, [])

    return (
        <div className="min-h-screen grid xl:grid lg:grid md:grid sm:grid ">
            <div className="2xl:flex 2xl:flex-wrap xl:flex xl:flex-wrap lg:flex lg:flex-wrap md:flex md:flex-wrap  " >
                {data.map((value) => (
                    <CarList car={value} key={value?._id} />
                ))}
            </div>
        </div>
    )
}

export default CarGallery
