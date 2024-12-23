import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../config/axiosInstance.jsx';
import Loader from '../../../components/util/Loader.jsx';

function UserList() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
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
    useEffect(() => {
        fetchUserList();
    }, [])

    return (
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
    )
}

export default UserList
