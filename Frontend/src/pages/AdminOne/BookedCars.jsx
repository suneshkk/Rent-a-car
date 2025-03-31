import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/util/Loader";

function BookedCars() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState();

  const fetchBookedCar = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/rental/all-booked-cars", {
        withCredentials: true,
      });
      setLoading(false);
      setRental(response?.data?.data);
      toast.success(response?.data?.message);
      console.log("car data", response);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookedCar();
  }, []);
  return (
    <div className="h-screen content-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">
      <div className="h-5/6 mx-5 mt-20 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-[#22576c] to-[#2480a8]">
        <h2 className="text-xl font-bold mb-4 text-white">User Data</h2>
        <div className="overflow-y-auto h-5/6 border border-cyan-800 rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full border-separate">
              <thead className="border top-0 sticky bg-gradient-to-r from-[#143f4f] to-[#075678]">
                <tr className="text-white">
                  <th className="text-white capitalize">no</th>
                  <th className="text-white">car image</th>
                  <th className="text-white">car data</th>
                  <th className="text-white">user</th>
                  <th className="text-white">dealer</th>
                  <th className="text-white">status</th>
                </tr>
              </thead>
              <tbody className="  bg-gradient-to-r from-[#214f60] to-[#104257]">
                {rental.length > 0 ? (
                  rental.map((rental, index) => (
                    <tr key={index} className="text-black h-52 ">
                      <td className="w-16 text-center text-white font-bold ">{index + 1}</td>
                      <td className="w-52 overflow-hidden p-2">
                        <img
                          className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                          src={rental?.carId?.image}
                          alt="car"
                        />
                      </td>
                      <td className="pl-8 w-72 capitalize text-base font-bold">
                        <h3 className="">
                          Car brand :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.carId?.brand}
                          </span>
                        </h3>
                        <h3>
                          Car name :{" "}
                          <span className=" ml-6 text-white">
                            {rental?.carId?.carName}
                          </span>
                        </h3>
                        <h3>
                          fuel type :{" "}
                          <span className=" ml-6 text-white">
                            {rental?.carId?.fuelType}
                          </span>
                        </h3>
                        <h3>
                          transmission :
                          <span className="text-white">
                            {rental?.carId?.transmission}
                          </span>
                        </h3>
                        <h3>
                          car type :{" "}
                          <span className=" ml-6 text-white">
                            {rental?.carId?.carType}
                          </span>
                        </h3>
                      </td>
                      <td className=" pl-8 capitalize text-base font-bold">
                        <h3 className="">
                          user name :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.userId?.name}
                          </span>
                        </h3>
                        <h3 className="">
                          phone :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.userId?.phone}
                          </span>
                        </h3>
                        <h3 className="">
                          email id :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.userId?.email}
                          </span>
                        </h3>

                        <h3 className="">
                          address :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.userId?.address || "null"}
                          </span>
                        </h3>
                      </td>
                      <td className="pl-8  capitalize text-base font-bold">
                        <h3 className="">
                          name :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.dealerId?.name || "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          phone :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.dealerId?.phone || "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          email id :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.dealerId?.email || "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          company name :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.userId?.companyName || "null"}
                          </span>
                        </h3>
                      </td>
                      <td className="pl-8 w-auto capitalize text-base font-bold">
                        from date :{" "}
                        <span className="ml-6 text-white">
                          {rental?.fromDate
                            ? new Date(rental.fromDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "null"}
                        </span>
                        <h3 className="">
                          to date :{" "}
                          <span className="ml-6 text-white">
                            {rental?.toDate
                              ? new Date(rental.toDate).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          total amount :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.totalAmount || "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          total hours :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.totalHours|| "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          user licence :{" "}
                          <span className=" ml-6 text-white ">
                            {rental?.dLicence|| "null"}
                          </span>
                        </h3>
                        <h3 className="">
                          status :{" "}
                          <span className=" ml-6 text-green-700 ">
                            {rental?.status || "null"}
                          </span>
                        </h3>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No  data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookedCars;
