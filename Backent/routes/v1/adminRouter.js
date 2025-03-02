import { adminAuth } from "../../middlewares/adminAuth.js";
import express from "express";
import {
  adminCheck,
  adminDelete,
  adminLogin,
  adminLogout,
  adminProfile,
  adminSignup,
  adminUpdate,
} from "../../controller/adminController.js";

const router = express.Router();

router.post("/sign-up", adminSignup);
router.post("/login", adminLogin);
router.get("/check", adminAuth, adminCheck);
router.get("/profile",adminAuth,adminProfile);
router.post("/logout",adminAuth,adminLogout);
router.delete("/delete",adminAuth,adminDelete);
router.put("/update/:id",adminAuth,adminUpdate);

export { router as adminRouter };
