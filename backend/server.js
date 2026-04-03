import express from "express";

import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

const initDB = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected successfully");
  } catch (error) {
    console.error(
      "MongoDB connection failed, server continuing:",
      error.message,
    );
  }
};
initDB().catch((err) => console.error("initDB error:", err));

connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints

app.use("/api/admin", adminRouter);
//localhost:4000/api/admin
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, () => {
  console.log(`Server Started ${port}`);
});
