// // 
// // import jwt from 'jsonwebtoken';

// // export const userAuth = (req, res, next) => {
// //     try {
// //         const {token} = req.cookies;
// //         if(!token){
// //           return res.status(401).json({message:'Sorry no token'}) 
// //         }
        
// //         const tokenVerified = jwt.verify(token,process.env.JWT_KEY_SECRET);
// //         if(!tokenVerified){
// //             return res.status(401).json({message:'User token Verification filed'}) 
// //         }
        
// //         req.user=tokenVerified
        
// //         next()

// //     } catch (error) {
// //         console.error("Token verification error:", error.message);
        
// //         return res.status(401).json({ success: false, message: "Invalid token" });
// //     }
// // };
// import jwt from 'jsonwebtoken'

// export const userAuth = (req,res,next)=>{
//     try {
//         const {token} = req.cookies;
//         if(!token){
//           return res.status(401).json({message:'user not autherised'}) 
//         }
        
//         const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
//         if(!tokenVerified){
//             return res.status(401).json({message:'user not autherised'}) 
//         }
        
//         req.user=tokenVerified
        
//         next()
        
//     } catch (error) {
        
//         return res.status(401).json({message:'user autherization failed'}) 
//     }
// }
import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
  try {
    // Extract the token from cookies
    const { token } = req.cookies;
    // console.log("token",token);
    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Verify the token with the secret key
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("token",tokenVerified);
    // If token verification fails, handle it in the catch block
    if (!tokenVerified) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    

    // Attach the verified user data to the request object
    req.user = tokenVerified;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during verification
    return res.status(401).json({ message: 'User authorization failed' });
  }
};
