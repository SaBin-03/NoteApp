import { Router } from "express";
import { getNote, note, postNote } from "../controllers/notesController.js";
import { auth } from "../config/auth.js";
import { checkSchema } from "express-validator";
import { noteValidationSchema } from "../utils/usersValidationSchema.js";

const noteRouter = Router();

noteRouter.post("/note-making",checkSchema(noteValidationSchema),auth,postNote);
noteRouter.get("/getNote",auth,getNote);
noteRouter.get("/getNotes",note);

export default noteRouter;
