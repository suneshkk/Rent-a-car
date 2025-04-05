import express from "express";
import { dealerAuth } from "../../middlewares/dealerAuth.js";
import {
  createCar,
  carlist,
  getCarById,
  deleteCar,
  updateCar,
  availablCarList,
  carFilter,
  carByDealer,
} from "../../controller/carController.js";
import { upload } from "../../middlewares/multer.js";

const router = express.Router();

router.post("/create/:id", dealerAuth, upload.single("image"), createCar);
router.get("/car-list", carlist);
router.get("/get-car/:id", getCarById);
router.get("/filter-car", carFilter);
router.delete("/delete-car/:id", dealerAuth, deleteCar);
router.put("/update/:id", dealerAuth, upload.single("image"), updateCar);
router.get("/car-by-dealer/:id",dealerAuth,carByDealer)
router.get("/available-cars", availablCarList);

export { router as carRouter };
