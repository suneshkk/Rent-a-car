import bcrypt from 'bcrypt';
import { user } from '../model/userModel.js';
import { generateToken } from '../util/token.js';

//user signup function
export const userSignup = async (req, res, next) => {

    try {
        // arrya de structuring
        const { name, email, password, phone, role } = req.body;
        //checking required field are filled or not
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "all field required" });
        }
        // user verifying with email for security
        const isUserExist = await user.findone({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new user({ name, email, password: hashedPassword, phone, role });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true }); // Set httpOnly for security

        // Respond to the client
        res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.log(error);
        next(error);
    }

};

export const userLoging = async (req, res, next) => {
      
    try{

    }catch(error){
        console.log(error)
        next(error)
    }
}















