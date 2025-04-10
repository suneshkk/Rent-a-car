import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/util/Loader";

function AllCars() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/car/car-list", {
        withCredentials: true,
      });
      setAllCars(response?.data?.data);
      setLoading(false);
      toast.success(response?.data?.message);
      console.log("all cars", response);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCars();
  }, []);
  return (
    <div className="bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e]">
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen md:grid-flow-row md:grid md:grid-cols-4 ">
          {allCars.map((cars) => (
            <div
              key={cars._id}
              className="mt-24 flex justify-center items-center p-4"
            >
              <div className="card w-80 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={cars?.image}
                    alt={cars.carName}
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-bold text-gray-800">
                    {cars?.carName}
                  </h2>
                  <p className="text-sm font-semibold text-gray-600"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllCars;
