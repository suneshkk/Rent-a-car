import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import {
    addReview,
    deletReviewById,
    getCarReview
} from "../../controller/reviewController.js";

const router = express.Router();


router.post("/add-review/:carId", userAuth, addReview);
router.delete("/delete",userAuth,deletReviewById);
router.get("/get-review/:id", userAuth, getCarReview);
// router.get("/get-avarege-review",userAuth,avaregeReview);

export {
    router as reviewRouter

}