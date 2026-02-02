import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context call/Context";
import axios from "axios";
import toast from "react-hot-toast";
import { NotebookIcon } from "lucide-react";

const Navbar = () => {
  const { isLoggedin, setisLoggedin } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      setisLoggedin(false);
      navigate("/login");
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] h-[10vh] mx-auto rounded-xl flex justify-between items-center border border-white/10  shadow-2xl ">
      <Link to={"/"}>
        <h1 className="text-5xl font-light tracking-tighter text-white flex">
          Note<span className="text-blue-500">.</span> <NotebookIcon  />
        </h1>
      </Link>
      <div className="h-full flex justify-center items-center">
        {!isLoggedin ? (
          <div className="flex justify-center items-center gap-3">
            <Link to={"/login"}>
              <button className="px-6 py-2  text-gray-300 transition-colors border border-gray-700 rounded-lg hover:text-white hover:border-gray-500 cursor-pointer">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="px-6 py-2 text-sm font-medium text-white transition-transform bg-blue-600 rounded-lg hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Link to={"/logout"}>
              <button
                onClick={logoutHandler}
                className="px-6 py-2 text-white transition-transform bg-blue-600 rounded-lg hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
