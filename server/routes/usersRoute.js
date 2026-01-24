import { Router } from "express";
import { signup } from "../controllers/usersControllers.js";
import { usersValidationSchemaSign } from "../utils/usersValidationSchema.js";
import { checkSchema } from "express-validator";

const userRouter = Router();

userRouter.post("/auth/signup",checkSchema(usersValidationSchemaSign),signup)
// userRouter.get("/auth/login",login);

export default userRouter;