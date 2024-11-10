import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance.jsx';
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
          name,phone,email,password,
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
    <div className="hero bg-gradient-to-r from-teal-500 to-cyan-500  flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white shadow-xl w-full max-w-md p-2 rounded-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign Up</h2>
          <form className="card-body" onSubmit={handleSignup}>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Secret Key</span>
              </label>
              <input
                type="text"
                placeholder="Enter secret key"
                className="input input-bordered w-full p-1 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                value={secretKey}
                required
                onChange={(e) => setSecretkey(e.target.value)}
              />
            </div>

            <div className="form-control mb-1">
              <label className="label mb-1">
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

            <div className="form-control mb-1">
              <label className="label mb-1">
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

            <div className="form-control mb-1">
              <label className="label mb-1">
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

            <div className="form-control mb-1">
              <label className="label mb-1">
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
              <label className="label mt-1">
                <Link to="/admin-login" className="text-teal-500 hover:text-teal-700 font-semibold">
                  Existing Admin? Login here!
                </Link>
              </label>
            </div>

            <div className="form-control mt-1">
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
    </div>);
}

export default AdminSignup;

