import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance.jsx";

function CreateCar() {
  const navigate = useNavigate();
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [carType, setCarType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTrasnsmission] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file)
  }

  const handleUploadCar = async (e) => {
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


    // console.log(formData)
    try {
      const response = await axiosInstance.post('/car/create', formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (response.data.success) {
        toast.success("Car Created successfully");
        navigate('/admin/admin-home')
        console.log("response", response);

      } else {
        toast.error("car already existe")
        console.log(response.data.message, "Car already existe")
      }


    } catch (error) {
      toast.error("something went Wrong");
      console.log(error);
    };
  };


  return (

    <div className="container min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex">
        <Link to={"/admin/admin-home"}>
          <button className='btn btn-info text-white hover:bg-cyan-400' >Home</button>
        </Link>
       </div>

      <div className="card bg-white shadow-2xl rounded-lg px-10 py-8 mx-4 sm:mx-0 sm:w-3/4 md:w-1/2 lg:w-2/5">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 underline">Create New Car</h1>
        </div>
        <form onSubmit={handleUploadCar} className="space-y-4">
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
              onChange={(e) => setTrasnsmission(e.target.value)}
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
              onChange={handleUploadImage}
              className="form-control flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="text-center mt-6 flex-none">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition ease-in-out duration-300"
            >
              Submit
            </button>

          </div>


        </form>
      </div>
    </div>
  )
}

export default CreateCar
