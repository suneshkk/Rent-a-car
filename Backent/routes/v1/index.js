import express from 'express';
import { userRouter } from './userRoutes.js';
import { carRouter } from './carRoutes.js';
import { admiRouter } from './adminRoutes.js';
import { rentalRoutes } from './rentalRoutes.js';

const router = express.Router();

router.use("/user", userRouter);
router.use("/car", carRouter);
router.use("/admin",admiRouter);
router.use("/rental",rentalRoutes);


export { router as v1Router };