import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance.jsx";

function Login() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const responce = await axiosInstance.post(
        "/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(responce);

      toast.success("log-in success");
      navigate("/user/home");
      // console.log("respon", responce);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      navigate("/login");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className=" lg:max-w-4xl lg:h-144 lg:grid grid-cols-2 bg-white card card-body shadow-xl bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] ">
        <form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-control mb-4 mx-4">
            <h2 className="lg:text-3xl font-bold text-gray-300 lg:mb-8 lg:mt-8">
              Log<b className="text-lime-600">i</b>n...
            </h2>

            <label className="label">
              <span className="label-text text-xs font-bold lg:text-lg text-cyan-600">
                Email :
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered lg:p-3 rounded-lg shadow-xl border-2 max-h-8  lg:max-h-10 text-sm font-semibold bg-slate-200"
              {...register("email", {
                required: {
                  value: true,
                  message: "please enter email id",
                },
                pattern: {
                  required: true,
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email?.message && (
              <p className="text-xs text-red-500 font-bold">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-control  lg:mx-4">
            <label className="label">
              <span className="label-text text-xs font-bold lg:text-base  text-cyan-600">
                Password :
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered p-3 rounded-lg shadow-xl border-2 max-h-8 lg:max-h-10 text-sm font-semibold  bg-slate-200"
              {...register("password", {
                required: {
                  value: true,
                  message: "please enter password",
                },
                minLength: {
                  value: 6,
                  message: "password must 6 charecters",
                },

                pattern: {
                  required: true,
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "password must add one upper case lower case number special charecters for better password",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-xs text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="lg:mx-4 ">
            <div className="lg:mt-10">
              <button
                type="submit"
                className="py-3 w-16 h-10 mb-3 text-sm  text-slate-400 font-bold rounded p-2 bg-slate-900 "
              >
                Login
              </button>
            </div>
            <div className="mb-3">
              <label className="label">
                <Link
                  to="/sign-up"
                  className="font-serif  font-bold lg:font-bold  text-slate-400"
                >
                  New user...?
                </Link>
              </label>
            </div>

            <div className="-mt-4">
              <Link to={"/admin-sign-up"}>
              <p className=" text-slate-400 font-serif  font-bold lg:font-bold"> 
                 Login as a dealer ...!
              </p>
              </Link>
            </div>
          </div>
        </form>
        <div className="bg-slate-400"></div>
      </div>
    </div>
  );
}

export default Login;
