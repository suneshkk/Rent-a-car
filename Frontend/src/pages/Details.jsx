import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { axiosInstance } from '../config/axiosInstance.jsx';
import Loader from '../components/util/Loader.jsx';
import toast from 'react-hot-toast';

function Details() {
    const [carDetails, setCarDetails] = useState({});
    const [fetchLoading, setFetchLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState([]);
    const { id } = useParams();
    const [fetchReview, setFetchReview] = useState(false);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setReviewLoading(true)
    //     try {
    //         const response = await axiosInstance.post(`/review/add-review/${id}`,
    //             { comment, rating },
    //             { withCredentials: true });

    //         console.log("Response data:", response.data);
    //         toast.success("Review was added successfully");
    //         setReviewLoading(false)


    //     } catch (error) {
    //         toast.error("something went wrong adding review")
    //         console.log(error);
    //         setReviewLoading(false);
    //     };
    // };

    // const fetchCarReview = async () => {
    //     setFetchReview(true);
    //     try {
    //         const response = await axiosInstance.get(`/review/car-review/${id}`, { withCredentials: true })
    //         setReview(response?.data?.data);
    //         console.log("fetch====+", response)
    //         setFetchReview(false);
    //     } catch (error) {
    //         toast.error("somthing went Wrong review fetching");
    //         console.log(error);
    //         setFetchReview(false);
    //     };
    // };
    // useEffect(() => {
    //     fetchCarDetailes();
    //     fetchCarReview();
    // }, [id])

    return (
        <div className=" ">
            <div>
                {fetchLoading ? (<Loader />) : (
                    <div className="card bg-white shadow-2xl rounded-lg px-10 py-8 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/6">


                        <div className="flex justify-center md:justify-start">
                            <img src={carDetails?.image} alt="car" className="w-full max-w-sm rounded-lg shadow-lg" />
                        </div>
                        <form className="card card-body space-y-4">
                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Car Name :</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.carName}</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Car Brand :</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.brand}</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Fuel Type :</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.fuelType}</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Transmission:</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.transmission}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Car Type:</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.carType}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Year:</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.year}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="form-label text-gray-600 w-1/3">Rent Price:</label>
                                <span className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >{carDetails?.price}</span>
                            </div>

                        </form>
                    </div>



                )}
            </div>
            <div>
                {reviewLoading ? (<Loader />) : (
                    <div onSubmit={handleSubmit} className='"card lg:h-1/2 lg:w-2/6 bg-white shadow-2xl rounded-lg px-5 py-4 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2'>
                        <h1 className='card card-title p-3'>Add your Review here</h1>
                        <div className=" flex items-center space-x-4 pt-3 pb-4 ">
                            <label className="form-label text-gray-600 w-1/3"> Comment:</label>
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className=" border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Rating:</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div className="text-center mt-6 flex-none">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition ease-in-out duration-300"
                            >
                                save
                            </button>

                        </div>
                    </div>

                )}
            </div>
            <div className='card'>
                {fetchReview ? (<Loader />) : (

                    <table className='card card-body table text-center '>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Commend</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {review.length > 0 ? (
                                review.map((rev) => (
                                    <tr key={rev?._id}>
                                        <td>{rev?.userId?.name}</td>

                                        <td>{rev?.comment}</td>
                                        <td>{rev?.rating}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No reviewavailable</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div >
    )
}

export default Details

