import { carSchema } from '../model/carModel.js';
import { cloudConfig } from '../confiq/cloud.js';
import { handleImageUpload } from '../util/imageUpload.js';



export const createCar = async (req, res, next) => {
    try {
        const { carName, brand, year, type, fuelType, transmission, availabillty, rentalRate, location, image } = rea.body;
        let imageUrl;

        if (!brand || !carName || !year || !type || !fuelType || !transmission || !availabillty || !rentalRate || !location) {
            return res.status(400).json({ success: false, message: "all field required" });

        }
        const isCarExist = await carSchema.findOne({ carName });

        if (isCarExist) {
            return res.status(400).json({ success: false, message: "Car Already Exist" });
        }
        if (req.file) {
            const imageUrl = await handleImageUpload(req.file.path);
        }
        const newCar = new carSchema({ carName, brand, year, type, fuelType, transmission, availabillty, rentalRate, location, image: imageUrl && imageUrl })
        await newCar.save();

    }
    catch (error) {
        console.log(error);
        return next(error);
    };
};
