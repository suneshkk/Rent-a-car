import bcrypt from 'bcrypt';
import { User } from '../model/userModel.js';
import { generateToken } from '../util/token.js';

//user signup function
export const userSignup = async (req, res, next) => {

    try {
        // arrya de structuring
        const { name, email, password, phone, role, profilePic } = req.body;
        //checking required field are filled or not
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all field required" });
        }
        // user verifying with email for security
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, phone, role, profilePic });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true }); // Set httpOnly for security

        // Respond to the client
        return res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.log(error);
        return next(error);
    }

};

// user loging function it is a asynchronus process because datas from database
export const userLogin = async (req, res, next) => {
    // here is the error handler function 
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all field required" });

        }
        // user verifying with email security
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }
        //cross checking passwords 
        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(404).json({ success: false, message: "user not authorized" });
        }
        // generate token 
        const token = generateToken(userExist._id);

        //set the token in a cookie
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res.json({ success: true, message: "user login successfull" });


    } catch (error) {
        console.log(error)
        return next(error)
    };
};
export const userLogout = async (req, res, next) => {

    try {
        res.clearCookie("token");
        return res.json({ message: "User logout success", success: true });

    } catch (error) {
        console.log(error);
        return next(error)
    };
};
export const userProfile = async (req, res, next) => {
    try {
        const { user } = req.params;
        const userData = await User.findOne({ _id: user._id });
        res.json({ success: true, data: userData, message: "User Data Ftched" })
    } catch (error) {
        console.log(error);
        return next(error)

    };
};
export const checkUser = async (req, res, next) => {
    try {
        const { user } = req;
        if (!user) {
            return res.status(404).json({ success: false, message: "user not autherized" });

        }
        res.json({ success: true, message: "User autherized" });
    } catch (error) {
        console.log(error);
        return next(error)

    }

};
export const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "User Not Find" });
        }
        else {
            return res.status(200).json({ message: "Profile Updated Successfully", data: result });
        }

    }
    catch (error) {
        console.log(error.message);
        return next(error)


    };
};
export const deletUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "User Not Found" });
        }
        else {
            return res.status(200).json({ message: "Profile Deleted Successfully", data: result });
        }

    } catch (error) {
        console.log(error);
        return next(error)
   
    }

}
















