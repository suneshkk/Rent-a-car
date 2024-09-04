import mongoose from "mongoose";


const paymentModelSchema = new mongoose.Schema({
    rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
    },
},
    {
        timestamps: true,
    },

);

export const paymentSchema = mongoose.model("paymentSchema", paymentModelSchema);