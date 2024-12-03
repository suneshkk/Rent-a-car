import { useEffect, useState } from "react";
// import DropDownBt from "../../components/util/DropDownBt.jsx";
import Loader from "../../components/util/Loader.jsx";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { Link } from "react-router-dom";
import BoookHistory from "../../components/admin/BoookHistory.jsx";

function AdminHome() {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)
    const [booking, setBooking] = useState([]);
    const [loading2, setLoading2] = useState(false);

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
            console.log("history", response);
            setLoading2(false);
        } catch (error) {
            console.log(error);
           setLoading2(false);
        }
    }
    useEffect(() => {
        fetchUserList();
        fetchBookingHistory();
    }, []);



    return (
        <div className="bg-cover bg-center min-h-screen bg-red-100 md:flex md:justify-between">
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

            <div className="bg-black action">
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
            <div>
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
    )
}

export default AdminHome
