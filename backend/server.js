import express from "express";

import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

//app config
const app = express();
const port = process.env.PORT || 4000; // Connect to DB\n(async () => {\n  try {\n    await connectDB();\n  } catch (err) {\n    console.error('DB connection error:', err);\n    process.exit(1);\n  }\n})();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, () => console.log("Server Started", port));
