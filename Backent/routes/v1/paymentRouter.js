import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { payment } from "../../controller/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", userAuth,payment);


export {router as peymentRouter}