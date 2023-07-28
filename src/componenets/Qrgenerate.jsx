import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import QrScanner from "react-qr-scanner";



const Qrgenerate = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [data, setData] = useState("No result");

  let uid = location.state;
  useEffect(() => {
    if (!uid) {
      navigate("/");
    }
  }, []);

  const downlaodmybadge = () => {
    const qrCodeElement = document.getElementById("qrcode");

    html2canvas(qrCodeElement).then((canvas) => {
      const dataURL = canvas.toDataURL();
      saveAs(dataURL, `qrcode.png`);
    });
  };



  return (
    <>
      <div className="text-white flex flex-col gap-4 items-center justify-center absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2  h-[60%] w-[350px] mx-2">
        <p className="text-[18px] font-semibold ">Download QR Code</p>
        <div
          id="qrcode"
          className="brightness-125 px-10 py-6 flex flex-col gap-4 items-center  rounded-md border-2 border-blue-300"
        >
          <p className="   font-semibold text-[1.8rem] text-white ">
            Clock-<span className=" text-red-300 ">In</span>
          </p>
          <div className="bg-white p-2 rounded-md ">
            <QRCode
              className=""
              title="qrcode"
              value={uid}
              bgColor={"black"}
              fgColor={"white"}
              size={200}
            />
          </div>
        </div>

        <button
          onClick={downlaodmybadge}
          className=" w-[60%] rounded-md py-2 bg-blue-500 text-black "
        >
          Download
        </button>

        <button onClick={ () => {navigate('/dashboard' , { state:uid })}} className="text-red-300 flex gap-4" >
            <span>Continue to Home</span>
            <BsFillArrowRightCircleFill size={26} color="white" />
        </button>
      </div>
    </>
  );
};

export default Qrgenerate;
