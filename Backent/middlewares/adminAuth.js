import jwt from 'jsonwebtoken';



export const adminAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {

            return res.status(401).json({ success: false, message: "User Not Authorized" });

        }
        console.log("tokenVerified=====", token);

        const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        if (!tokenVerified) {
            return res.status(401).json({ success: false, message: "User Not Authorized" });

        }
        console.log("tokenVerified=====", tokenVerified);
        if (tokenVerified.role !== "admin") {

            return res.status(401).json({ success: false, message: "user not Authorized" })
        }


        else {
            req.user = tokenVerified;
            next();
        };

    } catch (error) {
        console.log(error);
        return next(error);
    };
};

