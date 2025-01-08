import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../config/axiosInstance.jsx';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const registerForm = async (data) => {
    try {
      const response = await axiosInstance.post(
        '/admin/login',
        {
          email: data.email,
          password: data.password
        },
        { withCredentials: true }
      );
      // console.log(response);
      toast.success("Login successful");
      navigate('/admin/admin-home');
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message)
      }
      // toast.error("something went wrog");
      console.log(error);
      navigate('/admin-login')

    }
  };

  return (
    <div className="hero bg-gradient-to-r min-h-128 lg:min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="shadow-xl rounded-xl w-56 lg:w-80">
          <div className='shadow-xl bg-blue-400 flex justify-around p-3 lg:p-6  lg:mb-5 lg:rounded-t-lg rounded-t-md'>
            <h2 className="lg:text-3xl font-bold text-gray-800 underline">Login</h2>
          </div>
          <form className="" onSubmit={handleSubmit(registerForm)} noValidate>
            <div className="form-control mb-4 mx-4">
              <label className="label lg:mb-2">
                <span className="label-text text-xs font-bold lg:text-base lg:font-bold text-gray-700">Email :</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered lg:p-3 rounded-lg shadow-xl hover:border-blue-800 border-2 max-h-8  lg:max-h-10 text-sm font-semibold"
                {...register('email',
                  {
                    required: {
                      value: true,
                      message: "please enter email id"
                    },
                    pattern: {
                      required: true,
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "invalid email address"
                    }

                  })}
              />
              {errors.email?.message && <p className='text-xs text-red-500 font-bold'>{errors.email.message}</p>}
            </div>

            <div className="form-control lg:mb-6 mx-4">
              <label className="label lg:mb-2">
                <span className="label-text text-xs font-bold lg:text-base lg:font-bold text-gray-700">Password :</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered p-3 rounded-lg shadow-xl hover:border-blue-800 border-2 max-h-8  lg:max-h-10 text-sm font-semibold"
                {...register('password', {
                  required: {
                    value: true,
                    message: "please enter password"
                  },
                  minLength: {
                    value: 6,
                    message: "password must 6 charecters"
                  },

                  pattern: {
                    required: true,
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "password must add one upper case lower case number special charecters for better password"
                  },

                })}
              />
              {errors.password?.message && <p className='text-xs text-red-500 font-bold'>{errors.password.message}</p>}
            </div>

            <div className="form-control shadow-xl bg-blue-400 rounded-b-lg mt-5 lg:mt-10 flex justify-center items-center ">
              <label className="label">
                <Link to="/admin-sign-up" className="font-serif text-blue-700 font-bold lg:font-bold">
                  New user...?
                </Link>
              </label>

              <button
                type="submit"
                className="py-3 w-16 h-10 mb-3 text-sm  text-white font-bold rounded p-2 hover:bg-blue-700"
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
