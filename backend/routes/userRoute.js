import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getProfile,
  updateProfileUser,
  updateProfile,
  bookAppointment,
  cancelAppointment,
  //listAppointment,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.put("/profile", authUser, updateProfileUser);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile,
);
userRouter.post("/book-appointment", authUser, bookAppointment);
//userRouter.get("/list-appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
