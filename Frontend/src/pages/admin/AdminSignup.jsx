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
          navigate('/admin/home');
        } 

      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSignup}>
            <div className="form-control">
              <label>Secret Key</label>
              <input
                type="text"
                placeholder="secret key"
                className="input input-bordered"
                value={secretKey}
                required
                onChange={(e) => setSecretkey(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                placeholder="phone"
                className="input input-bordered"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <Link to={'/admin-login'}>Existing dealer?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;

