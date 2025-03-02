import { Admin } from "../model/adminModel.js";
import bcrypt  from "bcrypt";
import { generateToken } from "../util/token.js";

export const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "all field required...!" });
    }
    const isAdminExist = await Admin.findOne({ email });
    if (isAdminExist) {
      return res.status(400).json({
        success: false,
        message: "This email already in use. add another one...!",
      });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newAdmin.save();

    const token = generateToken(newAdmin._id, "Admin");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ success: true, message: "Your account was created successfully",data:newAdmin });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
