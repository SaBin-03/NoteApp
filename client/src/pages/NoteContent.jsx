import { NotebookPenIcon, PlusIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { number } from "../constants/constant.js";
import toast from "react-hot-toast";
import axios from "axios";

const NoteContent = () => {
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    const getNoteFun = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getNote", {
          withCredentials: true,
        });
        if (response.data.success) setnotes(response.data.noteOfUser);
      } catch (error) {
        console.log(error);
      }
    };
    getNoteFun();
  }, []);

  return (
    <div className="h-[90vh] w-screen  flex justify-center items-center">
      <div className="h-[96%] w-[97%]  overflow-scroll no-scrollbar overflow-x-hidden">
        <div className="h-15 w-[98%] rounded-2xl  p-2 m-3  border-2 border-gray-800 grid  grid-cols-6 place-items-center ">
          <h3 className="text-xl text-white">S.No.</h3>
          <h3 className="text-xl text-white">Note-Title</h3>
          <h3 className="text-xl text-white col-span-3">Notes</h3>
          <h3 className="text-xl text-white">Actions</h3>
        </div>
        {notes.map((note, index) => (
          <div
            key={index}
            className="w-[97%] rounded-2xl  p-2 m-3  bg-gray-900 grid  grid-cols-6 place-items-center "
          >
            <h3 className="text-xl text-white">{index + 1}</h3>
            <h3 className="text-xl text-white">{note.note}</h3>
            <h3 className="text-xl text-white col-span-3">
              {note.content}
            </h3>
            <div className="text-xl text-white flex gap-3 cursor-pointer">
              <Link>
                <NotebookPenIcon color="yellow" />
              </Link>{" "}
              <Trash2 />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteContent;

{
  /* <button className='border border-white rounded px-6 py-2 '><PlusIcon color='white' /></button> */
}
