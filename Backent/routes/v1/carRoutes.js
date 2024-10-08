import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth.js';
import {
    createCar,
    carlist,
    getCarById,
    deleteCar,
    updateCar
} from '../../controller/carController.js';
// import { upload } from '../../middlewares/multer.js';


const router = express.Router();


router.post("/create", adminAuth, createCar);
router.get("/list", adminAuth, carlist);
router.get("/Car/:id", adminAuth, getCarById);

router.delete("/delete", adminAuth, deleteCar);
router.put("/update", adminAuth,  updateCar);



export { router as carRouter };