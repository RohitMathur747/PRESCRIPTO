const mongoose = require("mongoose");
const doctorModel = require("./models/doctorModel.js");
const connectDB = require("./config/mongodb.js");

(async () => {
  await connectDB();
  console.log("Connected to MongoDB");

  const doctors = await doctorModel.find({}).limit(15).select("_id name image");

  console.log("=== FIRST 15 DOCTORS FROM MONGODB ===");
  doctors.forEach((doc, index) => {
    console.log(`Doc ${index + 1} ID: ${doc._id} Name: ${doc.name}`);
    console.log(`  Image: ${doc.image}`);
    console.log("---");
  });
  console.log("=====================================");

  mongoose.connection.close();
})();
