import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"

import { Link } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance.js';

function Login() {
  const {
    register,
    handleSubmit,
  } = useForm()

  // const  [data,loginData] = useState({});

  const onSubmit = async (data) => {
    try {
      const responce = await axiosInstance.post("/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        });
        toast.success("log-in success")
      console.log("respon", responce)

    } catch (error) {
      toast.error("log-in failed")
      console.log(error);
    };
  };
  //  useEffect(()=>{
  //    onSubmit()
  //  },[])

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
              <label className="label">
                <Link to={'/signup'}>
                  New User?
                </Link>

              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
