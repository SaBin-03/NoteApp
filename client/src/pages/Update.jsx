import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resNote, setresNote] = useState("");
  const [resContent, setresContent] = useState("");
  const [data, setdata] = useState({
    note:"",
    content:""
  })

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get(
          `https://noteapp-backend-nvje.onrender.com/api/noteById/${id}`,{withCredentials:true}
        );
        setdata(response.data.notes);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setdata({...data,[name]:value});
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`https://noteapp-backend-nvje.onrender.com/api/updateNotes/${id}`,data,{withCredentials:true});

        toast.success(response.data.message,{position:"top-right"});
        navigate("/note-making");

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen  bg-linear-to-br from-slate-950 via-slate-900 to-black p-2 border-4 border-[#1E293B] flex justify-center items-center">
      <h2 className="text-6xl text-white font-black text-center">
        Update <span className="text-blue-500">Notes</span>
      </h2>
      <div className="h-[70vh] w-full border-2 border-gray-700 mt-5 rounded-2xl p-9">
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="grid grid-cols-1 h-[50vh] w-full place-items-center">
            <div className="flex justify-center items-start flex-col w-[90%]">
              <label className="text-white text-3xl" htmlFor="note">
                Title
              </label>
              <input
                autoFocus
                onChange={inputHandler}
                className="border-2 border-white rounded text-white p-3 m-4 w-[99%]"
                type="text"
                placeholder="Enter Note Title"
                name="note"
                id="note"
                value={data.note}
              />
            </div>
            <div className="flex justify-center items-start flex-col w-[90%]">
              <label className="text-white text-3xl" htmlFor="content">
                Note
              </label>
              <textarea
                onChange={inputHandler}
                className="border-2 border-white rounded text-white p-3 m-4 w-[99%]"
                type="text"
                placeholder="Enter Note"
                name="content"
                id="content"
                value={data.content}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="
            py-3 rounded-xl
            backdrop-blur-md bg-white/10
            border border-white/20
           text-cyan-300 font-medium
           hover:bg-white/20 hover:border-cyan-400
            transition-all duration-300  cursor-pointer w-[30%]
"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
