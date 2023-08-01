import React from "react";
import { useLocation } from "react-router-dom";
import { Row } from "./table/Row";
import THead from "./table/THead";
import { useContext } from "react";
import { contextData } from "../../ContextData";

const Logs = () => {
  const { auth, data, db } = useContext(contextData);
  const logs = data?.find((x) => x.id == auth.currentUser.uid)?.logs;
  // console.log(logs)

  return (
    <div className="w-full">
      <h1 className="text-black m-4 text-[18px] font-semibold ">
        Work Attendance History
      </h1>
      <div id="table" className="w-[90%] mx-auto">
        <div className="relative overflow-x-auto ">
          <table className="w-full  text-left text-gray-500 ">
            <thead className=" text-white  capitalize bg-[#2e4981] text-[14px]">
            <THead/>
            </thead>
            <tbody>
            {/* {
              logs?.map((log ,  index) =>  <Row  key ={index} log={log} />) 
            } */}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logs;
