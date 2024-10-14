import { rentalSchema } from "../model/renatalModel.js";
import { carSchema } from "../model/carModel.js";


export const addToRental = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { carId } = req.params.id;

        // finding the car user search
        const carData = await carSchema.findById(carId);
        if (!carData) {
            return res.status(400).json({ message: "There is no similar CAR" });
        }

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
            price: carData.Price,
        });
         
        rental.calculateTotalPrice();

        await rental.save();

       return res.status(200).json({ message: "added to cart", data: cart });

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

export const getRental = async (req, res, next) => {
    try {
        const { user } = req;
        const rental = await rentalSchema.findOne({ userId: user.id }).populate("car.carId")

        if (!rental) {
            return res.status(404).json({ message: "There is no Rental" })
        }
        res.json({ message: "Rental fetched successfully", data: rental });
    } catch (error) {
        console.log(error);
        return next(error);
    };

};