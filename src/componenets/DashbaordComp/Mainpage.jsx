import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Mainpage = () => {
  const [uid ,  setUid] = useState('')
  useEffect(() => {
    const uid = JSON.parse(localStorage.getItem("user"))
    setUid(uid)
    console.log(uid)
  } ,  [])


  return (
    <div className='w-full '>
        <h1 className='text-black m-4 text-[18px] font-semibold '>Welcome to Dashboard Home!</h1>
    </div>
  )
}

export default Mainpage