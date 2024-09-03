import express from 'express';
import { sellerAuth } from '../../middlewares/sellerAuth.js';

const router = express.Router();


router.post("/createCar",);
router.get("/carlist",);
router.get("/oneCar",);

router.delete("/deleteCar", sellerAuth);
router.put("/updateCar", sellerAuth,);



export { router as carRouter };