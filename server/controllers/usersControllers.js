import { User } from "../models/users.Models.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json(result);

  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Fill out the field" });

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User Exist With Same Email" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const validUser = new User({ name, email, password: hashedPassword });
    await validUser.save();

    return res
      .status(201)
      .json({ message: "User Registered Successfully", validUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// export const login = (req,res) => {
//     res.json({ message : "Hello From Login" })
// }
