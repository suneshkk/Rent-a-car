import express from 'express';

export const router = express();


router.post("/signup", userSignup);
router.post("/loging", userLoging);
router.post("/logout", userLogout);

router.get("/profile", userProfile);
router.put("/update");
router.delete("/delete");

router.get("/userList",);
router.get("/check-user", checkUser);