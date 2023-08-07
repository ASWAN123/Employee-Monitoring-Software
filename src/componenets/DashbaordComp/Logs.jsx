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
// calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



const Logs = () => {

  const { auth, data, db } = useContext(contextData);
  const logs =  data?.find((x) => x.id == auth.currentUser.uid).workTimesData  ;
  let [dataTransfer ,  setDataTransfer] = useState([])

  useEffect(() => {
    let container = []
    logs?.forEach(x => {
      let clocktimes = x.Clocktimes
      clocktimes?.map( y  =>  {
        
        let w = { 'title': y.order , backgroundColor: 'green' , 'color': y.order == 'clockIn' ? "#228b22" : "#922724"   , 'start' : new Date(parseInt(y.date)) }
        
        if(w.start.toString() !== 'Invalid Date' ){
          container.push(w)
        }
      })
      
    })

    setDataTransfer(container)
    
  } ,  [logs])



  return (
    <div className="w-full">
    <h1 className="text-black m-4 text-[18px] font-semibold  text-center  ">Work Attendance History</h1>
    <div className="relative p-4 text-black ">
      
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events={[...dataTransfer ] }
        aspectRatio={2.4}

      />
    </div>
    </div>
  
  )
};

export default Logs;
