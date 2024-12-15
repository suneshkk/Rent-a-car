
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';

function CarList({ car }) {
  const navigate = useNavigate();
  const handle = async (event) => {
    try {
      event.preventDefault();
      const responce = await axiosInstance.get(`/car/get-car/${car?._id}`, { withCredentials: true });
      if (responce?.data?.data) {
        navigate(`/user/book-now/${car?._id}`);
      } ;
    } catch (error) {
      console.log(error);
      toast.error("Car is already booked");

    };
  };

  return (
    <div className="car card-body">

      <div className=" card bg-slate-300 w-36">
        <figure className='w-36'>
          <img src={car?.image} alt="Car" />
        </figure>

        <div className='p-1'>
          <div className=''>
            <h2 className="text-xs font-bold">{car?.carName}</h2>
            <p className='text-xs font-bold text-neutral-700'>{car?.transmission}</p>

          </div>
          <div className='text-end'>
            <Link to={`/user/book-now/${car?._id}`}>
              <button onClick={handle} className="btn btn-xs  btn-success ">About Car</button>
            </Link>

          </div>

        </div>

      </div>
    </div>


  )
}

export default CarList
