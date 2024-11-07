// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { axiosInstance } from '../../config/axiosInstance';
// import { Link, useNavigate } from 'react-router-dom';

// function AdminSignup() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secretKey, setSecretkey] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (secretKey != "admin") {

//       alert("Invalid admin")
//     } else {

//       try {
//         const response = await axiosInstance.post('/admin/sign-up',
//           {
//             name, email, password, phone
//           },
//           {
//             withCredentials: true,
//           });
//         if (response?.data?.success) {
//           toast.success("done");
//           navigate('/admin/profile');
//         }

//       } catch (error) {
//         toast.error("somthing went wrong");
//         console.log(error);
//       };
//     }
//   };



//   return (

//     <div className="hero bg-base-200 min-h-screen">
//       <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//           <form className="card-body">
//             <div className="form-control">
//               <label>Secret key</label>
//               <input type="text" placeholder="scret key" className="input input-bordered" required
//                 onChange={(e) => setSecretkey(e.target.value)} />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input type="text" placeholder="name" className="input input-bordered" required
//                 onChange={(e) => setName(e.target.value)} />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input type="email" placeholder="email" className="input input-bordered" required
//                 onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Phone</span>
//               </label>
//               <input type="text" placeholder="phone" className="input input-bordered" required
//                 onChange={(e) => setPhone(e.target.value)} />
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input type="password" placeholder="password" className="input input-bordered" required
//                 onChange={(e) => setPassword(e.target.value)} />
//               <label className="label">
//                 <Link to={'/admin-login'}>
//                   Existing dealer!
//                 </Link>

//               </label>
//             </div>
//             <div className="form-control mt-6">
//               <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminSignup
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

function AdminSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretkey] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (secretKey !== "Wheelznow") {
      alert("Invalid admin");
    } else {
      try {
        const response = await axiosInstance.post(
          '/admin/sign-up',
          { name, email, password, phone },
          { withCredentials: true }
        );

        if (response?.data?.success) {
          toast.success("Signup successful!");
          navigate('/admin/profile');
        } 

      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="hero bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen flex items-center justify-center">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-white shadow-xl w-full max-w-md p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form className="card-body" onSubmit={handleSignup}>
          
          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-lg font-semibold text-gray-700">Secret Key</span>
            </label>
            <input
              type="text"
              placeholder="Enter secret key"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
              value={secretKey}
              required
              onChange={(e) => setSecretkey(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-lg font-semibold text-gray-700">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-lg font-semibold text-gray-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-lg font-semibold text-gray-700">Phone</span>
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-control mb-6">
            <label className="label mb-2">
              <span className="label-text text-lg font-semibold text-gray-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label mt-2">
              <Link to="/admin-login" className="text-teal-500 hover:text-teal-700 font-semibold">
                Existing Admin? Login here!
              </Link>
            </label>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-teal w-full py-3 text-white font-semibold rounded-lg hover:bg-teal-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>  );
}

export default AdminSignup;

