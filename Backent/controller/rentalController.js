import { rentalSchema } from "../model/renatalModel.js";
import { carSchema } from "../model/carModel.js";


export const createRental = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { carId } = req.body;
        const { startDate, endDate, totalPrice } = req.body;
        if (!startDate || !endDate) {
            return res.status(400).json({ success: false, message: " Proper dates required" });
        }
        console.log("first")
        // finding the car user search
        const carData = await carSchema.findById(carId);
        if (!carData) {
            return res.status(400).json({ message: "There is no similar CAR" });
        }
        console.log("second")
        
        //for creating cart if there no existing cart
        let rental = await rentalSchema.findOne(userId);
        if (!rental) {
            rental = new rentalSchema({ userId, car: [] })
        }
        //check the car is already in the cart
        const carExists = rental.car.some((item) => item.carId.equals(carId));
        if (carExists) {
            return res.status(400).json({ message: "You already purchased this" });
        }

        // Add the car to the cart
        rental.car.push({
            carId,
            price: carData.totalPrice,
        });


        await rental.save();

    } catch (error) {
        console.log(error);
        return next(error);
    }
}