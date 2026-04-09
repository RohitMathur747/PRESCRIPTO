import express from "express";
import {
  addDoctors,
  allDoctors,
  loginAdmin,
  appointmentsAdmin,
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctors);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.post("/appointments", authAdmin, appointmentsAdmin);

export default adminRouter;
