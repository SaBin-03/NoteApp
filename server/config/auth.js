import jwt, { decode } from "jsonwebtoken";
import { UserModel } from "../models/users.Models.js";

export const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Token doesnt exist LogIn To Access" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    req.user = await UserModel.findById(decoded.id);
  } catch (error) {
    console.log(error);
  }

  next();
};
