import { Admin } from "../model/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../util/token.js";
import { Dealer } from "../model/dealerModel.js";
import { Car } from "../model/carModel.js";

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
      return res.status(404).json({
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

    return res.status(201).json({
      success: true,
      message: "Your account was created successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "fill the require field...!" });
    }
    const isAdminExist = await Admin.findOne({ email });
    if (!isAdminExist) {
      return res.status(404).json({
        success: false,
        message: "wrong email address enter corect one...!",
      });
    }
    const passwordMatch = bcrypt.compareSync(password, isAdminExist.password);
    if (!passwordMatch) {
      return res.status(404).json({
        success: false,
        message: "wrong password. enter corect one...!",
      });
    }
    const token = generateToken(isAdminExist._id, "admin");
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      message: "admin logined successfully..!",
      data: isAdminExist,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const adminCheck = async (req, res, next) => {
  try {
    const admin = req.user;
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "admin not autherized" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "admin autherized", data: admin });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminProfile = async (req, res, next) => {
  try {
    const admin = req.user;

    const adminData = await Admin.findOne({ _id: admin.id });

    return res.status(200).json({
      success: true,
      message: "admin data fetched successfully",
      data: adminData,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "you just kikout from your account..!" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await Admin.findByIdAndDelete(id);
    if (!deleteData) {
      return res
        .status(404)
        .json({ success: false, message: "admin data not found...!" });
    } else {
      return res.status(200).json({
        success: true,
        message: "account deleted successfully..!",
        data: deleteData,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminUpdate = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const formData = req.body;
    console.log("data++++++++", formData);
    console.log("data++++++++", adminId);

    const result = await Admin.findByIdAndUpdate(adminId, formData, {
      new: true,
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "admin not fount...!", data: result });
    } else {
      return res.status(200).json({
        success: true,
        message: "data updated successfully..!",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminFetchDealerData = async (req, res, next) => {
  try {
    const dealerData = await Dealer.find();
    if (!dealerData) {
      return res
        .status(404)
        .json({ success: false, message: "No data Available...!" });
    } else {
      return res.status(200).json({success:true,message:"data fetched ", data: dealerData });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const getDealerCars = async (req, res, next) => {
  try {
    const dealerId = req.params.id;
    console.log("cardata++++++=", dealerId);

    const carData = await Car.find({ dealer:dealerId});

    // const carData = await Car.findById(dealerId).populate("carName");

    console.log("cardata++++++=", carData);

    if (!carData) {
      return res
        .status(404)
        .json({ message: "no created cars for this dealer", data: carData });
    } else {
      return res.status(200).json({
        success: true,
        message: "Car data fetched successfuly",
        data: carData,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export const adminCarList = async (rea, res, next) => {
  try {
    const carList = await Car.find();
    if (!carList) {
      return res.status(404).json({
        success: false,
        message: "No data for this request",
        data: carList,
      });
    } else {
      return res.status(200).json({ success: true, data: carList });
    }
  } catch (error) {
    console.console(error);
    return next(error);
  }
};
