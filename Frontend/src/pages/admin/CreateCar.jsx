import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance.jsx";

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

  const handleImageChange = (e) => {
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


    console.log(formData)
    try {
      const response = await axiosInstance.post('/car/create', formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (response.data.success) {
        toast.success("Car Created successfully");
        navigate('/admin/car-gallery');
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
    <div className="caontainer min-h-screen flex justify-center">
      <div className="card card-body border-solid  bg-green-100 shadow-2xl shadow-stone-400  mx-96 my-36">
        <div className=" card  card-title">
          <h1 className="text-black  underline">Create New Car  </h1>
        </div>
        <div className="flex ">

          <form className="ml-10" onSubmit={handleUploadCar}>
            <div className="mb-3 flex gap-4">
              <label className="form-label text-muted">Car Name :</label>
              <input
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-4">
              <label className="form-label text-muted">Car Brand :</label>
              <input
                type="text"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-2">
              <label className="form-label text-muted">Model Year :</label>
              <input
                type="text"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-6">
              <label className="form-label text-muted">Car Type :</label>
              <input
                type="text"
                value={carType}
                required
                onChange={(e) => setCarType(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-5">
              <label className="form-label text-muted">Fuel Type :</label>
              <input
                type="text"
                value={fuelType}
                required
                onChange={(e) => setFuelType(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex">
              <label className="form-label text-muted">Transmission:</label>
              <input
                type="text"
                value={transmission}
                required
                onChange={(e) => setTrasnsmission(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-14">
              <label className="form-label text-muted"> Price :</label>
              <input
                type="text"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 flex gap-5">
              <label className="form-label text-muted">Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="form-control"
              />
            </div>
            <div>
              <button>submit</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default CreateCar
