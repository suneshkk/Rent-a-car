import { useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin, saveAdmin } from "../../redux/features/adminSlice.js";

function AuthAdmin({ children }) {
  const { isAdminExist } = useSelector((state) => state.admin);
  // console.log("saveadmin",isAdminExist)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      const response = await axiosInstance.get("/dealer/check", {
        withCredentials: true,
      });
      dispatch(saveAdmin(response?.data?.data));
    } catch (error) {
      dispatch(clearAdmin());
      navigate("/admin-login");
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  return isAdminExist ? children : null;
}

export default AuthAdmin;
