import express from 'express';
import { userAuth } from '../../middlewares/userAuth.js';
import { userLogin, userLogout, userSignup, userProfile, checkUser, updateUser, deletUser } from '../../controller/userController.js';

const router = express.Router();


router.post("/signup", userSignup);
router.post("/loging", userLogin);
router.post("/logout", userLogout);

router.get("/profile", userAuth, userProfile);
router.put("/update", userAuth, updateUser);
router.delete("/delete", userAuth, deletUser);

router.get("/check-user", userAuth, checkUser);

export { router as userRouter };