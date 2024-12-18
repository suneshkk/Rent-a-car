import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import Loader from '../../components/util/Loader.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Booking() {
    const [carData, setCarData] = useState({});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [dLicence, setDLicence] = useState("")
    const [totalHours, setTotalHours] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [review, setReview] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate()

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
            // console.log("populate admin", response)
            toast.success("Car data fetched successsfully")
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("something went wrong")
        };
    };
    useEffect(() => {
        fetchCarDetailes();
    }, [])


    const handleBookeCa = async () => {
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
                adminId:carData?.adminId,
            };
            console.log("data",data)
            if (!dLicence || !fromDate || !toDate) {
                toast.error("All field required");
            };
            if (fromDate >= toDate) {
                toast.error("Invalid Date Range, Please Select valid date")

            };
            const response = await axiosInstance.post(`/rental/booking/${id}`, data,
                {
                    withCredentials: true,
                });
            if (response?.data?.data) {
                toast.success("Car Booked Successfully");
                navigation('/user/profile');

            }
        } catch (error) {
            console.error(error);
        };
    };

    const fetchCarReview = async () => {

        try {

            const response = await axiosInstance.get(`/review/car-review/${id}`, { withCredentials: true })
            setReview(response?.data?.data);
            // console.log("review  ==",response);
        } catch (error) {
            toast.error("somthing went Wrong in review fetching");
            console.log(error);
            setFetchReview(false);
        };
    };
    useEffect(() => {
        fetchCarReview();
    }, [])



    return (
        <div className="mb-7 mx-3">
            {/* Header Section */}
            <div className="bg-slate-600 bg-cover h-16 flex items-center justify-between px-4 rounded-md shadow-md">
                <div className="flex-1">
                    <Link to="/user/profile">
                        <h4 className="ml-4 font-extrabold text-slate-300 hover:text-white transition-colors">
                            Profile
                        </h4>
                    </Link>
                </div>
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-red-200 sm:text-indigo-800 md:text-orange-400 lg:text-red-600 xl:text-black">
                    Car Booking Window...!
                </h1>
                <div className="flex-1"></div>
            </div>

            <div className="container mx-auto min-h-screen flex items-center justify-center">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex w-full flex-col lg:flex-row mt-4 gap-6">
                        <div className="card bg-orange-300 shadow-lg rounded-lg p-4 flex-grow">
                            <div className="rounded mb-4 overflow-hidden">
                                <img
                                    src={carData?.image}
                                    alt="Car"
                                    className=" h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="space-y-3 text-gray-700">
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
                                <div className="flex justify-center">
                                    <Link to={`/user/add-review/${carData?._id}`}>
                                        <button className="text-blue-500 hover:underline font-bold">
                                            Add Rating And Review
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="divider lg:divider-horizontal"></div>

                        <div className="card bg-orange-300 shadow-lg rounded-lg p-6 flex flex-col gap-6">
                            <h1 className="text-xl lg:text-2xl font-bold text-center text-slate-800 underline">
                                Please Select Your Time and Date
                            </h1>

                            <div className="flex items-center gap-4">
                                <label className="font-bold text-lg">From Date:</label>
                                <DatePicker
                                    selected={fromDate}
                                    required
                                    onChange={(date) => setFromDate(date)}
                                    minDate={new Date()}
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy, h:mm a"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="font-bold text-lg">To Date:</label>
                                <DatePicker
                                    selected={toDate}
                                    required
                                    onChange={(date) => setToDate(date)}
                                    minDate={new Date()}
                                    showTimeSelect
                                    dateFormat="MM/dd/yyyy, h:mm a"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-lg">Driving License Number:</label>
                                <input
                                    type="text"
                                    value={dLicence}
                                    onChange={(e) => setDLicence(e.target.value)}
                                    placeholder="Enter: 55/14391/2016"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="text-gray-700">
                                <p className="font-bold text-lg">
                                    Rent per hour: <span className="font-semibold">{carData?.price}</span>
                                </p>
                                {totalHours !== null && (
                                    <p className="font-bold text-lg">
                                        Total Hours: <span className="font-semibold">{totalHours.toFixed()}</span>
                                    </p>
                                )}
                                {totalAmount !== null && (
                                    <p className="font-bold text-lg">
                                        Total Amount: <span className="font-semibold">{totalAmount.toFixed()}</span>
                                    </p>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleBookeCa}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Reviews</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {review.length > 0 ? (
                        review.map((rev, index) => (
                            <div
                                key={rev._id}
                                className="bg-white p-4 rounded-lg shadow-md"
                            >
                                <h4 className="font-bold text-gray-800">
                                    {rev?.userId?.name }
                                </h4>
                                <p className="text-gray-600">
                                    <b>Comment:</b> {rev?.comment}
                                </p>
                                <p className="text-gray-600">
                                    <b>Rating:</b> {rev?.rating }
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Booking
