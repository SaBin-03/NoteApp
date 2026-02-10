import { Router } from "express";
import { login, signup, logout, refreshAccessToken } from "../controllers/usersControllers.js";
import {
  usersValidationSchemaLogin,
  usersValidationSchemaSign,
} from "../utils/usersValidationSchema.js";
import { checkSchema } from "express-validator";
import { auth } from "../config/auth.js";

const userRouter = Router();

userRouter.post("/auth/signup", checkSchema(usersValidationSchemaSign), signup);
userRouter.post("/auth/login", checkSchema(usersValidationSchemaLogin), login);
userRouter.post("/auth/logout", logout);
userRouter.get("/auth", auth, (req, res) => {
  res.status(200).json({ success: true, userId: req.user.id });
});
userRouter.get("/refresh",refreshAccessToken)

export default userRouter;
