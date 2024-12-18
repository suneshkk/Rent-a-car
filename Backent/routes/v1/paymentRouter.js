import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { checkPayment, payment } from "../../controller/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", userAuth,payment);
router.get("/check-payment",checkPayment);


export {router as peymentRouter}