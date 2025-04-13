// import React, { useEffect, useState } from 'react'
// import { axiosInstance } from '../../config/axiosInstance.jsx';
import HeroImage from "../../../src/assets/hero.png";
import Car1 from "../../../src/assets/car1.png";
import Car2 from "../../../src/assets/car2.png";
import Car3 from "../../../src/assets/car3.png";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

// import { Link } from 'react-router-dom';
// import Loader from '../../components/util/Loader.jsx';
// import CarList from '../../components/Cards.jsx'

function UserHome() {
  const [profile, setProfile] = useState([]);
  const [bookedCar, setBookedCar] = useState([]);
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();
  const fetchBookedCarDetails = async () => {
    try {
      const response = await axiosInstance.get(`/rental/user-booked-car`, {
        withCredentials: true,
      });
      setBookedCar(response?.data?.data);
      console.log("booked car detailes ", response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/profile", {
        withCredentials: true,
        timeout: 10000,
      });

      setProfile(response?.data?.data);
      console.log("user profile", response);
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };
  const fetchUserPayment = async () => {
    try {
      const response = await axiosInstance.get("/payment/user-payment", {
        withCredentials: true,
      });
      setPayment(response?.data?.data);
      console.log("payment", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchBookedCarDetails();
    fetchUserPayment();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/user/logout/",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/");
      toast.success("logout-success");
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      console.log("session+++++", stripe);

      const session = await axiosInstance.post(
        "/payment/create-checkout-session",
        { bookedCar },
        { withCredentials: true }
      );
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePayment = async () => {
    try {
      const response = await axiosInstance.delete(
        `/payment/delete-payment/${payment?._id}`,
        { withCredentials: true }
      );
      toast.success(response?.dada?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e]">
      <div className="grid">
        <div className="flex justify-between items-center mt-20  bg-gradient-to-r from-[#061419] via-[#072e3f] to-[#072a38] h-14 shadow-xl  w-full">
          <div className="ml-5 flex gap-5">
            <h2 className="text-slate-400 hover:scale-110 hover:text-slate-300 capitalize text-xl font-serif">
              <Link to="/user/car-Gallery"> available cars</Link>
            </h2>
            <h2 className="text-slate-400 hover:scale-110 hover:text-slate-300 capitalize text-xl font-serif">
              <Link to={"/user/all-cars"}> car gallery</Link>
            </h2>
          </div>
          <div>
            <div className="flex gap-5 mr-5">
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:scale-110 hover:text-slate-300 capitalize text-xl font-serif"
              >
                {" "}
                sign out
              </button>
              <Link to={`/user/updateUser/${profile?._id}`}>
                {" "}
                <h2 className="text-slate-400 hover:scale-110 hover:text-slate-300 capitalize text-xl font-serif">
                  edit account
                </h2>
              </Link>
              <Link to={`/user/delet-user/${profile?._id}`}>
                <h2 className="text-red-500 hover:scale-110 hover:text-slate-300 capitalize text-xl font-serif">
                  delete Account
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-144 grid grid-cols-2 mt-2 px-10">
        <div className="rounded-lg shadow-xl grid grid-cols-2">
          <div className="  mt-2 mx-2 h- flex flex-col  ">
            <h1 className="capitalize text-2xl text-center mb-3 font-bold text-yellow-200">
              Booked Car detailes
            </h1>
            <img
              className="rounded-xl h-40 lg:h-64 lg:w-80 bg-cover bg-center"
              src={bookedCar?.carId?.image || "car image"}
              alt={bookedCar?.carId?.carName || "null"}
            />
            <div className="">
              <div className="flex">
                <div>
                  <h2 className="text-red-200 text-lg font-semibold">
                    cancel booking
                  </h2>
                  <Link to={`/user/delete-booking/${bookedCar?._id}`}>
                    <div className="btn bg-red-500 hover:scale-110  rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50 ">
                      Cancel
                    </div>
                  </Link>
                  <span className=" text-xs font-semibold">
                    {payment?.status !== "payed" && (
                      <button
                        onClick={makePayment}
                        className="btn ml-32 btn-success hover:bg-green-900 rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50"
                      >
                        Pay now
                      </button>
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-slate-50 p-5 mt-10 font-bold  text-green-800 text-center text-2xl flex justify-between">
                <span className="">cash:{payment?.status || "Not payed"}</span>
                {payment?.status ||
                  ("payed" && (
                    <div onClick={deletePayment}>
                      <button className="btn text-red-800 font-bold">cancel</button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="  w-full">
            <div className="flex flex-col m-2">
              <h1 className="text-center text-lg font-semibold mt-2 text-slate-50">
                car data
              </h1>

              <span className="capitalize text-gray-100 text-lg font-semibold">
                car name :{bookedCar?.carId?.carName}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                car brand :{bookedCar?.carId?.brand}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                rent rate :{bookedCar?.carId?.price}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                car type :{bookedCar?.carId?.carType}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                transmission :{bookedCar?.carId?.transmission}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                model year :{bookedCar?.carId?.year}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                fuel type :{bookedCar?.carId?.fuelType}
              </span>
            </div>
            <div className=" flex flex-col ml-2">
              <h1 className="capitalize text-center text-xl font-semibold text-orange-400">
                dealer and booking data
              </h1>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                dealer name :{bookedCar?.dealer?.name}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                dealer phone :{bookedCar?.dealer?.phone}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                dealer email :{bookedCar?.dealer?.email}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                total amount :{bookedCar?.totalAmount}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                total time :{bookedCar?.totalHours}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                from date :{moment(bookedCar?.fromDate).format("DD-MM-YYYY")}
              </span>
              <span className="capitalize text-gray-100 text-lg font-semibold">
                to date :{moment(bookedCar?.toDate).format("DD-MM-YYYY")}
              </span>

              <span className="capitalize text-green-500 text-lg font-semibold">
                booking status:{bookedCar?.status}
              </span>
            </div>
          </div>
        </div>
        <div className=" flex justify-end ">
          <div className=" flex flex-col w-2/4 bg-gradient-to-r from-[#3399c1] via-[#89a9b7] to-[#4ea0c4] rounded-lg mr-4 h-144">
            <div className="border-b border-cyan-400 pb-4 mb-6">
              <h1 className="mt-7 text-center text-xl font-serif  font-semibold">
                Profile
              </h1>
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
              <span className="font-serif font-semibold">{profile?.name}</span>
            </div>
            <div className="mb-2 ml-2">
              <span className=" text-black text-base font-semibold mr-3">
                Phone:
              </span>
              <span className="font-serif font-semibold">{profile?.phone}</span>
            </div>
            <div className="mb-2 ml-2">
              <span className=" text-base font-semibold text-black mr-3">
                Email:
              </span>
              <span className="font-serif font-semibold">{profile?.email}</span>
            </div>
            <div className="mb-2 ml-2">
              <span className=" text-base font-semibold text-black mr-3">
                place:
              </span>
              <span className="font-serif font-semibold">
                {profile?.address}
              </span>
            </div>
            <div className="mb-2 ml-2">
              <span className=" text-base font-semibold text-black mr-3">
                district:
              </span>
              <span className="font-serif font-semibold">
                {profile?.district}
              </span>
            </div>
            <div className="mb-2 ml-2">
              <span className=" text-base font-semibold text-black mr-3">
                state:
              </span>
              <span className="font-serif font-semibold">{profile?.state}</span>
            </div>
          </div>
        </div>
      </div>
      {/* <section
                className=" bg-cover bg-center h-screen flex items-center justify-center"
                style={{ backgroundImage: `url(${HeroImage})` }}
            >
                <div className="bg-black bg-opacity-50 p-4 sm:p-6 md:p-10 lg:p-12 rounded-lg max-w-lg text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                        Rent Your Dream Car Today
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4">
                        Choose from a wide range of vehicles to suit your needs.
                    </p>
                </div>
            </section> */}
      {/* <div className='  lg:px-12 py-1'>
                <div className="bg-amber-100 flex h-16 sm:h-20 items-center justify-center">
                    <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center">
                        <Link to={'/user/car-gallery'}>
                            Book Your car now

                        </Link>
                    </h1>
                </div>
            </div> */}
      {/* <div className='-m-3'>
                {loading ? (<Loader />) : (
                    <div className='grid grid-cols-2 xl:grid xl:grid-cols-4 lg:flex lg:flex-wrap md:grid md:grid-cols-3 sm:flex sm:flex-wrap'>
                        {car.map((value) => (
                            <CarList car={value} key={value?._id} />
                        ))}

                    </div>
                )}
            </div> */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <div className="bg-amber-100 flex h-16 sm:h-20 items-center justify-center mb-4 sm:mb-6">
          <h1 className="font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center">
            Our Future Cars
          </h1>
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img
                src={Car1}
                alt="Car"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">
                Lamborghini SUV Urus
              </h2>
              <p className="text-gray-600 mt-2">
                Experience luxury and performance.
              </p>
            </div>
          </div>
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img
                src={Car2}
                alt="Car"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">Bentley GT</h2>
              <p className="text-gray-600 mt-2">
                Experience luxury and performance.
              </p>
            </div>
          </div>
          <div className="card bg-slate-300 w-72 sm:w-80 md:w-96 shadow-xl">
            <figure>
              <img
                src={Car3}
                alt="Car"
                className="w-full h-40 sm:h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl">
                Jaguar Land Rover
              </h2>
              <p className="text-gray-600 mt-2">
                Experience luxury and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
