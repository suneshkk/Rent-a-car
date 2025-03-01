import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
        required: true,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

},
    {
        timestamps: true,
    },
);

export const Review = mongoose.model('Review', reviewSchema);