import express from 'express';
import { userRouter } from './userRoutes.js';
import { carRouter } from './carRoutes.js';
import { paymentRouter } from './paymentRoutes.js';
import { admiRouter } from './adminRoutes.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/payment", paymentRouter);
router.use("/admin",admiRouter);


export { router as v1Router };