import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    
    const handleEditUser= async (e) => {
        const data = {
            name,
            email,
            password,
            phone
        };

        try {
            const response = await axiosInstance.put(`/user/update/${id}`,
                {
                      data
                },
                { withCredentials: true, })

        } catch (error) {
            toast.error("Somthing went wronhg");
            console.log(error);
        };

    }


    return (
        <div className="flex justify-center pt-5">
            <div className="card border border-green-500 bg-blue-300 col-md-6 max-w-lg">
                <div className="card-header bg-transparent border-b border-green-500">
                    <h1 className="text-center my-4 text-2xl font-bold">Up date form</h1>
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
                    <label className="block text-gray-500 mb-1">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
