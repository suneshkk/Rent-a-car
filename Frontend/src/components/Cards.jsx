
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../config/axiosInstance.jsx';
import toast from 'react-hot-toast';

function CarList({ availableCars }) {
  const navigate = useNavigate();
  const handle = async (event) => {
    try {
      event.preventDefault();
      const responce = await axiosInstance.get(`/car/get-car/${availableCars?._id}`, { withCredentials: true });
      if (responce?.data?.data) {
        navigate(`/user/book-now/${availableCars?._id}`);
      };
    } catch (error) {
      console.log(error);
      toast.error("Car is already booked");

    };
  };

  return (
    <div className="flex justify-center items-center p-4 mt-24">
      <div className="card w-80 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={availableCars?.image}
            alt="Car"
            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-bold text-gray-800">{availableCars?.carName}</h2>
          <p className="text-sm font-semibold text-gray-600">
            Transmission: {availableCars?.transmission}
          </p>
        </div>

        <div className="p-4 flex justify-end">
          <Link to={`/user/book-now/${availableCars?._id}`}>
            <button
              onClick={handle}
              className="btn btn-success btn-sm px-4 py-2 rounded-full text-white font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              About Car
            </button>
          </Link>
        </div>
      </div>
    </div>


  )
}

export default CarList
