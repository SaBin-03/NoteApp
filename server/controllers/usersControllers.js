import { UserModel } from "../models/users.Models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json(result);

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Fill out the field" });

  try {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User Exist With Same Email" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const validUser = new UserModel({ name, email, password: hashedPassword });
    await validUser.save();

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      validUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json(result);

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Fill out the field" });

  try {
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist)
      return res
        .status(404)
        .json({ success: false, message: "User doesnt exist" });

    const isMatchPassword = bcrypt.compareSync(password, isUserExist.password);

    if (!isMatchPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password Doesnt Match" });

    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "User Logedin Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  });

  return res
    .status(200)
    .json({ success: true, message: "Logout Successfully" });
};
