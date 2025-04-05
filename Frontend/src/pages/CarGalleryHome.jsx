import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance.jsx";
import toast from "react-hot-toast";

export default function CarGalleryHome() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [available, setAvailableCars] = useState([]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/car/car-list", {
        withCredentials: true,
      });
      setLoading(false);
      setCars(response?.data?.data);
      console.log("carlist", response);
      toast.success(response?.data?.message);
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
    }
  };
  const fetchBookedCar = async () => {
    try {
      const response = await axiosInstance.get("/car/available-cars", {
        withCredentials: true,
      });
      setAvailableCars(response?.data?.data);
      console.log("data availble car", response);
      toast.success(response?.data?.message);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    fetchCars();
    fetchBookedCar();
  }, []);
  return}
