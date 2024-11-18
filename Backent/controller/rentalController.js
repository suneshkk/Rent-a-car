import {  RentalModel } from "../model/rentalModel.js"
import { Car } from "../model/carModel.js";

export const forBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carId = req.params.id;
    const { totalHours, totalAmount,fromDate,toDate } = req.body;
          if(!totalAmount || !totalHours || !fromDate || !toDate){
            return res.status(404).json({message:"All field required"})
          }
    // find the car and ensure it exists and fetch its data
    const carData = await Car.findById(carId);
    if (!carData) {
      return res.status(404).json({ message: "car not found" })
    };

    let cars = await RentalModel.findOne({ userId })
    if (!cars) {
      cars = new RentalModel({ userId, car: [] });
    };

    const existingBooking = await RentalModel.findOne({ userId, "car.carId": carId });
    if (existingBooking) {
      return res.status(400).json({ message: "This car is already booked bby the user" })
    };
    const newRental = new RentalModel({
      car: [
        {
          carId,
          price: carData.price,
          image: carData.image,
          fuelType:carData.fuelType,
          
        }
      ],
      userId:userId,
      totalAmount: totalAmount,
      totalHours: totalHours,
      fromDate:fromDate,
      toDate:toDate,
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
    const rental = await RentalModel.findOne({ userId: user.id }).populate("car.carId");

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
      const bookingId = req.params.id;

      const bookingDelete = await RentalModel.findByIdAndDelete(bookingId);

      if (!bookingDelete) 
      return  res.status(400).json({ success: false, message: "NO Booking for delete" });

     return res.status(200).json({ success: true, message: "Booking ddeleted successfully", data: bookingDelete});
  } catch (error) {
    console.log(error);
      return next(error);
  };
};

