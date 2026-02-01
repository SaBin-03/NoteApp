import React, { useContext } from "react";
import { CornerUpRight, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context call/Context";

const HomeContent = () => {

    const { isLoggedin } = useContext(AuthContext);

  return (
    <div className="w-screen h-[90vh] flex justify-center items-center flex-col">
      <h2 className="text-6xl font-black text-white tracking-tighter">
        Capture what <span className="text-blue-500">matters.</span>
      </h2>
      <p className="text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
        Your thoughts, organized and accessible everywhere.
        <span className="block text-slate-500 mt-2 italic text-xl">
          Simple note-taking for complex minds.
        </span>
      </p>
      {isLoggedin ? (
        <Link to={"/note-making"}>
        <button className=" cursor-pointer mt-10 flex  gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl shadow-blue-500/10">
          Start Writing <CornerUpRight />
        </button>
      </Link>
      ):(
        <Link to={"/login"}>
        <button className=" cursor-pointer mt-10 flex  gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all shadow-xl shadow-blue-500/10">
          Login <User2Icon />
        </button>
      </Link>
      )}
    </div>
  );
};

export default HomeContent;
