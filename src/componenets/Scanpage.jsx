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

    if ( !userExsit && result !== 'No result' ) { toast.error("You are not registered !!") ;refresh() }
    if ( userExsit && action == "" ) { toast.error("You must select an option first") ;refresh() }
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
            toast.success('Successfully Clocked in')
          }else{
            toast.error('You clocked in twice today')
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
            toast.success('Successfully Clocked out')
          }else{
            toast.error('You clocked out twice today')
            refresh()
          }
        }

      }else{
        // data not exist create
        if(action == 'clock in'){
          let HappyNewDay = { 'date':today , 'Clocktimes':[ { 'order' : 'clockIn'  , date: Date.now().toString() } ] }
          refresh()
          toast.success('Successfully Clocked in')
          db.collection('tracking').doc(result).update({...userExsit ,  workTimesData: [ ...workTimesData ,  HappyNewDay ] })
        }else{
          toast.error('You did not clock in yet')
          refresh()
        }
      }
    }


  } , [scanning])
  // let userExsit1 = data?.find((doc) => doc.id == 'QI7XxJ5NPsfHOzxk7yLGz8tUYPo1') ;
  // db.collection('tracking').doc('QI7XxJ5NPsfHOzxk7yLGz8tUYPo1').update({...userExsit1 , workTimesData:[{ date: 1690848000000, Clocktimes: [{ order: "clockIn", date: 1690875360000 }, { order: "clockOut", date: 1690886220000 }, { order: "clockIn", date: 1690894800000 }, { order: "clockOut", date: 1690908180000 }] }, { date: 1690934400000, Clocktimes: [{ order: "clockIn", date: 1690961820000 }, { order: "clockOut", date: 1690971720000 }, { order: "clockIn", date: 1690981440000 }, { order: "clockOut", date: 1690992240000 }] }, { date: 1691020800000, Clocktimes: [{ order: "clockIn", date: 1691048160000 }, { order: "clockOut", date: 1691058480000 }, { order: "clockIn", date: 1691070720000 }, { order: "clockOut", date: 1691081400000 }] }, { date: 1691107200000, Clocktimes: [{ order: "clockIn", date: 1691135460000 }, { order: "clockOut", date: 1691143260000 }, { order: "clockIn", date: 1691157300000 }, { order: "clockOut", date: 1691167320000 }] }, { date: 1691193600000, Clocktimes: [{ order: "clockIn", date: 1691221800000 }, { order: "clockOut", date: 1691231160000 }, { order: "clockIn", date: 1691242200000 }, { order: "clockOut", date: 1691252880000 }] }, { date: 1691280000000, Clocktimes: [{ order: "clockIn", date: 1691307120000 }, { order: "clockOut", date: 1691318340000 }, { order: "clockIn", date: 1691328120000 }, { order: "clockOut", date: 1691339040000 }] }, { date: 1691366400000, Clocktimes: [{ order: "clockIn", date: 1691391720000 }, { order: "clockOut", date: 1691404860000 }, { order: "clockIn", date: 1691414340000 }, { order: "clockOut", date: 1691424060000 }] }, { date: 1691452800000, Clocktimes: [{ order: "clockIn", date: 1691480160000 }, { order: "clockOut", date: 1691491560000 }, { order: "clockIn", date: 1691501700000 }, { order: "clockOut", date: 1691513340000 }] }, { date: 1691539200000, Clocktimes: [{ order: "clockIn", date: 1691567160000 }, { order: "clockOut", date: 1691577180000 }, { order: "clockIn", date: 1691586420000 }, { order: "clockOut", date: 1691599980000 }] }, { date: 1691625600000, Clocktimes: [{ order: "clockIn", date: 1691651880000 }, { order: "clockOut", date: 1691663100000 }, { order: "clockIn", date: 1691675100000 }, { order: "clockOut", date: 1691683440000 }] }, { date: 1691712000000, Clocktimes: [{ order: "clockIn", date: 1691737320000 }, { order: "clockOut", date: 1691751540000 }, { order: "clockIn", date: 1691759100000 }, { order: "clockOut", date: 1691770860000 }] }, { date: 1691798400000, Clocktimes: [{ order: "clockIn", date: 1691825160000 }, { order: "clockOut", date: 1691837220000 }, { order: "clockIn", date: 1691846760000 }, { order: "clockOut", date: 1691858040000 }] }] })
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
