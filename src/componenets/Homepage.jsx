import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';




const Homepage = () => {
  let navigate = useNavigate();



  return (
    <main className='w-[60%] flex flex-row-reverse items-center justify-center text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>

        <div className='flex flex-col gap-4 items-center justify-center  '>
          <h1 className='text-[2rem] font-bold text-center '>
            Clock-In with Confidence: Introducing Our Employee Tracking App
          </h1>
          <p className='text-[14px] pl-2'>
            * Effortlessly track employee attendance for a streamlined workday experience.
          </p>
          <button
            className='bg-blue-600 font-semibold text-black px-10 py-2 w-[300px] mt-12 rounded-md mx-auto text-[25px] flex items-center gap-4 justify-center '
          >
            <span>Get Start Scanning</span>
          </button>
        </div>
    </main>
  );
};

export default Homepage;
