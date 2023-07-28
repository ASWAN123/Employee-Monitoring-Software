import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const Header = () => {
  let navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  let location  = useLocation()
  let path = location.pathname
 

  return (
    <header className="flex gap-4 p-2 mt-2 items-center">
      <p
        onClick={() => {
          navigate("/");
        }}
        className="font-semibold text-[1.8rem] text-white "
      >
        Clock-<span className=" text-red-400 ">In</span>
      </p>

      {/* desktop version */}
      <div className="ml-auto  gap-4  justify-center items-center md:flex hidden">
        <Link to="/login" className=" text-[#8fb3ff] py-2 px-6 rounded-md  ">
          Login
        </Link>
        <Link to="/register" className="bg-[#fbf593] py-2 px-6 rounded-md  ">
          Register
        </Link>
      </div>

      {/* mobile version */}
      <div  className="md:hidden ml-auto">
         { path =="/" && <BsFillPersonFill onClick={() =>{navigate('/login')}} color="white" size={32} /> }
         { ( path == "/login" || path == "/register"  ) &&  <AiFillHome onClick={() =>{navigate('/')}} color="white" size={32} /> }
      </div>
      
    </header>
  );
};

export default Header;
