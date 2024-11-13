import mongoose from "mongoose";



const rentalStatus = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },

    // cars: [
    //     {
    //         carId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'car',
    //             required: true
    //         },
    //         price: {
    //             type: Number,
    //             required: true
    //         },
    //         image: {
    //             type: String,
    //             default: "image",
    //         },


    //     },
    // ],
    // fromDate: {
    //     type: Date,
    //     required: true,

    // },
    // toDate: {
    //     type: Date,
    //     required: true,

    // },
    // totalHours: {
    //     type: Number,
    //     required: true,

    // },

    // totalAmount: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },


    // status: {
    //     type: String,
    //     enum: ['booked', 'in-progress', 'completed', 'cancelled'],
    //     default: 'booked',
    //     required: true
    // },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },

    totalHour: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
        status: {
        type: String,
        enum: ['booked', 'in-progress', 'completed', 'cancelled'],
        default: 'booked',
    },


},
    {
        timestamps: true,
    },

);

// Method to calculate the total rental price based on the number of days
// rentalStatus.methods.calculateTotalPrice = function () {
//     const days = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24);
//     const rentalDays = days > 0 ? days : 1;

//     this.totalPrice = this.car.reduce((total, car) => total + car.price * rentalDays, 0);
// };

export const rentalSchema = mongoose.model("rentalSchema", rentalStatus);


// export const rentalSchema = mongoose.model(" rentalSchema", rentalStatus);
