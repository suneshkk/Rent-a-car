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
  const [confirmPassword, setconfirmPassword] = useState("")
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post('/user/signup',
        {
          name, email, password, phone, state, address, district
        },
        {
          withCredentials: true
        });
      if (response?.data?.success) {
        toast.success('user sig-up successfully');
        navigate('/user/profile');
      };

    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    };
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg my-5 lg:my-20 lg:w-4/6 border-2 border-stone-950">
        <div className='bg-blue-400 bg-cover p-5 rounded-t-lg'>
          <h2 className="text-sm capitalize lg:text-2xl hver:border-cyan-200 font-bold md:text-base md:font-bold text-center text-gray-800 underline">Sign up</h2>
        </div>

        <form className="lg:grid lg:grid-cols-2 lg:m-10" onSubmit={handleSubmit(handleSignup)} noValidate>
          <div className='md:mr-4 '>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Name:</span>
              </label>
              <input
                type="text"
                placeholder="Enter user name"
                value={name}
                className=" form-control  input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register('name', {
                  required: {
                    value: true,
                    message: "please enter user name"
                  }
                })}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name?.message && <p className='text-xs text-red-500 font-bold'>{errors.name.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Email:</span>
              </label>
              <input type="email"
                placeholder="Enter email address"
                value={email}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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
              {errors.email?.message && <p className='text-xs text-red-500 font-bold'>{errors.email.message}</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Phone:</span>
              </label>
              <input type="text"
                placeholder="Enter phone number"
                value={phone}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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
              {errors.phone?.message && <p className='text-xs text-red-500 font-bold'>{errors.phone.message}</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">Password:</span>
              </label>
              <input type="password"
                placeholder="Enter password"
                value={password}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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
              {errors.password?.message && <p className='text-xs text-red-500 font-bold'>{errors.password.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs">confirme Password:</span>
              </label>
              <input type="conforme password"
                placeholder="Enter conforme password"
                value={confirmPassword}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: "please confirm your password"
                  },
                  validate:(value)=>{
                    if(value == password){
                      return true;
                    }else{
                      return "password not match"
                    };

                  }
                })}

                onChange={(e) => setconfirmPassword(e.target.value)} />
              {errors.confirmPassword?.message && <p className='text-xs text-red-500 font-bold'>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div className='md:ml-5'>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs capitalize">state:</span>
              </label>
              <input
                type="text"
                placeholder="Enter your state"
                value={state}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register('state', {
                  required: {
                    value: true,
                    message: "please fill the field"
                  }
                })}
                onChange={(e) => setState(e.target.value)}
              />
              {errors.state?.message && <p className='text-xs text-red-500 font-bold'>{errors.state.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs capitalize">district:</span>
              </label>
              <input
                type="text"
                placeholder="Enter your district"
                value={district}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register('district', {
                  required: {
                    value: true,
                    message: "Please enter your district"
                  }
                })}
                onChange={(e) => setDistrict(e.target.value)}
              />
              {errors.district?.message && <p className='text-xs text-red-500 font-bold'>{errors.district.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs capitalize">Occupation:</span>
              </label>
              <input
                type="text"
                placeholder="Enter your occupation"
                value={occupation}
                rows="3"
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register('occupation', {
                  required: {
                    value: true,
                    message: "Please enter your occupation",
                  },
                })}
                onChange={(e) => setOccupation(e.target.value)}
              />
              {errors.occupation?.message && <p className="text-xs text-red-500 font-bold"> {errors.occupation.message} </p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs capitalize">Address:</span>
              </label>
              <textarea
                type="text"
                rows='4'
                placeholder="Enter your address"
                value={address}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none "
                {...register('address', {
                  required: {
                    value: true,
                    message: "Please enter your address",
                  },
                })}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              {errors.address?.message && <p className="text-xs text-red-500 font-bold"> {errors.address.message} </p>}
            </div>


          </div>

          <div className="form-control  ">
            <label className="label-text font-bold text-xs text-blue-500 mb-1 mt-1">
              <Link to={'/login'}>
                Existing User!
              </Link>
            </label>
            <button className="btn btn-ghost font-bold font-serif hover:bg-blue-400 hover:text-gray-50 duration-0  h-7 w-16" type='submit '>save</button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default SignUp
