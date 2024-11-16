import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance.jsx';

function SignUp() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/signup',
        {
          name, email, password, phone
        },
        {
          withCredentials: true
        });
      if (response?.data?.success) {
        toast.success('user sig-up successfully')
        navigate('/user/profile');
      }

    } catch (error) {
      toast.error("an error during sign-up")
      console.log(error)
    }
  }

  return (
    <div className="hero bg-sky-500 min-h-screen lg:min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-cyan-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card card-body w-64 ">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Name:</span>
              </label>
              <input type="text" placeholder="name" className="input input-bordered" required
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Email:</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Phone:</span>
              </label>
              <input type="text" placeholder="phone" className="input input-bordered" required
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Password:</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required
                onChange={(e) => setPassword(e.target.value)} />
              <label className="label-text font-bold text-xs text-blue-500 mb-1 mt-1">
                <Link to={'/login'}>
                  Existing User!
                </Link>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-ghost hover:bg-blue-500 " onClick={handleSignup}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
