import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
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
        "http://localhost:4000/api/auth/signup",
        user,
        { withCredentials: true },
      );
      toast.success(response.data.message, { position: "top-right" });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-right" });
    }
  };

  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-black flex justify-center items-center flex-col gap-8">
      <h2 className="text-5xl text-white text-bold ">Register</h2>

      <div className="h-[60vh] w-130 rounded-2xl border border-white/10  shadow-2xl">
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center flex-col gap-3 h-full"
          autoComplete="off"
        >
          <label className="text-2xl text-zinc-300" htmlFor="name">
            Name
          </label>
          <input
            onChange={inputHandler}
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            autoFocus
            type="text"
            name="name"
            value={user.name}
            id="name"
            placeholder="Enter Name"
          />

          <label className="text-2xl text-zinc-300" htmlFor="email">
            Email
          </label>
          <input
            onChange={inputHandler}
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="email"
            name="email"
            id="email"
            value={user.email}
            placeholder="Enter Email"
          />

          <label className="text-2xl text-zinc-300" htmlFor="password">
            Password
          </label>
          <input
            onChange={inputHandler}
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="password"
            name="password"
            id="password"
            value={user.password}
            placeholder="Enter Password"
          />

          <div className="flex justify-center items-center flex-col mt-4">
            <button
              className="text-2xl bg-linear-to-r from-cyan-500 to-blue-600 font-bold rounded-xl text-black px-8 py-2 cursor-pointer hover:brightness-110 transition-all"
              type="submit"
            >
              Sign-Up
            </button>
            <div className="flex justify-center items-center mt-2">
              <p className="text-zinc-400">Already Have an Account?</p>
              <Link to={"/login"}>
                <button
                  className="underline rounded text-cyan-400 p-2 cursor-pointer font-semibold"
                  type="button"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
