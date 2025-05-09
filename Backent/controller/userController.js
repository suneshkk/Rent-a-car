import bcrypt from "bcrypt";
import { User } from "../model/userModel.js";
import { generateToken } from "../util/token.js";
import { handleImageUpload } from "../util/imageUpload.js";

//user signup function
export const userSignup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      profilePic,
      phone,
      state,
      district,
      address,
    } = req.body;
    let imageUrl;

    //checking required field are filled or not
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !state ||
      !district ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "all field required" });
    }

    // user verifying with email for security
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // console.log(hashedPassword,"333333333333333" )

    if (req.file) {
      imageUrl = await handleImageUpload(req.file.path);
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePic: imageUrl || profilePic,
      phone,
      state,
      district,
      address,
    });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Set the token in a cookie
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    // Respond to the client
    return res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
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
      return res
        .status(400)
        .json({ success: false, message: "all field required" });
    }
    // user verifying with email security
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({
          success: false,
          message: "user does not exist check e-mail..!!",
        });
    }
    //cross checking passwords
    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ success: false, message: "password is incorrect..!!" });
    }
    // generate token
    const token = generateToken(userExist._id);

    //set the token in a cookie
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    return res.json({ success: true, message: "user login successfull" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "User logout success", success: true });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const userProfile = async (req, res, next) => {
  try {
    const { user } = req;

    // Fetch user data from the database
    const userData = await User.findOne({ _id: user.id });

    // Respond with the user data
    res.json({ success: true, data: userData, message: "User Data Fetched" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not autherized" });
    }
    res.json({ success: true, message: "User autherized" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userUpdate = req.body;
    let imageUrl;
    // console.log(userId)
    // console.log(userUpdate)

    const isUserExists = await User.findById(userId);
    if (!isUserExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (req.file) {
      imageUrl = await handleImageUpload(req.file.path);

      userUpdate.profilePic = imageUrl;
    }

    // Update the user details
    const result = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", data: result });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      return res
        .status(200)
        .json({ message: "Profile Deleted Successfully", data: result });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
