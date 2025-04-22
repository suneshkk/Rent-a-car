import React, { useEffect } from "react";

function RentalCard({bookedCar}) {
//   const [bookedCar, setBookedCar] = useState([]);

//   const fetchBookedCarDetails = async () => {
//     // setLoading(true);
//     try {
//       const response = await axiosInstance.get(`/rental/user-booked-car`, {
//         withCredentials: true,
//       });
//     //   setLoading(false);
//       setBookedCar(response?.data?.data);
//       console.log("booked car detailes ", response);
//     } catch (error) {
//     //   setLoading(false);
//       console.log(error);
//     }
//   };
//   useEffect(fetchBookedCarDetails(), []);
  return (
    <div className="rounded-lg shadow-xl grid grid-cols-2">
      {bookedCar.length > 0 ? (
        bookedCar.map((car) => (
          <div key={car._id}>
            <div className="mt-2 mx-2 flex flex-col">
              <h1 className="capitalize text-2xl text-center mb-3 font-bold text-yellow-200">
                Booked Car details
              </h1>
              <img
                className="text-white rounded-xl h-40 lg:h-64 lg:w-80 bg-cover bg-center"
                src={car?.carId?.image || "car image"}
                alt={car?.carId?.carName || "null"}
              />
              <div>
                <div className="flex">
                  <div className="flex mt-3 items-center justify-between w-full">
                    {car?.status === "booked" && (
                      <Link to={`/user/delete-booking/${car?._id}`}>
                        <button className="btn bg-red-500 hover:scale-110 rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50">
                          Cancel
                        </button>
                      </Link>
                    )}
                    {car?.status === "booked" && (
                      <button
                        onClick={makePayment}
                        className="btn ml-4 btn-success hover:bg-green-900 rounded-full transition-colors duration-300 text-xs font-bold textarea-bordered text-amber-50"
                      >
                        Pay now
                      </button>
                    )}
                  </div>
                </div>
                <div className="bg-slate-50 p-5 mt-10 font-bold text-green-800 text-center text-2xl flex justify-between">
                  <span>cash: {payment?.status || "Not paid"}</span>
                  {payment?.status === "payed" && (
                    <button
                      onClick={deletePayment}
                      className="btn text-red-800 font-bold"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full items-center">
              <div className="flex flex-col m-2">
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  car name: {car?.carId?.carName}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  car brand: {car?.carId?.brand}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  rent rate: {car?.carId?.price}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  car type: {car?.carId?.carType}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  transmission: {car?.carId?.transmission}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  model year: {car?.carId?.year}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  fuel type: {car?.carId?.fuelType}
                </span>
              </div>

              <div className="flex flex-col ml-2">
                <h1 className="capitalize text-center text-xl font-semibold text-orange-400">
                  Dealer and booking data
                </h1>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  dealer name: {car?.dealer?.name}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  dealer phone: {car?.dealer?.phone}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  dealer email: {car?.dealer?.email}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  total amount: {car?.totalAmount}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  total time: {car?.totalHours}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  from date: {moment(car?.fromDate).format("DD-MM-YYYY")}
                </span>
                <span className="capitalize text-gray-100 text-lg font-semibold">
                  to date: {moment(car?.toDate).format("DD-MM-YYYY")}
                </span>
                <span className="capitalize text-green-500 text-lg font-semibold">
                  booking status: {car?.status}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full">No bookings found</p>
      )}
    </div>
  );
}

export default RentalCard;
