import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import QRCode from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';



const Qrgenerate = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState("No result");
  const  [isDownlaoded ,  setIsDownload] = useState(false)

  let uid = location.state;
  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
  }, []);
  console.log(uid)

  const downlaodmybadge = () => {
    const qrCodeElement = document.getElementById("qrcode");

    html2canvas(qrCodeElement).then((canvas) => {
      const dataURL = canvas.toDataURL();
      saveAs(dataURL, `qrcode.png`);
    });

    setIsDownload(true)
  };

  const RedirectToHome = () => {
    if(isDownlaoded){
      navigate('/dashboard' , { state:uid })
    }else{
      console.log('no downlaod yet')
      toast('Hey there! It looks like you forgot to download your badge' , {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
    }
    
    
  }



  return (
    <>
      <div className="text-white flex flex-col gap-4 items-center justify-center absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2  h-[60%] w-[350px] mx-2">
        <p className="text-[18px] font-semibold ">Download QR Code</p>
        <div
          id="qrcode"
          className="brightness-125 rounded-md flex gap-4 items-center w-[350px] p-2 border-2 border-blue-300"
        >

          <div className=" bg-white w-[150px] h-[150px]  p-2 rounded-md border-6 border-red-600 ">
              <QRCode value={uid}  />
          </div>
          <div className="flex flex-col gap-2 text-[14px]">
          <div className="group flex flex-col gap-2">
            <p>Name :</p>
            <p>Abderrahim</p>
          </div>
          <div className="group flex flex-col gap-2">
            <p>Email :</p>
            <p>Abderrahim@gmail.com</p>
          </div>
          </div>
        </div>

        <button
          onClick={downlaodmybadge}
          className=" w-[60%] rounded-md py-2 bg-blue-500 text-black "
        >
          Download
        </button>

        <button  onClick={RedirectToHome} className="text-red-300 flex gap-4" >
            <span>Continue to Home</span>
            <BsFillArrowRightCircleFill size={26} color="white" />
        </button>
        
      </div>
      <Toaster />
    </>
  );
};

export default Qrgenerate;
