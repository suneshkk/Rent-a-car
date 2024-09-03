import express from 'express';
import { sellerAuth } from '../../middlewares/sellerAuth.js';

const router = express.Router();


router.post("/signup",);
router.post("/login",);
router.post("/logout",);

router.delete("/delete", sellerAuth);
router.put("/update", sellerAuth,);
router.get("/profile", sellerAuth);



export { router as carRouter };