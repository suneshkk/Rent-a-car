import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAdminOne,
  saveAdminOne,
} from "../../redux/features/adminOneSlice.js";
import { axiosInstance } from "../../config/axiosInstance.jsx";

function AuthAdminOne({children }) {
  const { isAdminOneExist } = useSelector((state) => state.adminOne);
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

  return isAdminOneExist ? children : null;
}

export default AuthAdminOne;
