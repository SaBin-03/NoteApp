import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-black flex justify-center items-center flex-col gap-8">
      <h2 className="text-5xl text-white text-bold ">Login</h2>

      <div className="h-[60vh] w-130 rounded-2xl border border-white/10  shadow-2xl">
        <form
          className="flex justify-center items-center flex-col gap-3 h-full"
          autoComplete="off"
        >

          <label className="text-2xl text-zinc-300" htmlFor="email">
            Email
          </label>
          <input
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />

          <label className="text-2xl text-zinc-300" htmlFor="password">
            Password
          </label>
          <input
            className="border-0 border-b-2 border-cyan-500 bg-transparent outline-0 text-white w-[80%] p-3 placeholder:text-zinc-600"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />

          <div className="flex justify-center items-center flex-col mt-4">
            <button
              className="text-2xl bg-linear-to-r from-cyan-500 to-blue-600 font-bold rounded-xl text-black px-8 py-2 cursor-pointer hover:brightness-110 transition-all"
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
