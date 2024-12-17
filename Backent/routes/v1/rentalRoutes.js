import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import {
    bookedCarDetials,
    bookedCars,
    deleteBooking,
    forBooking
} from "../../controller/rentalController.js"
import { adminAuth } from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/booking/:id", userAuth, forBooking);
router.get("/booked-car", userAuth, bookedCarDetials);
router.delete("/cancel-booking/:id", userAuth, deleteBooking);
router.get("/booking-list",adminAuth,bookedCars);


export { router as rentalRoutes };