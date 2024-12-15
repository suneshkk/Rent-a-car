import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import {
    bookedCarDetials,
    bookedCars,
    deleteBooking,
    forBooking
} from "../../controller/rentalController.js"

const router = express.Router();

router.post("/booking/:id", userAuth, forBooking);
router.get("/booked-car", userAuth, bookedCarDetials);
router.delete("/cancel-booking/:id", userAuth, deleteBooking);
router.get("/booking-list/:id",bookedCars);


export { router as rentalRoutes };