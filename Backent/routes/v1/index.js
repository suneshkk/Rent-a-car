import express from 'express';
import { userRouter } from './userRoutes.js';
// import { carRouter } from './carRoutes.js';
// import { historyRoter } from './carHistoryRoute.js';

const  router =express.Router();

router.use("/user",userRouter);
// router.use("/cars",carRouter);
// router.use("/history",historyRoter);
 


export {router as v1Router};