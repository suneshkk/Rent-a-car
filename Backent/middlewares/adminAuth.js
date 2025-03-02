import jwt from 'jsonwebtoken'

export const adminAuth = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'adimin not autherised'}) 
        };
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({message:'admin not autherised'}) 
        };
        // console.log("admin",tokenVerified)
        
        if(tokenVerified.role !== 'admin' ){
            return res.status(401).json({message:'access denied'}) 
        };

        req.user=tokenVerified
        
        next()
        
    } catch (error) {
        
        return res.status(401).json({message:'user autherization failed'}) 
    };
};