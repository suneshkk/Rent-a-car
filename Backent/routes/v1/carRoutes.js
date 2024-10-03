import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth.js';
import {
    createCar,
    carlist,
    getCarById,
    deleteCar,
    updateCar
} from '../../controller/carController.js';
import { upload } from '../../middlewares/multer.js';


const router = express.Router();


router.post("/create", adminAuth, upload.single("image"), createCar);
router.get("/list", adminAuth, carlist);
router.get("/Car", adminAuth, getCarById);

router.delete("/delete", adminAuth, deleteCar);
router.put("/update", adminAuth, upload.single("image"), updateCar);



export { router as carRouter };