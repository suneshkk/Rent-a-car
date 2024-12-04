import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../config/axiosInstance.jsx';

function Login() {

  const {
    register,
    handleSubmit,
  } = useForm();
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
        // console.log(responce);

      toast.success("log-in success");
      navigate('/user/home');
      // console.log("respon", responce);

    } catch (error) {
      toast.error("wrong password or User Name");
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
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text  font-bold text-xs">Password :</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
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
