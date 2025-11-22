import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import toast from "react-hot-toast";
import Loader from "../../components/util/Loader.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [carData, setCarData] = useState({});
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [dLicence, setDLicence] = useState("");
  const [totalHours, setTotalHours] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [review, setReview] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate("");
  //    console.log("car-=====data",carData);
  // Function to calculate total hours
  const calculateTotalHours = (fromDate, toDate) => {
    // Calculate the difference in milliseconds
    const differenceInMs = toDate - fromDate;

    // Convert milliseconds to hours
    const totalHours = Math.round(differenceInMs / (1000 * 60 * 60));

    return totalHours;
  };

  const fetchCarDetailes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/car/get-car/${id}`, {
        withCredentials: true,
      });
      setLoading(false);
      setCarData(response?.data?.data);
      console.log("car data", response);
      toast.success("Car data fetched successsfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchCarDetailes();
  }, []);

  const handleBookeCar = async () => {
    try {
      const hours = calculateTotalHours(fromDate, toDate);
      setTotalHours(hours);

      const price = carData?.price;
      const calculatedTotalAmount = hours * price;
      setTotalAmount(calculatedTotalAmount);
      const data = {
        dLicence,
        fromDate,
        toDate,
        totalHours: hours,
        totalAmount: calculatedTotalAmount,
        dealer: carData?.dealer,
        review:review,
      };
      console.log("data", data);
      if (!dLicence || !fromDate || !toDate) {
        toast.error("All field required");
      }
      if (fromDate >= toDate) {
        toast.error("Invalid Date Range, Please Select valid date");
      }
      const response = await axiosInstance.post(`/rental/booking/${id}`, data, {
        withCredentials: true,
      });
      console.log("booking data", response);
      if (response?.data?.data) {
        toast.success("Car Booked Successfully");
        navigation("/user/home");
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.error(error.response.data.message);
    }
  };

  const fetchCarReview = async () => {
    try {
      const response = await axiosInstance.get(`/review/get-review/${id}`, {
        withCredentials: true,
      });
      setReview(response?.data?.data);
      console.log("review  ==", response);
    } catch (error) {
      console.log(error);
      // setFetchReview(false);
    }
  };
  useEffect(() => {
    fetchCarReview();
  }, []);

  return (
    <div className="mb-1 bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e]">
      <div className="p-10 mx-auto min-h-screen flex items-center justify-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="shadow-xl rounded-lg flex lg:w-full flex-col lg:p-6 lg:flex-row mt-24 gap-6">
            <div className="shadow-lg rounded-lg p-4 lg:w- lg:flex lg:flex-row lg:w-3/5">
              <div className="flex lg:flex-col lg:flex-grow">
                <div className="rounded object-cover  mb-4 overflow-hidden">
                  <img
                    src={carData?.image}
                    alt={carData?.carName}
                    className=" h-64 w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-3 bg-white text-gray-700 rounded-lg p-2">
                  <div className="flex items-center">
                    <label className="font-bold w-1/3">Name:</label>
                    <span className="flex-1 bg-white px-4 py-2 rounded-md shadow-inner">
                      {carData?.carName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <label className="font-bold w-1/3">Brand:</label>
                    <span className="flex-1 bg-white px-4 py-2 rounded-md shadow-inner">
                      {carData?.brand}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <label className="font-bold w-1/3">Fuel:</label>
                    <span className="flex-1 bg-white px-4 py-2 rounded-md shadow-inner">
                      {carData?.fuelType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <label className="font-bold w-1/3">Transmission:</label>
                    <span className="flex-1 bg-white px-4 py-2 rounded-md shadow-inner">
                      {carData?.transmission}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <label className="font-bold w-1/3">Year:</label>
                    <span className="flex-1 bg-white px-4 py-2 rounded-md shadow-inner">
                      {carData?.year}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-2/4 bg-white mx-2 rounded-lg p-2">
                <div className="mt-1 flex flex-col">
                  <h2 className="text-1xl font-bold text-black text-center ">
                    Customer Reviews <hr />
                  </h2>
                  <div className=" overflow-y-auto max-h-96 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {review.length > 0 ? (
                      review.map((rev) => (
                        <div
                          key={rev._id}
                          className=" p-4 rounded-lg shadow-md"
                        >
                          <h4 className="font-bold text-gray-800">
                            {rev?.userId?.name}
                          </h4>
                          <p className="text-gray-600">
                            <b>Comment:</b> {rev?.comment}
                          </p>
                          <p className="text-gray-600">
                            <b>Rating:</b> {rev?.rating}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No reviews available</p>
                    )}
                  </div>
                </div>
                <div className="">
                  <Link to={`/user/add-review/${carData?._id}`}>
                    <h2 className="text-blue-500 text-center mt-10 hover:underline font-bold">
                      Add Rating And Review
                    </h2>
                  </Link>
                </div>
              </div>
            </div>

            <div className="divider lg:divider-horizontal"></div>

            <div className=" card bg-white shadow-lg rounded-lg p-3  flex flex-col flex-grow gap-6">
              <h1 className="text-xl text-orange-600  capitalize lg:text-2xl font-bold text-center ">
                Book your car now <hr />
              </h1>
              <div className="flex rounded-md p-4 justify-center items-center">
                <div className=" items-center ">
                  <label className="font-bold text-base">From Date:</label>
                  <DatePicker
                    selected={fromDate}
                    required
                    onChange={(date) => setFromDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy, h:mm a"
                    className="input input-bordered border-4 border-orange-600 w-full"
                  />
                </div>

                <div className="items-center ">
                  <label className="font-bold text-base">To Date:</label>
                  <DatePicker
                    selected={toDate}
                    required
                    onChange={(date) => setToDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy, h:mm a"
                    className="input input-bordered w-full border-4 border-orange-600"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-lg">
                  Driving License Number:
                </label>
                <input
                  type="text"
                  value={dLicence}
                  onChange={(e) => setDLicence(e.target.value)}
                  placeholder="Enter: 55/14391/2016"
                  className="input input-bordered w-2/4 border-4 border-orange-600"
                  required
                />
              </div>

              <div className="text-gray-700">
                <p className="font-bold text-lg text-orange-600">
                  Rent per hour:{" "}
                  <span className="font-semibold">{carData?.price}</span>
                </p>
                {totalHours !== null && (
                  <p className="font-bold text-lg">
                    Total Hours:{""}
                    <span className="font-semibold">
                      {totalHours.toFixed()}
                    </span>
                  </p>
                )}
                {totalAmount !== null && (
                  <p className="font-bold text-lg">
                    Total Amount:{" "}
                    <span className="font-semibold">
                      {totalAmount.toFixed()}
                    </span>
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleBookeCar}
                  className=" px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
