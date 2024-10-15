import express from "express"
import { userAuth } from "../../middlewares/userAuth.js";
import {addToRental} from "../../controller/rentalController.js";
import { getRental } from "../../controller/rentalController.js";
import { removeRental } from "../../controller/rentalController.js";
const router = express.Router();

router.post("/create-rental",userAuth,addToRental);
router.get("/get-rental",userAuth, getRental);
router.delete("/remove-rental",userAuth,removeRental );


export {router as rentalRoutes};