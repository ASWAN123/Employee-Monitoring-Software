import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { contextData } from "../ContextData";
import firebase from "firebase/compat/app";
import { AiOutlineArrowDown } from 'react-icons/ai';


const Scanpage = () => {
  const [result, setResult] = useState("No result");
  const [action, setAction] = useState("");
  const [scanning, setScanning ] = useState(false);
  const { data , db } = useContext(contextData);
  const  [ confirmed , setConfirmed] = useState(false)
  const  [ danger , setDanger ] = useState(false)
  


  
  // check if the  user  exsit  in db  and  add  the  log  to  his record
  useEffect(() => {
    // if  the  users exsit  but he didn't select  any option
    if( data.find((x) => x.id == result && action == '' ) ){
      toast.error("You must select an option first")
      const wait  = setTimeout(()=> {setResult("No result") ; setScanning(false); }   ,  3000)
    }

    // if the  user is not in db at all 
    if ( result !== 'No result' && !data.find((x) => x.id == result ) ) {
      toast.error(" You are not recognized * Maybe fired *")
      const wait  = setTimeout(()=> {setResult("No result") ; setScanning(false); }   ,  5000)
    }

    // if the  users  is  in db  and  he selected one option
    if (result !== 'No result' && data.find((x) => x.id == result) && action !== "" ){
        let today = new Date().toISOString().slice(0, 10)
        let logs  = data?.find(doc => doc.id == result).logs
        if(logs.hasOwnProperty(today)){
          logs[today].push({ 'action': action ,  date: new Date() })
        }else{
          logs[today] = [ { 'action': action ,  date: new Date() } ]
        }

        db.collection("tracking")
          .doc(result)
          .update({ ...data.find(x => x.id == result) , 
            logs: {...logs}  ,
          });

        let mytoast = action == "clock out" ?  toast.success("Thank you for a productive day!", {
          style: {
            border: '1px solid #713200',
            padding: '16px' ,
            color: '#713200' ,
          },
          iconTheme: {
            primary: '#228B22' ,
            secondary: '#ECFFDC' ,
          },
        }) : toast.success("Welcome back! Let's start a new day" , {
          style: {
            border: '1px solid #713200' ,
            padding: '16px' ,
            color: '#713200' ,
          },
          iconTheme: {
            primary: '#228B22' ,
            secondary: '#ECFFDC' ,
          },
        })
        
        const wait  = setTimeout(()=> {setResult("No result") ; setAction('') ; setScanning(false) }   ,  2000 )
        
    
      }

  }, [ scanning ] );


  const HandleResults = (x, error) => {
    if (x && result == "No result" ) {
      setResult(x.text);
      setScanning(true);
    }

    if (error) {
      console.log("Scanning......");
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
          className= { action == "clock in" ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500  font-medium rounded-lg text-md px-5 py-3 text-center " : "text-black bg-gradient-to-r from-gray-200 to-gray-100  font-medium rounded-lg text-md px-5 py-3 text-center "}
        >
          Clock In
        </button>
        <button
          type="button"
          onClick={() => {
            setAction("clock out");
          }}
          className= {action == "clock out" ? "text-white bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-md px-5 py-3 text-center " : "text-black bg-gradient-to-br from-gray-200 to-gray-100 font-medium rounded-lg text-md px-5 py-3 text-center "}
        >
          Clock Out
        </button>

      </div>
      <Toaster />
    </div>
  );
};

export default Scanpage;
