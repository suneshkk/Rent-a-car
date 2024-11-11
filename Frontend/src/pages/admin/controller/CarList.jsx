import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import EditButton from '../../../components/util/EditButton.jsx';
import DetailButton from '../../../components/util/DetailButton.jsx';
import DeleteButton from '../../../components/util/DeleteButton.jsx';
import { axiosInstance } from '../../../config/axiosInstance.jsx';
import Loader from '../../../components/util/Loader.jsx';
import HomeButton from '../../../components/util/HomeButton.jsx';
function CarList() {
    const [car, setCar] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCar = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/car/car-list', { withCredentials: true });

            if (response?.data?.data) {
                setCar(response?.data?.data)
                setLoading(false);
            } else {
                setLoading(false);
                alert("Failed to Fetch car List..!")
            }

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCar();
    }, []);

    return (
        <div className='min-h-screen'>
            <Link to={"/admin/admin-home"}>
            <HomeButton />
            </Link>
            {loading ? (
                <Loader />
            ) : (
                <div className='card card-body'>
                    <table className='container table text-center '>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Car Name</th>
                                <th>Car Model</th>
                                <th>Fuel Type</th>
                                <th>Car ID</th>
                                <th>Properties</th>
                            </tr>
                        </thead>
                        <tbody>
                            {car.length > 0 ? (
                                car.map((car, index) => (
                                    <tr key={car._id}>
                                        <td>{index + 1}</td>
                                        <td>{car?.carName}</td>
                                        <td>{car?.year}</td>
                                        <td>{car?.fuelType}</td>
                                        <td>{car?._id}</td>
                                        <td>
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

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No cars available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CarList;
