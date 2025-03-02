import { adminAuth } from "../../middlewares/adminAuth.js";
import express from "express";
import { adminSignup } from "../../controller/adminController.js";

const router = express.Router();

router.post("/sign-up", adminSignup);

export { router as adminRouter };
