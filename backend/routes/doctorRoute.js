import express from "express";
import { doctorList, LoginDoctor } from "../controllers/doctorController.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", LoginDoctor);

export default doctorRouter;
