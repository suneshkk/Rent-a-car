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
        <div className="container mt-6 mx-auto min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-8">
            <div className="grid gap-8 sm:gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-3 justify-items-center">
                {data.map((value) => (
                    <CarList car={value} key={value?._id} />
                ))}
            </div>
        </div>
    )
}

export default CarGallery
