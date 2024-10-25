import { Link, useNavigate } from "react-router-dom";
import { AwardIcon, User } from 'lucide-react';
import { BaggageClaim } from 'lucide-react';
import { axiosInstance } from "../../config/axiosInstance";
import Theme from "../ui/Theme.jsx";

function UserHeader() {
     const navigate = useNavigate()
    const handleLogout = async () => {

        try {
            const response = await axiosInstance.post('/user/logout/',
                {
                    withCredentials: true
                });
               navigate('/')

        } catch (error) {
            console.log(error);
        };
    };
    return (
        <div className="navbar bg-blue-400 flex flex-col md:flex-row justify-between items-center min-h-24 border-y-8 p-4 md:p-6">
            <div className="flex items-center">
                <Link to="/" className="btn btn-ghost text-xl">
                    <h1 className="text-2xl text-gray-50">LOGO</h1>
                </Link>
            </div>

            <div className="flex justify-center mb-2 md:mb-0">
                <h1 className="font-mono text-2xl md:text-4xl font-extrabold tracking-wide text-yellow-200">
                    Wheelz Now
                </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 pr-0 md:pr-9">
                <div className="flex space-x-4">
                    <Link to="/" className="btn btn-ghost">
                        <h1 className="text-lg text-lime-200 italic">Home</h1>
                    </Link>
                    <Link to="/aboutus" className="btn btn-ghost">
                        <h1 className="text-lg text-lime-200 italic">About Us</h1>
                    </Link>
                    <Link to="/carGallery" className="btn btn-ghost">
                        <h1 className="text-lg text-lime-200 italic">Car Gallery</h1>
                    </Link>
                  <Theme/>
                </div>

                <div className="flex space-x-6 items-center">
                    <button onClick={handleLogout}>logout</button>
                    <Link to='/user/profile'>
                        <User className="w-6 h-6 text-gray-50" />
                    </Link>
                    <Link>
                        <BaggageClaim className="w-6 h-6 text-gray-50" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
