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
  const [confirmPassword, setconfirmPassword] =useState("");
  const [secretKey, setSecretkey] = useState("");
  const { register, handleSubmit, formState,watch } = useForm();
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
    <div className="flex items-center justify-center ">
      <div className="bg-white shadow-xl rounded-lg my-5 lg:my-20 lg:w-4/6 border-2 border-stone-950">
        <div className='bg-blue-400 bg-cover p-5'>
          <h2 className="text-sm capitalize lg:text-2xl hver:border-cyan-200 font-bold md:text-base md:font-bold text-center text-gray-800 underline">Sign up</h2>
        </div>
        <form className='lg:grid lg:grid-cols-2 lg:m-10' onSubmit={handleSubmit(handleSignup)} noValidate>

          <div className="form-control flex flex-col mx-4 mb-3">
            <label className="label">
              <span className="label-text md:text-sm font-bold text-gray-700">Secret Key :</span>
            </label>
            <input
              type="text"
              placeholder="Enter secret key"
              className=" form-control input hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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

          <div className="form-control flex flex-col mx-4 mb-3">
            <label className="label">
              <span className="label-text md:text-sm font-bold text-gray-700">Name :</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              className=" form-control input hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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

          <div className="form-control flex flex-col mx-4 mb-3">
            <label className="label">
              <span className="label-text md:text-sm font-bold text-gray-700">Email :</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="form-control input hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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

          <div className="form-control flex flex-col mx-4 mb-3">
            <label className="label">
              <span className="label-text md:text-sm font-bold text-gray-700">Phone Number :</span>
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className=" form-control input hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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

          <div className="form-control flex flex-col mx-4 mb-3">
            <label className="label">
              <span className="label-text md:text-sm font-bold text-gray-700">PassWord :</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className=" form-control input hover:border-2 hover:border-blue-600 capitalize text-xs pl-2 py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
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


          <div className="form-control flex justify-center items-center my-1 mx-5 lg:mt-">
            <label className="label flex justify-center">
              <Link to="/admin-login" className="text-blue-500 font-semibold text-xs lg:text-base">
                Existing Admiin .....!
              </Link>
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-xs text-white font-semibold rounded-lg hover:bg-blue-950  h-7 w-16"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>);
}

export default AdminSignup;

