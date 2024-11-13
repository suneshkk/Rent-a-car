// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';
// import { axiosInstance } from '../../config/axiosInstance.jsx';
// import Loader from '../../components/util/Loader.jsx';

// function CarList() {
//     const [car, setCar] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchCar = async () => {
//         setLoading(true);
//         try {
//             const response = await axiosInstance.get('/car/car-list', { withCredentials: true });
//             setCar(response?.data?.data);
//             setLoading(false);
//             console.log("response", response);
//             toast.success("Car list fetched successfully!");
//         } catch (error) {
//             setLoading(false);
//             toast.error("Something went wrong");
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchCar();
//     }, []);

//     return (
//         <div>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>No</th>
//                                 <th>Car Name</th>
//                                 <th>Car Model</th>
//                                 <th>Fuel Type</th>
//                                 <th>Car ID</th>
//                                 <th>Properties</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {car.length > 0 ? (
//                                 car.map((car, index) => (
//                                     <tr key={car._id}>
//                                         <td>{index + 1}</td>
//                                         <td>{car?.carName}</td>
//                                         <td>{car?.year}</td>
//                                         <td>{car?.fuelType}</td>
//                                         <td>{car?._id}</td>
//                                         <td>{/* Additional properties if any */}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6">No cars available</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CarList;
