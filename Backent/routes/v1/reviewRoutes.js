import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { addReview } from "../../controller/reviewController.js";

const router = express.Router();


router.post("/add-review",userAuth,addReview);
// router.delete("/delete-review",userAuth,deleteReview);
// router.get("/car-review/:userid",userAuth,carReview);
// router.get("/get-avarege-review",userAuth,avaregeReview);

export {router as reviewRouter

}