import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

//api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be Strong" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // storing user in database
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    // save user to database
    const newUser = new userModel(userData);
    await newUser.save();
    // generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//api for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

//api for get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api for update user profile data
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!userId) {
      return res.json({
        success: false,
        message: "userId is required",
      });
    }
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, {
        image: imageURL,
      });
    }
    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateProfileUser = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user._id;
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true },
      )
      .select("-password");

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//Api for book appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, SlotDate, SlotTime } = req.body;
    const userId = req.body.userId;
    if (!userId || !docId || !SlotDate || !SlotTime) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }
    const docData = await doctorModel.findById(docId);
    if (!docData || !docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available",
      });
    }
    let slotBooked = docData.slotsBooked || {};

    // Check and update slots
    if (!slotBooked[SlotDate]) {
      slotBooked[SlotDate] = [];
    }
    if (slotBooked[SlotDate].includes(SlotTime)) {
      return res.json({
        success: false,
        message: "Slot is not available",
      });
    }
    slotBooked[SlotDate].push(SlotTime);

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    const appointmentDocData = {
      ...docData.toObject(),
      slotsBooked: undefined,
    };

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: appointmentDocData,
      amount: docData.fees || 0,
      SlotTime,
      SlotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in doc
    await doctorModel.findByIdAndUpdate(docId, {
      slotsBooked,
    });
    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileUser,
  getProfile,
  updateProfile,
  bookAppointment,
};
