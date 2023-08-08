import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome , AiOutlineApi } from "react-icons/ai";
import Logo from "./Logo";

const Header = ({auth}) => {
  let navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  let location  = useLocation();
  let path = location.pathname;

  

  
 

  return (
    <header className="flex gap-4 p-2 mt-2 items-center relative h-[60px]  ">

          <Logo />


      {/* desktop version */}
{  !auth.currentUser &&    <div className="ml-auto  gap-4  justify-center items-center md:flex hidden">
        <Link to="/Employee-Monitoring-Software/login" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" >
          Login
        </Link>

        <Link to="/Employee-Monitoring-Software/register" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 ">
          Register
        </Link>

      </div>}

      {
        auth.currentUser &&         <Link to="/Employee-Monitoring-Software/account" className="ml-auto hidden md:block text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2 ">
        My Account
      </Link>
      }

      {/* mobile version */}
      <div  className="md:hidden ml-auto">
         { path =="/" && !auth.currentUser  && <BsFillPersonFill onClick={() =>{navigate('/Employee-Monitoring-Software/login')}} color="white" size={32} /> }
         { ( path == "/Employee-Monitoring-Software/login" || path == "/register"  ) &&  <AiFillHome onClick={() =>{navigate('/Employee-Monitoring-Software')}} color="white" size={32} /> }
         { path =="/" && auth.currentUser  && <BsFillPersonFill onClick={() =>{navigate('/Employee-Monitoring-Software/account')}} color="white" size={32} /> }
      </div>
      
    </header>
  );
};

export default Header;
