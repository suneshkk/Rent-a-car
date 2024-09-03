import bcrypt from 'bcrypt';
import { generateToken } from '../util/token';
import { carSchema } from '../model/carModel.js';
export const signup = async (req, res, next) => {
    const { brand, model, year, type, fuelType, transmission, availabillty, rentalRate, lacation, imageUrl } = rea.body;
    if (!brand || !model || !year || !type || !fuelType || !transmission || !availabillty || !rentalRate || !lacation || !imageUrl){
        return res.status(400).json({ success: false, message: "all field required" });

    }

}
