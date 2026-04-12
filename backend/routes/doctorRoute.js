import express from "express";
import {
  doctorList,
  LoginDoctor,
  appointmentsDoctor,
  appointmentCompleted,
  appointmentCancel,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", LoginDoctor);
doctorRouter.post("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);

export default doctorRouter;
