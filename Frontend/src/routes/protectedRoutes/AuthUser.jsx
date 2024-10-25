import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

  const AuthUser = ({ children }) => {

    const [isUser, setIsUser] = useState(false);
            const navigate = useNavigate();
    const checkUser = async () => {

        try {
            const response = await axiosInstance.get("/user/check-user",
                { withCredentials: true, });
            setIsUser(true);
            
        } catch (error) {
            setIsUser(false);
            console.log(error);
            navigate('/login');
        }

    }
    useEffect(() => {
        checkUser();
    }, []);

    return isUser ? children : null;
};
export default AuthUser;
