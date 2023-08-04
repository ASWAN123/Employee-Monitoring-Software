import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { contextData } from '../../ContextData'

const Tickets = () => {
  const { data , db } = useContext(contextData)

  const handleRequest   = (e) => {
    e.preventDefault()
    let formdata = new FormData(e.target)
    let data  = {
      subject : formdata.get('subject'),
      description : formdata.get('description')
    }

   // handle  adding  request
   
   

  }

  

  return (
    <div className='w-full  '>
        <h1 className='text-black m-4 text-[18px] font-semibold  '>Tickets Management: Submit and Track Support Tickets</h1>
        <form onSubmit={handleRequest} className='flex flex-col gap-4 w-[500px] ml-8  mt-8 '>
          <div id='group' className='flex flex-col gap-2'>
            <label htmlFor="" className='text-black '>Subject</label>
            <input type="text" name="subject" className='w-full bg-transparent border  rounded-lg py-2 px-2 text-[14px]  outline-none text-black ' placeholder='example : timing error , clock not recognized '/>
          </div>
          <div className='flex flex-col gap-2 '>
            <label htmlFor="" className='text-black '>Message</label>
            <textarea name="description" id="" cols="30" rows="4" className='w-full rounded-lg border bg-transparent outline-none text-black text-[14px] px-2 ' placeholder='write your message'></textarea>
          </div>


          <button type='submit' className='bg-blue-400 px-6 py-2 '>Send</button>

        </form>
    </div>
  )
}

export default Tickets