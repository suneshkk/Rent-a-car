import { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, saveUser } from '../../redux/features/userSlice.js';

const AuthUser = ({ children }) => {
    const { isUserExist } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const checkUser = async () => {

        try {
            const response = await axiosInstance.get("/user/check-user",
                {
                    withCredentials: true,
                });
            dispatch(saveUser())

        } catch (error) {
            dispatch(clearUser())
            console.log(error);
            navigate('/login');
        }

    }
    useEffect(() => {
        checkUser();
    }, []);

    return isUserExist ? children : null;
};
export default AuthUser;
