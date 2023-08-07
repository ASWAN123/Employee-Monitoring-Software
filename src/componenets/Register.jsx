import React, { useState } from 'react'
import { useContext } from 'react';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { contextData } from '../ContextData';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from './firebaseConfig';
import firebase from "firebase/compat/app";
import { JellyTriangle } from '@uiball/loaders'
import Loading from './Loading';
import toast, { Toaster } from "react-hot-toast";


const Register = ({auth}) => {
    let navigate = useNavigate()
    const  { data ,  db }  = useContext(contextData)
    const [ loading ,  setLoading ] = useState(false)

    let [userInfo , setUserInfo ] = useState({
        first_name:'',
        last_name : '' ,
        email:'',
        password:'',
        phone:'',
    })

    const CreateAccount = async (e) => {
        e.preventDefault()
        if  ( userInfo.first_name.trim() == '' ) return toast.error("First Name Can't Be Empty")
        if  ( userInfo.last_name.trim() == '' ) return toast.error("Last Name Can't Be Empty")
        if  ( userInfo.email.trim() == '' ) return toast.error("Oops! You Forgot to Type Your Email")
        if  ( userInfo.password.trim() == '' ) return toast.error("Oops! You Forgot to Type Your Password")
        if  ( userInfo.password.trim().length <= 5 ) return toast.error("Password Can't Be Less Than 6 Length")

        setLoading(true)
        let uid ;
        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((res) => {
            uid = res.user.uid
            db.collection('tracking').doc(uid).set({ user:{...userInfo , 'id':uid} })
            setUserInfo({first_name:'' , last_name:'' , email:'', password:'', phone:'',})
            navigate('/Employee-Monitoring-Software/qrgenerate' )
          })
        .catch( err => {
            if (err.message.includes('already-in-use')){
                toast.error("Email already exists")
            }
            if(err.message.includes('invalid-email')){
                toast.error("Invalid Email Address")
            }
            setLoading(false)
        
        })

    }

    return (
        <>
        <div className='text-white w-[350px]  mx-auto felx flex-col gap-4 items-center justify-center   p-4 rounded-sm '>
            <p className='text-center text-[2rem] mb-12 py-2 tracking-widest'>Register</p>
            <form onSubmit={CreateAccount} className='flex flex-col gap-8 items-center w-full '>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.first_name} onChange={(e)=> (setUserInfo({...userInfo , first_name:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' placeholder='First Name'  type="text" name='fullname' id='fullname' />
                </div>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.last_name} onChange={(e)=> (setUserInfo({...userInfo , last_name:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' placeholder='Last Name'  type="text" name='fullname' id='fullname' />
                </div>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.email} onChange={(e)=> (setUserInfo({...userInfo , email:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' placeholder='Email'  type="text" name='email' id='email' />
                </div>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.password} onChange={(e)=> (setUserInfo({...userInfo , password:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' type="Password" placeholder='Passowrd'   name='password' id='password' />
                </div>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.phone} onChange={(e)=> (setUserInfo({...userInfo , phone:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' type="tel" placeholder='Phone' id="phone" name="phone"  />
                </div>
                { !loading && <input type="submit" value='Create' className='bg-[#fbf593] px-6 cursor-pointer py-2 w-full rounded-[15px] text-black' /> }
            </form>
            <p className='text-center mt-4 md:hidden '>Or</p>
            <div onClick={() =>{navigate('/Employee-Monitoring-Software/login')}}  className='mt-5  cursor-pointer flex bg-[#8fb3ff] py-2 px-6 rounded-md  items-center justify-center gap-2 w-full md:hidden '>
            <p className=' text-black '>Login instead</p>
            <BsFillPersonCheckFill color='black' size={24}/>
            </div>
            
        </div>
        { loading && <Loading/> }
        <Toaster />
        </>
      )
}

export default Register