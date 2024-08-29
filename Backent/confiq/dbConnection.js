import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDBURL);
        console.log("Database connected succesfully")

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};