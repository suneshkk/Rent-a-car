import mongoose from "mongoose";

const payment = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status:{
        type:String,
        required:true,
        default:"payed"
    }
},
    { timestamps: true }


);
export const Order = mongoose.model("Order", payment);