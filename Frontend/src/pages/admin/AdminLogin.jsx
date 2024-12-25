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
      if(error.response.data.message){
        toast.error(error.response.data.message)
      }
      // toast.error("something went wrog");
      console.log(error);
      navigate('/admin-login')

    }
  };

  return (
    <div className="hero bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-white shadow-xl w-128 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form className="card-body" onSubmit={handleSubmit(registerForm)} noValidate>
            <div className="form-control mb-4">
              <label className="label mb-2">
                <span className="label-text text-lg font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400"
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
              {errors.email?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.email.message}</p>}
              </div>

            <div className="form-control mb-6">
              <label className="label mb-2">
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
                    message: "password must 6 charecters"
                  },

                  pattern: {
                    required: true,
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "password must add one upper case lower case number special charecters for better password"
                  },

                })}
              />
              {errors.password?.message && <p className='text-xs text-red-500'>{errors.password.message}</p>}
              <label className="label">
                <Link to="/admin-sign-up" className="text-teal-500 hover:text-teal-700 font-semibold">
                  New admin? Sign up here!
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control ">
              <button
                type="submit"
                className="btn btn-teal w-full py-3 text-white font-semibold rounded-lg hover:bg-teal-700"
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
