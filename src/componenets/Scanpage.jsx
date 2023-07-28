import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import toast, { Toaster } from 'react-hot-toast';


const Scanpage = () => {
  const [data, setData] = useState("No result");
  const [ clockout , setClockout ] = useState(false)
  const [ clockin , setClockin ] = useState(false)

  const HandleResults = (result, error) => {
    if (result &&  result.text !== data) {
      setData(result.text);
      toast('Hey there! It looks like you forgot to download your badge' , {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }

    if (error) {
      console.info(error);
    }
  };

  return (
    <>
      <div className="w-[90%]  mx-auto flex gap-8  ">
        <div className="w-[50%] border">
          <QrReader
            onResult={HandleResults}
            style={{ width: "100%" }}
            constraints={{ facingMode: "environment" }}
          />
        </div>
        <div className="w-[50%]  flex flex-col gap-8 p-6 text-[20px] font-semibold justify-center">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2"
          >
            Clock In
          </button>
          <button
            type="button"
            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2"
          >
            Clock Out
          </button>
        </div>

      </div>

      <Toaster />
    </>
  );
};

export default Scanpage;
