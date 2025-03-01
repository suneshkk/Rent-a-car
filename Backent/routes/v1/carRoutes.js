import express from 'express';
import { dealerAuth } from '../../middlewares/dealerAuth.js';
import {
    createCar,
    carlist,
    getCarById,
    deleteCar,
    updateCar,
    filterCarByType,
    getDealerCars,
} from '../../controller/carController.js';
import { upload } from '../../middlewares/multer.js';


const router = express.Router();


router.post("/create", dealerAuth, upload.single("image"), createCar);
router.get("/car-list", carlist);
router.post("/filter-type",filterCarByType);
router.get("/get-car/:id", getCarById);
router.get("/get-admin-cars/:id",getDealerCars);

router.delete("/delete-car/:id", dealerAuth, deleteCar);
router.put("/update/:id", dealerAuth, upload.single("image"), updateCar);



export { router as carRouter };