import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance.jsx';

function Login() {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();


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
      console.log(responce);

      toast.success("log-in success");
      navigate('/user/home');
      // console.log("respon", responce);

    } catch (error) {
      if(error.response.data.message){
        toast.error(error.response.data.message)
      };
      navigate('/login');
      console.log(error);
    };
  };

  return (
    <div className="hero bg-slate-400 content-center min-h-screen  lg:min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-lime-50 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body w-64 " onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-bold text-xs">Email :</span>
              </label>
              <input type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "please enter email id"
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "not a valid email"
                  }
                })}
                placeholder="email" className="input input-bordered" />
              {errors.email?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.email.message}</p>}

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  font-bold text-xs">Password :</span>
              </label>
              <input type="password"

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
                placeholder="password" className="input input-bordered" />

              {errors.password?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.password.message}</p>}

            </div>
            <div>

              <label className="label">
                <Link to={'/sign-up'} className="text-blue-500 text-sm font-bold">
                  New User ?
                </Link>
              </label>
            </div>
            <div className="form-control ">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
