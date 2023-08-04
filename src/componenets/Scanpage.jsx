import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { contextData } from "../ContextData";
import firebase from "firebase/compat/app";
import { AiOutlineArrowDown } from "react-icons/ai";

const Scanpage = () => {
  const [result, setResult] = useState("No result");
  const [action, setAction] = useState("");
  const [scanning, setScanning] = useState(false);
  const { data, db } = useContext(contextData);
  const [confirmed, setConfirmed] = useState(false);
  const [danger, setDanger] = useState(false);
  const refresh = () => { setTimeout(() => { setResult("No result");setScanning(false); setAction('') ; } ,  3000)}

  useEffect(() => {
    let today = new Date().setHours(0, 0, 0, 0);
    let userExsit = data?.find((doc) => doc.id == result);
    let workTimesData = userExsit?.workTimesData || [] ; // array of data
    let TodayWorkTimes = workTimesData?.find((x) => x.date == today)  ; // object

    if ( !userExsit && result !== 'No result' ) { toast.error("You are not registered !!") ;refresh() }
    if ( userExsit && action == "" ) { toast.error("You must select an option first") ;refresh() }
    if (action !== "" && userExsit ){
      // data  exist just update
      if(TodayWorkTimes){
        // if option  is  clock in 
        let newdate = new Date() ;

        if(action == 'clock in'){
          let verification  = TodayWorkTimes.Clocktimes.find(x => x.clockIn !== '' && x.clockOut == '' )
          if(verification){
            toast.error('Can not clock in waiting for clocking  out') 
            refresh()
          }else{
            let updateClockTimes = TodayWorkTimes.Clocktimes.map(x => (x.clockIn == '' && newdate !== '' ? (x.clockIn = newdate, newdate = '', x) : x));
            // {...TodayWorkTimes ,  Clocktimes:updateClockTimes}
            let HappyNewDay = workTimesData.map(x=> (x.date == today) ? {...x , Clocktimes:updateClockTimes} : x )
            refresh();
            toast.success('Successfully Clocked in')
            db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: HappyNewDay })
          }


        }

        if(action == 'clock out'){
          let verification  = TodayWorkTimes.Clocktimes.find(x => x.clockIn !== '' && x.clockOut == '' )
          if(!verification) { 
            toast.error('Can not clock out waiting for clocking  in') 
            refresh()
          }else{
            let updateClockTimes = TodayWorkTimes.Clocktimes.map(x => (x.clockIn !== '' && x.clockOut == '' ? (x.clockOut = newdate, x) : x));
            // let HappyNewDay = {...TodayWorkTimes ,  Clocktimes:updateClockTimes}
            let HappyNewDay = workTimesData.map(x=> (x.date == today) ? {...x , Clocktimes:updateClockTimes} : x )
            refresh()
            toast.success('Successfully Clocked out')
            db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: HappyNewDay })
          }
        }

      }else{
        // data not exist create
        let HappyNewDay = { 'date':today , 'Clocktimes':[ {'clockIn' : new Date() ,  'clockOut': '' } , {'clockIn' : '' ,  'clockOut': '' } ,{'clockIn' : '' ,  'clockOut': '' } , {'clockIn' : '' ,  'clockOut': '' } ] }
        refresh()
        toast.success('Successfully Clocked in')
        db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: [ ...workTimesData ,  HappyNewDay ] })
      }
    }


  } , [scanning])


  const HandleResults = (x, error) => {
    if (x && result == "No result") {
      console.log("ready");
      setResult(x.text);
      setScanning(true);
    }
  };

  return (
    <div className="flex flex-col  md:p-0  md:flex-row-reverse items-center gap-4 justify-center mt-2 md:mt-4 relative">
      <QrReader
        className=" w-[90%] md:w-[50%]  "
        onResult={HandleResults}
        constraints={{ facingMode: "environment" }}
      />

      <div className="w-full md:w-[500px] flex flex-col gap-4 p-6 mt-2 text-[20px] font-semibold order-1">
        <p className="text-white mb-4 text-center">
          Attention employees: Before scanning your badge to clock in or out .
        </p>
        <button
          type="button"
          onClick={() => {
            setAction("clock in");
          }}
          className={
            action == "clock in"
              ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500  font-medium rounded-lg text-md px-5 py-3 text-center "
              : "text-black bg-gradient-to-r from-gray-200 to-gray-100  font-medium rounded-lg text-md px-5 py-3 text-center "
          }
        >
          Clock In
        </button>
        <button
          type="button"
          onClick={() => {
            setAction("clock out");
          }}
          className={
            action == "clock out"
              ? "text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-md px-5 py-3 text-center "
              : "text-black bg-gradient-to-br from-gray-200 to-gray-100 font-medium rounded-lg text-md px-5 py-3 text-center "
          }
        >
          Clock Out
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Scanpage;
