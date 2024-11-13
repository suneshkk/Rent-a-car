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
        console.log(responce)

      toast.success("log-in success")
      navigate('/user/profile')
      // console.log("respon", responce)

    } catch (error) {
      toast.error("wrong password or User Name")
      navigate('/login')
      console.log(error);
    };
  };

  return (
<div className="hero bg-blue-100 min-h-screen"> {/* Changed background color to blue-100 */}
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
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
            <Link to={'/sign-up'} className="text-blue-500">
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
