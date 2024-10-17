import { review } from "../model/reviewModel.js";
import { carSchema } from "../model/carModel.js";


export  const addReview = async (req,res,next)=>{

    try{
        
        const{ carId,rating,comment} = req.body;
        const {userId} = req;

        console.log("car",carId);
        console.log("user",userId);
         
        const carData = await carSchema .findById({carId});
        if(!carData){
            return res.status(404).json({message:"car data not found"});
        }
        const reviewExist = await review.findOne({userId,carId});
        if(reviewExist){
            return res.status(400).json({message:"Review already exist"})
        }
        const newReview = await review({userId,carId,rating,comment});
        await newReview.save()
         
        return res.status(201).json({message:"Review added successfully",data:newReview});

        }catch(error){
            console.log(error);
         return next(error);
        }
}