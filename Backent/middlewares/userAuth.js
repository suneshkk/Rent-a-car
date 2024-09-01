import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "user not autherized" });
        }
        const tokenVerified = jwt.verify(token, process.env.jwt_key);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "user not autherized" });

        }
        req.user = tokenVerified
        next();
    } catch (error) {
        console.log(error);
        res.status(error.statuscode || 500).json({ message: error.message || "server error" });
    }
};