import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    car: [
        {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Car',
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            },

        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['booked', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
        required: true
    }
},
    {
        timestamps: true,
    },

);

export const rentalSchema = mongoose.model(" rentalSchema", rentalStatus);
