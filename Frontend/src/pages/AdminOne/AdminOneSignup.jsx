import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { Link, useNavigate } from "react-router-dom";

function AdminOneSignup() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState();
  const [phone, setPhone] = useState();
  const navigate = useNavigate();

  const adminSignup = async (data) => {
    if (secretKey !== "Wheelznow") {
      alert("invalid secretkey");
    } else {
      try {
        const response = await axiosInstance.post(
          "/admin/sign-up",
          {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
          },
          { withCredentials: true }
        );
        if (response?.data?.success) {
          toast.success("account created");
          navigate("/adminon-login");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    }
  };

  return (
    <div className=" h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="h-20 bg-transparent flex justify-evenly items-center  ">
        <Link to={"/"}>
          <h2 className="capitalize text-slate-300 text-3xl">
            <b className="text-4xl">W</b>
            <b>heelz </b>
            <b className="text-4xl">n</b>
            <b>ow</b>
          </h2>
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] shadow-xl rounded-lg w-5/6 my-8 lg:my-20 lg:w-4/6">
          <div className=" p-5">
            <h2 className="text-sm capitalize lg:text-2xl hver:border-cyan-200 font-bold md:text-base md:font-bold text-center underline  text-gray-300">
              Admin <b>s</b>ign <b className="text-lime-600">u</b>p
            </h2>
          </div>
          <form
            className="lg:grid lg:grid-cols-2 lg:m-10"
            onSubmit={handleSubmit(adminSignup)}
            noValidate
          >
            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="  label-text md:text-sm font-bold  text-cyan-600">
                  Secret Key :
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter secret key"
                className=" form-control  input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs  py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                value={secretKey}
                {...register("secretKey", {
                  required: {
                    value: true,
                    message: "please enter secret key",
                  },
                })}
                onChange={(e) => setSecretKey(e.target.value)}
              />
              {errors.secretKey?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.secretKey.message}
                </p>
              )}
            </div>

            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="label-text md:text-sm font-bold  text-cyan-600">
                  Name :
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs  py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register("name", {
                  required: {
                    value: true,
                    message: "please enter user name",
                  },
                })}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="label-text md:text-sm font-bold  text-cyan-600">
                  Email :
                </span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="form-control input input-bordered hover:border-2 hover:border-blue-600  text-xs  py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register("email", {
                  required: {
                    value: true,
                    message: "please enter email",
                  },
                  pattern: {
                    required: true,
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "invalid email address",
                  },
                })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="label-text md:text-sm font-bold  text-cyan-600">
                  Phone Number :
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs  py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "please enter phone number",
                  },
                  pattern: {
                    required: true,
                    value: /^[6-9]\d{9}$/,
                    message: "enter valide phone number",
                  },
                })}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="label-text md:text-sm font-bold  text-cyan-600">
                  PassWord :
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 capitalize text-xs  py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register("password", {
                  required: {
                    value: true,
                    message: "please enter password",
                  },
                  minLength: {
                    value: 6,
                    message: "password must add 6 charecters",
                  },

                  pattern: {
                    required: true,
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "password must add one upper case lower case number special charecters for better password",
                  },
                })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control flex flex-col mx-4 lg:mb-3">
              <label className="label">
                <span className="label-text md:text-sm font-bold  text-cyan-600">
                  confirme Password:
                </span>
              </label>
              <input
                type="conforme password"
                placeholder="Enter conforme password"
                value={confirmPassword}
                className=" form-control input input-bordered hover:border-2 hover:border-blue-600 text-xs py-1 rounded md:text-sm flex-1 md:px-5 border md:rounded-md shadow-sm focus:outline-none"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "please confirm your password",
                  },
                  validate: (value) => {
                    if (value == password) {
                      return true;
                    } else {
                      return "password not match";
                    }
                  },
                })}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              {errors.confirmPassword?.message && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-control flex justify-center items-center my-1 mx-5 lg:mt-">
              <label className="label flex justify-center">
                <Link to="/adminon-login">
                  <p className="font-serif  font-bold lg:font-bold text-slate-400">
                    Existing Admin....!
                  </p>
                </Link>
              </label>

              <button
                type="submit"
                className="  text-white font-semibold rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminOneSignup;
