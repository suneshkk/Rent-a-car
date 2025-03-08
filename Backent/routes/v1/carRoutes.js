import express from 'express';
import { dealerAuth } from '../../middlewares/dealerAuth.js';
import {
    createCar,
    carlist,
    getCarById,
    deleteCar,
    updateCar,
    filterCarByType,
    availablCarList,
} from '../../controller/carController.js';
import { upload } from '../../middlewares/multer.js';


const router = express.Router();


router.post("/create/:id", dealerAuth, upload.single("image"), createCar);
router.get("/car-list", carlist);
router.post("/filter-type",filterCarByType);
router.get("/get-car/:id", getCarById);

router.delete("/delete-car/:id", dealerAuth, deleteCar);
router.put("/update/:id", dealerAuth, upload.single("image"), updateCar);
router.get("/available-cars",availablCarList)



export { router as carRouter };