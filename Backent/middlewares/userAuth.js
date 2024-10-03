import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "User not autherized" });
        }
        const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "User not autherized" });

        } else {
            req.user = tokenVerified
            next();
        }
    } catch (error) {
        console.log(error);
        return next(error);
    }
};