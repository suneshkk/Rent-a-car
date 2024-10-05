import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import { createRental } from "../../controller/rentalController.js";
const router = express.Router();

router.post("/rental",userAuth, createRental);
// router.get("/rental/:Id", getRental);
// router.put("/rentals/:id",updateRental);
// router.delete("/rentals/:id",deleteRental);


export {router as rentalRoutes};