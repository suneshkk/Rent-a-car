import express from "express";
import { adminAuth } from "../../middlewares/adminAuth.js";
import {
    adminLogin,
    adminProfile,
    adminSignup,
    adminLogout,
    adminDelete,
    adminUpdate,
    adminCheck,
    userlist,
} from "../../controller/adminCotroller.js";


const router = express.Router();

router.post("/sign-up", adminSignup);
router.post("/login", adminLogin);
router.post("/logout",adminAuth, adminLogout);

router.get("/profile", adminAuth, adminProfile);
router.put("/update/:id", adminAuth, adminUpdate);
router.delete("/delete/:id", adminAuth, adminDelete);
router.get("/user-list",adminAuth,userlist);

router.get("/check-admin", adminAuth, adminCheck);

export { router as admiRouter };