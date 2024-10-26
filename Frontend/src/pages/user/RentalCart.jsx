import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.js';
import RentalCard from '../../components/user/RentalCard.jsx';

function RentalCart() {
    const [rental,setRental] = useState([]);

    const getRental = async () => {
        try {
            const response = await axiosInstance.get('/rental/get-rental',
                {
                    withCredentials: true
                });
                setRental(response?.data?.data?.car);
            console.log("response",response);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getRental();
    }, []);
    return (
        <div className='container mx-auto min-h-screen'>
           {rental.map((value,index )=>(
            <RentalCard item={value} key={index}/>
           ))};
           
        </div>
    );
};

export default RentalCart
