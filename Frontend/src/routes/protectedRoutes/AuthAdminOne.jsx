import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminOne, saveAdminOne } from "../../redux/features/adminOne";
import { axiosInstance } from "../../config/axiosInstance";

function AuthAdminOne({ chidren }) {
  const { isAdminOneExist } = useSelector((state) => state.AuthAdminOne);
  const dispatch = useDispatch();

  const checkAdminOne = async () => {
    try {
      const response = await axiosInstance.get("/admin/check", {
        withCredentials: true,
      });
      dispatch(saveAdminOne(response?.data?.data));
    } catch (error) {
      dispatch(clearAdminOne());
      console.log(error);
      toast.error("please login");
    }
  };
  useEffect(() => {
    checkAdminOne();
  }, []);

  return isAdminOneExist ? chidren : null;
}

export default AuthAdminOne;
