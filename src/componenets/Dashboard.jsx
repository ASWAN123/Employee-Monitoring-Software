import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { Route, Routes, useMatch } from "react-router-dom";
import Mainpage from "./DashbaordComp/Mainpage";
import Logs from "./DashbaordComp/Logs";
import { useState } from "react";
import Logo from "./Logo";

const Dashboard = ({ authenticated, SetIsauthenticated }) => {
  // const [ isauthenticated , setauthenticated ] = useState(false)
  let navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  let uid = location.state;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      SetIsauthenticated(true);
    }
  }, []);

  return (
    <div className="w-full flex  text-white">
      <nav className="w-[235px] h-screen  ">
        <div className=" h-[60px] flex items-center bg-[#2e4981] justify-center ">
          <Logo />
        </div>
        <ul className="flex flex-col gap-4 w-full p-2 ml-2 mt-4 ">
          <Link
            to=""
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Dashbaord
          </Link>
          <Link
            to="history"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            History
          </Link>
          <Link
            to="tickets"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Tickets
          </Link>
          <Link
            to="profile"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Profile
          </Link>
        </ul>
      </nav>
      <div className="w-full h-screen bg-[#f3f4f2]">
        {/* header */}
        <header className="h-[60px] pr-4 flex items-center justify-center bg-[#010322] ">
          <AiOutlineMenu
            size={28}
            color="white"
            style={{ marginLeft: "10px" }}
          />

          <div className="ml-4 w-[50%]  h-[40px] ">
            <input type="text"  className="w-full h-[100%] bg-transparent outline-none px-2 placeholder:text-[14px] text-white " placeholder="Search for , ( John Smith ) 'admin'"/>
          </div>
          
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
              SetIsauthenticated(false);
            }}
            className="text-white ml-auto bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Log out
          </button>
        </header>
        {/* body */}
        <div id="main">{authenticated ? <Outlet /> : navigate("/login")}</div>
      </div>
    </div>
  );
};

export default Dashboard;
