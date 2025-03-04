import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import {
  adminBookedCarsList,
  dealerBookedCars,
  deleteBooking,
  forBooking,
  userBookedCarDetials,
} from "../../controller/rentalController.js";
import { dealerAuth } from "../../middlewares/dealerAuth.js";
import { adminAuth } from "../../middlewares/adminAuth.js";
const router = express.Router();

router.post("/booking/:id", userAuth, forBooking);
router.get("/booked-car", userAuth, userBookedCarDetials);
router.delete("/cancel-booking/:id", userAuth, deleteBooking);
router.get("/booking-list", dealerAuth, dealerBookedCars);
router.get("/booked-cars-for-admin", adminAuth, adminBookedCarsList);

export { router as rentalRoutes };
