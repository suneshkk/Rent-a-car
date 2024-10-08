import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

export const generateToken = (id, role) => {
    try {
        var token = jwt.sign(
            {
                user: id,
                user: role
            }
            , process.env.JWT_KEY);
        return (token);
    } catch (error) {
        console.log(error);

    }
}