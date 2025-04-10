import { useEffect, useState } from "react";
import Loader from "../../components/util/Loader.jsx";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import BoookHistory from "../../components/admin/BoookHistory.jsx";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function AdminHome() {
  const [booking, setBooking] = useState([]);
  const [loading2, setLoading2] = useState(false);
  // const { id } = useParams();
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [profile, setProfile] = useState(null);
  // console.log("data", name, email, phone)

  // const editProfile = async (e) => {
  //     e.preventDefault();

  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("email", email);
  // formData.append("phone", phone);
  //    console.log("formdata", formData)

  // const formData = {
  //     name: name,
  //     phone: phone,
  //     email: email,
  // };

  // try {
  //         const responce = await axiosInstance.put(`/admin/update/${profile?._id}`, formData, {
  //             withCredentials: true,
  //             headers: { "Content-Type": "multipart/form-data" }
  //         });

  //         // console.log("response", responce);

  //     } catch (error) {
  //         console.log(error);
  //         toast.error("somthing went wrong");
  //     };
  // };

  // const fetchAdminProfile = async () => {
  //     try {
  //         const responce = await axiosInstance.get('/admin/profile', {
  //             withCredentials: true,
  //         })
  //         setProfile(responce?.data?.data);
  //         console.log("profile", responce)
  //     } catch (error) {
  //         toast.error("Please Login..!");
  //         console.log(error);
  //     };
  // };
  const fetchBookingHistory = async () => {
    setLoading2(true);
    try {
      const response = await axiosInstance.get(`/rental/dealer-booking-list`, {
        withCredential: true,
      });
      setBooking(response?.data?.data);
      if (response?.data?.message) {
        toast.success(response?.data?.message);
      }
      setLoading2(false);
      console.log("deler bokedcar",response)
    } catch (error) {
        if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message)
        }
      console.log(error);
      setLoading2(false);
    }
  };
  useEffect(() => {
    // fetchAdminProfile();

    fetchBookingHistory();
  }, []);

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col bg-red-100 md:flex">
      <div className=" bg-red-100 min-h-screen">
        <div className="bg-transparent h-20 text-center content-center m-1">
          <h2 className="md:font-bold md:text-2xl text-black">
            Booking History
          </h2>
        </div>
        <div className="m-2">
          {loading2 ? (
            <Loader />
          ) : (
            <div className="flex">
              {booking.length > 0 ? (
                booking.map((v) => <BoookHistory booking={v} key={v?._id} />)
              ) : (
                <p className="text-center w-full">No bookings found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
