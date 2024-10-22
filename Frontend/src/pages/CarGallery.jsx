import React from 'react'
import { axiosInstance } from '../config/axiosInstance'

function CarGallery() {
  const fetchCar = async () => {

    try {
      const responce = axiosInstance({
        method: 'Get',
        url: '/car/list'
      })


    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='min-h-screen'>
      <h1>Car Gallery</h1>
    </div>
  )
}

export default CarGallery
