import { Router } from "express";
import userRouter from "./usersRoute.js";
import noteRouter from "./noteRoute.js";

const serverRouter = Router();

serverRouter.use(userRouter);
serverRouter.use(noteRouter);


export default serverRouter;
