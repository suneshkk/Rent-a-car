import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
function AdminOneHeader() {
  return (
    <div className="absolute h-32 navbar flex justify-between ">
      <div className="mr-10"></div>
      <div className="opacity-80 px-5 py-3 rounded-lg bg-gradient-to-r from-[#0c2028]  to-[#075d8b] ">
        <Link to={"/"}>
          <h1 class="text-4xl font-bold text-sky-500  uppercase tracking-widest ">
            wheelz n<b className="font-bold text-slate-100">o</b>w
          </h1>
        </Link>
      </div>

      <div className="mt-5 gap-5 mx-8">
        <div className="">
          <FaUserCircle className="text-4xl text-center text-slate-100 cursor-pointer" />;
        </div>
        <div>
          <FaBell className="text-2xl text-amber-400 cursor-pointer" />;
        </div>
      </div>
    </div>
  );
}

export default AdminOneHeader;
