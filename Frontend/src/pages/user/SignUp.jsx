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
    <div className="hero bg-blue-100 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="name" className="input input-bordered" required
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input type="text" placeholder="phone" className="input input-bordered" required
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required
                onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                <Link to={'/login'}>
                  Existing User!
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
