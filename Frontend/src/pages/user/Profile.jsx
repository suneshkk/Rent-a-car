import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/util/Loader.jsx';
import moment from 'moment'
import { loadStripe } from "@stripe/stripe-js";


function Profile() {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true)
    const [bookingData, setBookedCar] = useState([]);
    const navigate = useNavigate();


    const fetchUserProfile = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get('/user/profile',
                {
                    withCredentials: true,
                    timeout: 10000

                });
            setLoading(false);

            setProfile(response?.data?.data);
            // toast.success("welcome");

        } catch (error) {
            toast.error("something went wrong");
            console.log(error);
            setLoading(false);
        };
    };
    const fetchBookedCarDetails = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/rental/booked-car`,
                { withCredentials: true });
            setLoading(false);
            setBookedCar(response?.data?.data);
            console.log("booked car detailes ", response);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        fetchUserProfile();
        fetchBookedCarDetails();
    }, []);
    const makePayment = async () => {
        try {
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHEBLE_KEY);
          const session = await axiosInstance.post('/payment/create-checkout-session',
            { bookingData },
            { withCredentials: true }
          );
        // console.log("session+++++",session)
          const result = stripe.redirectToCheckout({
            sessionId: session.data.sessionId,
          });
        } catch (error) {
          console.log(error);
        };
      };
    


    const handleLogout = async () => {

        try {
            const response = await axiosInstance.post('/user/logout/', {},
                {
                    withCredentials: true
                });

            navigate('/')
            toast.success("logout-success")
        } catch (error) {
            console.log(error);
        };
    };





    return (
        <div className="min-h-screen lg:min-h-screen p-2 bg bg-cover bg-orange-100">
            {loading ?
                (<Loader />) : (

                    <div className=" mb-20">
                        <div className=''>

                            <div className="drawer z-50">
                                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">Drawer</label>
                                </div>
                                <div className="drawer-side  ">
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                                    <ul className="menu bg-cyan-700 text-base-content min-h-full w-80 p-4">
                                        {/* Sidebar content here */}
                                        <li className="content-center m-4">
                                            <h2 className=" font-bold text-base text-amber-600">Dashboard</h2>
                                        </li>
                                        <hr />
                                        <li className="content-start ">
                                            <Link to="/user/car-Gallery" >
                                                <h1 className=" text-white font-bold">Car Gallery</h1>
                                            </Link>
                                        </li>

                                        <hr />

                                        <li>
                                            <Link to={`/user/updateUser/${profile?._id}`}>
                                                <button ><h1 className=" text-white font-bold">Edit Account</h1></button>
                                            </Link>

                                        </li>
                                        <hr />
                                        <li>
                                            <button className='' onClick={handleLogout}><h1 className=" text-white font-bold">Sign Out</h1></button>
                                        </li>
                                        <hr />
                                        <li>
                                            <Link to={`/user/delet-user/${profile?._id}`}>
                                                <button><h1 className=" text-red-700 font-bold">Delete Account</h1></button>

                                            </Link>

                                        </li>
                                        <hr />
                                        <li>


                                        </li>
                                        <hr />

                                    </ul>
                                </div>
                            </div >
                        </div>

                        <div className='flex justify-center items-center'>
                            <div className="car  size-72 car-body bg-orange-50  text-black rounded-lg max-w-md lg:size-80">
                                <div className="border-b border-cyan-400 pb-4 mb-6">
                                    <h1 className=" text-center text-indigo-500 font-serif text-base font-semibold">Profile</h1>
                                </div>
                                <div>
                                    <img
                                        src={profile?.profilePic}
                                        alt="profile-pic"
                                        className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
                                    />

                                </div>
                                <div className="mb-2 ml-2">
                                    <span className="mr-3 text-base font-semibold">Name :</span>
                                    <span className='font-serif font-semibold'>{profile?.name}</span>
                                </div>
                                <div className="mb-2 ml-2">
                                    <span className=" text-black text-base font-semibold mr-3">Phone:</span>
                                    <span className='font-serif font-semibold'>{profile?.phone}</span>
                                </div>
                                <div className="mb-2 ml-2">
                                    <span className=" text-base font-semibold text-black mr-3">Email:</span>
                                    <span className='font-serif font-semibold'>{profile?.email}</span>
                                </div>
                                <div className='flex justify-evenly'>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            <div className="divider lg:divider-vertical text-sm lg:text-lg font-serif font-bold text-amber-950">Your Booking</div>
            <div className='m-8 lg:m-10'>
                <div className='flex flex-col  md:flex md:flex-row lg:flex lg:flex-row card card-body bg-cover backdrop-brightness-90 '>
                    <div className='card card-body bg-slate-400'>
                        <h3 className='border-b-4 text-sm font-bold text-center font-serif  lg:text-lg lg:font-semibold'>Boooking Details</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <label className='text-sm   lg:text-base font-medium'><b>Total Amount :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b className='text-blue-600'>{bookingData?.totalAmount}</b></span>
                            </li>
                            <hr />
                            <li>
                                <label className='text-sm   lg:text-base font-medium'><b className=''>Booking Status :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b className='text-green-700'>{bookingData?.status}</b></span>
                            </li>
                            <hr />
                            <li>
                                <label className='text-sm   lg:text-base font-medium'><b>Total hours :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{bookingData?.totalHours
                                }</b></span>
                            </li>
                            <hr />

                            <li>
                                <label className='text-sm   lg:text-base font-medium'><b>From Date:</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{moment(bookingData?.fromDate).format('DD-MM-YYYY')}</b></span>
                            </li>
                            <hr />
                            <li >
                                <label className='text-sm   lg:text-base font-medium'><b>Todate Date:</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{moment(bookingData?.toDate).format('DD-MM-YYYY')}</b></span>
                            </li>
                            <hr />

                        </ul>




                    </div>
                    <div className='divider divider-vertical'></div>
                    <div className='card card-body bg-slate-400'>
                        <h3 className='border-b-4 text-sm font-bold text-center font-serif  lg:text-lg lg:font-semibold'>Booked Car Details</h3>
                        <ul className="mt-3 space-y-2">
                            <li>
                                <label className='text-sm  lg:text-base font-medium'><b>Rent Per Hour :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{bookingData?.carId?.price}</b></span>
                            </li>
                            <hr />
                            <li>
                                <label className='text-sm  lg:text-base font-medium'><b>Car Name :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{bookingData?.carId?.carName}</b></span>
                            </li>
                            <hr />
                            <li>
                                <label className='text-sm  lg:text-base font-medium'><b>Fueltype :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{bookingData?.carId?.fuelType}</b></span>
                            </li>
                            <hr />
                            <li>
                                <label className='text-sm  lg:text-base font-medium'><b>driving :</b> </label>
                                <span className='text-sm lg:text-base font-medium'><b>{bookingData?.carId?.transmission}</b></span>
                            </li>
                            <hr />

                        </ul>
                        <div className=' flex justify-evenly'>
                            <Link to={`/user/delete-booking/${bookingData?._id}`}>
                            <div className='btn bg-red-500 hover:bg-red-800 rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50 '>Cancel</div>
                          </Link>

                            <span className='textarea text-xs font-semibold'>confirme your payment : <button onClick={makePayment} className='btn btn-success hover:bg-green-900 rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50'>Pay</button> </span>


                        </div>

                    </div>
                    <div className='flex justify-center items-center card card-body bg-slate-400 '>
                        <h3 className=' border-b-4 text-sm font-bold text-center font-serif  lg:text-lg lg:font-semibold'>Car</h3>
                        <img src={bookingData?.carId?.image} alt="car image" className='md:w-40 lg:w-80' />
                    </div>


                </div>

            </div>
        </div >
    );
}

export default Profile;
