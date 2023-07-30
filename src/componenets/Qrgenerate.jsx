import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import QRCode from "qrcode.react";
import toast, { Toaster } from "react-hot-toast";

const Qrgenerate = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState("No result");
  const [isDownlaoded, setIsDownload] = useState(false);
  let uid = location.state ;

  if( !uid ){
    return navigate("/login")
  }
  

  const downlaodmybadge = () => {
    const qrCodeElement = document.getElementById("qrcode");

    html2canvas(qrCodeElement).then((canvas) => {
      const dataURL = canvas.toDataURL();
      saveAs(dataURL, `qrcode.png`);
    });

    setIsDownload(true);
  };

  const RedirectToHome = () => {
    if (isDownlaoded) {
      navigate("/account", { state: uid });
    } else {
      console.log("no downlaod yet");
      toast("Hey there! It looks like you forgot to download your badge", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
        },
      });
    }
  };

  return (
    <>
      <div className="text-white flex flex-col gap-4 items-center justify-center absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2  h-[60%] w-[350px] ">
        <p className="text-[18px] font-semibold ">Download QR Code</p>
        <div
          id="qrcode"
          className=" border-2 bg-[#010322] flex gap-4 flex-col  w-[250px] min-h-[350px] "
        >
          <div className="w-full h-[120px] bg-gradient-to-br from-pink-500 to-blue-500    "></div>

          <div className=" bg-white w-[150px] h-[150px] mx-auto -mt-[35%] rounded-lg p-2 ">
            <QRCode
              value={uid}
              className="bg-white border border-black p-2 mx-auto my-auto"
            />
          </div>
          <div className="text-white flex flex-col items-center gap-2 text-[14px]">
            <div className="group  flex  gap-2">
              <p>Name :</p>
              <p>Abderrahim</p>
            </div>
            <div className="group flex  gap-2">
              <p>Email :</p>
              <p>Abderrahim@gmail.com</p>
            </div>
          </div>

          <p className="text-white text-[18px] font-semibold capitalize text-center mt-auto mb-4" >attendee</p>
        </div>

        <button
          onClick={downlaodmybadge}
          className=" w-[60%] rounded-md py-2 bg-blue-500 text-black "
        >
          Download
        </button>

        <button onClick={RedirectToHome} className="text-red-300 flex gap-4">
          <span>Continue to Dashbaord</span>
          <BsFillArrowRightCircleFill size={26} color="white" />
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default Qrgenerate;
