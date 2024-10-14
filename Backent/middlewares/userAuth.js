// 
import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'Sorry no token'}) 
        }
        
        const tokenVerified = jwt.verify(token,process.env.JWT_KEY_SECRET);
        if(!tokenVerified){
            return res.status(401).json({message:'User token Verification filed'}) 
        }
        
        req.user=tokenVerified
        
        next()

    } catch (error) {
        console.error("Token verification error:", error.message);
        
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
