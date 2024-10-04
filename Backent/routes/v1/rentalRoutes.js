import express from "express"
import { createRental } from "../../controller/rentalController.js";
const router = express.Router();

router.post("/rental",createRental);
// router.get("/rental/:Id", getRental);
// router.get("/rentals", getAllRentals);
// router.put("/rentals/:id",updateRental);
// router.delete("/rentals/:id",deleteRental);


export {router as rentalRoutes};