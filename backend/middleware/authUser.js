import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res.json({ success: false, message: "Not authorized, no token" });
  }
};

export default authUser;
