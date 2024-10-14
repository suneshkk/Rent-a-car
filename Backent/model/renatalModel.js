import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    car: [
        {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Car',
                required: true
            },
            price: {
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
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
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

const days =
    (new Date(rentalStatus.endDate) - new Date(rentalStatus.startDate)) /
    (1000 * 60 * 60 * 24);

const rentalDays = days > 0 ? days : 1;

rentalStatus.methods.calculateTotalPrice = function () {
    this.totalPrice = this.car.reduce((total, car) => total + car.price * rentalDays)

};



export const rentalSchema = mongoose.model(" rentalSchema", rentalStatus);
