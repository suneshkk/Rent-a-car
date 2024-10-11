import jwt from 'jsonwebtoken';



export const adminAuth = (req, res, next) => {
    console.log("function ===",adminAuth);
    try {
        const { token } = req.cookies;

        if (!token) {

            return res.status(401).json({ success: false, message: "Sorry Token Not Get" });

        }

        const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "Token Verification Filed" });

        }
        // if (tokenVerified.role !== "admin") {

        //     return res.status(401).json({ success: false, message: "Admin Login Onlly" })
        // }


        else {
            req.user = tokenVerified;
            next();
        };

    } catch (error) {
        console.log(error);
        return next(error);
    };
};

