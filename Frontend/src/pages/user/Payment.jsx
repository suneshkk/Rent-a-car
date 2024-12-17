import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from '../../config/axiosInstance.jsx';
import Loader from '../../components/util/Loader';
import { Link } from 'react-router-dom';



function Payment() {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBookedCarDetails = async () => {
    
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/rental/booked-car`,
        { withCredentials: true });
      setLoading(false);
      setBookingData(response?.data?.data);
      console.log("booking data======",response) 
    } catch (error) {
      console.log(error);
      setLoading(false);
    };
  };

  useEffect(() => {

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


  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-400 bg-cover '>
                <div className="flex">
                  <Link to={"/user/profile"}>
                    <button className='btn btn-info text-white hover:bg-cyan-400' >Home</button>
                  </Link>
                </div>
      
      {loading ? (<Loader />) : (
        <div className='card card-body bg-cover bg-amber-300 m-60'>
          <h1 className='card card-title'><b>Confirm Your payment</b></h1>
        <button onClick={makePayment} className="btn btn-success"><b>Pay Now</b></button>

        </div>
        
      )}

    </div>
  )
}

export default Payment
