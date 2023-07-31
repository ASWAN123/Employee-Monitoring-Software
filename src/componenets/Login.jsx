import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
// import { auth } from './firebaseConfig';
import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { LeapFrog } from "@uiball/loaders";

const Login = ({ auth }) => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (userdata.email.trim() == "")
      return toast.error("Oops! You Forgot to Type Your Email");
    if (userdata.password.trim() == "")
      return toast.error("Oops! You Forgot to Type Your Password");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        userdata.email,
        userdata.password
      ).then((userCredential) => {
        setUserdata({ email: "", password: "" });
        setLoading(false);
        return  navigate('/account')
      });
    } catch (err) {
      console.log(err.message);
      if (err.message.includes("user-not-found")) {
        toast.error("No account associated with this email.");
      }
      if (err.message.includes("invalid-email")) {
        toast.error("Invalid Email Address");
      }
    }
  };

  return (
    <>
      <div className="text-white w-[350px]  mx-auto md:mt-[10%] felx flex-col gap-4 items-center justify-center   p-4 rounded-sm ">
        <p className="text-center text-[2rem] mb-12 py-2   tracking-widest ">
          Login
        </p>
        <form
          onSubmit={HandleLogin}
          className="flex flex-col gap-8 items-center w-full "
        >
          <div className="flex flex-col gap-2 w-full  ">
            <input
              value={userdata.email}
              onChange={(e) => {
                setUserdata({ ...userdata, email: e.target.value });
              }}
              className=" focus:outline-none px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]"
              placeholder="Email"
              type="text"
              name="login"
              id="login"
            />
          </div>
          <div className="flex flex-col gap-2 w-full  ">
            <input
              value={userdata.password}
              onChange={(e) => {
                setUserdata({ ...userdata, password: e.target.value });
              }}
              className="px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]"
              type="Password"
              placeholder="Password"
              name="register"
              id="register"
            />
          </div>
          <span className="text-blue-500 cursor-pointer">
            Forget password ?
          </span>
          <input
            type="submit"
            value="Login"
            className="bg-[#8fb3ff] px-6 py-2 w-full rounded-[15px]  cursor-pointer text-black"
          />
        </form>
        <p className="text-center mt-4 md:hidden ">Or</p>
        <div
          onClick={() => {
            navigate("/register");
          }}
          className="mt-5  cursor-pointer flex bg-[#fbf593] py-2 rounded-md px-6 items-center justify-center gap-2 w-full md:hidden "
        >
          <p className=" text-black ">Create an Account</p>
          <BsFillPersonPlusFill color="black" size={24} />
        </div>
      </div>
      {loading && (
        <div className=" absolute top-0 w-full h-screen bg-blue-950/80 flex items-center z-11 justify-center ">
          <LeapFrog size={40} speed={2.5} color="white" />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Login;
