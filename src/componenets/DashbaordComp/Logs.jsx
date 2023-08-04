import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Row } from "./table/Row";
import THead from "./table/THead";
import { useContext } from "react";
import { contextData } from "../../ContextData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";


const Logs = () => {
  const [ startDate , setStartDate] = useState(new Date()) ;
  const [EndDate, setEndtDate] = useState() ;
  const { auth, data, db } = useContext(contextData) ;
  const logs = data?.find((x) => x.id == auth.currentUser.uid)?.logs ;






  return (
    <div className="w-full"> 
      <h1 className="text-black m-4 text-[18px] font-semibold ">
        Work Attendance History
      </h1>
      <div className="flex gap-2 items-center w-[90%] mx-auto mb-4 ">

        
      {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" className=" bg-transparent text-black px-1 py-1 border " />
      <DatePicker selected={EndDate} onChange={(date) => setEndtDate(date)} placeholderText="End Date" className=" bg-transparent text-black px-1 py-1 border " /> */}




      </div>
      <div id="table" className="w-[90%] mx-auto">
        <div className="relative overflow-x-auto ">
          <table className=" text-left text-gray-500 	">
            <thead className=" text-white  capitalize bg-[#99A98F] text-[14px]">
            <THead/>
            {
              logs?.map((log ,  index) =>  <Row  key ={index} log={log} />) 
            }
             
            </thead>
            <tbody className="text-black">
            {
              logs?.map((log ,  index) =>  <Row  key ={index} log={log} />) 
            }
              
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Logs;
