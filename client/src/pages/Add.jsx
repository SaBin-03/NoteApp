import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Add = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    note: "",
    content: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/note-making`,
        data,
        { withCredentials: true },
      );
      toast.success(response.data.message, { position: "top-right" });
      navigate("/note-making");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen  bg-linear-to-br from-slate-950 via-slate-900 to-black p-2 border-4 border-[#1E293B] flex justify-center items-center md:flex-row flex-col">
      <h2 className="text-3xl md:text-6xl text-white font-black text-center">
        Create <span className="text-blue-500">Notes</span>
      </h2>
      <div className="h-[70vh] w-[90%] md:w-full border-2 border-gray-700 mt-5 rounded-2xl p-9">
        <Link className="w-[20%]" to={"/note-making"}>
          <button className="md:text-2xl  bg-slate-600 rounded text-white p-1 flex cursor-pointer">
            <ArrowLeft size={"15px"} /> Back
          </button>
        </Link>
        <form onSubmit={submitHandler} autoComplete="off">
          <div className="grid grid-cols-1 h-[50vh] w-full place-items-center">
            <div className="flex justify-center items-start flex-col w-full md:w-[90%]">
              <label className="text-white text-xl md:text-3xl" htmlFor="name">
                Title
              </label>
              <input
              autoFocus
                onChange={inputHandler}
                className="border-2 border-white rounded text-white p-3 m-4 w-full md:w-[99%]"
                type="text"
                placeholder="Enter Note Title"
                name="note"
                id="note"
              />
            </div>
            <div className="flex justify-center items-start flex-col w-full md:w-[90%]">
              <label className="text-white text-xl md:text-3xl" htmlFor="note">
                Note
              </label>
              <textarea
                onChange={inputHandler}
                className="border-2 border-white rounded text-white p-3 m-4 w-full md:w-[99%]"
                type="text"
                placeholder="Enter Note"
                name="content"
                id="content"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
