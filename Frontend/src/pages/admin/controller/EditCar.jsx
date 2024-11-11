import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosInstance.jsx';
import Loader from '../../../components/util/Loader.jsx';

function EditCar() {
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [carType, setCarType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false)



  const fetchCarData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/car/get-car/${id}`,
        { withCredentials: true });

      setCarName(response?.data?.data.carName);
      setCarType(response?.data?.data.type)
      setBrand(response?.data?.data.brand);
      setYear(response?.data?.data.year);
      setFuelType(response?.data?.data.fuelType);
      setTransmission(response?.data?.data.transmission);
      setPrice(response?.data?.data.price);
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const handleEditImage = async (e) => {
    const file = e.target.files[0];
    setImage(file)
  };

  const handleUpdateCar = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("brand", brand);
    formData.append("year", year);
    formData.append("carType", carType);
    formData.append("fuelType", fuelType);
    formData.append("transmission", transmission);
    formData.append("price", price);
    formData.append("image", image);


    try {
      const response = await axiosInstance.put(`/car/update/${id}`, formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (response.data.success) {
        toast.success("Car updated successfully");
        console.log("response", response);
        setLoading(false);

      };

    } catch (error) {
      toast.error("something went Wrong");
      console.log(error);
      setLoading(false);
    };
  };


  return (
    <div className="container min-h-screen flex items-center justify-center bg-gray-100">
      <Link to={"/admin/car-list"}>
        <button className='btn btn-info' >Car list</button>
      </Link>
      {loading ? (<Loader />) : (
        <div className="card bg-white shadow-2xl rounded-lg px-10 py-8 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/5">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 underline">Edit Car</h1>
          </div>
          <form onSubmit={handleUpdateCar} className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Car Name :</label>
              <input
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Car Brand :</label>
              <input
                type="text"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Model Year :</label>
              <input
                type="text"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Car Type :</label>
              <input
                type="text"
                value={carType}
                required
                onChange={(e) => setCarType(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Fuel Type :</label>
              <input
                type="text"
                value={fuelType}
                required
                onChange={(e) => setFuelType(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Transmission:</label>
              <input
                type="text"
                value={transmission}
                required
                onChange={(e) => setTransmission(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Price :</label>
              <input
                type="text"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="form-label text-gray-600 w-1/3">Image:</label>
              <input
                type="file"
                onChange={handleEditImage}
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

export default EditCar
