import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../config/axiosInstance.jsx';
import Loader from '../../../components/util/Loader.jsx';
import AdminHome from '../AdminHome';
import { Link } from 'react-router-dom';

function UserList() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchUserList = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/admin/user-list', { withCredentials: true });
            if (response?.data?.data) {
                setUser(response?.data?.data);
                toast.success("User Data Fetched");
                setLoading(false);
            };
        } catch (error) {
            toast.error("somthing went wrong..!")
            setLoading(false);
            console.log(error);
        };
    };

    useEffect(() => {
        fetchUserList();
    }, []);
    return (
        <div className='min-h-screen'>
            {/* <Link to={"/admin/admin-home"}>
                <AdminHome />
            </Link> */}
            {loading ? (
                <Loader />
            ) : (
                <div className='card card-body'>
                    <table className='container table text-center '>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>user Name</th>
                                <th>Phone</th>
                                <th>user Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.length > 0 ? (
                                user.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user?.name}</td>
                                        <td>{user?.phone}</td>
                                        <td>{user?._id}</td>
                                        {/* <td>
                                            <div className="flex justify-between ">
                                                <Link to={`/admin/edit-car/${car?._id}`} className='text-success'>
                                                    <EditButton />
                                                </Link>
                                                <Link to={`/admin/car-detail/${car?._id}`} className='text-blue-600' >
                                                    <DetailButton />

                                                </Link>
                                                <Link to={`/admin/delete-car/${car?._id}`} className='text-orange-700 ' >
                                                    <DeleteButton />
                                                </Link>
                                            </div>

                                        </td> */}
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
    )
}

export default UserList
