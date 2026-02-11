import { UserModel } from "../models/users.Models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { genAccessToken, genRefreshToken } from "./tokenGenerator.js";
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

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Fill out the field" });
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

    const AccessToken = genAccessToken(isUserExist._id);
    const RefreshToken = genRefreshToken(isUserExist._id);

    res.cookie("Rtoken", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User Logedin Successfully",
      AccessToken: AccessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res.cookie("Rtoken", "", {
    path: "/",
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "none",
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  });

  return res
    .status(200)
    .json({ success: true, message: "Logout Successfully" });
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.Rtoken;
  if (!refreshToken)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Refresh Token Missing" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user)
      return res.status(403).json({
        success: false,
        message: "Unauthorized Refresh Token Missing",
      });

    const newAcessToken = genAccessToken(user._id);

    return res.status(200).json({ newAcessToken });
  } catch (error) {
    console.log(error);
  }
};
