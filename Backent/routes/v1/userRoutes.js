import express from 'express';
import { userAuth } from '../../middlewares/userAuth.js';

 const router = express.Router();


router.post("/signup", userSignup);
router.post("/loging", userLoging);
router.post("/logout", userLogout);

router.get("/profile", userAuth, userProfile);
router.put("/update",userAuth,updateUser);
router.delete("/delete",userAuth,deletUsere);

router.get("/userList", userAuth, getUserList);
router.get("/check-user", userAuth, checkUser);

export {router as userRouter};