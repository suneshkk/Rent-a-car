import express from 'express';
import { adminAuth } from '../../middlewares/adminAuth.js';
import {
    createCar,
    carlist,
    getCarById,
    deleteCar,
    updateCar,
    filterCarByType,
    getAdminCars,
} from '../../controller/carController.js';
import { upload } from '../../middlewares/multer.js';


const router = express.Router();


router.post("/create", adminAuth, upload.single("image"), createCar);
router.get("/car-list", carlist);
router.post("/filter-type",filterCarByType);
router.get("/get-car/:id", getCarById);
router.get("/get-admin-cars/:id", getAdminCars);

router.delete("/delete-car/:id", adminAuth, deleteCar);
router.put("/update/:id", adminAuth, upload.single("image"), updateCar);



export { router as carRouter };