import { Router } from "express";
import { login, signup , logout } from "../controllers/usersControllers.js";
import { usersValidationSchemaLogin, usersValidationSchemaSign } from "../utils/usersValidationSchema.js";
import { checkSchema } from "express-validator";

const userRouter = Router();

userRouter.post("/auth/signup",checkSchema(usersValidationSchemaSign),signup)
userRouter.post("/auth/login",checkSchema(usersValidationSchemaLogin),login);
userRouter.post("/auth/logout",logout)

export default userRouter;