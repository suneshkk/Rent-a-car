import { rentalSchema } from "../model/renatalModel.js";
import { car } from "../model/carModel.js";

export const forBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carId = req.params.id;
    const { fromDate, toDate, totalHours, totalAmount } = req.body;
    const carData = await car.findById(carId);
    if (!carData) {
      return res.status(404).json({ message: "car not found" })
    };
    const creatBooking = new rentalSchema({
      car: carId,
      user: userId,
      fromDate,
      toDate,
      totalHour: Number(totalHours),
      totalAmount: Number(totalAmount),
    });

    console.log("saved data", creatBooking)
    await creatBooking.save();

    return res.status(201).json({ success: true, message: "Booked successfully", data: creatBooking });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};


// const { fromDate, toDate, totalHours, totalAmount, } = req.body;
// if (!fromDate || !toDate || !totalHours || !totalAmount) {
//   return res.status(404).json({ message: "All fields required" });
// };

// const from = new Date(fromDate);
// const to = new Date(toDate);
// // checking the cardata is existing and fetching 
// const carData = await car.findById(carId);
// if (!carData) {
//   return res.status(404).json({ message: "car not found" })
// };


// // Find existing booking for the user
// let carBooking = await rentalSchema.findOne({ userId });
// if (!carBooking) {
//   carBooking = new rentalSchema({ userId, cars: [], });
// };

// carBooking.cars.push({
//   carId: carId,
//   price: carData.price,
//   image: carData.image,
//   fromDate: from,
//   toDate: to,
//   totalHours: Number(totalHours),
//   totalAmount: Number(totalAmount),
// });

// Save the booking
export const bookedCarDetials = async (req, res, next) => {
  try {
    const { user } = req;
    const rental = await rentalSchema.findOne({ userId: user.id }).populate("car.carId");

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

    const rental = await rentalSchema.findOne({ userId });
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
