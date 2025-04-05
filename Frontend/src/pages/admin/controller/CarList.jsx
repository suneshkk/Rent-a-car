import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import EditButton from "../../../components/util/EditButton.jsx";
import DetailButton from "../../../components/util/DetailButton.jsx";
import DeleteButton from "../../../components/util/DeleteButton.jsx";
import { axiosInstance } from "../../../config/axiosInstance.jsx";
import Loader from "../../../components/util/Loader.jsx";
import HomeButton from "../../../components/util/HomeButton.jsx";
function CarList() {
  const [car, setCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchAdminCar = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/car/car-by-dealer/${id}`, {
        withCredentials: true,
      });

      if (response?.data?.data) {
        setCar(response?.data?.data);
        console.log("admin Car++++", response);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminCar();
  }, []);

  return (
    <div className="min-h-screen">
      <Link to={"/admin/admin-home"}>
        <HomeButton />
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="card card-body">
          <table className="container table text-center ">
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
                        <Link
                          to={`/admin/edit-car/${car?._id}`}
                          className="text-success"
                        >
                          <EditButton />
                        </Link>
                        <Link
                          to={`/admin/car-detail/${car?._id}`}
                          className="text-blue-600"
                        >
                          <DetailButton />
                        </Link>
                        <Link
                          to={`/admin/delete-car/${car?._id}`}
                          className="text-orange-700 "
                        >
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
