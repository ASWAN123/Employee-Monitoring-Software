import React from 'react';
import {  useNavigate } from 'react-router-dom';




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
          <button onClick={() => {navigate('/Employee-Monitoring-Software/scanpage')}} type="button" className="text-gray-900 w-[300px] text-[25px]  bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl  font-semibold rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2">Get Start Scanning</button>

        </div>
    </main>
  );
};

export default Homepage;
