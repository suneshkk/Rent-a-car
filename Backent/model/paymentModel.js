import mongoose from "mongoose";

const payment = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sessionId: {
            type: String,
            required: true,
        },
        car: [
            {
                carId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'car',
                    required: true
                },
            },
        ],
        totalPrice: {
            type: Number,
            // required: true,
        },
    },
    { timestamps: true }


);
export const Order = mongoose.model("Order", payment);