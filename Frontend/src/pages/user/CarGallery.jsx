import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import CarList from "../../components/Cards.jsx";
import Loader from "../../components/util/Loader.jsx";
import toast from "react-hot-toast";

function CarGallery() {
  const [loading, setLoading] = useState(true);
  const [availableCars, setAvailableCars] = useState([]);
  const fetchAvailableCars = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/car/available-cars", {
        withCredentials: true,
      });
      setAvailableCars(response?.data?.data);
      toast.success(response?.data?.message);
      console.log("cars", response);
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableCars();
  }, []);

  return (
    <div className="min-h-screen md:flex md:gap-3 bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e]">
      {loading ? (
        <Loader />
      ) : (
        <div className="md:grid md:grid-cols-4 mr-5">
          {availableCars.map((value) => (
            <CarList availableCars={value} key={value?._id} />
          ))}
        </div>
      )}

    </div>
  );
}

export default CarGallery;
