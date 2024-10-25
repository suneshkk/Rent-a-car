import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance.js'
import CarList from '../components/Cards.jsx';

function CarGallery() {

  const [data, setData] = useState([]);


  const fetchCar = async () => {

    try {
      const responce = await axiosInstance.get( '/car/car-list', {
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
  },[])
  return (
    <div className= ' container mx-auto min-h-screen'>
      <h1>Car Gallery</h1>
      {data.map((value) =>
        <CarList car={value} key={value?._id} />

      )}
    </div>
  )
}

export default CarGallery
