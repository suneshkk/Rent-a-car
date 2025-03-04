import { RentalModel } from "../model/rentalModel.js";
import { Car } from "../model/carModel.js";
import { User } from "../model/userModel.js";

export const forBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carId = req.params.id;
    const { totalHours, totalAmount, fromDate, toDate, dLicence, adminId } =
      req.body;

    const iscarAvailable = await RentalModel.find({ carId: carId });
    if (iscarAvailable) {
      return res
        .status(404)
        .json({ success: false, message: "this car is already booked" });
    }

    if (fromDate >= toDate) {
      return res.status(404).json({ message: "invalid date range" });
    }
    if (!totalAmount || !totalHours || !fromDate || !toDate || !dLicence) {
      return res.status(404).json({ message: "All field required" });
    }
    const carData = await Car.findById(carId);
    if (!carData) {
      return res.status(404).json({ message: "car not found" });
    }
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not find" });
    }

    let cars = await RentalModel.findOne({ userId });
    if (!cars) {
      cars = new RentalModel({ userId, car: [] });
    }

    const newRental = new RentalModel({
      carId: carId,
      userId: userId,
      adminId: adminId,
      totalAmount: totalAmount,
      totalHours: totalHours,
      fromDate: fromDate,
      toDate: toDate,
      dLicence: dLicence,
    });
    await newRental.save();
    return res
      .status(201)
      .json({ success: true, message: "Booked successfully", data: newRental });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const userBookedCarDetials = async (req, res, next) => {
  try {
    const { user } = req;
    // console.log("user",user)
    const rental = await RentalModel.findOne({ userId: user.id })
      .populate("carId")
      .populate("userId");

    if (!rental) {
      return res.status(404).json({ message: "There is no Rental" });
    }
    return res.json({ message: "Rental fetched successfully", data: rental });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const bookingDelete = await RentalModel.findByIdAndDelete(bookingId);

    if (!bookingDelete)
      return res
        .status(400)
        .json({ success: false, message: "NO Booking for delete" });

    return res.status(200).json({
      success: true,
      message: "Booking ddeleted successfully",
      data: bookingDelete,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const dealerBookedCars = async (req, res, next) => {
  try {
    const { user } = req;
    const bookedCars = await RentalModel.find({ adminId: user.id })
      .populate("userId")
      .populate("carId");

    if (bookedCars == 0) {
      return res.status(400).json({ message: "no data" });
    } else {
      return res
        .status(200)
        .json({ message: "data fetched successfully", data: bookedCars });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminBookedCarsList = async (req, res, next) => {
  try {
    const bookedCars = await RentalModel.find();
    if (!bookedCars) {
      return res.status(400).json({ message: "no Bookings rightnow" });
    } else {
      return res
        .status(200)
        .json({ message: "data fetched successfully", data: bookedCars });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
