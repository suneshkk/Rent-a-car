import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import {addToRental} from "../../controller/rentalController.js";
import { getRental } from "../../controller/rentalController.js";
import { removeRental } from "../../controller/rentalController.js";
const router = express.Router();

router.post("/for-booking",userAuth,addToRental);
router.get("/booked-car",userAuth, getRental);
router.delete("/cancel-booking",userAuth,removeRental );


export {router as rentalRoutes};