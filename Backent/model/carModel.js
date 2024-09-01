import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
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
    imageUrl: {
        Type: String,
        default: "path",
    }
});

export const carModel = mongoose.model("Car", carSchema);
