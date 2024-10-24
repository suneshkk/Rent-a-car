import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance.js'
import CarList from '../components/Cards.jsx';

function CarGallery() {

  const [data, setData] = useState([]);


  const fetchCar = async () => {

    try {
      const responce = await axiosInstance({
        method: 'Get',
        url: '/car/car-list'
      })
      setData(responce?.data?.data);
      // console.log(responce)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    fetchCar();
  },[])
  return (
    <div className='min-h-screen'>
      <h1>Car Gallery</h1>
      {data.map((value) =>
        <CarList car={value} key={value?._id} />

      )}
    </div>
  )
}

export default CarGallery
