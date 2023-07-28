import React, { useState } from 'react'
import { useContext } from 'react';
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { contextData } from '../ContextData';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebaseConfig';
import firebase from "firebase/compat/app";
// import { SuperBalls } from '@uiball/loaders'
import { JellyTriangle } from '@uiball/loaders'

const Register = () => {
    let navigate = useNavigate()
    const  {data ,  db}  = useContext(contextData)
    const [ loading ,  setLoading ] = useState(false)

    let [userInfo , setUserInfo ] = useState({
        fullName:'',
        email:'@gmail.com',
        password:'123123',
        phone:'123123123',
    })

    const CreateAccount = async (e) => {
        e.preventDefault()
        console.log('clicked')
        setLoading(true)
        let uid ;
        await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((res) => {
            uid = res.user.uid
          })
        .catch(err => console.log(err.message))
        await db.collection('tracking').doc('V1wNxjPaHzRgmozmoqHf').set({users:firebase.firestore.FieldValue.arrayUnion({...userInfo , 'id':uid})})

        setUserInfo({
            fullName:'',
            email:'',
            password:'',
            phone:'',
        })
        navigate('/qrgenerate' , {state:uid} )
    }

    return (
        <>
        <div className='text-white w-[350px]  absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 felx flex-col gap-4 items-center justify-center   p-4 rounded-sm '>
            <p className='text-center text-[2rem] mb-12 py-2 tracking-widest'>Register</p>
            <form onSubmit={CreateAccount} className='flex flex-col gap-8 items-center w-full '>
                <div className='flex flex-col gap-2 w-full  '>
                    <input value={userInfo.fullName} onChange={(e)=> (setUserInfo({...userInfo , fullName:e.target.value}))} className=' px-2 py-1 outline-none bg-transparent border rounded-sm  h-8  w-full placeholder:text-[14px]' placeholder='Full Name'  type="text" name='fullname' id='fullname' />
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
                {
                    loading && <JellyTriangle 
                    size={45}
                    speed={1} 
                    color="orange" 
                   />
                }
            </form>
            <p className='text-center mt-4 md:hidden '>Or</p>
            <div onClick={() =>{navigate('/login')}}  className='mt-5  cursor-pointer flex bg-[#8fb3ff] py-2 px-6 rounded-md  items-center justify-center gap-2 w-full md:hidden '>
            <p className=' text-black '>Login instead</p>
            <BsFillPersonCheckFill color='black' size={24}/>
            </div>
            
        </div>
        
        </>
      )
}

export default Register