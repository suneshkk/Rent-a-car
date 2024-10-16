import express from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import {
    adminLogin,
    adminProfile,
    adminSignup,
    adminLogout,
    adminDelete,
    adminUpdate,
    adminCheck
} from "../../controller/adminCotroller.js";


const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

router.get("/profile/:id", adminAuth, adminProfile);
router.put("/update/:id", adminAuth, adminUpdate);
router.delete("/delete/:id", adminAuth, adminDelete);

router.get("/check-admin", adminAuth, adminCheck)

export { router as admiRouter };