import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { useEffect, useState } from "react";
import Loader from "../../components/util/Loader.jsx";
import {  useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setprofilePic] = useState(null);
    const { id } = useParams();
      const navigate = useNavigate();
    const fetchUserData = async () => {

        setLoading(true);
        try {
            const response = await axiosInstance.get('/user/profile',
                { withCredentials: true });
            setName(response?.data?.data.name);
            setPhone(response?.data?.data.phone);
            setLoading(false);
            // console.log(response)
        } catch (error) {
            toast.error("data not get");
            console.log(error);
            toast.error("something went wrong")
        };
    };
    useEffect(() => {
        fetchUserData()
    }, []);


    const handleEditprofilePic = async (e) => {
        const file = e.target.files[0];
        setprofilePic(file)
    }

    const handleEditUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("profilePic", profilePic);

        try {
            await axiosInstance.put(`/user/update/${id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Data updated successfully");
            setLoading(false);
            navigate("/user/profile");
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
            setLoading(false);
        }
    };




    return (
        <div className="container min-h-screen flex items-center justify-center bg-gray-100">
            {loading ? (<Loader />) : (
                <div className="card bg-white shadow-2xl rounded-lg px-10 py-8 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/5">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-gray-800 underline">Edit User</h1>
                    </div>
                    <form onSubmit={handleEditUser} className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Name :</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3"> phone :</label>
                            <input
                                type="text"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="form-label text-gray-600 w-1/3">Image:</label>
                            <input
                                type="file"
                                onChange={handleEditprofilePic}
                                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            />
                        </div>
                        <div className="text-center mt-6">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default UpdateUser
