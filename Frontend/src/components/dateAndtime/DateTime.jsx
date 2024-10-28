// import React from 'react'
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Link } from 'react-router-dom';

// function DateTime() {
//     const [pickupDate, setPickupDate] = useState(new Date());
//     const [returnDate, setReturnDate] = useState(new Date());
//     const [location, setLocation] = useState('');

//   return (
//     <div className="container mx-auto p-4">
//     <div className="bg-white shadow-md p-4 rounded-md flex items-center justify-between">

//         {/* Pickup and Return Location */}
//         <div className="flex-grow mx-4">
//             <label className="block text-gray-700">Pick-up & return</label>
//             <input
//                 type="text"
//                 placeholder="Airport, city or address"
//                 className="input input-bordered w-full"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//             />
//             <button className="text-blue-500 mt-2">+ Different return location</button>
//         </div>

//         {/* Pickup Date */}
//         <div className="flex space-x-4">
//             <div>
//                 <label className="block text-gray-700">Pick-up date</label>
//                 <DatePicker
//                     selected={pickupDate}
//                     onChange={(date) => setPickupDate(date)}
//                     showTimeSelect
//                     dateFormat="Pp"
//                     className="input input-bordered"
//                 />
//             </div>

//             {/* Return Date */}
//             <div>
//                 <label className="block text-gray-700">Return date</label>
//                 <DatePicker
//                     selected={returnDate}
//                     onChange={(date) => setReturnDate(date)}
//                     showTimeSelect
//                     dateFormat="Pp"
//                     className="input input-bordered"
//                 />
//             </div>
//         </div>

//         {/* Show Button */}
//         <Link to={"/carGallery"} >
//             <button className="btn btn-primary ml-4">show Cars</button>

//         </Link>
//     </div>
// </div>
// )
// }

// export default DateTime
