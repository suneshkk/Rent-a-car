import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import Loader from '../../components/util/Loader.jsx';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function Booking() {
    const [carData, setCarData] = useState({});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [totalHours, setTotalHours] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

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
    }, [id])


    const handleDateAndTime = async () => {
        try {
            const from = moment().format('MM/dd/YYYY, h:mm:a');
            const hours = calculateTotalHours(fromDate, toDate);
            setTotalHours(hours);

            const price = carData?.price;
            const calculatedTotalAmount = hours * price;
            setTotalAmount(calculatedTotalAmount);


            const data = {
                fromDate,
                toDate,
                totalHours: hours,
                totalAmount: calculatedTotalAmount,
            };
            //             console.log(data)
            // console.log(fromDate, "fromDate")
            //  console.log(toDate, "toDate")
            //  console.log(totalHours, "totalHours")
            //  console.log(totalAmount, "totalPrice")


            const response = await axiosInstance.post(`/rental/booking/${id}`, data, {
                withCredentials: true,
            });
            console.log("response==========+", response);
            toast.success("Car Booked Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error from backend");
        }
    };



    return (
        <div>
            <div className='bg-slate-600 bg-cover h-16 flex items-center justify-center '>
                <h1 className='text-lg font-semibold text-red-200 sm:text-lg sm:font-bold sm:text-indigo-800 md:text-xl md:font-extrabold md:text-orange-400lg:text-3xl lg:font-extrabold lg:text-red-600 xl:text-4xl xl:text-black'> Car Booking Window...!
                </h1>

            </div>

            <div className='container mx-auto min-h-screen flex items-center justify-center   '>
                {loading ? (<Loader />) : (
                    <div className="flex w-full flex-col lg:flex-row mt-4">
                        <div className="card card-body bg-base-300 rounded-box h-144 flex flex-grow place-items-center">
                            <div className='card  rounded '>
                                <img src={carData?.image} alt="image" className='w-full max-w-sm rounded-lg shadow-lg' />
                            </div>
                            <div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Car Name :</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.carName}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Brand :</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.brand}</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Fuel:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.fuelType}</span>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Transmission:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.transmission}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Type:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.carType}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <label className="form-label text-gray-600 w-1/3">Year:</label>
                                    <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >{carData?.year}</span>
                                </div>
                            </div>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="card card-body bg-base-300 rounded-box grid h-144 flex-grow">
                            <h1 className='card card-title underline text-center text-xl font-bold text-slate-800'>Please select your time and date </h1>
                            <div className="bg-white p-4 flex items-center justify-between flex-col">
                                <div className="flex justify-between content-center gap-7">

                                    <div className='flex flex-col'>
                                        <label className="block text-gray-700">From Date</label>
                                        <DatePicker
                                            selected={fromDate}
                                            onChange={(date) => setFromDate(date)}
                                            showTimeSelect
                                            dateFormat="MM/dd/YYYY, h:mm:a"
                                            className="input input-bordered"
                                        />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className="block text-gray-700">To Date{moment().format('MM/D/YYYY, h:mm:a')}</label>
                                        <DatePicker
                                            selected={toDate}
                                            onChange={(date) => setToDate(date)}
                                            showTimeSelect
                                            dateFormat="MM/dd/YYYY, h:mm:a"
                                            className="input input-bordered"
                                        />
                                    </div>

                                </div>
                                <div className="mt-4 text-xl font-semibold text-gray-700">
                                    Rent per hour:{carData?.price}
                                </div>
                                <h1 className="mt-4 text-xl font-semibold text-gray-700">Total Hours:</h1>
                                {totalHours !== null && (
                                    <div className="mt-4 text-xl font-semibold text-gray-700">
                                        {totalHours.toFixed()}
                                    </div>
                                )}
                                {totalAmount !== null && (
                                    <div>total amount:{totalAmount.toFixed()}</div>
                                )}
                                {/* Submit Button */}
                                <button
                                    onClick={handleDateAndTime}
                                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                                >
                                    Book Now
                                </button>
                            </div>

                        </div>

                    </div>
                )}
            </div >
        </div>
    )
}

export default Booking
