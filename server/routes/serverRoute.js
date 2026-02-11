import { Router } from "express";
import userRouter from "./usersRoute.js";
import noteRouter from "./noteRoute.js";

const serverRouter = Router();

serverRouter.use("/api",userRouter);
serverRouter.use("/api",noteRouter);


export default serverRouter;
