import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function AvailableCars() {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState();
  const fetchCar = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/car/available-cars", {
        withCredentials: true,
      });
      setCar(response?.data?.data);
      toast.success(response?.data?.message);
      setLoading(false);
      console.log("availablecar",response)
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCar();
  }, []);
  return (
    <div className="h-screen content-center rounded-xl bg-gradient-to-r from-[#032330] via-[#065476] to-[#04384e] ">

    </div>
  );
}

export default AvailableCars;
