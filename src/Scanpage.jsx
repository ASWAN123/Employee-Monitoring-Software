import React, { useRef, useState, forwardRef  } from "react";
import QrScanner from "react-qr-scanner";
import { useLocation } from "react-router-dom";

const Scanpage = (sd) => {
  const location = useLocation()
  const qrRef = useRef(null) ; 

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      console.log(result) ;
    }
  };

  return (
    <div className="w-[350px] h-[50%]">
      <QrScanner
        ref={qrRef}
        delay={300}
        // constraints={{
        //   facingMode: "environment",
        // }}
        style={{ width: "100%" }}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
      />
      <p>111</p>
    </div>
  );
};

// const x = React.forwardRef(Scanpage)

export default Scanpage ;
