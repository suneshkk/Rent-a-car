import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function AdminSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretkey] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleSignup = async (data) => {
    if (secretKey !== "Wheelznow") {
      alert("Invalid admin");
    } else {
      try {
        const response = await axiosInstance.post(
          '/admin/sign-up', {
          name: data.name,
          phone: data.phone,
          email: data.email,
          password: data.password,
        },
          { withCredentials: true }
        );
        console.log("data res---", response)
        if (response?.data?.success) {
          toast.success("Signup successful!");
          navigate('/admin/admin-home');
        }
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        };
        console.log(error);
      }
    }
  };

  return (
    <div className="hero bg-gradient-to-r from-teal-500 to-cyan-500  flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white shadow-xl w-full max-w-md p-2 rounded-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign Up</h2>
          <form className="card-body" onSubmit={handleSubmit(handleSignup)} noValidate>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Secret Key</span>
              </label>
              <input
                type="text"
                placeholder="Enter secret key"
                className="input input-bordered w-full p-1 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                value={secretKey}
                {...register('secretKey',
                  {
                    required: {
                      value: true,
                      message: "please enter secret key"
                    }
                  }
                )}
                onChange={(e) => setSecretkey(e.target.value)}
              />
              {errors.secretKey?.message && <p className='text-xs text-red-500'>{errors.secretKey.message}</p>}
            </div>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                {...register('name',
                  {
                    required: {
                      value: true,
                      message: 'please enter user name'
                    }
                  }
                )}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name?.message && <p className='text-xs text-red-500'>{errors.name.message}</p>}
            </div>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                {...register('email',
                  {
                    required: {
                      value: true,
                      message: "please enter email"
                    },
                    pattern: {
                      required: true,
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "invalid email address"
                    }
                  })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email?.message && <p className='text-xs text-red-500'>{errors.email.message}</p>}
            </div>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Phone</span>
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
                {...register('phone',
                  {
                    required: {
                      value: true,
                      message: 'please enter phone number'
                    },
                    pattern: {
                      required: true,
                      value: /^[6-9]\d{9}$/,
                      message: "enter valide phone number"
                    }
                  }
                )}
                value={phone}

                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone?.message && <p className='text-xs text-red-500'>{errors.phone.message}</p>}
            </div>

            <div className="form-control mb-1">
              <label className="label mb-1">
                <span className="label-text text-lg font-semibold text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password?.message && <p className='text-xs text-red-500'>{errors.password.message}</p>}
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

