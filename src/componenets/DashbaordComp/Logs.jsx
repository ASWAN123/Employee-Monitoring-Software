import React from "react";
import { useLocation } from "react-router-dom";

const Logs = () => {
  const uid = JSON.parse(localStorage.getItem("user"))
  console.log(uid)

  return (
    <div className="w-full">
      <h1 className="text-black m-4 text-[18px] font-semibold ">
        Work Attendance History
      </h1>
    </div>
  );
};

export default Logs;
