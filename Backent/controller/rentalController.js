import { rentalSchema } from "../model/renatalModel.js";
import { carSchema } from "../model/carModel.js";


export const getRental = async (req, res, next) => {
  try {
    const { user } = req.user;
    const rental = await rentalSchema.findOne(user)

    if (!rental) {
      return res.status(404).json({ message: "There is no Rental" })
    }
    res.json({ message: "Rental fetched successfully", data: rental });
  } catch (error) {
    console.log(error);
    return next(error);
  };

};
export const addToRental = async (req, res, next) => {
  try {
    const { carId } = req.body;
    const userId = req.user.id;

    console.log("car", carId);

    // Find the car using the provided ID
    const carData = await carSchema.findOne(carId);
    if (!carData) {
      return res.status(400).json({ message: "There is no similar CAR" });
    }

    // Find existing rental or create a new one if it doesn't exist
    let rental = await rentalSchema.findOne({ userId });
    if (!rental) {
      rental = new rentalSchema({ userId, car: [] });
    }

    // Check if the car is already in the rental
    const carExists = rental.car.some((item) => item.carId && item.carId.equals(carId));
    if (carExists) {
      return res.status(400).json({ message: "You already purchased this" });
    }

    // Add the car to the rental
    rental.car.push({
      carId,
      price: carSchema.price,
    });
    // Calculate total price if you have this method in your schema
    rental.calculateTotalPrice();

    // Save the rental
    await rental.save();

    return res.status(200).json({ message: "Added to Rent Book", data: carData });
  } catch (error) {
    console.error("Error adding to rental:", error);
    return next(error);
  }
};
export const updateRental = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const  {carId}  = req.body;
    console.log("user", userId);
    console.log("rental", carId);

    const rental = await rentalSchema.findById({ userId });
    if (!rental) {
      return res.status(400).json({ message: "There is no rental for this user id" });
    }

    // Delete the rental by carRental ID
    const deleteCar = await rentalSchema.findByIdAndDelete(carId);
    if (!deleteCar) {
      return res.status(400).json({ message: "No items found for delete" });
    } else {
      return res.json({ message: "Rental deleted successfully" });
    }

  } catch (error) {
    console.log(error);
    return next(error);
  }
};
