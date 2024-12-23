import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../../config/axiosInstance.jsx';
import { useForm } from 'react-hook-form'

function SignUp() {
  const { register, handleSubmit, formState } = useForm({});
  const { errors } = formState;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async () => {
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
      if(error.response.data.message){
       toast.error(error.response.data.message);
      }
      console.log(error)
    }
  }

  return (
    <div className="hero bg-sky-500 min-h-screen lg:min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-cyan-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card card-body w-64 " onSubmit={handleSubmit(handleSignup)} noValidate>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Name:</span>
              </label>
              <input
                type="text"
                placeholder="name"
                value={name}
                className='input input-bordered '
                {...register('name', {
                  required: {
                    value: true,
                    message: "please enter unser name"
                  }
                })}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.name.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Email:</span>
              </label>
              <input type="email"
                placeholder="email"
                value={email}
                className="input input-bordered"
                {...register('email', {
                  required: {
                    value: true,
                    message: "please enter email id "
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "please enter valid email id"
                  },
                })}
                onChange={(e) => setEmail(e.target.value)} />
              {errors.email?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.email.message}</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Phone:</span>
              </label>
              <input type="text"
                placeholder="phone"
                value={phone}
                className="input input-bordered"
                {...register('phone', {
                  required: {
                    value: true,
                    message: "please enter phone number"
                  },
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "please enter valid phone number"
                  }
                })}
                onChange={(e) => setPhone(e.target.value)} />
              {errors.phone?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.phone.message}</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Password:</span>
              </label>
              <input type="password"
                placeholder="password"
                value={password}
                className="input input-bordered"
                {...register('password', {
                  required: {
                    value: true,
                    message: "please enter password"
                  },
                  minLength: {
                    value: 6,
                    message: "password must add 6 charecters"
                  },

                  pattern: {
                    required: true,
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "password must add one upper case lower case number special charecters for better password"
                  },

                })}

                onChange={(e) => setPassword(e.target.value)} />
              {errors.password?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.password.message}</p>}

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
