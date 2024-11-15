import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    car: [
        {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'car',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                default: "image",
            },


        },
    ],
    totalHours: {
        type: Number,
        required: true,

    },

    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },


    status: {
        type: String,
        enum: ['booked', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
        required: true
    },
},
    {
        timestamps: true,
    },

);


export const RentalSchema = mongoose.model("rentalSchema", rentalStatus);


