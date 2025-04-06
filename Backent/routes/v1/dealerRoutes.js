import express from "express";
import { dealerAuth } from "../../middlewares/dealerAuth.js";
import {
  dealerDelete,
  dealerLogin,
  dealerLogout,
  dealerCheck,
  dealerProfile,
  dealerSignup,
  dealerUpdate,
  dealerPayment,
} from "../../controller/dealerCotroller.js";

const router = express.Router();

router.post("/sign-up", dealerSignup);
router.post("/login", dealerLogin);
router.post("/logout", dealerAuth, dealerLogout);
router.get("/dealer-payment",dealerAuth,dealerPayment)
router.get("/profile", dealerAuth, dealerProfile);
router.put("/update/:id", dealerAuth, dealerUpdate);
router.delete("/delete/:id", dealerAuth, dealerDelete);

router.get("/check", dealerAuth, dealerCheck);

export { router as dealerRouter };
