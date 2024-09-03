import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
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
},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Review', reviewSchema);