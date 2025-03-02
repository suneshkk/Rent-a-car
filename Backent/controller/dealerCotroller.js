import { Dealer } from "../model/dealerModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/token.js";
import { User } from "../model/userModel.js";

export const dealerSignup = async (req, res, next) => {
  try {
    const { email, name, password, phone } = req.body;

    // console.log("data======+++++",email,name,password,phone)
    if (!email || !name || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "all field required" });
    }
    // const isNameExist = await Dealer.findOne({ name });
    // if (isNameExist) {
    //   return res
    //     .status(400)
    //     .json({ message: "name is already exist add another name" });
    // }
    const isPhoneExist = await Dealer.findOne({ phone });
    if (isPhoneExist) {
      return res.status(400).json({
        message: "phone number already exist add another phone number",
      });
    }
    const isDealerExist = await Dealer.findOne({ email });
    if (isDealerExist) {
      return res
        .status(400)
        .json({ message: "This email already in use. add another one...!" });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newDealer = new Dealer({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newDealer.save();

    const token = generateToken(newDealer._id, "Dealer");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Dealer created successfully" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const dealerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all field required" });
    }
    const dealerExist = await Dealer.findOne({ email });
    if (!dealerExist) {
      return res
        .status(400)
        .json({ message: "wrong email address enter corect one...!" });
    }

    const passwordMatch = bcrypt.compareSync(password, dealerExist.password);
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ success: false, message: "wrong password..!!" });
    }
    // generate token
    const token = generateToken(dealerExist._id, "dealer");

    //set the token in a cookie
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    return res.status(202).json({
      success: true,
      message: "Dealer login successfull",
      data: dealerExist,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const dealerProfile = async (req, res, next) => {
  try {
    // Assuming you are storing user info in req.user after authentication middleware
    const dealer = req.user;

    // Fetch user data from the database
    const dealerData = await Dealer.findOne({ _id: dealer.id });

    // Respond with the user data
    return res.json({
      success: true,
      data: dealerData,
      message: "User Data Fetched",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const dealerLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Dealer logout successfully", success: true });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const dealerUpdate = async (req, res, next) => {
  try {
    const dealerId = req.params.id;
    const formData = req.body;
    // console.log("dealer id=======++",dealerId)
    // console.log("dealer data=======++",formData)

    const result = await Dealer.findByIdAndUpdate(dealerId, formData, {
      new: true,
    });
    if (!result) {
      res.status(404).send({ message: "Dealer not found" });
    } else {
      return res.status(200).send({ message: "Dealer updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const dealerDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Dealer.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Dealer Not Found" });
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

export const dealerCheck = async (req, res, next) => {
  try {
    const dealer = req.user;
    if (!dealer) {
      return res
        .status(404)
        .json({ success: false, message: "Dealer not autherized" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Dealer autherized" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const userlist = async (req, res, next) => {
  try {
    //find car list from schema
    const user = await User.find();

    return res.status(200).json({
      success: true,
      message: "user List Fetched Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
