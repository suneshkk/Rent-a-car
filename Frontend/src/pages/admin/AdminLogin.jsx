import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


function AdminLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        '/admin/login',
        { email: data.email, password: data.password },
        { withCredentials: true }
      );
      // console.log(response);
      toast.success("Login successful");
      navigate('/admin/admin-home');
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="hero bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Card Container */}
        <div className="card bg-white shadow-xl w-full max-w-md p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label mb-2">
                <span className="label-text text-lg font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                {...register('email', { required: true })}
              />
            </div>

            {/* Password Input */}
            <div className="form-control mb-6">
              <label className="label mb-2">
                <span className="label-text text-lg font-semibold text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                {...register('password', { required: true })}
              />
              <label className="label mt-2">
                <Link to="/admin sign-up" className="text-teal-500 hover:text-teal-700 font-semibold">
                  New user? Sign up here!
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-teal w-full py-3 text-white font-semibold rounded-lg hover:bg-teal-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin
