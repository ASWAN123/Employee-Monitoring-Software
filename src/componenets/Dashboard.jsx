import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import {  signOut } from "firebase/auth";
import Navbar from "./DashbaordComp/Navbar";
import { useContext } from "react";
import { contextData } from "../ContextData";

const Dashboard = () => {
  let navigate = useNavigate() ;
  const [ shownavbar  ,  setShownavbar ] = useState(true)
  const { auth } = useContext(contextData)




  const handlelogout = () => {
    signOut(auth).then(() => {
      navigate('/Employee-Monitoring-Software')
    })
    .catch((error) => {
      console.log(error);
    });
    
  }


  return (
    <div className="w-full flex  text-white">
      { shownavbar && <Navbar />
      }
      <div className="w-full  bg-[#f3f4f2]">
        {/* header */}
        <header className="h-[60px] pr-4 flex items-center justify-center bg-[#010322] ">
          <AiOutlineMenu
            size={28}
            color="white"
            style={{ marginLeft: "10px" }}
            onClick={() => {setShownavbar(!shownavbar)}}
          />

          <button
            type="button"
            onClick={handlelogout}
            className="text-white ml-auto bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Log out
          </button>
        </header>
        {/* body */}
        <div id="main" className=" "><Outlet /></div>
      </div>
    </div>
  );
};

export default Dashboard;
