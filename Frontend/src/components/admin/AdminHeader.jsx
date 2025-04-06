import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyImage from "../../assets/wheelz.png";
import toast from "react-hot-toast";
import ProfilPic from "../../assets/profile.png";
import { axiosInstance } from "../../config/axiosInstance.jsx";
function AdminHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [isOpen, setIsopen] = useState(false);

  const toggleDropdown = () => {
    setIsopen(!isOpen);
  };
  const closeDropdown = () => {
    setIsopen(false);
  };

  const fetchAdminProfile = async () => {
    try {
      const responce = await axiosInstance.get("/dealer/profile", {
        withCredentials: true,
      });
      setProfile(responce?.data?.data);
    } catch (error) {
      toast.error("Please Login..!");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/dealer/logout",
        {},
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="navbar border-b-2 bg-black text-center flex justify-between  items-center px-4 md:px-14 bg-cover h-20 ">
      {location.pathname == "/admin/admin-home" && (
        <div className="flex gap-5">
          <div className="hover:border-b-2">
            <Link to={`/admin/car-list/${profile?._id}`}>
              <h3 className="text-center text-lg font-bold text-slate-100">
                Car List
              </h3>
            </Link>
          </div>
          <div className="hover:border-b-2">
            <Link to={"/admin/create-car"}>
              <h3 className="text-center text-lg font-bold text-slate-100">
                Create Car
              </h3>
            </Link>
          </div>
          <div className="hover:border-b-2">
            <Link to={"/admin/paymetn-review"}>
              <h3 className="text-center text-lg font-bold text-slate-100">
                payment and review
              </h3>
            </Link>
          </div>
        </div>
      )}

      <div className=" flex-2 md:flex-none sm:grid content-center	none: grid leading-relaxed ">
        <Link to="/" className="btn btn-ghost font-bold">
          <img src={MyImage} alt="logo" className="h-8 md:h-12" />
        </Link>
      </div>
      <div className="relative text-right flex gap-4 ">
        <div className="flex">
          <button
            onClick={toggleDropdown}
            className="flex size-10 md:size-12 items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-blue-400 focus:outline-none"
          >
            <img src={ProfilPic} alt="logo" className="rounded-full" />
          </button>
        </div>

        {isOpen && (
          <div>
            <div className="absolute h-44 md:h-72 md:p-3 right-0 top-16 md:mt-2 md:size-52 bg-white border rounded-lg size-36 z-50">
              <div>
                <div className="text-center ">
                  <Link to={"/admin/admin-home"}>
                    <button
                      className="my-1 text-base font-semibold md:text-xl md:font-semibold"
                      onClick={() => {
                        closeDropdown();
                      }}
                    >
                      {profile?.name}
                    </button>
                  </Link>
                  <hr />
                </div>
                <hr />
                <Link to={`/admin/delete-account/${profile?._id}`}>
                  <button
                    className="font-medium mx-2 my-1 text-red-700 md:font-semibold lg:mt-2 lg:mb-2"
                    onClick={() => {
                      closeDropdown();
                    }}
                  >
                    Delete account{" "}
                  </button>
                </Link>
                <hr />

                <button
                  onClick={() => {
                    closeDropdown();
                    handleLogout();
                  }}
                  className="text-base font-medium my-1 mx-2 md:w-full md:text-left md:px-4 md:py-2 text-red-700 md:text-xl md:font-semibold"
                >
                  Logout
                </button>
                <hr />
              </div>
              <div>
                <h4 className="mx-1 font-semibold ">{profile?.role}</h4>
                <h4 className="mx-1 font-semibold ">{profile?.phone}</h4>
                <h4 className="mx-1 font-semibold ">{profile?.email}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHeader;
