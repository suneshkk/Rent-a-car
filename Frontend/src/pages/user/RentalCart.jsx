import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import RentalCard from '../../components/user/RentalCard.jsx';

function BookedCar() {
    const [rental,setRental] = useState([]);

    const getRental = async () => {
        try {
            const response = await axiosInstance.get('/rental/booked-car',
                {
                    withCredentials: true
                });
                setRental(response?.data?.data?.car);
            // console.log("response",response);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getRental();
    }, []);
    return (
        <div className='container mx-auto min-h-screen'>
            <div>Booked Car</div>
           {rental.map((value,index )=>(
            <RentalCard item={value} key={index}/>
           ))};
           
        </div>
    );
};

export default BookedCar
