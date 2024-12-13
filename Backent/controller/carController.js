import { adminSchema } from '../model/adminModel.js';
import { Car } from '../model/carModel.js';
import { RentalModel } from '../model/rentalModel.js';
import { handleImageUpload } from '../util/imageUpload.js';


//creat car
export const createCar = async (req, res, next) => {
    try {
        const admin = req.user.id;
        const { carName, brand, year, carType, fuelType, transmission, price, image } = req.body;
        let imageUrl;
        // Check if all required fields are provided
        if (!carName || !brand || !price) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
           
        const adminData = await adminSchema.findById(admin);
        if(!adminData){
            return res.status(404).json({message:"admin not found"});
        }
        // Check if the car already exists
        const isCarExist = await Car.findOne({ carName });
        if (isCarExist) {
            return res.status(400).json({ success: false, message: "Car already exists" });
        }

        // Handle image upload if an image is provided
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

        // Create a new car object and save it to the database
        const newCar = new Car({
            adminId:admin,
            carName,
            brand,
            year,
            carType,
            fuelType,
            transmission,
            price,
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
        const cars = await Car.find()

        return res.status(200).json({ success: true, message: "Car List Fetched Successfully", data: cars });

    } catch (error) {
        console.log(error);
        return next(error);
    };
};

//get one car
export const getCarById = async (req, res, next) => {
    try {
        const carId = req.params.id;
        const existingBooking = await RentalModel.findOne({ "car.carId": carId });
        if (existingBooking) {
            return res.status(404).json({ message: "This car is already booked", data: existingBooking })
        }
        // Find car by ID
        const cars = await Car.findById(carId)
        if (!cars) {
            return res.status(404).json({ success: false, message: "Car not found" });
        }

        // Return the car details
        return res.status(200).json({ success: true, message: "Car fetched successfully", data: cars });

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

//delete car
export const deleteCar = async (req, res, next) => {
    try {
        const carId = req.params.id;

        const carDeleted = await Car.findByIdAndDelete(carId);

        if (!carDeleted) res.status(400).json({ success: false, message: "NO car for delete" });

        res.status(200).json({ success: true, message: "Car deleted successfully", data: carDeleted });
    } catch (error) {
        return next(error);
    }
};

//update car
export const updateCar = async (req, res, next) => {

    try {
        const carId = req.params.id;
        const carUpdated = req.body;
        let imageUrl;

        const isCarExist = await Car.findById(carId);
        if (!isCarExist) {
            return res.status(404).json({ message: "car not found" })
        }


        // Handle image upload if a new image is provided
        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
            carUpdated.image = imageUrl;
        }
        // Find and update the car by ID
        const result = await Car.findByIdAndUpdate(carId, carUpdated, { new: true });


        // Return the updated car details
        return res.status(200).json({ success: true, message: "Car updated successfully", data: result });


    } catch (error) {
        console.log(error);
        return next(error);
    };

};

//get car by car type
export const filterCarByType = async (req, res, next) => {
    const { car } = req.body;
    try {
        const carType = await Car.find({ carType: car });

        if (carType == 0) {
            return res.status(404).json({ message: "No Result For This Search" })
        }
        else {
            return res.status(200).json({ message: "Data fetched successfuly", data: carType });
        }

    } catch (error) {
        console.log(error);
        return next(error);
    };
};