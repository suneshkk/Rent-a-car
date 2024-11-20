import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom';

function AuthAdmin({children}) {
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate()

  const checkAdmin = async () => {
    try {

      const response = await axiosInstance.get('/admin/check-admin', { withCredentials: true });
      setIsUser(true)
    } catch (error) {
      setIsUser(false)
      console.log(error);
     navigate("/admin-login")
    };
  };
  useEffect(() => {
    checkAdmin();
  }, []);

    return isUser ? children : null
};

export default AuthAdmin
