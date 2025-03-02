import express from 'express';
import { userRouter } from './userRoutes.js';
import { carRouter } from './carRoutes.js';
import { dealerRouter } from './dealerRoutes.js';
import { rentalRoutes } from './rentalRoutes.js';
import { reviewRouter } from './reviewRoutes.js';
import { peymentRouter } from './paymentRouter.js';
import { adminRouter } from './adminRouter.js';

const router = express.Router();
router.use("/admin",adminRouter)
router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/dealer",dealerRouter);
router.use("/rental",rentalRoutes);
router.use("/review",reviewRouter);
router.use("/payment",peymentRouter);


export { router as v1Router };