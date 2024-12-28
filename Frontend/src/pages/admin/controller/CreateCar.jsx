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
  const [showDropDown, setDropdown] = useState(false);

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
      };

    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      };
      console.log(error);
      setLoading(false);

    };
  };


  return (
    // large screen view
    <div className="min-h-screen pt-5 pb-20 flex items-cente justify-center bg-sky-200 ">
      {loading ? (
        <Loader />
      ) : (
        <div className=" bg-sky-300 mx-4  shadow-2xl md:m-3 lg:w-5/6 rounded-2xl content-center">
          <div className="m-4 border-b-4"><h4 className="capitalize md:text-lg md:font-bold text-center font-semibold text-lime-700">add car to your website</h4></div>
          <form onSubmit={handleSubmit(handleUploadCar)} className=" md:space-y-4  md:p-10 md:grid md:grid-cols-2 " noValidate>
            <div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Car Name :</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.carName?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.carName.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Car Brand :</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.brand?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.brand.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Model Year :</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.year?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.year.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Car Type :</label>
                <input
                  type="text"
                  value={carType}
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                  {...register('carType', {
                    required: {
                      value: true,
                      message: "please enter cartype"
                    },
                  })}
                  onFocus={(e) => setDropdown(true)}
                  onBlur={(e) => setDropdown(false)}
                  onChange={(e) => setCarType(e.target.value)}
                />
                {errors.carType?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.carType.message}</p>}
                {showDropDown && (
                  <div className=""
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                  </div>
                )}

              </div>
            </div>
            <div className="">
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Fuel Type :</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.fuelType?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.fuelType.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Transmission:</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.transmission?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.transmission.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Price :</label>
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
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.price?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.price.message}</p>}

              </div>
              <div className="flex flex-col m-3">
                <label className="form-label text-xs font-semibold capitalize mb-1 md:w-2/3 md:text-lg md:font-semibold">Image:</label>
                <input
                  type="file"
                  onChange={handleUploadImage}
                  className=" form-control capitalize text-xs font-semibold pl-2 py-1 rounded md:text-base md:font-semibold flex-1 md:px-5 md:py-2 border md:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 md:w-3/4"
                />
                {errors.image?.message && <p className='text-red-600 text-xs font-semibold md:font-semibold'>{errors.image.message}</p>}


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
        //mobile view

      )}
    </div>
  )
}

export default CreateCar
