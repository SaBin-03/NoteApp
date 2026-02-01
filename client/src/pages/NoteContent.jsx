import { NotebookIcon, NotebookPenIcon, PlusIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NoteContent = () => {
  const [notes, setnotes] = useState([]);
  const [isData, setisData] = useState(false);

  useEffect(() => {
    const getNoteFun = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getNote", {
          withCredentials: true,
        });
        if (response.data.success){
             setnotes(response.data.noteOfUser);
             setisData(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNoteFun();
  }, []);

  return (
    <div className="h-[90vh] w-screen  flex justify-center items-center flex-col">
      {isData ? (
        <div className="h-[96%] w-[97%]  overflow-scroll no-scrollbar overflow-x-hidden relative">
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
            <h3 className="text-xl text-white col-span-3">{note.content}</h3>
            <div className="text-xl text-white flex gap-3 cursor-pointer">
              <Link>
                <NotebookPenIcon color="yellow" />
              </Link>{" "}
              <Trash2 />
            </div>
          </div>
        ))}
      </div>
      ):(
        <div className="h-[96%] w-[97%] flex justify-center items-center relative">
            <h2 className="text-5xl font-black text-white ">Click <span className="text-blue-500"> Add</span> icon to create Note<NotebookIcon /></h2>
        </div>
      )}
      <Link to={"/add"}>
        <button className="border bg-white border-white rounded-2xl absolute px-6 py-2 z-10 bottom-10 right-15 cursor-pointer">
          <PlusIcon />
        </button>
      </Link>
    </div>
  );
};

export default NoteContent;
