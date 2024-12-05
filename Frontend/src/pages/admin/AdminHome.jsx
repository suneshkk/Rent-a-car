import { useEffect, useState } from "react";
// import DropDownBt from "../../components/util/DropDownBt.jsx";
import Loader from "../../components/util/Loader.jsx";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { Link } from "react-router-dom";
import BoookHistory from "../../components/admin/BoookHistory.jsx";
import toast from "react-hot-toast";

function AdminHome() {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)
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



    const fetchUserList = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/admin/user-list', { withCredentials: true });
            if (response?.data?.data) {
                setUser(response?.data?.data);
                setLoading(false);
            };
        } catch (error) {
            setLoading(false);
            console.log(error);
        };
    };

    const fetchBookingHistory = async () => {
        setLoading2(true);
        try {
            const response = await axiosInstance.get(`/rental/booking-list`, { withCredential: true });
            setBooking(response?.data?.data)
            // console.log("history", response);
            setLoading2(false);
        } catch (error) {
            console.log(error);
            setLoading2(false);
        }
    };
    // const fetchAdminProfile = async () => {
    //     try {
    //         const responce = await axiosInstance.get('/admin/profile', {
    //             withCredentials: true,
    //         })
    //         setProfile(responce?.data?.data);
    //     } catch (error) {
    //         // toast.error("Please Login..!");
    //         console.log(error);
    //     };
    // };
    useEffect(() => {
        fetchUserList();
        fetchBookingHistory();
        // fetchAdminProfile();

    }, []);

    return (
        <div>
            <div className="bg-cover bg-center min-h-screen flex flex-col bg-red-100 md:flex">
                <div className="w-60 bg-center bg-cover bg-cyan-800">
                    <div className="h-14 bg-slate-300 flex justify-center items-center hover:underline hover:bg-black hover:text-slate-300"> <h2 className="text-xl font-medium">Dash borad</h2></div>
                    <div className=" p-2" >
                        <li>
                            <span className="text-lg font-semibold text-slate-400">
                                <Link to={"/admin/create-car"}> Create Car</Link></span>
                        </li>
                        <li>
                            <span className="text-lg font-semibold text-slate-400">
                                <Link to={"/admin/car-list"}>Car List</Link></span>
                        </li>

                    </div>
                </div>

                <div className="bg-black action w-">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className='card card-body'>
                            <table className='container table text-center '>
                                <thead>
                                    <tr>
                                        <th className='font-semibold text-lg text-slate-200'>No</th>
                                        <th className='font-semibold text-lg text-slate-200'>user Name</th>
                                        <th className='font-semibold text-lg text-slate-200'>Phone</th>
                                        <th className='hidden md:table-cell font-semibold text-lg text-slate-200'>user Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.length > 0 ? (
                                        user.map((user, index) => (
                                            <tr key={user._id}>
                                                <td className='font-medium text-base text-slate-200 font-serif'>{index}</td>
                                                <td className='font-medium text-base text-slate-200 font-serif'>{user?.name}</td>
                                                <td className='font-medium text-base text-slate-200 font-serif'>{user?.phone}</td>
                                                <td className='hidden md:table-cell font-medium text-base text-slate-200 font-serif'>{user?._id}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No user available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="mx-4 mt-11">
                    <div className="card card-body bg-slate-200 rounded-md shadow-md w-96">
                        <div className="card card-title underline mb-4">
                            <h3 className="border-b-2">Edite  Admin Details</h3>

                        </div>
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
            <div className=" bg-red-100 min-h-screen">
                <div className="bg-black h-20 text-center content-center m-1">
                    <h2 className="md:font-bold md:text-2xl text-slate-100">Booking Hiistory</h2>
                </div>
                <div className="grid grid-cols-2">
                    {loading2 ? (
                        <Loader />
                    ) : (
                        <div className="">
                            {booking.map((v) => (
                                <BoookHistory booking={v} key={v?._id} />
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default AdminHome
