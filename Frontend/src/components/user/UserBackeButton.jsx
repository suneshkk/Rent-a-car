import React from "react";
import { Link } from "react-router-dom";
function UserBackeButton() {
  return (
    <div className="">
      <Link to={"/user/home"}>
        {" "}
        <button className="btn border-none btn-active bg-gradient-to-r from-[#233f4a] to-[#2480a8] font-serif">Back</button>
        </Link>
    </div>
  );
}

export default UserBackeButton;
