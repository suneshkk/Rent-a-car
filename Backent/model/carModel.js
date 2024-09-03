import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true,

    },
    type: {
        type: String,
        enum: ['sedan', 'suv', 'truck', 'coupe', 'convertible', 'wagon', 'van', 'hatchback', 'other'],
        required: true
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'electric', 'hybrid', 'cng', 'lpg', 'other'],
        required: true
    },
    transmission: {
        type: String,
        enum: ['manual', 'automatic', 'semi-automatic'],
        required: true
    },
    availability: {
        type: Boolean,
        default: true,
        required: true
    },
    rentalRate: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v > 0; // Rental rate must be a positive number
            },
            message: props => `${props.value} should be a positive number!`
        }
    },
    location: {
        type: String,
        required: true
    },
    image: {
        Type: String,
        default: "path",
        required: true,
    }
},
    {
        timestamps: true,
    },

);

export { carSchema };
