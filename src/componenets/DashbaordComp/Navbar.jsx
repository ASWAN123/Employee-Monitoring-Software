import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const Navbar = () => {
  return (
    <nav className="w-[235px] h-screen  ">
        <div className=" h-[60px] flex items-center bg-[#2e4981] justify-center ">
          <Logo />
        </div>
        <ul className="flex flex-col gap-4 w-full p-2 ml-2 mt-4 ">
          <Link
            to=""
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Dashbaord
          </Link>
          <Link
            to="history"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            History
          </Link>
          <Link
            to="tickets"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Tickets
          </Link>
          <Link
            to="profile"
            className="py-1 font-semibold  px-2 border-l-2 hover:border-blue-500 hover:cursor-pointer hover:bg-gray-200/20 rounded-r-md   "
          >
            Profile
          </Link>
        </ul>
      </nav>
  )
}

export default Navbar