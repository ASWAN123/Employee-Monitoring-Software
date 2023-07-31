import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
  let navigate  = useNavigate()
  return (
    <div id="logo" className="" onClick={() => {navigate("/")}}>
    <div className="flex items-center gap-4 ">
      <div className="min-w-[20px] min-h-[40px] bg-orange-400 rounded-b-full  "></div>
      <div className="min-w-[20px] min-h-[40px] bg-blue-400 rounded-b-full  "></div>
      <div className="min-w-[20px] min-h-[40px] bg-red-400 rounded-b-full  "></div>
    </div>
    
  </div>
  )
}

export default Logo