import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../util/Loader";
// import Theme from "../ui/Theme.jsx";
function AdminOneHeader() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [isOpen, setIsopen] = useState();
  const toggleDropdown = () => {
    setIsopen(!isOpen);
  };
  const closeDropdown = () => {
    setIsopen(false);
  };

  const fetchProfile = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/profile", {
        withCredentials: true,
      });
      setProfile(response?.data?.data);
      console.log("Admin response", response);
    } catch (error) {
      console.log(error);
      toast.error("admin data no");
      // setLoading(false);
    }
  };
  const logout = async () => {
    try {
      const response = await axiosInstance.post("/admin/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="absolute h-32 navbar flex justify-between ">
      <div className="mr-10"></div>
      <div className="opacity-80 px-5 py-3 rounded-lg bg-gradient-to-r from-[#0c2028]  to-[#075d8b] ">
        <Link to={"/"}>
          <h1 class="text-4xl font-bold text-sky-500  uppercase tracking-widest ">
            wheelz n<b className="font-bold text-slate-100">o</b>w
          </h1>
        </Link>
      </div>

      <div className="mt-5 gap-5 mx-8">
        <div>
          <FaBell className="text-2xl text-amber-400 cursor-pointer" />
        </div>
        {/* <div>
          <Theme/>
        </div> */}

        <div className="relative">
          <div className="">
            <button onClick={toggleDropdown} className="">
              <FaUserCircle className="text-4xl text-center text-slate-100 cursor-pointer" />
            </button>
          </div>

          {isOpen && (
            <div className="rounded-lg border-2 absolute top-14 right-7 h-80 w-56 shadow-xl bg-gradient-to-r from-[#032330] to-[#113443]">
              
              {loading ? (
                <Loader />
              ) : (
                <div className=" border-b-2 h-40 rounded">
                  <div className="text-center pt-3">
                    <h2 className="text-slate-50 capitalize underline text-lg font-bold">
                      {profile?.role}
                    </h2>
                  </div>
                  <ol className="pt-3 pl-4">
                    <li className="text-slate-100 capitalize text-lg font-serif ">
                      {profile?.name}
                    </li>
                    <li className="text-slate-100 capitalize text-lg font-serif ">
                      {profile?.phone}
                    </li>
                    <li className="text-slate-100 capitalize text-lg font-serif ">
                      {profile?.email}
                    </li>
                  </ol>
                </div>
              )}
              <div className="pt-9 pl-4">
                <div>
                  <button
                    className="text-green-600 font-bold"
                    onClick={() => {
                      closeDropdown();
                    }}
                  >
                    Update Account
                  </button>
                </div>
                <div>
                  <button>
                    <Link
                      className="text-red-800 font-bold"
                      to={`/admin-one/delete-account/${profile?._id}`}
                      onClick={() => {
                        closeDropdown();
                      }}
                    >
                      Delete Account
                    </Link>
                  </button>
                </div>
                <div>
                  <button
                    className="text-red-800 font-bold text-xl"
                    onClick={() => {
                      logout();
                      closeDropdown();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOneHeader;
