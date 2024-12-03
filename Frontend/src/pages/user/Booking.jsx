import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import Loader from '../../components/util/Loader.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';

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
            };
            if (fromDate >= toDate) {
                toast.error("Invalid Date Range, Please Select valid date")
            }
            const response = await axiosInstance.post(`/rental/booking/${id}`, data,
                {
                    withCredentials: true,
                });
            if (response?.data?.data) {
                toast.success("Car Booked Successfully");
                // console.log(response, "resData")
                navigation('/user/payment');

            }
        } catch (error) {
            console.error(error);
            // toast.error("Afield required")
        };
    };

    const fetchCarReview = async () => {

        try {

            const response = await axiosInstance.get(`/review/car-review/${id}`, { withCredentials: true })
            setReview(response?.data?.data);
        } catch (error) {
            toast.error("somthing went Wrong review fetching");
            console.log(error);
            setFetchReview(false);
        };
    };
    useEffect(() => {
        fetchCarReview();
    }, [])



    return (
        <div className='mb-7 mx-3'>
            <div className='bg-slate-600 bg-cover h-16 flex items-center justify-between '>
                <div className='flex-1 '>
                    <Link to={"/user/profile"}>
                        <h4 className='ml-4 font-extrabold text-slate-300'>Profile</h4>
                    </Link>


                </div>
                <h1 className='text-lg font-semibold text-red-200 sm:text-lg sm:font-bold sm:text-indigo-800 md:text-xl md:font-extrabold md:text-orange-400lg:text-3xl lg:font-extrabold lg:text-red-600 xl:text-4xl xl:text-black'>
                    Car Booking Window...!
                </h1>
                <div className='flex-1'></div>

            </div>

            <div className='container mx-auto min-h-screen flex items-center justify-center   '>
                {loading ? (<Loader />) : (
                    <div className="flex w-full flex-col lg:flex-row mt-4">
                        <div className="card card-body rounded-box lg:h-144 flex flex-grow place-items-center bg-orange-300">
                            <div className='card  rounded mb-3'>
                                <img src={carData?.image} alt="image" className=' lg:w-full lg:max-w-sm rounded-lg shadow-lg ' />
                            </div>
                            <div className='lg:size-96'>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Name :</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.carName}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Brand :</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.brand}</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Fuel:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.fuelType}</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Transmission:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.transmission}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Type:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.carType}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-black font-bold w-1/3">Year:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md bg-white font-serif font-bold"
                                    >{carData?.year}</span>
                                </div>
                                <button className='mt-4 btn-ghost'>
                                    <Link to={`/user/add-review/${carData?._id}`}>
                                        <p className='text-blue-500'><b>Add Rating And Review</b></p>
                                    </Link>
                                </button>
                            </div>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="car dbg-base-300 rounded-box grid h-144 flex-grow">
                            <div className=" card card-body bg-orange-300  p-4 flex items-center justify-between flex-col">
                                <div className="flex flex-col justify-between content-center gap-7">
                                    <h1 className='card card-title underline text-center lg:text-xl font-bold text-slate-800'>Please select your time and date </h1>

                                    <div className="flex">
                                        <label className="text-lg font-bold text-white w-1/">From Date:</label>
                                        <DatePicker
                                            selected={fromDate}
                                            required:true
                                            onChange={(date) => setFromDate(date)}
                                            minDate={new Date()}
                                            showTimeSelect
                                            dateFormat="MM/dd/yyyy, h:mm a"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <hr />

                                    <div className="flex ">
                                        <label className="text-lg font-bold text-white">
                                            To Date  :
                                        </label>
                                        <DatePicker
                                            selected={toDate}
                                            required:true
                                            onChange={(date) => setToDate(date)}
                                            minDate={new Date()}
                                            showTimeSelect
                                            dateFormat="MM/dd/yyyy, h:mm a"
                                            className="input input-bordered"
                                        />
                                    </div>
                                    <hr />
                                    <div className="flex flex-col">
                                        <label className="text-lg font-bold text-white">
                                            Driving License Number:
                                        </label>
                                        <input
                                            type="text"
                                            value={dLicence}
                                            onChange={(e) => setDLicence(e.target.value)}
                                            placeholder="enter:55/14391/2016"
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                    <hr />
                                </div>
                                <div className="mt-4 text-xl font-semibold text-gray-700">
                                    Rent per hour:{carData?.price}
                                </div>
                                <div className='flex'>
                                    <h1 className="mt-4 text-xl font-semibold text-gray-700">Total Hours:</h1>
                                    <span>
                                        {totalHours !== null && (
                                            <div className="mt-4 text-xl font-semibold text-gray-700">
                                                {totalHours.toFixed()}
                                            </div>
                                        )}

                                    </span>

                                </div>
                                {totalAmount !== null && (
                                    <div>total amount:{totalAmount.toFixed()}</div>
                                )}

                                <button className="lg:mt-6 lg:px-4 lg:py-2  hover:bg-amber-600 text-blue-600 rounded-md font-bold" onClick={handleBookeCa}>
                                    Book Now
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </div >
            <div className='divider lg:divider-vertical'>Review</div>
            <div className='flex '>
                <div className="reviews-container grid">
                    {review.length > 0 ? (
                        review.map((rev) => (
                            <div className="card">
                                <div className="card-header">
                                    <h4>{rev?.userId?.name || "Anonymous"}</h4>
                                </div>
                                <div className="card-body">
                                    <p><b>Comment:</b> {rev?.comment || "No comment provided"}</p>
                                    <p><b>Rating:</b> {rev?.rating || "No rating given"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-reviews">
                            <p>No reviews available</p>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Booking
