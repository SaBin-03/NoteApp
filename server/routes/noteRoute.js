import { Router } from "express";
import { getNote, deleteNote, postNote, updateNote, getNoteById } from "../controllers/notesController.js";
import { auth } from "../config/auth.js";
import { checkSchema } from "express-validator";
import { noteValidationSchema } from "../utils/usersValidationSchema.js";

const noteRouter = Router();

noteRouter.post("/note-making",checkSchema(noteValidationSchema),auth,postNote);
noteRouter.get("/getNote",auth,getNote);
noteRouter.put("/updateNotes/:id",checkSchema(noteValidationSchema),updateNote);
noteRouter.delete("/deleteNotes/:id",deleteNote);
noteRouter.get("/noteById/:id",auth,getNoteById);


export default noteRouter;
