import { adminAuth } from "../../middlewares/adminAuth.js";
import express from "express";
import {
  adminCarList,
  adminCheck,
  adminDelete,
  adminFetchDealerData,
  adminLogin,
  adminLogout,
  adminProfile,
  adminSignup,
  adminUpdate,
  getDealerCars,
} from "../../controller/adminController.js";

const router = express.Router();

router.post("/sign-up", adminSignup);
router.post("/login", adminLogin);
router.get("/check", adminAuth, adminCheck);
router.get("/profile", adminAuth, adminProfile);
router.post("/logout", adminAuth, adminLogout);
router.delete("/delete/:id", adminAuth, adminDelete);
router.put("/update/:id", adminAuth, adminUpdate);
router.get("/fetch-dealer-data", adminAuth, adminFetchDealerData);
router.get("/fetch-car-list", adminAuth, adminCarList);
router.get("/get-dealer-car/:id", adminAuth, getDealerCars);
export { router as adminRouter };
