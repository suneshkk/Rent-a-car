import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance.jsx';
import {useForm} from 'react-hook-form'

function SignUp() {
   const form = useForm({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [validationError, setValidationError] = useState({});

  const validatonField = () => {
    const errors = {};
    if (!name.trim()) 
      errors.name = "name is required"
    


  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const errors = validatonField();
    if (errors) {
      setValidationError(errors);
      toast.error("wrong")
      return;

    }
    setValidationError({});
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
      // toast.error("please enter valid email and passWord")
      console.log(error)
    }
  }

  return (
    <div className="hero bg-sky-500 min-h-screen lg:min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-cyan-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card card-body w-64 "onSubmit={handleSignup}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Name:</span>
              </label>
              <input
                type="text"
                placeholder="name"
                required
                className={`input input-bordered ${validatonField ? 'boder-red-500' : ''}`}
                onChange={(e) => setName(e.target.value)} />
                {validationError.name && <span className='text-red-500 text-xs'>{validationError.name}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Email:</span>
              </label>
              <input type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Phone:</span>
              </label>
              <input type="text"
                placeholder="phone"
                className="input input-bordered"
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Password:</span>
              </label>
              <input type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)} />
              <label className="label-text font-bold text-xs text-blue-500 mb-1 mt-1">
                <Link to={'/login'}>
                  Existing User!
                </Link>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-ghost hover:bg-blue-500 " type='submit'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
