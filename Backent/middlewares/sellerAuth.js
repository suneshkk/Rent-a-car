import jwt from 'jsonwebtoken';



export const sellerAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "User Not Authorized" });
        }
        const tokenVerified = jwt.verify(token,process.env.JWT_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "User Not Authorized" });

        }

        else {
            req.user = tokenVerified;
            next();
        };

    } catch (error) {
       console.log(error);
       return res.status(error.statuscode || 500).json({ message: error.message || "server error" });

    };
};