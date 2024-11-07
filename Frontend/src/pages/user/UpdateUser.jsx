import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate =useNavigate();

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/user/profile',
                {
                    withCredentials: true

                }
            );
            setName(response?.data?.name)
            setPassword(response?.data?.password)
            setPhone(response?.data?.phone)
        } catch (error) {
            toast.error("data not get");
            console.log(error);
        };
    };
    useEffect(() => {
        fetchData()
    }, []);
    const handleEditUser = async () => {
        const data = {
            name,
            phone,
            password,
        };


        try {
            const response = await axiosInstance.put(
                '/user/update',data,
                { withCredentials: true }
            );
            editProfile(response?.data?.data);
            console.log("res", response);
            toast.success("Profile Updated");
           navigate("/user/profile");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };



    return (
        <div className="flex justify-center pt-5">
            <div className="card border border-green-500 bg-blue-300 col-md-6 max-w-lg">
                <div className="card-header bg-transparent border-b border-green-500">
                    <h1 className="text-center my-4 text-2xl font-bold">profile</h1>
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>


                <div className="mb-3">
                    <label className="block text-gray-500 mb-1">Password</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-gray-500 mb-1">Phone</label>
                    <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex justify-between py-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleEditUser}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser
