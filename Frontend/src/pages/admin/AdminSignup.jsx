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
    <div className="flex items-center justify-center bg-slate-200">
      <div className="hero-content ">
        <div className="bg-white shadow-xl rounded-lg ">
          <h2 className="text-sm font-bold md:text-2xl md:font-bold text-center border-b-4 text-gray-800 mt-2">Sign Up</h2>
          <form className="w-72 " onSubmit={handleSubmit(handleSignup)} noValidate>

            <div className="form-control flex flex-col mx-4">
              <label className="label ">
                <span className="label-text md:text-lg font-semibold text-gray-700">Secret Key :</span>
              </label>
              <input
                type="text"
                placeholder="Enter secret key"
                className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
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
              {errors.secretKey?.message && <p className='text-xs text-red-500 font-bold'>{errors.secretKey.message}</p>}
            </div>

            <div className="form-control flex flex-col mx-4">
              <label className="label">
              <span className="label-text md:text-lg font-semibold text-gray-700">Name :</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
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
              {errors.name?.message && <p className='text-xs text-red-500 font-bold'>{errors.name.message}</p>}
            </div>

            <div className="form-control flex flex-col mx-4">
              <label className="label">
              <span className="label-text md:text-lg font-semibold text-gray-700">Email :</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
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
              {errors.email?.message && <p className='text-xs text-red-500 font-bold'>{errors.email.message}</p>}
            </div>

            <div className="form-control flex flex-col mx-4">
              <label className="label">
              <span className="label-text md:text-lg font-semibold text-gray-700">Phone Number :</span>
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
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
              {errors.phone?.message && <p className='text-xs text-red-500 font-bold'>{errors.phone.message}</p>}
            </div>

            <div className="form-control flex flex-col mx-4">
              <label className="label">
              <span className="label-text md:text-lg font-semibold text-gray-700">PassWord :</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
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
              {errors.password?.message && <p className='text-xs text-red-500 font-bold'>{errors.password.message}</p>}
              <label className="label flex justify-center">
                <Link to="/admin-login" className="text-teal-500 hover:text-teal-700 font-semibold text-xs">
                  Existing Admin ...? Login here .....!
                </Link>
              </label>
            </div>

            <div className="form-control flex justify-center items-center my-2">
              <button
                type="submit"
                className="bg-blue-500 text-xs text-white font-semibold rounded-lg hover:bg-blue-950  h-10 w-20"
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

