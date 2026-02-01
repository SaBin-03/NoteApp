import React from "react";
import Navbar from "../pages/Navbar";
import HomeContent from "../pages/HomeContent";

const Home = () => {
  return (
    <div className="h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-black ">
      <Navbar />
      <HomeContent />
    </div>
  );
};

export default Home;
