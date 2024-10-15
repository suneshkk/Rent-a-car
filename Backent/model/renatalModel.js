import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    car: [
        {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'car',
                required: true
            },
            price: {
                type:Number,
                ref:'car',
                required: true
            },

        },
    ],
    startDate: {
        type: Date,
        default:12/10/2024,
        required: true
    },
    endDate: {
        type: Date,
        default:14/10/2024,
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

// Method to calculate the total rental price based on the number of days
rentalStatus.methods.calculateTotalPrice = function () {
    const days = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24);
    const rentalDays = days > 0 ? days : 1;

    this.totalPrice = this.car.reduce((total, car) => total + car.price * rentalDays, 0);
};



export const rentalSchema = mongoose.model(" rentalSchema", rentalStatus);
