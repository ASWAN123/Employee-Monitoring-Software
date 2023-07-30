import React from 'react'
import { useLocation } from 'react-router-dom'

const Tickets = () => {
  const uid = JSON.parse(localStorage.getItem("user"))
  console.log(uid)

  return (
    <div className='w-full '>
        <h1 className='text-black m-4 text-[18px] font-semibold '>Tickets Management: Submit and Track Support Tickets</h1>
    </div>
  )
}

export default Tickets