import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { contextData } from "../ContextData";

const Scanpage = () => {
  const [result, setResult] = useState("No result");
  const [action, setAction] = useState("");
  const [scanning, setScanning] = useState(false);
  const { data, db } = useContext(contextData);
  const refresh = () => { setTimeout(() => { setResult("No result");setScanning(false); setAction('') ; } ,  3000)}

  useEffect(() => { 
    let today = new Date().setHours(0, 0, 0, 0) ;
    let userExsit = data?.find((doc) => doc.id == result) ;
    let workTimesData = userExsit?.workTimesData || [] ; // array of data
    let TodayWorkTimes = workTimesData?.find((x) => x.date == today)  ; // object

    if ( !userExsit && result !== 'No result' ) { toast.error("We're sorry, but it appears that you are not registered in our system.") ;refresh() }
    if ( userExsit && action == "" ) { toast.error("Oops! It looks like you forgot to select an option.") ;refresh() }
    if (action !== "" && userExsit ){
      // data  exist just update
      if(TodayWorkTimes){
        // if option  is  clock in 
        let newdate = new Date() ;
        
        // if user wants  to clock out
        if(action == 'clock in'){
          let clockin = TodayWorkTimes.Clocktimes.filter(x => x.order == "clockIn").length
          let clockout = TodayWorkTimes.Clocktimes.filter(x => x.order == "clockOut").length
          if(clockin == 1 && clockout == 1){
            let updateClockTimes = [ ...TodayWorkTimes.Clocktimes , { 'order' : 'clockIn'  , date: Date.now().toString()} ];
            let HappyNewDay = workTimesData.map(x=> (x.date == today) ? {...x , Clocktimes:updateClockTimes} : x )
            db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: HappyNewDay })
            refresh()
            toast.success('You have successfully clocked in for the day.')
          }else{
            toast.error("Attention, it appears that you've accidentally clocked in twice today.")
            refresh()
          }
        }

        // if user  want to clock out
        if(action == 'clock out'){
          let clockin = TodayWorkTimes.Clocktimes.filter(x => x.order == "clockIn").length
          let clockout = TodayWorkTimes.Clocktimes.filter(x => x.order == "clockOut").length
          if((clockin == 1 && clockout == 0 ) || (clockin == 2 && clockout == 1) ){
            let updateClockTimes = [ ...TodayWorkTimes.Clocktimes , { 'order' : 'clockOut'  , date: Date.now().toString()} ];
            let HappyNewDay = workTimesData.map(x=> (x.date == today) ? {...x , Clocktimes:updateClockTimes} : x )
            db.collection('tracking').doc(result).update({...userExsit  , workTimesData: HappyNewDay })
            refresh()
            toast.success('Congratulations! You have successfully clocked out for the day.')
          }else{
            toast.error("Attention, it appears that you've accidentally clocked out twice today.")
            refresh()
          }
        }

      }else{
        // data not exist create
        if(action == 'clock in'){
          let HappyNewDay = { 'date':today , 'Clocktimes':[ { 'order' : 'clockIn'  , date: Date.now().toString() } ] }
          refresh()
          toast.success('You have successfully clocked in for the day.')
          db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: [ ...workTimesData ,  HappyNewDay ] })
        }else{
          toast.error("Hello , it seems you haven't clocked in for the day yet. ")
          refresh()
        }
      }
    }


  } , [scanning])
  
  const HandleResults = (x, error) => {
    if (x && result == "No result") {
      
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
