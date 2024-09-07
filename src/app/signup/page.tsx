'use client'
import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import './page.css'
import Link from 'next/link';

export default function signupPage(){

  const router = useRouter();
  const [ user,setUser ] = useState({
    email:"",
    password:"",
    username:""
  })

  const [ loading,setLoading ] = useState(false);
  const [ buttondisabled,setButtonDisabled ] = useState(false);
  
  const onSign = async()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user);
      router.push('/login');
    } catch (error:any) {
      console.log("User failed to register:",error.message);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  },[user])
  return (
    <div className='signup'>
        <h1>{loading?"Processing":"Signup"}</h1>
        <hr/><br/>
        <label htmlFor='username'>username</label><br/>
        <input
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='username'
        value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder='username'
        type='text'
        /><br/><br/>
        <label htmlFor='email'>email</label><br/>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='email'
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder='email'
        type='text'
        /><br/><br/>
        <label htmlFor='password'>password</label><br/>
        <input
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id='password'
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder='password'
        type='password'
        /><br/><br/>
        <button
        onClick={onSign}
        style={{cursor:"pointer",border:"none"}}
        >
          {buttondisabled?"Please fill the form ":"Signup"}
        </button><br /><br/>
        <Link href="/login">Login Page</Link>
    </div>
  )
}