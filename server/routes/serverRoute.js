import { Router } from "express";
import userRouter from "./usersRoute.js";

const serverRouter = Router();

serverRouter.use("/api",userRouter);


export default serverRouter;