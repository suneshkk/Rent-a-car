import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance.jsx";
import Loader from "../../../components/util/Loader.jsx";
import { useForm } from 'react-hook-form';

function CreateCar() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [carName, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [carType, setCarType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTrasnsmission] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file)
  };

  const handleUploadCar = async () => {
    setLoading(true);
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
      const response = await axiosInstance.post('/car/create', formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (response.data.success) {
        toast.success("Car Created successfully");
        // console.log(" car ====response", response);
        navigate(`/admin/admin-home`)
        setLoading(false);
      }

    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      };
      console.log(error);
      setLoading(false);

    };
  };


  return (

    <div className="min-h-screen pt-5 pb-20 flex items-cente justify-center bg-sky-200 ">
      {loading ? (
        <Loader />
      ) : (
        <div className=" bg-sky-300 shadow-2xl  lg:w-5/6  p-2 rounded-2xl content-center">
          <form onSubmit={handleSubmit(handleUploadCar)} className="space-y-4  p-10 grid grid-cols-2" noValidate>
            <div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Car Name :</label>
                <input
                  type="text"
                  value={carName}
                  {...register('carName', {
                    required: {
                      value: true,
                      message: "please enter car name"
                    },
                  })}
                  onChange={(e) => setCarName(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.carName?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.carName.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Car Brand :</label>
                <input
                  type="text"
                  value={brand}
                  {...register('brand', {
                    required: {
                      value: true,
                      message: "please enter brand"
                    },
                  })}
                  onChange={(e) => setBrand(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.brand?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.brand.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Model Year :</label>
                <input
                  type="text"
                  value={year}
                  {...register('year', {
                    required: {
                      value: true,
                      message: "please enter year"
                    },
                  })}
                  onChange={(e) => setYear(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.year?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.year.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Car Type :</label>
                <input
                  type="text"
                  value={carType}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                  {...register('carType', {
                    required: {
                      value: true,
                      message: "please enter cartype"
                    },
                  })}
                  onChange={(e) => setCarType(e.target.value)}
                />
                {errors.carType?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.carType.message}</p>}


              </div>
            </div>
            <div>
            <div className="flex flex-col gap-3 m-3">
            <label className="form-label capitalize w-2/3 text-lg font-semibold">Fuel Type :</label>
                <input
                  type="text"
                  value={fuelType}
                  {...register('fuelType', {
                    required: {
                      value: true,
                      message: "please enter fuelType"
                    },
                  })}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.fuelType?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.fuelType.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Transmission:</label>
                <input
                  type="text"
                  value={transmission}
                  {...register('transmission', {
                    required: {
                      value: true,
                      message: "please enter transmission"
                    },
                  })}

                  onChange={(e) => setTrasnsmission(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.transmission?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.transmission.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Price :</label>
                <input
                  type="text"
                  value={price}
                  {...register('price', {
                    required: {
                      value: true,
                      message: "please enter price"
                    },
                  })}

                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.price?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.price.message}</p>}

              </div>
              <div className="flex flex-col gap-3 m-3">
                <label className="form-label capitalize w-2/3 text-lg font-semibold">Image:</label>
                <input
                  type="file"
                  onChange={handleUploadImage}
                  className="form-control capitalize text-base font-semibold flex-1 px-5 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 w-3/4"
                />
                {errors.image?.message && <p className='text-xs text-slate-100 font-serif bg-red-500 text-center rounded-lg mt-1 p-1'>{errors.image.message}</p>}


              </div>
            </div>
            <div className="text-center mt-6 flex-none flex ml-4 ">
              <button
                type="submit"
                className="scale-100 duration-200 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition ease-in-out"
              >
                Save
              </button>

            </div>


          </form>

          {/* <div className="flex">
            <Link to={"/admin/admin-home"}>
              <button className='btn btn-info text-white hover:bg-cyan-400' >Home</button>
            </Link>
          </div> */}

          {/* <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 underline">Create New Car</h1>
            </div> */}


        </div>
      )}
    </div>
  )
}

export default CreateCar
