import { RentalSchema } from "../model/rentalModel.js"
import { Car } from "../model/carModel.js";

export const forBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carId = req.params.id;
    const { totalHours, totalAmount } = req.body;
          if(!totalAmount || !totalHours){
            return res.status(404).json({message:"All field required"})
          }
    // find the car and ensure it exists and fetch its data
    const carData = await Car.findById(carId);
    if (!carData) {
      return res.status(404).json({ message: "car not found" })
    };

    const cars = await RentalSchema.findOne({ userId })
    if (!cars) {
      cars = new RentalSchema({ userId, car: [] });
    };

    const existingBooking = await RentalSchema.findOne({ userId, "car.carId": carId });
    if (existingBooking) {
      return res.status(400).json({ message: "This car is already booked bby the user" })
    };
    const newRental = new RentalSchema({
      car: [
        {
          carId,
          price: carData.price,
          image: carData.image,
        }
      ],
      userId:userId,
      totalAmount: totalAmount,
      totalHours: totalHours,
    });
    await newRental.save();


    return res.status(201).json({ success: true, message: "Booked successfully",data:newRental });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};


export const bookedCarDetials = async (req, res, next) => {
  try {
    const { user } = req;
    const rental = await RentalSchema.findOne({ userId: user.id }).populate("car.carId");

    if (!rental) {
      return res.status(404).json({ message: "There is no Rental" })
    }
    return res.json({ message: "Rental fetched successfully", data: rental });
  } catch (error) {
    console.log(error);
    return next(error);
  };

};
export const deleteBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { carId } = req.body;
    // console.log("user", userId);
    // console.log("car", carId);

    const rental = await RentalSchema.findOne({ userId });
    if (!rental) {
      return res.status(400).json({ message: "no rental found" });
    }
    console.log("rental", rental)
    // Delete the rental by carRental ID
    rental.car = rental.car.filter((item) => !item.carId.equals(carId));


    rental.calculateTotalPrice();

    await rental.save();

    return res.json({ message: "Rental deleted successfully" });


  } catch (error) {
    console.log(error);
    return next(error);
  }
};
