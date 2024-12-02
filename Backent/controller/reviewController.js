import { Review } from "../model/reviewModel.js";
import { Car } from "../model/carModel.js";


export const addReview = async (req, res, next) => {

    try {
        // carid rating and commet gets throuhg body

        const { carId } = req.params;
        const { rating, comment } = req.body;
        //user id from cookies
        const userId = req.user.id;

        // checking if the car is exist
        const carData = await Car.findById(carId);
        if (!carData) {
            return res.status(404).json({ message: "car not found" });
        }

        //creating or updating the review with the help of upsert (update,insert)
        const reviewExist = await Review.findOneAndUpdate({ userId, carId },
            { rating, comment },
            { new: true, upsert: true });

        const newReview = await Review({ userId, carId, rating, comment });
        await newReview.save()

        return res.status(201).json({ message: "Review added successfully", data: newReview });




    } catch (error) {
        console.log(error);
        return next(error);
    };
};

export const getCarReview = async (req, res, next) => {

    try {
        const { carId } = req.params.id;

        const reviews = await Review.find(carId).populate("userId", "name").sort({ createdAt: -1 });
        if (!reviews.length) {
            return res.status(404).json({ message: "no reviews for this car" })
        } else {
            return res.status(200).json({ success: true, message: "Review fetched successfully", data: reviews })
        }
    } catch (error) {
        console.log(error);
        return next(error);
    };
};

export const deletReviewById = async (req, res, next) => {

    try {
        const { reviewId } = req.params.id;
        const userId = req.user.id;
        console.log(reviewId, "data")
        const review = await Review.findOneAndDelete({ _id: reviewId, userId });
        if (!review) {
            return res.status(404).json({ message: "No review for this id" })
        } else {
            return res.status(200).json({ success: true, message: "review deleted successfully" })
        };

    } catch (error) {
        console.log(error);
        return next(error);
    };
};