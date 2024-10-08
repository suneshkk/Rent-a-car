import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import { createRental } from "../../controller/rentalController.js";
const router = express.Router();

router.post("/create",userAuth, createRental);
// router.get("/rental/:Id", getRental);
// router.put("/rentals/:id",updateRental);


export {router as rentalRoutes};