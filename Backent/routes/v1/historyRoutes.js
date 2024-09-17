import express from "express"
const router = express.Router();

router.post("/rentals",createRental);
router.get("/rentals:rentalId", getRentalById);
router.get("/rentals", getAllRentals);
router.put("/rentals/:id",updateRentalStatus);
router.delete("/rentals/:id",deleteREntal);


export {router as historyRoter};