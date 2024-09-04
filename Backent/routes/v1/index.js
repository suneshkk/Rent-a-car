import express from 'express';
import { userRouter } from './userRoutes.js';
import { carRouter } from './carRoute.js';
import { paymentRouter } from './paymentRoutes.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/payment", paymentRouter);


export { router as v1Router };