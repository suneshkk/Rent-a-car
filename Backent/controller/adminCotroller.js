import { adminSchema } from "../model/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/token.js";


export const adminSignup = async (req, res, next) => {
    try {
        const { email, name, password, phone, } = req.body;


        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "all field required" });

        }
        const isAdminExist = await adminSchema.findOne({ email });
        if (isAdminExist) {
            return res.status(400).json({ message: "Admin already exist" });

        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newAdmin = new adminSchema({ name, email, password: hashedPassword, phone });
        await newAdmin.save();

        const token = generateToken(newAdmin._id, 'admin');

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        return res.status(201).json({ success: true, message: "Admin created successfully" });

    } catch (error) {
        console.log(error);
        return next(error);
    };


};

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all field required" });
        }
        const adminExist = await adminSchema.findOne({ email });
        if (!adminExist) {
            return res.status(400).json({ message: "Admin does not exist" });

        }

        const passwordMatch = bcrypt.compareSync(password, adminExist.password);
        if (!passwordMatch) {
            return res.status(404).json({ success: false, message: "Admin not authorized" });
        }
        // generate token 
        const token = generateToken(adminExist._id, 'admin');

        //set the token in a cookie
        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
            
        }); return res.json({ success: true, message: "Admin login successfull" });
    } catch (error) {
        console.log(error);
        return next(error);
    };

};

export const adminProfile = async (req, res, next) => {
    try {
        // Assuming you are storing user info in req.user after authentication middleware
        const admin = req.user;

        // Fetch user data from the database
        const adminData = await adminSchema.findOne({ _id: admin.id });

        // Respond with the user data
        return res.json({ success: true, data: adminData, message: "User Data Fetched" });
    } catch (error) {
        console.log(error);
        return next(error);
    }

};

export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Admin logout success", success: true });

    } catch (error) {
        console.log(error);
        return next(error)
    };

};


export const adminUpdate = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await adminSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Admin Not Find" });
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

export const adminDelete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await adminSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Admin Not Found" });
        }
        else {
            return res.status(200).json({ message: "Profile Deleted Successfully", data: result });
        }

    } catch (error) {
        console.log(error);
        return next(error)

    };

};

export const adminCheck = async (req, res, next) => {
    try {
        const admin = req.user;
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not autherized" });

        }
        res.json({ success: true, message: "Admin autherized" });
    } catch (error) {
        console.log(error);
        return next(error)

    }

};

