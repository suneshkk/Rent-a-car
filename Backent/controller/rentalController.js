import { rentalSchema } from "../model/renatalModel.js";
import { carSchema } from "../model/carModel.js";


// export const addToRental = async (req, res, next) => {
//     try {
//         const userId = req.user.id;
//         const  {car}  = req.body;
//       console.log("car",car)
//         // finding the car user search
//         const carData = await carSchema.findById({car});
//         if (!carData) {
//             return res.status(400).json({ message: "There is no similar CAR" });
//         }

//         //for creating cart if there no existing cart
//         let rental = await rentalSchema.findOne({userId});
//         if (!rental) {
//             rental = new rentalSchema({ userId, car: [] })
//         }
//         //check the car is already in the cart
//         const carExists = rental.car.some((item) => item.carId.equals(car));
//         if (carExists) {
//             return res.status(400).json({ message: "You already purchased this" });
//         }

//         // Add the car to the cart
//         rental.car.push({
//             car,
//             price: carData.Price,
//         });
         
//         rental.calculateTotalPrice();

//         await rental.save();

//        return res.status(200).json({ message: "added to cart", data: car });

//     } catch (error) {
//         console.log(error);
//         return next(error);
//     }
// };

export const getRental = async (req, res, next) => {
    try {
        const { user } = req;
        const rental = await rentalSchema.findOne({ userId: user.id }).populate("car.carId")

        if (!rental) {
            return res.status(404).json({ message: "There is no Rental" })
        }
        res.json({ message: "Rental fetched successfully", data: rental });
    } catch (error) {
        console.log(error);
        return next(error);
    };

};
export const addToRental = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { car } = req.body;
      console.log("car", car);
  
      // Find the car using the provided ID
      const carData = await carSchema.findById(car);
      if (!carData) {
        return res.status(400).json({ message: "There is no similar CAR" });
      }
  
      // Find existing rental or create a new one if it doesn't exist
      let rental = await rentalSchema.findOne({ userId });
      if (!rental) {
        rental = new rentalSchema({ userId, car: [] });
      }
  
      // Check if the car is already in the rental
      const carExists = rental.car.some((item) => item.carId.equals(car));
      if (carExists) {
        return res.status(400).json({ message: "You already purchased this" });
      }
  
      // Add the car to the rental
      rental.car.push({
        carId: car, // Storing the car ID correctly
        price: carData.Price,
      });
  
      // Calculate total price if you have this method in your schema
      rental.calculateTotalPrice();
  
      // Save the rental
      await rental.save();
  
      return res.status(200).json({ message: "Added to cart", data: carData });
    } catch (error) {
      console.error("Error adding to rental:", error);
      return next(error);
    }
  };