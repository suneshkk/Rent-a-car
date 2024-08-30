import jwt from 'jsonwebtoken';

export  const generateToken = (id,role)=>{
    try{
   var token = jwt.sign ({id:id,role:role || "user"} ,process.env.jwt_key);
   return(token);
    }catch(error){
        console.log(error);

    }
}