
import mongoose from "mongoose";



const adminModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                // Length check
                if (v.length < 5 || v.length > 255) {
                    return false;
                }
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(v);
            },
            // Error message
            message: props => `${props.value} is not a valid email`
        }

    },
    password: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Length check
                if (v.length < 8 || v.length > 128) {
                    return false;
                }
                // Password pattern check
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
                return passwordRegex.test(v);
            },
            message: props => `Password must be between 8 and 10 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.`
        }

    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Phone number length and pattern check
                const phoneRegex = /^\d{10,15}$/; // Allows phone numbers with exactly 10 digits
                return phoneRegex.test(v);
            },
            message: props => `${props.value} is not a valid phone number! It should contain exactly 10 digits.`
        }
    },

    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
        required: true,
    },
},
    {
        timestamps: true,
    },
);

export const adminSchema = mongoose.model("adminsChema", adminModelSchema);