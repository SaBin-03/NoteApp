import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context call/Context";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const { setisLoggedin } = useContext(AuthContext);

  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        user,
        { withCredentials: true },
      );

      const { AccessToken } = response.data;

      if (AccessToken) {
        localStorage.setItem("AccessToken", AccessToken);
      }

      toast.success(response.data.message, { position: "top-right" });
      setisLoggedin(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-black flex justify-center items-center flex-col gap-8">
      <div className="flex flex-col gap-2 md:flex-row justify-center items-center w-60 md:w-140 ">
        <Link className="w-[20%]" to={"/"}>
          <button className="text-xl md:text-2xl  bg-slate-600 rounded text-white p-1 flex cursor-pointer">
            <ArrowLeft /> Back
          </button>
        </Link>
        <h1 className="text-4xl md:text-5xl w-[80%] text-white text-bold text-center">
          Login
        </h1>
      </div>

      <div className="h-[55vh] sm:h-[60vh] w-70   sm:w-120 md:w-130  rounded-2xl border border-white/10  shadow-2xl">
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center flex-col gap-3 h-full"
          autoComplete="off"
        >
          <label className="text-xl md:text-2xl text-zinc-300" htmlFor="email">
            Email
          </label>
          <input
            autoFocus
            onChange={inputHandler}
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />

          <label className="text-xl md:text-2xl text-zinc-300" htmlFor="password">
            Password
          </label>
          <input
            onChange={inputHandler}
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <div className="flex justify-center items-center flex-col mt-4">
            <button
              className="text-xl md:text-2xl bg-linear-to-r from-cyan-500 to-blue-600 font-bold rounded-xl text-black px-2 md:px-8 py-2 cursor-pointer hover:brightness-110 transition-all"
              type="submit"
            >
              Login
            </button>
            <div className="flex justify-center items-center mt-2">
              <p className="text-zinc-400">Don't Have an Account?</p>
              <Link to={"/register"}>
                <button
                  className="underline rounded text-cyan-400 p-2 cursor-pointer font-semibold"
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
