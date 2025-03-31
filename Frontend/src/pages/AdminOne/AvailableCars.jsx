import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/util/Loader";

function AvailableCars() {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState([]);
  const fetchCar = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/car/available-cars", {
        withCredentials: true,
      });
      setCar(response?.data?.data);
      toast.success(response?.data?.message);
      setLoading(false);
      console.log("availablecar", response);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCar();
  }, []);
  return (
    <div className="h-lvh flex justify-center items-center content-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">
      <div className="mt-20 bg-gradient-to-r from-[#1f556b] to-[#0c485e] rounded-lg  w-5/6 h-4/5 shadow-xl">
        <h2 className="capitalize pt-4 pl-6 pb-2 text-amber-100 text-xl font-serif shadow-xl">
          available cars
        </h2>
        <div className="overflow-auto h-4/5">
          <table className="w-full border-spacing-2  border-separate">
            <thead className="sticky top-0 bg-black">
              <tr className="">
                {/* <th className="capitalize text-stone-400 font-serif ">no</th> */}
                <th className="capitalize text-stone-400 font-serif">
                  car image
                </th>
                <th className=" capitalize text-stone-400 font-serif">
                  car data
                </th>
                <th className="capitalize text-stone-400 font-serif">
                  dealer data
                </th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody className="">
                {car.length > 0 ? (
                  car.map((car, index) => (
                    <tr key={index} className="text-lime-100 h-80">
                      {/* <td className="">{index + 1} </td> */}
                      <td className="rounded-xl bg-gradient-to-r from-[#143d4d] to-[#073c50] p-4 w-128 bg-center">
                        <img
                          className="bg-cover h-80 hover:scale-110 transition-transform duration-300 rounded-xl"
                          src={car?.image}
                          alt="car"
                        />
                      </td>
                      <td className="w-2/6 rounded-xl pl-8 text-center bg-gradient-to-r from-[#143d4d] to-[#073c50]">
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          car name :{" "}
                          <span className="text-orange-200">
                            {car?.carName}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          car brand :{" "}
                          <span className="text-orange-200">{car?.brand}</span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          car type :{" "}
                          <span className="text-orange-200">
                            {car?.carType}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          car fueltype :{" "}
                          <span className="text-orange-200">
                            {car?.fuelType}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          rent rate :{" "}
                          <span className="text-orange-200">{car?.price}</span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          transmission :{" "}
                          <span className="text-orange-200">
                            {car?.transmission}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          car model :{" "}
                          <span className="text-orange-200">{car?.year}</span>{" "}
                        </h3>
                      </td>
                      <td className="w-2/6 rounded-xl pl-8 bg-gradient-to-r from-[#143d4d] to-[#073c50] text-center">
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          dealer name :{" "}
                          <span className="text-orange-200">
                            {car?.dealer?.name || "null"}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          email id :{" "}
                          <span className="text-orange-200">
                            {car?.dealer?.email || "null"}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          phone :{" "}
                          <span className="text-orange-200">
                            {car?.dealer?.phone || "null"}
                          </span>{" "}
                        </h3>
                        <h3 className="capitalize text-lg font-serif text-gray-300">
                          role :{" "}
                          <span className="text-orange-200">
                            {car?.dealer?.role || "null"}
                          </span>{" "}
                        </h3>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AvailableCars;
