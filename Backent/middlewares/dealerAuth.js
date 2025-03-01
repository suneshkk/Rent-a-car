import jwt from 'jsonwebtoken'

export const dealerAuth = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'user not autherised'}) 
        };
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({message:'user not autherised'}) 
        };
        // console.log("user",tokenVerified)
        
        if(tokenVerified.role !== 'dealer' ){
            return res.status(401).json({message:'access denied'}) 
        };

        req.user=tokenVerified
        
        next()
        
    } catch (error) {
        
        return res.status(401).json({message:'user autherization failed'}) 
    };
};