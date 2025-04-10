import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { checkPayment, payment, userPayment } from "../../controller/paymentController.js";
import { adminAuth } from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/create-checkout-session", userAuth,payment);
router.get("/check-payment",adminAuth, checkPayment);
router.get("/user-payment",userAuth,userPayment)

export {router as peymentRouter}