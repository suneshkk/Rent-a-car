import { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAdmin, saveAdmin } from '../../redux/features/adminSlice';
import toast from 'react-hot-toast';

function AuthAdmin({ children }) {
  const { isAdminExist } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const checkAdmin = async () => {
    try {

      const response = await axiosInstance.get('/admin/check-admin', { withCredentials: true });
      dispatch(saveAdmin(response?.data?.data));
    } catch (error) {
      dispatch(clearAdmin())
       toast.error("please login")
      navigate("/admin-login")
    };
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  return isAdminExist ? children : null;
};

export default AuthAdmin;
