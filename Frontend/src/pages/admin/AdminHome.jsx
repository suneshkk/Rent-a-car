import { useEffect, useState } from "react";
import Loader from "../../components/util/Loader.jsx";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import BoookHistory from "../../components/admin/BoookHistory.jsx";

function AdminHome() {

    const [booking, setBooking] = useState([]);
    const [loading2, setLoading2] = useState(false);
    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");
    const [profile, setProfile] = useState([]);
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


    const fetchAdminProfile = async () => {
        try {
            const responce = await axiosInstance.get('/admin/profile', {
                withCredentials: true,
            })
            setProfile(responce?.data?.data);
        } catch (error) {
            toast.error("Please Login..!");
            console.log(error);
        };
    };

    const fetchBookingHistory = async () => {
        setLoading2(true);
        try {
            const response = await axiosInstance.get(`/rental/booking-list/${profile?._id}`, { withCredential: true });
            setBooking(response?.data?.data)
            console.log("history", response);
            setLoading2(false);
        } catch (error) {
            console.log(error);
            setLoading2(false);
        }
    };
    useEffect(() => {
        fetchBookingHistory();
       fetchAdminProfile();
    }, []);

    return (
        <div className="bg-cover bg-center min-h-screen flex flex-col bg-red-100 md:flex">
            <div className=" bg-red-100 min-h-screen">
                <div className="bg-transparent h-20 text-center content-center m-1">
                    <h2 className="md:font-bold md:text-2xl text-black">Booking History</h2>
                </div>
                <div className="m-2">
                    {loading2 ? (
                        <Loader />
                    ) : (
                        <div className=" flex">
                            {booking.map((v) => (
                                <BoookHistory booking={v} key={v?._id} />
                            ))}

                        </div>
                    )}

                </div>

            </div>


            <div className="mx-4 mt-11">
                <div className="card card-body bg-slate-200 rounded-md shadow-md w-96">
                    {/* <div className="card card-title underline mb-4">
                            <h3 className="border-b-2">Edite  Admin Details</h3>

                        </div> */}
                    <div>
                        {/* <form onSubmit={editProfile} className="">
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="name"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-72 rounded-lg h-10 text-center" />

                                </div>

                                <div className="mb-2">
                                    <input
                                        type="text"
                                        value={email}
                                        placeholder="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-72 rounded-lg h-10 text-center" />

                                </div>

                                <div className="mb-2">
                                    <input
                                        type="text"
                                        value={phone}
                                        placeholder="phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-72 rounded-lg h-10 text-center" />

                                </div>
                                <div className="text-center">
                                    <button type="submit" className="bg-blue-600 btn-sm rounded-lg">Submit</button>
                                </div>
                            </form> */}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminHome
