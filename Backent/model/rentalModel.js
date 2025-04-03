import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
        required: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer',
        required: true
    },
    totalHours: {
        type: Number,
        required: true,

    },

    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ['booked', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
        required: true
    },
    dLicence: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    },

);


export const RentalModel = mongoose.model("bookingcollections", rentalStatus);


