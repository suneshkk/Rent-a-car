import express from 'express';
import { userAuth } from '../../middlewares/userAuth.js';
import {
    userLogin,
    userLogout,
    userSignup,
    userProfile,
    checkUser,
    updateUser,
    deleteUser
} from '../../controller/userController.js';
import { upload } from '../../middlewares/multer.js';

const router = express.Router();


router.post("/signup",upload.single("profilePic"), userSignup);
router.post("/login", userLogin);
router.post("/logout", userAuth,userLogout);

router.get("/profile", userAuth, userProfile);
router.put("/update", userAuth,upload.single("profilePic"), updateUser);
router.delete("/delete/:id", userAuth, deleteUser);

router.get("/check-user", userAuth, checkUser);

export { router as userRouter };