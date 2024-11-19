import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from '../../config/axiosInstance.jsx';
import Loader from '../../components/util/Loader';
import { useParams } from 'react-router-dom';



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
      console.log(response, "from booking")
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
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axiosInstance.post('/payment/create-checkout-session',
        { products: bookingData },
        { withCredentials: true }
      );
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    };
  };


  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-400 bg-cover '>
      {loading ? (<Loader />) : (
        <div>
        <h1>{bookingData?.totalAmount}</h1>
        <button onClick={makePayment} className="btn btn-success">Checkout</button>

        </div>
        
      )}

    </div>
  )
}

export default Payment
