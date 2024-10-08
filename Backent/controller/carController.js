import { carSchema } from '../model/carModel.js';
// import { handleImageUpload } from '../util/imageUpload.js';


//creat car
export const createCar = async (req, res, next) => {
    try {
        const { carName, brand, year, type, fuelType, transmission, availability, rentalRate, location, image } = req.body;
        // let imageUrl;

        // Check if all required fields are provided
        if (!carName || !brand || !year || !type || !fuelType || !transmission || !availability || !rentalRate || !image ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the car already exists
        const isCarExist = await carSchema.findOne({ carName });
        if (isCarExist) {
            return res.status(400).json({ success: false, message: "Car already exists" });
        }

        // Handle image upload if an image is provided
        // if (req.file) {
        //     imageUrl = await handleImageUpload(req.file.path);
        // }

        // Create a new car object and save it to the database
        const newCar = new carSchema({
            carName,
            brand,
            year,
            type,
            fuelType,
            transmission,
            availability,
            rentalRate,
            location,
            image: imageUrl || image
        });

        await newCar.save();

        // Send success response
        res.status(201).json({ success: true, message: "Car created successfully", car: newCar });

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

//get carlist
export const carlist = async (req, res, next) => {

    try {
        //find car list from schema
        const cars = await carSchema.find()

        return res.status(200).json({ success: true, message: "Car List Fetched Successfully", data: cars });

    } catch (error) {
        console.log(error);
        return next(error);
    };
};

//get one car
export const getCarById = async (req, res, next) => {
    try {
        const { Id } = req.params;

        // Find car by ID
        const car = await carSchema.findById(Id);

        // Check if car exists
        if (!car) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // Return the car details
        return res.status(200).json({ success: true, message: "Car fetched successfully", data: car });

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

//delete car
export const deleteCar = async (req, res, next) => {
    try {
        const { carId } = req.params;

        const carDeleted = await carSchema.findByIdAndDelete({ _id: carId });

        if (!carDeleted) res.status(400).json({ success: true, message: "Car already deleted" });

        res.status(200).json({ success: true, message: "Car deleted successfully", data: carDeleted });
    } catch (error) {
        return next(error);
    }
};

//update car
export const updateCar = async (req, res, next) => {

    try {
        const { carId } = req.params;
        const updatedData = req.body;
        let imageUrl;


        // Handle image upload if a new image is provided
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
            updatedData.image = imageUrl;
        }
        // Find and update the car by ID
        const updatedCar = await carSchema.findByIdAndUpdate(carId.updatedData, { new: true });

        // Check if car exists

        if (!updatedCar) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // Return the updated car details
        return res.status(200).json({ success: true, message: "Car updated successfully", data: updatedCar });


    } catch (error) {
        console.log(error);
        return next(error);
    }

}