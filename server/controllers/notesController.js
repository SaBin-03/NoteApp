import { validationResult } from "express-validator";
import { NoteModel } from "../models/users.Models.js";

export const postNote = async (req, res) => {
  const { note, content } = req.body;

  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).json(result);

  const newnote = new NoteModel({ note, content, user: req.user._id });

  try {
    await newnote.save();
    return res
      .status(201)
      .json({ success: true, message: "Note Created", newnote });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something Error" });
  }
};

export const getNote = async (req, res) => {
  const id = req.user._id;

  try {
    const noteOfUser = await NoteModel.find({ user: id });
    if (!noteOfUser || noteOfUser.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No Note App Created" });

    return res
      .status(200)
      .json({ success: true, message: "Note Achieved", noteOfUser });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: "Error" });
  }
};

export const note = async(req,res) => {
    try {
        const notes = await NoteModel.find();
        return res
      .status(200)
      .json({ success: true, message: "Note Achieved", notes });

    } catch (error) {
        console.log(error);
    }
}
